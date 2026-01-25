import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook Test & Info Endpoint
 * 
 * Webhook URL'ini ve test için bilgileri gösterir
 * GET /api/test-webhook
 */
export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getprimesim.com';
  const webhookUrl = `${baseUrl}/api/esimgo/webhook`;
  
  return NextResponse.json({
    webhookUrl: webhookUrl,
    message: "eSimGo webhook endpoint bilgileri",
    instructions: {
      step1: "eSimGo dashboard'a gidin",
      step2: `Webhook URL olarak şunu kullanın: ${webhookUrl}`,
      step3: "Webhook'u test etmek için POST isteği gönderin",
      step4: "Vercel loglarında webhook isteklerini kontrol edin"
    },
    testEndpoint: `${baseUrl}/api/test-webhook`,
    webhookEndpoint: webhookUrl,
    environment: {
      baseUrl: baseUrl,
      nodeEnv: process.env.NODE_ENV || 'development'
    }
  });
}

/**
 * Webhook Test Endpoint - POST ile test edebilirsiniz
 * POST /api/test-webhook
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("🧪 [TEST WEBHOOK] Test webhook called");
    console.log("  - Body:", JSON.stringify(body, null, 2));
    console.log("  - Headers:", Object.fromEntries(request.headers.entries()));
    
    // Gerçek webhook'a yönlendir
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getprimesim.com';
    const webhookUrl = `${baseUrl}/api/esimgo/webhook`;
    
    return NextResponse.json({
      success: true,
      message: "Test webhook received",
      receivedData: body,
      actualWebhookUrl: webhookUrl,
      note: "Bu bir test endpoint'i. Gerçek webhook: /api/esimgo/webhook"
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { 
        success: false,
        error: err.message || "Failed to process test webhook" 
      },
      { status: 400 }
    );
  }
}
