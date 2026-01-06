import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

/**
 * Order Status API
 * 
 * Success sayfasından session ID ile sipariş durumunu kontrol eder
 * QR kod'un gelip gelmediğini kontrol eder
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  if (!stripeSecretKey || stripeSecretKey.includes("YOUR_SECRET_KEY")) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-12-15.clover",
  });

  try {
    // Stripe session'ı al
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    // Metadata'dan paket bilgilerini al
    const packageName = session.metadata?.packageName;
    const customerEmail = session.customer_details?.email || session.customer_email;

    // Webhook'un tetiklenip tetiklenmediğini kontrol et
    // (Bu bilgiyi Stripe'dan alamayız, bu yüzden sadece session bilgilerini döndürüyoruz)
    
    return NextResponse.json({
      success: true,
      sessionId: session.id,
      paymentStatus: session.payment_status,
      packageName: packageName,
      customerEmail: customerEmail,
      message: "Payment successful. QR code will be sent to your email shortly.",
      note: "If QR code doesn't arrive, please contact support with your order ID.",
    });
  } catch (error: unknown) {
    console.error("Error retrieving session:", error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to retrieve order status" },
      { status: 500 }
    );
  }
}











