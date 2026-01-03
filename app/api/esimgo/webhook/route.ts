import { NextRequest, NextResponse } from "next/server";

/**
 * eSimGo Webhook/Callback Endpoint (v3)
 * 
 * eSimGo v3 API'den gelen callback'leri dinler
 * Sipariş durumu değişiklikleri, QR code bildirimleri vb. için kullanılır
 */

export async function POST(request: NextRequest) {
  console.log("=== ESIMGO V3 CALLBACK CALLED ===");

  try {
    const body = await request.json();
    console.log("eSimGo v3 callback body:", JSON.stringify(body, null, 2));

    // eSimGo v3 callback format'ı
    // Genellikle şunlar olur:
    // - event_type: "order.completed", "order.failed", vb.
    // - order_id: Sipariş ID
    // - qr_code: QR code (base64 veya URL)
    // - status: Sipariş durumu
    // - version: "v3"

    // eSimGo v3 callback format'ı - tüm olası field isimlerini kontrol ediyoruz
    const eventType = body.event_type || body.eventType || body.type || body.status || body.event;
    const orderId = body.order_id || body.orderId || body.id || body.order_id;
    const qrCode = body.qr_code || body.qrCode || body.qr_code_base64 || body.qrCodeBase64 || body.qr;
    const qrCodeUrl = body.qr_code_url || body.qrCodeUrl || body.qr_url || body.qrUrl || body.qr_code_image_url;
    const status = body.status || body.order_status || body.state;
    const email = body.email || body.customer_email || body.customerEmail || body.customer_email;
    const version = body.version || body.api_version;
    const packageName = body.package_name || body.packageName || body.package || "eSim Package";

    console.log("📦 eSimGo v3 Callback Details:");
    console.log("  - Full callback body:", JSON.stringify(body, null, 2));
    console.log("  - All keys in callback:", Object.keys(body));
    console.log("  - Version:", version || "v3");
    console.log("  - Event type:", eventType);
    console.log("  - Order ID:", orderId);
    console.log("  - Status:", status);
    console.log("  - Email:", email);
    console.log("  - Package:", packageName);
    console.log("  - QR Code:", qrCode ? "Base64 provided" : "Not provided");
    console.log("  - QR Code URL:", qrCodeUrl || "Not provided");

    // eSimGo v3 webhook signature verification (varsa)
    const webhookSecret = process.env.ESIMGO_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get("x-esimgo-signature") || 
                       request.headers.get("x-signature") ||
                       request.headers.get("x-callback-signature");
      // v3 signature verification yapılacak (eSimGo dokümantasyonuna göre)
      if (signature) {
        console.log("✅ Signature found, verification needed");
      }
    }

    // Event handling - tüm olası event type'ları kontrol ediyoruz
    const isCompletedEvent = 
      eventType === "order.completed" ||
      eventType === "order_created" ||
      eventType === "purchase.completed" ||
      eventType === "completed" ||
      eventType === "success" ||
      status === "completed" ||
      status === "success" ||
      status === "active" ||
      (typeof eventType === "string" && eventType.toLowerCase().includes("complete")) ||
      (typeof status === "string" && status.toLowerCase().includes("complete"));
    
    if (isCompletedEvent) {
      // Sipariş tamamlandı, QR code hazır
      console.log("✅ Order completed event detected, QR code ready");
        
        // Send QR code email to customer (always send if email is available)
        if (email) {
          try {
            const { sendQRCodeEmail } = await import("@/app/lib/email");
            console.log("📧 Sending QR code email to:", email);
            console.log("📦 QR Code:", qrCode ? "Base64 provided" : qrCodeUrl || "Not provided");
            
            const emailResult = await sendQRCodeEmail({
              to: email,
              packageName: packageName,
              qrCode: qrCode,
              qrCodeUrl: qrCodeUrl,
              orderId: orderId,
            });

            if (emailResult.success) {
              console.log("✅ QR code email sent successfully to:", email);
            } else {
              console.error("❌ Failed to send QR code email:", emailResult.error);
              console.error("  - Email:", email);
              console.error("  - Order ID:", orderId);
            }
          } catch (emailError: any) {
            console.error("❌ Email send error:", emailError);
            console.error("  - Email:", email);
            console.error("  - Order ID:", orderId);
          }
        } else {
          console.warn("⚠️ Email not provided in callback, cannot send QR code email");
          console.warn("  - Order ID:", orderId);
        }
        
      return NextResponse.json({ received: true, message: "Order processed" });
    }
    
    // Failed events
    const isFailedEvent = 
      eventType === "order.failed" ||
      eventType === "order_failed" ||
      eventType === "purchase.failed" ||
      eventType === "failed" ||
      status === "failed" ||
      status === "error" ||
      (typeof eventType === "string" && eventType.toLowerCase().includes("fail")) ||
      (typeof status === "string" && status.toLowerCase().includes("fail"));
    
    if (isFailedEvent) {
      // Sipariş başarısız
      console.error("❌ Order failed:", orderId);
      // TODO: Admin'e bildirim gönder
      return NextResponse.json({ received: true, message: "Order failed logged" });
    }
    
    // Activated events
    const isActivatedEvent = 
      eventType === "order.activated" ||
      eventType === "order_activated" ||
      eventType === "activated" ||
      status === "activated";
    
    if (isActivatedEvent) {
      // eSim aktif edildi
      console.log("✅ eSim activated:", orderId);
      return NextResponse.json({ received: true, message: "eSim activated" });
    }
    
    // Default: Herhangi bir event geldi, QR code varsa email gönder
    console.log("ℹ️ Unknown event type, but checking for QR code:", eventType);
    if (qrCode || qrCodeUrl) {
      console.log("✅ QR code found in callback, sending email...");
      if (email) {
        try {
          const { sendQRCodeEmail } = await import("@/app/lib/email");
          const emailResult = await sendQRCodeEmail({
            to: email,
            packageName: packageName,
            qrCode: qrCode,
            qrCodeUrl: qrCodeUrl,
            orderId: orderId,
          });
          
          if (emailResult.success) {
            console.log("✅ QR code email sent successfully to:", email);
          } else {
            console.error("❌ Failed to send QR code email:", emailResult.error);
          }
        } catch (emailError: any) {
          console.error("❌ Email send error:", emailError);
        }
      }
    }
    
    return NextResponse.json({ received: true, message: "Event received" });
  } catch (error: any) {
    console.error("❌ eSimGo webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook verification (eSimGo bazen GET isteği gönderir)
export async function GET(request: NextRequest) {
  console.log("=== ESIMGO WEBHOOK VERIFICATION ===");
  
  // eSimGo webhook verification için
  const challenge = request.nextUrl.searchParams.get("challenge");
  
  if (challenge) {
    return NextResponse.json({ challenge });
  }
  
  return NextResponse.json({ message: "eSimGo webhook endpoint is active" });
}

