import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { purchaseEsim, mapPackageToEsimGo } from "@/app/lib/esimgo";
import { isDisposableEmail } from "@/app/lib/disposableEmail";
import { saveOrder, savePaymentLog, saveUser } from "@/app/lib/adminDb";

const AUDIT_PREFIX = "AUDIT_PROVISION";

// Stripe webhook secret key
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Disable body parsing for webhook signature verification
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("=== STRIPE WEBHOOK CALLED ===");
  console.log("Timestamp:", new Date().toISOString());

  if (!stripeSecretKey || stripeSecretKey.includes("YOUR_SECRET_KEY")) {
    console.error("❌ Stripe secret key not configured");
    return NextResponse.json(
      { error: "Stripe secret key not configured" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-12-15.clover",
  });

  // Get the raw body for signature verification
  // Important: We need the raw body exactly as Stripe sent it
  // Next.js App Router'da request.text() raw body'yi döndürür
  // But we'll also try to get it as Buffer for better compatibility
  const bodyText = await request.text();
  const signature = request.headers.get("stripe-signature");
  
  console.log("📝 Webhook received:");
  console.log("  - Signature exists:", !!signature);
  console.log("  - Webhook secret exists:", !!webhookSecret);
  console.log("  - Webhook secret starts with:", webhookSecret?.substring(0, 10));
  console.log("  - Webhook secret length:", webhookSecret?.length);
  console.log("  - Body length:", bodyText.length);
  console.log("  - Body preview:", bodyText.substring(0, 100));
  console.log("  - Signature preview:", signature?.substring(0, 50));
  
  // Use bodyText for signature verification (Stripe accepts string or Buffer)
  const body = bodyText;

  if (!signature) {
    console.error("❌ No Stripe signature found in headers");
    console.error("  - Available headers:", Object.keys(request.headers));
    return NextResponse.json(
      { error: "No signature found" },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    console.error("❌ STRIPE_WEBHOOK_SECRET not configured in environment variables");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    // Stripe requires the raw body as a string or Buffer
    // Important: Body must be exactly as received from Stripe (no parsing, no modifications)
    console.log("🔐 Attempting signature verification...");
    console.log("  - Using webhook secret:", webhookSecret.substring(0, 10) + "...");
    console.log("  - Body is string:", typeof body === 'string');
    console.log("  - Body length:", body.length);
    console.log("  - Signature:", signature);
    
    // Try with string first
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("✅ Webhook signature verified successfully (string)");
    } catch {
      // If string fails, try with Buffer
      console.log("⚠️ String verification failed, trying Buffer...");
      const bodyBuffer = Buffer.from(body, 'utf8');
      event = stripe.webhooks.constructEvent(bodyBuffer, signature, webhookSecret);
      console.log("✅ Webhook signature verified successfully (Buffer)");
    }
    
    console.log("  - Event type:", event.type);
    console.log("  - Event ID:", event.id);
    } catch (error: unknown) {
    const stripeError = error as Stripe.errors.StripeError & { message?: string; type?: string };
    console.error("❌ Webhook signature verification failed:");
    console.error("  - Error message:", stripeError.message);
    console.error("  - Error type:", stripeError.type);
    console.error("  - Body length:", body.length);
    console.error("  - Body type:", typeof body);
    console.error("  - Body first 200 chars:", body.substring(0, 200));
    console.error("  - Signature:", signature);
    console.error("  - Signature length:", signature?.length);
    console.error("  - Webhook secret exists:", !!webhookSecret);
    console.error("  - Webhook secret length:", webhookSecret?.length);
    console.error("  - Webhook secret starts with:", webhookSecret?.substring(0, 10));
    console.error("  - Webhook secret full:", webhookSecret); // Full secret for debugging
    
    // Check if secret format is correct
    if (webhookSecret && !webhookSecret.startsWith('whsec_')) {
      console.error("⚠️ WARNING: Webhook secret should start with 'whsec_'");
    }
    
    // For debugging: Try to parse event without verification (DANGEROUS - only for debugging)
    try {
      const testEvent = JSON.parse(body) as { type?: string };
      console.log("⚠️ DEBUG: Event parsed without verification:", testEvent.type);
    } catch {
      console.error("❌ DEBUG: Cannot parse body as JSON");
    }
    
    return NextResponse.json(
      { 
        error: `Webhook signature verification failed: ${stripeError.message || 'Unknown error'}`,
        hint: "Check if STRIPE_WEBHOOK_SECRET is correct in Vercel Environment Variables. Secret should start with 'whsec_'"
      },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log("✅ Checkout session completed:", session.id);
    console.log("  - payment_status:", session.payment_status);
    console.log("Session metadata:", session.metadata);

    // Only provision eSimGo when payment is actually paid (avoid provisioning on blocked/unpaid/incomplete)
    if (session.payment_status !== "paid") {
      console.warn("⚠️ Skipping eSimGo provision: payment_status is not 'paid'", session.payment_status);
      return NextResponse.json({ received: true, skipped: "payment_not_paid" });
    }

    // Get package information from metadata
    const packageName = session.metadata?.packageName;
    const packageId = session.metadata?.packageId; // bundleId from frontend
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const amountCents = session.amount_total ?? 0;
    const currency = session.currency?.toUpperCase() || 'USD';
    const piId = typeof session.payment_intent === "string" ? session.payment_intent : null;

    if (amountCents < 300) {
      console.warn("⚠️ Min amount $3 – blocked (low-amount fraud):", amountCents, "cents");
      if (piId) {
        try {
          await stripe.refunds.create({
            payment_intent: piId,
            reason: "fraudulent",
            metadata: { reason: "min_amount", session_id: session.id },
          });
        } catch (e) {
          console.error("❌ Refund failed for min amount:", e);
        }
      }
      return NextResponse.json({ received: true, skipped: "min_amount" });
    }

    // Save payment log
    try {
      await savePaymentLog({
        id: session.id,
        sessionId: session.id,
        paymentIntentId: piId || undefined,
        customerEmail: customerEmail || 'unknown',
        amount: amountCents,
        currency: currency,
        status: session.payment_status === 'paid' ? 'succeeded' : 
                session.payment_status === 'unpaid' ? 'pending' : 'failed',
        createdAt: new Date().toISOString(),
        metadata: session.metadata || {},
      });
    } catch (error) {
      console.error("❌ Failed to save payment log:", error);
    }

    if (!customerEmail) {
      console.error("❌ Missing email");
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    if (isDisposableEmail(customerEmail)) {
      console.warn("⚠️ Disposable email blocked:", customerEmail);
      if (piId) {
        try {
          await stripe.refunds.create({
            payment_intent: piId,
            reason: "fraudulent",
            metadata: { reason: "disposable_email", session_id: session.id },
          });
        } catch (e) {
          console.error("❌ Refund failed for disposable email:", e);
        }
      }
      return NextResponse.json({ received: true, skipped: "disposable_email" });
    }

    // Idempotency: avoid double provision on webhook retries
    if (piId) {
      try {
        const pi = await stripe.paymentIntents.retrieve(piId);
        const existing = (pi.metadata?.primesim_esimgo_order as string) || "";
        if (existing) {
          console.warn("⚠️ Idempotent skip – already processed:", existing);
          console.log(`${AUDIT_PREFIX} skip=idempotent session_id=${session.id} payment_intent=${piId} esimgo_order=${existing}`);
          return NextResponse.json({ received: true, skipped: "idempotent" });
        }
      } catch (e) {
        console.warn("⚠️ Could not check PI metadata (idempotency):", e);
      }
    }

    // packageId (bundleId) varsa direkt kullan, yoksa packageName'den map et
    let esimGoPackageId: string;
    if (packageId) {
      // packageId'yi kontrol et ve unlimited paketler için düzelt
      const { fixUnlimitedBundleId } = await import("@/app/lib/esimgo");
      esimGoPackageId = fixUnlimitedBundleId(packageId);
      
      if (esimGoPackageId !== packageId) {
        console.log("🔧 Fixed unlimited bundle ID:", packageId, "→", esimGoPackageId);
      } else {
        console.log("📦 Using packageId (bundleId) directly:", esimGoPackageId);
      }
    } else if (packageName) {
      // Fallback: packageName'den map et (eski davranış)
      esimGoPackageId = mapPackageToEsimGo(packageName);
      console.log("⚠️ packageId not found, mapping from packageName:", packageName, "→", esimGoPackageId);
    } else {
      console.error("❌ Missing both packageId and packageName");
      return NextResponse.json(
        { error: "Missing packageId or packageName" },
        { status: 400 }
      );
    }

    try {
      
      console.log("📦 Purchasing eSim from eSimGo...");
      console.log("Package Name:", packageName || "N/A");
      console.log("Package ID (bundleId):", packageId || "N/A");
      console.log("eSimGo Package ID (final):", esimGoPackageId);
      console.log("Email:", customerEmail);

      // Purchase eSim from eSimGo
      console.log("📤 Sending request to eSimGo API...");
      console.log("  - API URL:", process.env.ESIMGO_API_URL);
      console.log("  - Package ID:", esimGoPackageId);
      console.log("  - Email:", customerEmail);
      console.log("  - Session ID:", session.id);
      
      // Purchase eSim from eSimGo
      const purchaseResult = await purchaseEsim(esimGoPackageId, customerEmail);

      const orderRef = purchaseResult.orderId || `failed_${session.id}`;
      if (piId) {
        try {
          await stripe.paymentIntents.update(piId, {
            metadata: { ...(await stripe.paymentIntents.retrieve(piId).then((p) => p.metadata || {})), primesim_esimgo_order: orderRef },
          });
        } catch (e) {
          console.warn("⚠️ Could not update PI metadata (idempotency):", e);
        }
      }

      if (!purchaseResult.success) {
        console.error("❌ eSimGo purchase failed:");
        console.error("  - Error:", purchaseResult.error);
        console.error("  - Package:", packageName);
        console.error("  - eSimGo Package ID:", esimGoPackageId);
        console.error("  - Email:", customerEmail);
        console.error("  - Session ID:", session.id);
        
        // Save failed order to database
        try {
          await saveOrder({
            id: session.id,
            customerEmail: customerEmail,
            customerName: customerName,
            packageId: packageId || 'unknown',
            packageName: packageName || 'eSim Package',
            amount: amountCents,
            currency: currency,
            status: 'failed',
            paymentIntentId: piId || undefined,
            esimgoOrderId: purchaseResult.orderId,
            createdAt: new Date(session.created * 1000).toISOString(),
            refunded: false,
          });
          console.log("✅ Failed order saved to database");
        } catch (error) {
          console.error("❌ Failed to save failed order:", error);
        }
        
        // Herhangi bir hata durumunda otomatik refund yap
        const paymentIntent = typeof session.payment_intent === 'string' ? session.payment_intent : null;
        if (paymentIntent) {
          try {
            console.log("💰 Processing automatic refund due to eSimGo purchase failure...");
            const refund = await stripe.refunds.create({
              payment_intent: paymentIntent,
              reason: 'requested_by_customer',
              metadata: {
                reason: 'esimgo_purchase_failed',
                error: purchaseResult.error || 'Unknown error',
                package: packageName || 'unknown',
                session_id: session.id,
              },
            });
            
            console.log("✅ Automatic refund processed:", refund.id);
            console.log("  - Refund ID:", refund.id);
            console.log("  - Refund Amount:", refund.amount);
            console.log("  - Refund Status:", refund.status);
          } catch (refundError: unknown) {
            console.error("❌ Failed to process automatic refund:", refundError);
            // Refund başarısız olsa bile email gönder
          }
        } else {
          console.warn("⚠️ Payment intent not found, cannot process refund");
        }
        
        // Müşteriye email gönder
        try {
          const { sendQRCodeEmail } = await import("@/app/lib/email");
          const errorMessage = `We encountered an issue processing your eSim order: ${purchaseResult.error}. Your payment has been automatically refunded. Our team has been notified and will resolve this shortly. Please contact support if you need immediate assistance.`;
          
          const emailResult = await sendQRCodeEmail({
            to: customerEmail,
            packageName: packageName || "eSim Package",
            errorMessage: errorMessage,
            orderId: session.id,
          });

          if (emailResult.success) {
            console.log("✅ Notification email sent to customer about eSimGo issue and refund");
          } else {
            console.error("❌ Failed to send notification email:", emailResult.error);
          }
        } catch (emailError: unknown) {
          console.error("❌ Email send error:", emailError);
        }
        
        // Log error but don't fail the webhook (payment is already refunded)
        return NextResponse.json({
          received: true,
          warning: "Payment refunded due to eSimGo purchase failure",
          error: purchaseResult.error,
          refunded: true,
        });
      }

      console.log("✅ eSim purchased successfully");
      console.log("  - Order ID:", purchaseResult.orderId);
      console.log("  - QR Code:", purchaseResult.qrCode ? "Base64 provided" : "Not provided");
      console.log("  - QR Code URL:", purchaseResult.qrCodeUrl || "Not provided");
      console.log("  - Package:", packageName);
      console.log("  - Email:", customerEmail);
      const amount = session.amount_total ?? 0;
      console.log(
        `${AUDIT_PREFIX} session_id=${session.id} payment_intent=${piId || ""} amount=${amount} email=${customerEmail} esimgo_order=${orderRef} ts=${new Date().toISOString()}`
      );

      // Dokümantasyona göre: QR codes are NOT returned from /orders
      // They are retrieved using: GET /v2.5/esims/assignments?reference=ORDER_REFERENCE
      let finalQrCode = purchaseResult.qrCode;
      let finalQrCodeUrl = purchaseResult.qrCodeUrl;
      
      // /orders endpoint'inden QR code gelmez, /esims/assignments kullanılmalı
      if (!finalQrCode && !finalQrCodeUrl && purchaseResult.orderId) {
        console.log("⚠️ QR code not in /orders response (expected), fetching from /esims/assignments...");
        console.log("  - Order Reference:", purchaseResult.orderId);
        
        // Birkaç saniye bekle (eSimGo assignment işlemini tamamlasın)
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        try {
          const { getQRCodeFromAssignments } = await import("@/app/lib/esimgo");
          console.log("📥 Fetching QR code from /esims/assignments endpoint...");
          const assignmentsResult = await getQRCodeFromAssignments(purchaseResult.orderId);
          
          if (assignmentsResult.success && (assignmentsResult.qrCode || assignmentsResult.qrCodeUrl)) {
            console.log("✅ QR code found in assignments!");
            finalQrCode = assignmentsResult.qrCode;
            finalQrCodeUrl = assignmentsResult.qrCodeUrl;
          } else {
            console.log("⚠️ QR code still not available in assignments, waiting for callback...");
            // Bir kez daha dene (5 saniye sonra)
            await new Promise(resolve => setTimeout(resolve, 5000));
            const assignmentsResult2 = await getQRCodeFromAssignments(purchaseResult.orderId);
            if (assignmentsResult2.success && (assignmentsResult2.qrCode || assignmentsResult2.qrCodeUrl)) {
              console.log("✅ QR code found in second assignments check!");
              finalQrCode = assignmentsResult2.qrCode;
              finalQrCodeUrl = assignmentsResult2.qrCodeUrl;
            }
          }
        } catch (assignmentsError: unknown) {
          console.error("❌ Assignments check error:", assignmentsError);
          // Devam et, email gönder (QR code olmadan - callback ile gelecek)
        }
      }

      // QR code kontrolü - eğer QR code yoksa refund yap
      if (!finalQrCode && !finalQrCodeUrl) {
        console.error("❌ QR code not available after all attempts");
        console.error("  - Order ID:", purchaseResult.orderId);
        console.error("  - Package:", packageName);
        console.error("  - Email:", customerEmail);
        
        // QR code yoksa otomatik refund yap
        const paymentIntentForRefund = typeof session.payment_intent === 'string' ? session.payment_intent : null;
        if (paymentIntentForRefund) {
          try {
            console.log("💰 Processing automatic refund - QR code not available...");
            const refund = await stripe.refunds.create({
              payment_intent: paymentIntentForRefund,
              reason: 'requested_by_customer',
              metadata: {
                reason: 'qr_code_not_available',
                package: packageName || 'unknown',
                order_id: purchaseResult.orderId || 'unknown',
                session_id: session.id,
              },
            });
            
            console.log("✅ Automatic refund processed (no QR code):", refund.id);
            console.log("  - Refund ID:", refund.id);
            console.log("  - Refund Amount:", refund.amount);
            console.log("  - Refund Status:", refund.status);
            
            // Müşteriye refund bilgisi ile email gönder
            try {
              const { sendQRCodeEmail } = await import("@/app/lib/email");
              const errorMessage = "We encountered an issue generating your eSim QR code. Your payment has been automatically refunded. Our team has been notified and will resolve this shortly. Please contact support if you need immediate assistance.";
              
              const emailResult = await sendQRCodeEmail({
                to: customerEmail,
                packageName: packageName || "eSim Package",
                errorMessage: errorMessage,
                orderId: purchaseResult.orderId || session.id,
              });

              if (emailResult.success) {
                console.log("✅ Refund notification email sent to customer");
              } else {
                console.error("❌ Failed to send refund notification email:", emailResult.error);
              }
            } catch (emailError: unknown) {
              console.error("❌ Email send error:", emailError);
            }
            
            return NextResponse.json({
              received: true,
              warning: "Payment refunded - QR code not available",
              orderId: purchaseResult.orderId,
              refunded: true,
            });
          } catch (refundError: unknown) {
            console.error("❌ Failed to process automatic refund (no QR code):", refundError);
            // Refund başarısız olsa bile devam et
          }
        } else {
          console.warn("⚠️ Payment intent not found, cannot process refund for missing QR code");
        }
      }

      // Send QR code email to customer (always send, even if QR code not ready yet)
      try {
        const { sendQRCodeEmail } = await import("@/app/lib/email");
        const emailResult = await sendQRCodeEmail({
          to: customerEmail,
          packageName: packageName || "eSim Package",
          qrCode: finalQrCode,
          qrCodeUrl: finalQrCodeUrl,
          orderId: purchaseResult.orderId,
        });

        if (emailResult.success) {
          console.log("✅ QR code email sent successfully to:", customerEmail);
          console.log("  - QR Code included:", !!(finalQrCode || finalQrCodeUrl));
        } else {
          console.error("❌ Failed to send QR code email:", emailResult.error);
          console.error("  - Email:", customerEmail);
          console.error("  - Package:", packageName);
          // Don't fail the webhook, email can be sent later
        }
      } catch (emailError: unknown) {
        console.error("❌ Email send error:", emailError);
        console.error("  - Email:", customerEmail);
        console.error("  - Package:", packageName);
        // Don't fail the webhook, email can be sent later
      }

      // Save order to database
      try {
        await saveOrder({
          id: session.id,
          customerEmail: customerEmail,
          customerName: customerName,
          packageId: packageId || 'unknown',
          packageName: packageName || 'eSim Package',
          amount: amountCents,
          currency: currency,
          status: 'paid',
          paymentIntentId: piId || undefined,
          esimgoOrderId: purchaseResult.orderId,
          createdAt: new Date(session.created * 1000).toISOString(),
          paidAt: new Date().toISOString(),
          qrCodeSent: true,
          refunded: false,
        });
        console.log("✅ Order saved to database");
      } catch (error) {
        console.error("❌ Failed to save order:", error);
      }

      return NextResponse.json({
        received: true,
        message: "Payment processed and eSim purchased",
        orderId: purchaseResult.orderId,
      });
    } catch (error: unknown) {
      console.error("❌ Error processing eSimGo purchase:", error);
      const err = error as Error;
      
      // Save failed order to database
      try {
        await saveOrder({
          id: session.id,
          customerEmail: customerEmail || 'unknown',
          customerName: customerName,
          packageId: packageId || 'unknown',
          packageName: packageName || 'eSim Package',
          amount: amountCents,
          currency: currency,
          status: 'failed',
          paymentIntentId: piId || undefined,
          createdAt: new Date(session.created * 1000).toISOString(),
          refunded: false,
        });
        console.log("✅ Error order saved to database");
      } catch (dbError) {
        console.error("❌ Failed to save error order:", dbError);
      }
      
      // Herhangi bir hata durumunda otomatik refund yap
      const paymentIntentForError = typeof session.payment_intent === 'string' ? session.payment_intent : null;
      if (paymentIntentForError) {
        try {
          console.log("💰 Processing automatic refund due to processing error...");
          const refund = await stripe.refunds.create({
            payment_intent: paymentIntentForError,
            reason: 'requested_by_customer',
            metadata: {
              reason: 'processing_error',
              error: err.message || 'Unknown error',
              package: packageName || 'unknown',
              session_id: session.id,
            },
          });
          
          console.log("✅ Automatic refund processed (processing error):", refund.id);
          console.log("  - Refund ID:", refund.id);
          console.log("  - Refund Amount:", refund.amount);
          console.log("  - Refund Status:", refund.status);
          
          // Müşteriye refund bilgisi ile email gönder
          if (customerEmail) {
            try {
              const { sendQRCodeEmail } = await import("@/app/lib/email");
              const errorMessage = `We encountered an error processing your eSim order: ${err.message || 'Unknown error'}. Your payment has been automatically refunded. Our team has been notified and will resolve this shortly. Please contact support if you need immediate assistance.`;
              
              const emailResult = await sendQRCodeEmail({
                to: customerEmail,
                packageName: packageName || "eSim Package",
                errorMessage: errorMessage,
                orderId: session.id,
              });

              if (emailResult.success) {
                console.log("✅ Refund notification email sent to customer");
              } else {
                console.error("❌ Failed to send refund notification email:", emailResult.error);
              }
            } catch (emailError: unknown) {
              console.error("❌ Email send error:", emailError);
            }
          }
        } catch (refundError: unknown) {
          console.error("❌ Failed to process automatic refund (processing error):", refundError);
        }
      }
      
      // Log error but don't fail the webhook (payment is already refunded)
      return NextResponse.json({
        received: true,
        warning: "Payment refunded due to processing error",
        error: err.message,
        refunded: true,
      });
    }
  }

  // Handle refund events
  if (event.type === "charge.refunded" || event.type === "refund.created") {
    const refund = event.data.object as Stripe.Refund;
    const paymentIntentId = typeof refund.payment_intent === 'string' 
      ? refund.payment_intent 
      : refund.payment_intent?.id;

    if (paymentIntentId) {
      try {
        // Find the order by payment intent ID
        const { getAllOrders, saveOrder, savePaymentLog } = await import("@/app/lib/adminDb");
        const orders = await getAllOrders();
        const order = orders.find(o => o.paymentIntentId === paymentIntentId);

        if (order) {
          // Update order with refund information
          await saveOrder({
            ...order,
            status: 'refunded',
            refunded: true,
            refundReason: refund.reason || 'unknown',
          });

          // Update payment log
          await savePaymentLog({
            id: `refund_${refund.id}`,
            sessionId: order.id,
            paymentIntentId: paymentIntentId,
            customerEmail: order.customerEmail,
            amount: refund.amount,
            currency: refund.currency.toUpperCase(),
            status: 'refunded',
            createdAt: new Date(refund.created * 1000).toISOString(),
            metadata: {
              refund_id: refund.id,
              reason: refund.reason || 'unknown',
            },
          });

          console.log("✅ Refund saved to database:", refund.id);
        }
      } catch (error) {
        console.error("❌ Failed to save refund:", error);
      }
    }
  }

  // Return success for other event types
  return NextResponse.json({ received: true });
}

