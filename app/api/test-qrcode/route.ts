import { NextRequest, NextResponse } from "next/server";
import { getQRCodeFromAssignments, purchaseEsim } from "@/app/lib/esimgo";

/**
 * QR Code Display Endpoint
 * 
 * Müşterilere email'de gönderilen QR code sayfası
 * 
 * GET /api/test-qrcode?orderReference=ORDER_REFERENCE
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderReference = searchParams.get("orderReference");

  if (!orderReference) {
    return NextResponse.json(
      { error: "orderReference parameter is required" },
      { status: 400 }
    );
  }

  try {
    console.log("🧪 [TEST] Fetching QR code for orderReference:", orderReference);
    
    const result = await getQRCodeFromAssignments(orderReference);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error,
          orderReference: orderReference,
        },
        { status: 400 }
      );
    }

    // QR code'u HTML olarak göster
    const qrCodeBase64 = result.qrCode 
      ? (result.qrCode.startsWith('data:image') 
          ? result.qrCode 
          : `data:image/png;base64,${result.qrCode}`)
      : null;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your eSim QR Code - PrimeSim</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
      margin: -30px -30px 30px -30px;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
    }
    .qr-code {
      text-align: center;
      margin: 30px 0;
      padding: 30px;
      background: #fafafa;
      border-radius: 8px;
    }
    .qr-code img {
      max-width: 400px;
      width: 100%;
      border-radius: 8px;
    }
    .instructions {
      background: #dbeafe;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
      border-left: 4px solid #3b82f6;
    }
    .instructions h3 {
      color: #1e40af;
      margin-top: 0;
    }
    .instructions ol {
      color: #1f2937;
      padding-left: 20px;
    }
    .instructions li {
      margin: 10px 0;
    }
    .error {
      background: #fef2f2;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #dc2626;
      color: #991b1b;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    .footer a {
      color: #3b82f6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PrimeSim</h1>
    </div>
    
    <h2 style="color: #1f2937; margin-top: 0;">Your eSim QR Code 📱</h2>
    
    ${result.success && qrCodeBase64 ? `
      <div class="qr-code">
        <img src="${qrCodeBase64}" alt="QR Code" onerror="this.style.display='none'; document.getElementById('error').style.display='block';" />
        <div id="error" style="display:none;" class="error">
          <strong>❌ QR Code could not be loaded</strong>
          <p>Please contact our support team for assistance.</p>
        </div>
      </div>

      <div class="instructions">
        <h3>How to Activate Your eSim</h3>
        <ol>
          <li>Open your phone's Settings</li>
          <li>Go to Cellular / Mobile Data</li>
          <li>Tap "Add Cellular Plan" or "Add eSIM"</li>
          <li>Scan the QR code above with your phone camera</li>
          <li>Follow the on-screen instructions to complete activation</li>
        </ol>
      </div>
    ` : `
      <div class="error">
        <strong>❌ QR Code Not Available</strong>
        <p>${result.error || 'Your QR code is still being processed. Please try again in a few minutes.'}</p>
        <p>If the problem persists, please contact our support team.</p>
      </div>
    `}

    <div class="footer">
      <p style="margin: 5px 0;">
        Need help? Contact us at <a href="mailto:info@getprimesim.com">info@getprimesim.com</a>
      </p>
      <p style="margin: 5px 0;">
        Visit us at <a href="https://getprimesim.com">getprimesim.com</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to fetch QR code" },
      { status: 500 }
    );
  }
}

/**
 * POST - Test siparişi oluştur ve QR code'u al
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageId, email } = body;

    if (!packageId || !email) {
      return NextResponse.json(
        { error: "packageId and email are required" },
        { status: 400 }
      );
    }

    console.log("🧪 [TEST] Creating test order:");
    console.log("  - Package ID:", packageId);
    console.log("  - Email:", email);

    // Sipariş oluştur
    const purchaseResult = await purchaseEsim(packageId, email);

    if (!purchaseResult.success || !purchaseResult.orderId) {
      return NextResponse.json(
        {
          success: false,
          error: purchaseResult.error || "Failed to create order",
        },
        { status: 400 }
      );
    }

    console.log("✅ [TEST] Order created, orderReference:", purchaseResult.orderId);

    // Birkaç saniye bekle
    await new Promise(resolve => setTimeout(resolve, 3000));

    // QR code'u al
    console.log("🧪 [TEST] Fetching QR code...");
    const qrResult = await getQRCodeFromAssignments(purchaseResult.orderId);

    return NextResponse.json({
      success: true,
      orderReference: purchaseResult.orderId,
      qrCode: qrResult.qrCode,
      qrCodeUrl: qrResult.qrCodeUrl,
      qrCodeLength: qrResult.qrCode?.length || 0,
      qrCodePreview: qrResult.qrCode?.substring(0, 100) || null,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to test QR code" },
      { status: 500 }
    );
  }
}

