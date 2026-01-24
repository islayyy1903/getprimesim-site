/**
 * Email Service - Resend Integration
 * 
 * QR code'u müşteriye email ile gönderir
 */

interface SendQRCodeEmailParams {
  to: string;
  packageName: string;
  qrCode?: string;
  qrCodeUrl?: string;
  orderId?: string;
  errorMessage?: string; // For sending failure notifications
}

import { fetchWithTimeout } from './fetchWithTimeout';

/**
 * QR code'u müşteriye email ile gönder
 */
export async function sendQRCodeEmail({
  to,
  packageName,
  qrCode,
  qrCodeUrl,
  orderId,
  errorMessage,
}: SendQRCodeEmailParams): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;

  // Resend API key kontrolü
  if (!resendApiKey || resendApiKey === "YOUR_RESEND_API_KEY") {
    console.error("❌ Resend API key not configured");
    return {
      success: false,
      error: "Email service not configured",
    };
  }

  try {
    console.log("📧 Attempting to send email to:", to);
    console.log("📦 Package:", packageName);
    console.log("🔑 Resend API key exists:", !!resendApiKey);
    console.log("🆔 Order ID:", orderId || "Not provided - WILL SHOW GENERAL LINK");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getprimesim.com';
    if (orderId) {
      console.log("🔗 QR Code Link:", `${baseUrl}/api/test-qrcode?orderReference=${orderId}`);
    } else {
      console.log("🔗 QR Code Link: GENERAL LINK (no orderId)");
    }
    console.log("🚨 Error Message (if any):", errorMessage || "None");
    
    // Resend API'ye istek at
    // Domain doğrulandı: getprimesim.com ✅
    const fromEmail = "PrimeSim <noreply@getprimesim.com>"; // Domain doğrulandı ✅
    
    const subject = errorMessage 
      ? `PrimeSim eSim Order Issue: ${packageName}`
      : `Your eSim QR Code - ${packageName}`;
    
    const html = generateEmailHTML({
      packageName,
      orderId,
      errorMessage,
      qrCode,
      qrCodeUrl,
    });
    const text = generateEmailText({ packageName, orderId, errorMessage });
    
    const emailPayload: Record<string, unknown> = {
      from: fromEmail,
      to: [to],
      subject: subject,
      html,
      text,
    };
    
    console.log("📤 Sending email via Resend API...");
    console.log("📧 From:", fromEmail);
    console.log("📧 To:", to);
    
    const response = await fetchWithTimeout("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
      timeout: 30000, // 30 seconds timeout
      retries: 3, // Retry 3 times
      retryDelay: 1000, // 1 second delay
    });

    const responseText = await response.text();
    console.log("📥 Resend API response status:", response.status);
    console.log("📥 Resend API response:", responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { error: responseText || "Unknown error" };
      }
      console.error("❌ Resend API error:", errorData);
      return {
        success: false,
        error: errorData.error?.message || errorData.error || `HTTP error! status: ${response.status}`,
      };
    }

    const data = JSON.parse(responseText);
    console.log("✅ Email sent successfully!");
    console.log("  - Email ID:", data.id);
    console.log("  - To:", to);
    
    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error("❌ Email send error:", error);
    const err = error as Error;
    console.error("❌ Error details:", {
      message: err.message,
      stack: err.stack,
    });
    return {
      success: false,
      error: err.message || "Failed to send email",
    };
  }
}

/**
 * Plain-text email body (HTML strip edilse bile link görünsün)
 */
