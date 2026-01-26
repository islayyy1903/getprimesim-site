import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isDisposableEmail } from "@/app/lib/disposableEmail";
import {
  findPackageById,
  calculateDiscountedPrice,
  validatePrice,
  normalizeCurrency,
} from "@/app/lib/packageValidation";
import { checkRateLimit, getClientIP } from "@/app/lib/rateLimit";

export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  console.log("=== CHECKOUT API CALLED ===");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
  
  // Check if Stripe secret key is configured
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  console.log("Secret key exists:", !!secretKey);
  console.log("Secret key starts with:", secretKey?.substring(0, 10));
  console.log("Publishable key exists:", !!publishableKey);
  console.log("Publishable key starts with:", publishableKey?.substring(0, 10));
  
  if (!secretKey || secretKey.includes("YOUR_SECRET_KEY") || secretKey.includes("YOUR_PUBLISHABLE_KEY")) {
    console.error("❌ Stripe secret key not configured or contains placeholder");
    const isProduction = process.env.NODE_ENV === 'production';
    return NextResponse.json(
      { 
        error: isProduction 
          ? "Stripe API keys are not configured. Please add your keys in Vercel Environment Variables."
          : "Stripe API keys are not configured. Please add your keys to .env.local file."
      },
      { status: 500 }
    );
  }

  try {
    // 🔒 SECURITY: Rate limiting - check before processing request
    const clientIP = getClientIP(request);
    const rateLimitResult = await checkRateLimit(clientIP);

    if (!rateLimitResult.success) {
      console.warn("⚠️ Rate limit exceeded:", {
        clientIP,
        limit: rateLimitResult.limit,
        remaining: rateLimitResult.remaining,
        reset: new Date(rateLimitResult.reset).toISOString(),
      });
      return NextResponse.json(
        {
          error: rateLimitResult.message || "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      );
    }

    console.log("✅ Rate limit check passed:", {
      clientIP,
      remaining: rateLimitResult.remaining,
      limit: rateLimitResult.limit,
    });

    // Use latest API version
    const stripe = new Stripe(secretKey, {
      apiVersion: "2025-12-15.clover",
    });

    const body = await request.json();
    
    console.log("Checkout request body:", { packageId: body.packageId });
    const { packageId, email, isFirstPurchase } = body;

    // Validate inputs - only packageId is required now
    if (!packageId) {
      console.error("❌ Missing packageId:", { packageId: !!packageId, clientIP });
      return NextResponse.json(
        { error: "Missing packageId. Please select a package." },
        { status: 400 }
      );
    }

    // 🔒 SECURITY: Server-side package validation
    // Find the actual package from countries.json
    const actualPackage = findPackageById(packageId);
    if (!actualPackage) {
      console.error("❌ Invalid package ID:", { packageId, clientIP });
      return NextResponse.json(
        { error: "Invalid package. Please select a valid package." },
        { status: 400 }
      );
    }

    // 🔒 SECURITY: Get currency from package data (not from frontend)
    const packageCurrency = normalizeCurrency(actualPackage.currency);

    // 🔒 SECURITY: Calculate discounted price on server-side
    // This prevents discount manipulation from frontend
    const DISCOUNT_RATE = 0.15; // 15% discount
    const finalPrice = calculateDiscountedPrice(
      actualPackage.price,
      DISCOUNT_RATE
    );

    // Minimum amount check (after validation)
    if (finalPrice < 3) {
      console.warn("⚠️ Min amount $3 – blocked:", { finalPrice, packageId, clientIP });
      return NextResponse.json(
        { error: "Minimum order amount is $3. Fraudsters often test with $0.50–$2; we block these." },
        { status: 400 }
      );
    }

    // Disposable email check
    if (email && isDisposableEmail(email)) {
      console.warn("⚠️ Disposable email blocked at checkout:", { email, packageId, clientIP });
      return NextResponse.json(
        { error: "Temporary or disposable email addresses are not allowed. Please use a permanent email." },
        { status: 400 }
      );
    }

    console.log("✅ Package validation passed:", {
      packageId,
      packageName: actualPackage.name,
      originalPrice: actualPackage.price,
      discountedPrice: finalPrice,
      currency: packageCurrency,
    });

    // Stok kontrolü yapmıyoruz - eSimGo her sipariş için otomatik yeni eSIM üretecek
    // Inventory'den satış yapmıyoruz, direkt üretim yapılıyor
    console.log("📦 Proceeding with payment - eSimGo will generate new eSIM on order");

    // Price is already calculated with %20 discount + sign-up bonus (if applicable) from frontend
    // Use the price directly (finalPrice set above after min-amount check)

    // Map currency symbol to Stripe currency code
    // Use currency from package data (not from frontend)
    const currencyMap: { [key: string]: string } = {
      "€": "eur",
      "£": "gbp",
      "$": "usd",
      "EUR": "eur",
      "GBP": "gbp",
      "USD": "usd",
      "eur": "eur",
      "gbp": "gbp",
      "usd": "usd",
    };
    
    const stripeCurrency = currencyMap[packageCurrency] || "usd";
    console.log("Currency mapping:", { packageCurrency, stripeCurrency });

    // Create Stripe Checkout Session (3DS requested for fraud prevention)
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      payment_method_options: {
        card: { request_three_d_secure: "automatic" },
      },
      line_items: [
        {
          price_data: {
            currency: stripeCurrency,
            product_data: {
              name: actualPackage.name,
              description: `eSim Plan: ${actualPackage.name}`,
            },
            unit_amount: Math.round(finalPrice * 100), // Convert to cents (or smallest unit for other currencies)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://getprimesim.com"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://getprimesim.com"}/esim?canceled=true`,
      metadata: {
        packageId: packageId,
        packageName: actualPackage.name, // Use validated package name
        originalPrice: actualPackage.price.toString(), // Use actual package price
        discountedPrice: finalPrice.toString(),
        discountApplied: "true", // Always true since we apply 15% discount
        currency: stripeCurrency,
      },
    };

    // Only set customer_email if provided (logged-in users)
    if (email) {
      sessionConfig.customer_email = email;
    }

    console.log("Creating Stripe checkout session...");
    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log("Stripe session created:", session.id);
    console.log("Stripe session URL:", session.url);

    if (!session.url) {
      console.error("Stripe session created but no URL returned");
      return NextResponse.json(
        { error: "Stripe session URL not available. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url 
    });
  } catch (error: unknown) {
    console.error("Stripe checkout error:", error);
    const stripeError = error as Stripe.errors.StripeError & { message?: string; type?: string; code?: string; statusCode?: number };
    console.error("Error details:", {
      message: stripeError.message,
      type: stripeError.type,
      code: stripeError.code,
      statusCode: stripeError.statusCode
    });
    
    // Check if it's an API key error
    let errorMessage = stripeError.message || "Failed to create checkout session";
    if (stripeError.type === 'StripeAuthenticationError' || stripeError.message?.includes('Invalid API Key')) {
      errorMessage = "Stripe API key is invalid. Please check STRIPE_SECRET_KEY in Vercel Environment Variables.";
      console.error("❌ Stripe API key authentication failed");
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? stripeError.message : undefined
      },
      { status: 500 }
    );
  }
}