function generateEmailText({
  packageName,
  orderId,
  errorMessage,
}: {
  packageName: string;
  orderId?: string;
  errorMessage?: string;
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getprimesim.com';
  const qrLink = orderId
    ? `${baseUrl}/api/test-qrcode?orderReference=${encodeURIComponent(orderId)}`
    : `${baseUrl}/esim`;

  if (errorMessage) {
    return `PrimeSim - eSim Order Issue\n\nPackage: ${packageName}${orderId ? `\nOrder ID: ${orderId}` : ''}\n\n${errorMessage}\n\nContact: info@getprimesim.com`;
  }

  return `PrimeSim - Your eSim is Ready!\n\nPackage: ${packageName}${orderId ? `\nOrder ID: ${orderId}` : ''}\n\nVIEW YOUR QR CODE (copy this link into your browser):\n${qrLink}\n\nOpen the link above to view and scan your eSim QR code.\n\nContact: info@getprimesim.com\nhttps://getprimesim.com`;
}

/**
 * Email HTML template oluştur
 */
function generateEmailHTML({
  packageName,
  orderId,
  errorMessage,
  qrCode,
  qrCodeUrl,
}: {
  packageName: string;
  orderId?: string;
  errorMessage?: string;
  qrCode?: string;
  qrCodeUrl?: string;
}): string {
  // If error message exists, show error instead of QR code
  if (errorMessage) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>eSim Order Issue</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">PrimeSim</h1>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1f2937; margin-top: 0;">eSim Order Issue ⚠️</h2>
    
    <p>Dear Customer,</p>
    
    <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
      <p style="color: #991b1b; margin: 0;"><strong>${errorMessage}</strong></p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
      <h3 style="color: #1f2937; margin-top: 0;">Order Details</h3>
      <p><strong>Package:</strong> ${packageName}</p>
      ${orderId ? `<p><strong>Order ID:</strong> ${orderId}</p>` : ""}
    </div>
    
    <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
      <h3 style="color: #1e40af; margin-top: 0;">What's Next?</h3>
      ${errorMessage.toLowerCase().includes('refund') || errorMessage.toLowerCase().includes('refunded') 
        ? `<p style="color: #1f2937;">Your payment has been automatically refunded to your original payment method. The refund may take 5-10 business days to appear in your account.</p>
           <p style="color: #1f2937;">We apologize for any inconvenience. If you need immediate assistance, please contact our support team.</p>`
        : `<p style="color: #1f2937;">Our team has been notified and is working to resolve this issue. We will send you the QR code as soon as it becomes available.</p>
           <p style="color: #1f2937;">If you need immediate assistance, please contact our support team.</p>`
      }
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin: 0;">
        Need help? Contact us at <a href="mailto:info@getprimesim.com" style="color: #3b82f6;">info@getprimesim.com</a>
      </p>
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">
        Visit us at <a href="https://getprimesim.com" style="color: #3b82f6;">getprimesim.com</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;
  }
  
  // QR code link - orderId varsa kullan, yoksa genel link
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getprimesim.com';
  const qrCodeLink = orderId
    ? `${baseUrl}/api/test-qrcode?orderReference=${encodeURIComponent(orderId)}`
    : `${baseUrl}/esim`;

  // Package Details içinde hemen link göster (bu kutu her zaman render ediliyor)
  const packageDetailsQrRow = `
    <p style="margin: 12px 0 0 0;"><strong>QR Code Link:</strong><br>
      <a href="${qrCodeLink}" style="color: #2563eb; text-decoration: underline; word-break: break-all;">${qrCodeLink}</a>
    </p>
    <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">Tap the link above or copy-paste it into your browser to view your QR code.</p>
  `;

  // Buton: gradient yerine solid renk (mobil istemci uyumluluğu)
  const qrCodeDisplay = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #1f2937;">View and scan your eSim QR code:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${qrCodeLink}" style="display: inline-block; background: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        View Your QR Code
      </a>
    </div>
    <p style="text-align: center; margin: 12px 0 0 0; font-size: 14px; color: #6b7280;">
      Or copy this link: <a href="${qrCodeLink}" style="color: #2563eb; text-decoration: underline; word-break: break-all;">${qrCodeLink}</a>
    </p>
  `;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your eSim QR Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">PrimeSim</h1>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1f2937; margin-top: 0;">Your eSim is Ready!</h2>
    
    <p>Thank you for your purchase. Your eSim QR code is ready to use.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
      <h3 style="color: #1f2937; margin-top: 0;">Package Details</h3>
      <p><strong>Package:</strong> ${packageName}</p>
      ${orderId ? `<p><strong>Order ID:</strong> ${orderId}</p>` : ""}
      ${packageDetailsQrRow}
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
      <h3 style="color: #1f2937; margin-top: 0;">Your QR Code</h3>
      ${qrCodeDisplay}
    </div>
    
    <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
      <h3 style="color: #1e40af; margin-top: 0;">How to Activate</h3>
      <ol style="color: #1f2937; padding-left: 20px;">
        <li>Open the QR Code link above</li>
        <li>Open your phone&apos;s Settings</li>
        <li>Go to Cellular / Mobile Data</li>
        <li>Tap &quot;Add Cellular Plan&quot; or &quot;Add eSIM&quot;</li>
        <li>Scan the QR code</li>
        <li>Follow the on-screen instructions</li>
      </ol>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin: 0;">
        Need help? Contact us at <a href="mailto:info@getprimesim.com" style="color: #3b82f6;">info@getprimesim.com</a>
      </p>
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">
        Visit us at <a href="https://getprimesim.com" style="color: #3b82f6;">getprimesim.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

