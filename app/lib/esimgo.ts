/**
 * eSimGo API Client
 * 
 * Bu dosya eSimGo API ile iletişim kurmak için kullanılır.
 * eSimGo'dan API bilgilerini aldıktan sonra bu dosyayı güncelleyin.
 */

import { fetchWithTimeout } from './fetchWithTimeout';
import unlimitedPlusMapping from '../../unlimited-plus-mapping.json';
import { randomUUID } from 'crypto';

// ESimGoPurchaseRequest interface removed - not used

interface ESimGoPurchaseResponse {
  success: boolean;
  orderId?: string;
  qrCode?: string;
  qrCodeUrl?: string;
  error?: string;
  isStockError?: boolean;
}

/**
 * eSimGo'dan eSim satın alma
 * 
 * @param packageId - Paket ID (örn: "usa-1gb-7days")
 * @param email - Müşteri email adresi
 * @returns QR code ve sipariş bilgileri
 */
/**
 * Unique ID oluştur (profileID için)
 * 
 * eSimGo API formatı: UUID v4 formatı
 * Örnek: 9c7f2a01-8b4d-4c11-9a22-abcdef123456
 * 
 * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * 
 * ÖNEMLİ: Email'i profileID olarak kullanmak hataya neden oluyor!
 * eSimGo API profileID'yi UUID olarak parse etmeye çalışıyor.
 * Email (22 karakter) UUID formatında değil, bu yüzden "invalid UUID length: 22" hatası veriyor.
 */
function generateProfileID(email: string): string {
  // Email'i profileID olarak kullanmak hataya neden oluyor
  // eSimGo API profileID'yi UUID olarak parse etmeye çalışıyor
  // Email (22 karakter) UUID formatında değil, bu yüzden "invalid UUID length: 22" hatası veriyor
  // Bu yüzden gerçek bir UUID v4 oluşturuyoruz
  try {
    // Node.js crypto modülü ile UUID v4 oluştur
    return randomUUID();
  } catch (error) {
    // Fallback: UUID v4 manuel oluşturma (eğer crypto.randomUUID yoksa)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export async function purchaseEsim(
  packageId: string,
  email: string
): Promise<ESimGoPurchaseResponse> {
  const apiKey = process.env.ESIMGO_API_KEY;
  const apiUrl = process.env.ESIMGO_API_URL;

  // API bilgileri kontrolü
  if (!apiKey || !apiUrl) {
    console.error("❌ eSimGo API bilgileri eksik");
    console.error("  - API Key exists:", !!apiKey);
    console.error("  - API URL exists:", !!apiUrl);
    return {
      success: false,
      error: "eSimGo API bilgileri yapılandırılmamış",
    };
  }
  
  console.log("🔍 eSimGo API Configuration:");
  console.log("  - API URL:", apiUrl);
  console.log("  - API Key exists:", !!apiKey);
  console.log("  - API Key starts with:", apiKey.substring(0, 10) + "...");

  try {
    // eSimGo API v2.3 - Callback URL (callback version v3)
    // Dokümantasyona göre: https://api.esim-go.com/v2.3/...
    // Callback version: v3 (eSimGo dashboard'da ayarlanmış)
    const callbackUrl = process.env.NEXT_PUBLIC_BASE_URL 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/esimgo/webhook`
      : "https://getprimesim.com/api/esimgo/webhook";
    
    // eSimGo API v2.3 endpoint formatı
    // ESIMGO_API_URL: https://api.esim-go.com/v2.3 (base URL + version)
    // Endpoint: /orders
    
    // eSimGo API v2.3 formatına göre request body
    // Dokümantasyona göre profileID opsiyonel - göndermiyoruz
    // Email zorunlu field
    const requestBody: any = {
      type: "transaction",
      assign: true, // Otomatik assign için
      order: [
        {
          type: "bundle",
          quantity: 1,
          item: packageId, // Bundle ismi (örn: esim_1GB_7D_US_V2)
          allowReassign: false,
        },
      ],
      email: email, // Email zorunlu field
      callback_url: callbackUrl, // Callback URL (callback version v3)
    };
    
    // profileID göndermiyoruz - eSimGo API v2.3'te opsiyonel
    // "unable to find esim profile" hatası profileID gönderildiğinde oluşuyor
    // Email yeterli - eSimGo otomatik olarak profile oluşturur
    
    console.log("📡 Network selection: eSimGo will automatically select the best network for the country");
    
    console.log("🔍 eSimGo Assignment Debug:");
    console.log("  - assign: true (otomatik assign aktif)");
    console.log("  - profileID: (not sent - optional in v2.3)");
    console.log("  - email:", email);
    console.log("  - callback_url:", callbackUrl);
    
    console.log("📤 eSimGo API Request Body:");
    console.log(JSON.stringify(requestBody, null, 2));
    console.log("📤 eSimGo API URL:", `${apiUrl}/orders`);
    console.log("🔍 Bundle ID Debug:");
    console.log("  - Input packageId:", packageId);
    console.log("  - Bundle name sent to API:", requestBody.order[0].item);
    console.log("  - Expected format: esim_{DATA}_{DAYS}_{COUNTRY}_V2");
    console.log("  - ⚠️ If bundle name is wrong, eSIM will assign but data won't work!");
    
    const response = await fetchWithTimeout(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey, // eSimGo API uses X-API-Key header (not Bearer token)
        "Content-Type": "application/json",
        "Accept": "application/json", // Hazır prompt'a göre gerekli
      },
      body: JSON.stringify(requestBody),
      timeout: 30000, // 30 seconds timeout
      retries: 2, // Retry 2 times (don't retry too many times for API calls)
      retryDelay: 2000, // 2 seconds delay between retries
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || "Unknown error" };
      }
      
      console.error("❌ eSimGo API error:");
      console.error("  - Status:", response.status);
      console.error("  - Status text:", response.statusText);
      console.error("  - Error response:", JSON.stringify(errorData, null, 2));
      console.error("  - Full error text:", errorText);
      
      // Stok hatası kontrolü - daha spesifik kontrol
      const errorMessage = errorData.error || errorData.message || errorText || `HTTP error! status: ${response.status}`;
      const errorLower = errorMessage.toLowerCase();
      const isStockError = errorLower.includes("stock") || 
                          errorLower.includes("out of stock") ||
                          errorLower.includes("insufficient") ||
                          errorLower.includes("not available") ||
                          errorLower.includes("unavailable") ||
                          (response.status === 422 && errorLower.includes("bundle")) ||
                          (response.status === 400 && (errorLower.includes("bundle") || errorLower.includes("item")));
      
      return {
        success: false,
        error: errorMessage,
        isStockError: isStockError,
      };
    }

    const data = await response.json();
    
    // Detaylı logging
    console.log("📥 eSimGo API Response:");
    console.log("  - Full response:", JSON.stringify(data, null, 2));
    console.log("  - All keys in response:", Object.keys(data));
    
    // Bundle bilgilerini kontrol et (eğer response'da varsa)
    const bundleInfo = data.bundle || data.bundle_name || data.bundleId || data.item || data.package;
    if (bundleInfo) {
      console.log("📦 Bundle Info from Response:");
      console.log("  - Bundle:", bundleInfo);
      console.log("  - Sent bundle:", requestBody.order[0].item);
      if (bundleInfo !== requestBody.order[0].item) {
        console.warn("⚠️ WARNING: Bundle mismatch!");
        console.warn("  - Sent:", requestBody.order[0].item);
        console.warn("  - Received:", bundleInfo);
        console.warn("  - This may cause data not to work!");
      }
    }
    
    // Hazır prompt'a göre: /orders endpoint'i sadece orderReference döner, QR code dönmez!
    // QR code /esims/assignments endpoint'inden alınmalı
    const orderReference = data.orderReference || data.order_reference || data.reference || 
                          data.order_id || data.orderId || data.id;
    
    console.log("  - Order Reference (orderReference):", orderReference);
    console.log("  - Note: QR code is NOT returned from /orders, use /esims/assignments endpoint");
    
    // QR code bu endpoint'ten gelmez, /esims/assignments kullanılmalı
    // Ama bazı field'ları kontrol edelim (bazı API versiyonlarında farklı olabilir)
    const qrCode = data.qr_code || data.qrCode || data.qr_code_base64 || data.qrCodeBase64;
    const qrCodeUrl = data.qr_code_url || data.qrCodeUrl || data.qr_url || data.qrUrl || data.qr_code_image_url;
    
    console.log("  - QR Code in response:", qrCode ? "Base64 provided" : "Not provided (expected - use /esims/assignments)");
    console.log("  - QR Code URL in response:", qrCodeUrl || "Not provided (expected - use /esims/assignments)");
    
    return {
      success: true,
      orderId: orderReference, // orderReference'ı orderId olarak kullanıyoruz
      qrCode: qrCode, // Muhtemelen boş, /esims/assignments'ten alınmalı
      qrCodeUrl: qrCodeUrl, // Muhtemelen boş, /esims/assignments'ten alınmalı
    };
  } catch (error: unknown) {
    console.error("eSimGo purchase error:", error);
    const err = error as Error;
    return {
      success: false,
      error: err.message || "Failed to purchase eSim",
    };
  }
}

/**
 * eSimGo'dan QR code'u /esims/assignments endpoint'inden al
 * Hazır prompt'a göre: QR codes are NOT returned from /orders
 * They are retrieved using: GET /v2.3/esims/assignments?reference=ORDER_REFERENCE
 * 
 * @param orderReference - eSimGo order reference (from /orders response)
 * @returns QR code bilgileri
 */
export async function getQRCodeFromAssignments(
  orderReference: string
): Promise<ESimGoPurchaseResponse> {
  const apiKey = process.env.ESIMGO_API_KEY;
  const apiUrl = process.env.ESIMGO_API_URL;

  if (!apiKey || !apiUrl) {
    return {
      success: false,
      error: "eSimGo API bilgileri yapılandırılmamış",
    };
  }

  try {
    // Hazır prompt'a göre: GET /v2.3/esims/assignments?reference=ORDER_REFERENCE
    // Accept: application/json → ICCID, SM-DP+, Matching ID (QR code base64 de gelebilir)
    // Accept: application/zip → ZIP file containing QR code PNG
    const assignmentsUrl = `${apiUrl}/esims/assignments?reference=${encodeURIComponent(orderReference)}`;
    
    console.log("📥 Fetching QR code from /esims/assignments:");
    console.log("  - URL:", assignmentsUrl);
    console.log("  - Order Reference:", orderReference);
    
      // Önce JSON formatını dene (QR code base64 olarak gelebilir)
      // Hazır prompt'a göre: Accept: application/json → ICCID, SM-DP+, Matching ID
      // Ama belki QR code base64 de gelebilir, kontrol edelim
      console.log("📥 Trying JSON format first (may contain QR code base64)...");
      const jsonResponse = await fetchWithTimeout(assignmentsUrl + "&additionalFields=qrCode", {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
          "Accept": "application/json",
        },
        timeout: 30000, // 30 seconds timeout
        retries: 2, // Retry 2 times
        retryDelay: 2000, // 2 seconds delay
      });
    
    if (jsonResponse.ok) {
      const jsonData = await jsonResponse.json();
      console.log("✅ JSON response received:");
      console.log("  - Full response:", JSON.stringify(jsonData, null, 2));
      console.log("  - All keys:", Object.keys(jsonData));
      
      // eSIM LPA format için gerekli field'ları kontrol et
      const iccid = jsonData.iccid || jsonData.ICCID;
      const smdp = jsonData.smdp || jsonData.sm_dp || jsonData.SM_DP || jsonData.sm_dp_address || jsonData.smdpAddress;
      const matchingId = jsonData.matching_id || jsonData.matchingId || jsonData.MatchingID || jsonData.matchingId;
      const activationCode = jsonData.activation_code || jsonData.activationCode || jsonData.ActivationCode;
      
      console.log("🔍 eSIM LPA Format Fields:");
      console.log("  - ICCID:", iccid || "Not found");
      console.log("  - SM-DP+:", smdp || "Not found");
      console.log("  - Matching ID:", matchingId || "Not found");
      console.log("  - Activation Code:", activationCode || "Not found");
      
      // QR code field'larını kontrol et
      const qrCode = jsonData.qr_code || jsonData.qrCode || jsonData.qr_code_base64 || 
                     jsonData.qrCodeBase64 || jsonData.qr || jsonData.qrImage || 
                     jsonData.qr_image || jsonData.qrCodeImage || jsonData.qr_code_image;
      const qrCodeUrl = jsonData.qr_code_url || jsonData.qrCodeUrl || jsonData.qr_url || 
                       jsonData.qrUrl || jsonData.qr_image_url || jsonData.qrImageUrl;
      
      if (qrCode || qrCodeUrl) {
        console.log("✅ QR code found in JSON response!");
        console.log("  - QR Code:", qrCode ? "Base64 provided" : "Not provided");
        console.log("  - QR Code URL:", qrCodeUrl || "Not provided");
        
        return {
          success: true,
          orderId: orderReference,
          qrCode: qrCode,
          qrCodeUrl: qrCodeUrl,
        };
      } else {
        console.log("⚠️ QR code not found in JSON response, trying ZIP format...");
      }
    } else {
      console.log("⚠️ JSON format failed, status:", jsonResponse.status);
      console.log("  - Trying ZIP format...");
    }
    
    // JSON'da QR code yoksa ZIP formatını dene
    console.log("📥 Trying ZIP format...");
    const response = await fetchWithTimeout(assignmentsUrl, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        "Accept": "application/zip", // ZIP formatında QR code PNG almak için
      },
      timeout: 30000, // 30 seconds timeout
      retries: 2, // Retry 2 times
      retryDelay: 2000, // 2 seconds delay
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || "Unknown error" };
      }
      
      console.error("❌ eSimGo assignments error:");
      console.error("  - Status:", response.status);
      console.error("  - Error:", errorData);
      
      return {
        success: false,
        error: errorData.error || errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    // ZIP dosyası geldi, içinden QR code PNG'i çıkar
    const zipBuffer = await response.arrayBuffer();
    console.log("✅ ZIP file received, size:", zipBuffer.byteLength, "bytes");
    
    // DEBUG: ZIP file size kontrolü
    if (zipBuffer.byteLength < 1000) {
      console.warn("⚠️ ZIP file size is very small:", zipBuffer.byteLength, "bytes (expected 5-20 KB)");
    }
    
    // ZIP dosyasını parse et
    const JSZip = (await import('jszip')).default;
    const zip = await JSZip.loadAsync(zipBuffer);
    
    // ZIP içindeki dosyaları bul
    const fileNames = Object.keys(zip.files);
    console.log("📦 ZIP files:", fileNames);
    
    // QR code PNG dosyasını bul (genellikle .png uzantılı)
    const qrCodeFile = fileNames.find(name => 
      name.toLowerCase().endsWith('.png') || 
      name.toLowerCase().endsWith('.qr') ||
      name.toLowerCase().includes('qr') ||
      name.toLowerCase().includes('code')
    );
    
    if (qrCodeFile) {
      console.log("✅ QR code PNG file found in ZIP:", qrCodeFile);
      
      // PNG dosyasını al
      const qrCodeBlob = await zip.file(qrCodeFile)!.async('blob');
      const qrCodeArrayBuffer = await qrCodeBlob.arrayBuffer();
      
      console.log("✅ QR code PNG file extracted:");
      console.log("  - File name:", qrCodeFile);
      console.log("  - PNG file size (bytes):", qrCodeArrayBuffer.byteLength);
      console.log("  - PNG file size (KB):", (qrCodeArrayBuffer.byteLength / 1024).toFixed(2));
      
      const qrCodeBase64 = Buffer.from(qrCodeArrayBuffer).toString('base64');
      
      console.log("✅ QR code PNG base64 converted:");
      console.log("  - Base64 length (chars):", qrCodeBase64.length);
      console.log("  - Expected length (approx):", Math.ceil(qrCodeArrayBuffer.byteLength * 1.33), "chars");
      console.log("  - Base64 first 100 chars:", qrCodeBase64.substring(0, 100));
      console.log("  - Base64 last 50 chars:", qrCodeBase64.substring(Math.max(0, qrCodeBase64.length - 50)));
      
      // DEBUG: Base64 length kontrolü
      if (qrCodeBase64.length < 2000) {
        console.warn("⚠️ QR code base64 is very short:", qrCodeBase64.length, "chars (expected 2000-5000 chars)");
      }
      
      return {
        success: true,
        orderId: orderReference,
        qrCode: qrCodeBase64, // PNG base64
        qrCodeUrl: undefined,
      };
    } else {
      console.error("❌ QR code PNG not found in ZIP");
      console.error("  - Available files:", fileNames);
      
      // İlk dosyayı dene (bazen sadece bir dosya olur)
      if (fileNames.length > 0) {
        const firstFile = fileNames[0];
        console.log("⚠️ Trying first file as QR code:", firstFile);
        const qrCodeBlob = await zip.file(firstFile)!.async('blob');
        const qrCodeArrayBuffer = await qrCodeBlob.arrayBuffer();
        const qrCodeBase64 = Buffer.from(qrCodeArrayBuffer).toString('base64');
        
        return {
          success: true,
          orderId: orderReference,
          qrCode: qrCodeBase64,
          qrCodeUrl: undefined,
        };
      }
      
      return {
        success: false,
        error: "QR code PNG not found in ZIP file",
      };
    }
  } catch (error: unknown) {
    console.error("❌ eSimGo assignments error:", error);
    const err = error as Error;
    return {
      success: false,
      error: err.message || "Failed to get QR code from assignments",
    };
  }
}

/**
 * eSimGo'dan order status ve QR code'u çek
 * 
 * @param orderId - eSimGo order ID
 * @returns Order status ve QR code bilgileri
 */
export async function getOrderStatus(
  orderId: string
): Promise<ESimGoPurchaseResponse> {
  const apiKey = process.env.ESIMGO_API_KEY;
  const apiUrl = process.env.ESIMGO_API_URL;

  if (!apiKey || !apiUrl) {
    return {
      success: false,
      error: "eSimGo API bilgileri yapılandırılmamış",
    };
  }

  try {
    // eSimGo v3 order status endpoint
    // ESIMGO_API_URL zaten /v3 içeriyor (örn: https://api.esimgo.io/v3)
    // O yüzden sadece /orders/{order_id} ekliyoruz
    // Alternatif formatlar: /orders/{order_id}/status veya /orders/{order_id}/qr
    console.log("📥 Fetching order status from:", `${apiUrl}/orders/${orderId}`);
    const response = await fetchWithTimeout(`${apiUrl}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey, // eSimGo API uses X-API-Key header (not Bearer token)
        "Content-Type": "application/json",
      },
      timeout: 30000, // 30 seconds timeout
      retries: 2, // Retry 2 times
      retryDelay: 2000, // 2 seconds delay
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || "Unknown error" };
      }
      
      console.error("❌ eSimGo order status error:");
      console.error("  - Status:", response.status);
      console.error("  - Error:", errorData);
      
      return {
        success: false,
        error: errorData.error || errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    
    console.log("📥 eSimGo Order Status Response:");
    console.log("  - Full response:", JSON.stringify(data, null, 2));
    console.log("  - Order ID:", data.order_id || data.orderId || data.id);
    console.log("  - Status:", data.status || data.order_status || data.state);
    console.log("  - QR Code:", data.qr_code || data.qrCode || data.qr_code_base64 ? "Base64 provided" : "Not provided");
    console.log("  - QR Code URL:", data.qr_code_url || data.qrCodeUrl || data.qr_url || "Not provided");
    
    const qrCode = data.qr_code || data.qrCode || data.qr_code_base64 || data.qrCodeBase64;
    const qrCodeUrl = data.qr_code_url || data.qrCodeUrl || data.qr_url || data.qrUrl || data.qr_code_image_url;
    
    return {
      success: true,
      orderId: data.order_id || data.orderId || data.id,
      qrCode: qrCode,
      qrCodeUrl: qrCodeUrl,
    };
  } catch (error: unknown) {
    console.error("eSimGo order status error:", error);
    const err = error as Error;
    return {
      success: false,
      error: err.message || "Failed to get order status",
    };
  }
}

/**
 * Paket ID mapping - Website paketlerini eSimGo Bundle isimlerine çevirir
 * 
 * Format: esim_{DATA}_{DAYS}_{COUNTRY}_V2
 * - USA: US
 * - UK: GB
 * - Germany: DE
 * - France: FR
 * - Global: GL (veya başka bir format)
 */
export function mapPackageToEsimGo(packageName: string): string {
  // eSimGo Bundle isimleri
  const bundleMap: Record<string, string> = {
    // North America (RNA)
    "North America – 1GB": "esim_1GB_7D_RNA_V2",
    "North America – 2GB": "esim_2GB_15D_RNA_V2",
    "North America – 3GB": "esim_3GB_30D_RNA_V2",
    "North America – 5GB": "esim_5GB_30D_RNA_V2",
    "North America – 10GB": "esim_10GB_30D_RNA_V2",
    // Europa+ (REUP)
    "Europa+ – 1GB": "esim_1GB_7D_REUP_V2",
    "Europa+ – 2GB": "esim_2GB_15D_REUP_V2",
    "Europa+ – 3GB": "esim_3GB_30D_REUP_V2",
    "Europa+ – 5GB": "esim_5GB_30D_REUP_V2",
    "Europa+ – 10GB": "esim_10GB_30D_REUP_V2",
    "Europa+ – 50GB": "esim_50GB_30D_REUP_V2",
    // Global (RGB)
    "Global – 1GB": "esim_1GB_7D_RGB_V2",
    "Global – 2GB": "esim_2GB_15D_RGB_V2",
    "Global – 3GB": "esim_3GB_30D_RGB_V2",
    "Global – 5GB": "esim_5GB_30D_RGB_V2",
    "Global – 10GB": "esim_10GB_30D_RGB_V2",
    "Global – 20GB": "esim_20GB_30D_RGB_V2",
    // Asia (RAS)
    "Asia – 1GB": "esim_1GB_7D_RAS_V2",
    "Asia – 2GB": "esim_2GB_15D_RAS_V2",
    "Asia – 3GB": "esim_3GB_30D_RAS_V2",
    "Asia – 5GB": "esim_5GB_30D_RAS_V2",
    "Asia – 10GB": "esim_10GB_30D_RAS_V2",
    "Asia – 50GB": "esim_50GB_30D_RAS_V2",
    // Individual Countries
    "USA – 1GB": "esim_1GB_7D_US_V2",
    "USA – 3GB": "esim_3GB_30D_US_V2",
    "UK – 1GB": "esim_1GB_7D_GB_V2",
    "UK – 3GB": "esim_3GB_30D_GB_V2",
    "Germany – 1GB": "esim_1GB_7D_DE_V2",
    "Germany – 3GB": "esim_3GB_30D_DE_V2",
    // Legacy support
    "USA eSIM – 1GB": "esim_1GB_7D_US_V2",
    "USA eSIM – 3GB": "esim_3GB_30D_US_V2",
    "UK eSIM – 1GB": "esim_1GB_7D_GB_V2",
    "UK eSIM – 3GB": "esim_3GB_30D_GB_V2",
    "Germany eSIM – 1GB": "esim_1GB_7D_DE_V2",
    "Germany eSIM – 3GB": "esim_3GB_30D_DE_V2",
    "Global eSIM – 1GB": "esim_1GB_7D_GL_V2",
    "Global eSIM – 3GB": "esim_3GB_30D_GL_V2",
    // Unlimited Lite Packages - North America
    "North America – Unlimited Lite 1 Day": "esim_ULP_1D_RNA_V2",
    "North America – Unlimited Lite 3 Days": "esim_ULP_3D_RNA_V2",
    "North America – Unlimited Lite 5 Days": "esim_ULP_5D_RNA_V2",
    "North America – Unlimited Lite 7 Days": "esim_ULP_7D_RNA_V2",
    "North America – Unlimited Lite 10 Days": "esim_ULP_10D_RNA_V2",
    "North America – Unlimited Lite 15 Days": "esim_ULP_15D_RNA_V2",
    "North America – Unlimited Lite 30 Days": "esim_ULP_30D_RNA_V2",
    // Unlimited Lite Packages - Europa+
    "Europa+ – Unlimited Lite 1 Day": "esim_UL_1D_REUL_V2",
    "Europa+ – Unlimited Lite 3 Days": "esim_UL_3D_REUL_V2",
    "Europa+ – Unlimited Lite 5 Days": "esim_UL_5D_REUL_V2",
    "Europa+ – Unlimited Lite 7 Days": "esim_UL_7D_REUL_V2",
    "Europa+ – Unlimited Lite 10 Days": "esim_UL_10D_REUL_V2",
    "Europa+ – Unlimited Lite 15 Days": "esim_UL_15D_REUL_V2",
    "Europa+ – Unlimited Lite 30 Days": "esim_UL_30D_REUL_V2",
    // Unlimited Lite Packages - Asia
    "Asia – Unlimited Lite 1 Day": "esim_UL_1D_RAS_V2",
    "Asia – Unlimited Lite 3 Days": "esim_UL_3D_RAS_V2",
    "Asia – Unlimited Lite 5 Days": "esim_UL_5D_RAS_V2",
    "Asia – Unlimited Lite 7 Days": "esim_UL_7D_RAS_V2",
    "Asia – Unlimited Lite 10 Days": "esim_UL_10D_RAS_V2",
    "Asia – Unlimited Lite 15 Days": "esim_UL_15D_RAS_V2",
    "Asia – Unlimited Lite 30 Days": "esim_UL_30D_RAS_V2",
    // Unlimited Lite Packages - Global
    "Global – Unlimited Lite 1 Day": "esim_ULP_1D_RGB_V2",
    "Global – Unlimited Lite 3 Days": "esim_ULP_3D_RGB_V2",
    "Global – Unlimited Lite 5 Days": "esim_ULP_5D_RGB_V2",
    "Global – Unlimited Lite 7 Days": "esim_ULP_7D_RGB_V2",
    "Global – Unlimited Lite 10 Days": "esim_ULP_10D_RGB_V2",
    // Unlimited Lite Packages - USA
    "USA – Unlimited Lite 1 Day": "esim_UL_1D_US_V2",
    "USA – Unlimited Lite 3 Days": "esim_UL_3D_US_V2",
    "USA – Unlimited Lite 5 Days": "esim_UL_5D_US_V2",
    "USA – Unlimited Lite 7 Days": "esim_UL_7D_US_V2",
    "USA – Unlimited Lite 10 Days": "esim_UL_10D_US_V2",
    "USA – Unlimited Lite 15 Days": "esim_UL_15D_US_V2",
    "USA – Unlimited Lite 30 Days": "esim_UL_30D_US_V2",
    // Unlimited Lite Packages - UK
    "UK – Unlimited Lite 1 Day": "esim_UL_1D_GB_V2",
    "UK – Unlimited Lite 3 Days": "esim_UL_3D_GB_V2",
    "UK – Unlimited Lite 5 Days": "esim_UL_5D_GB_V2",
    "UK – Unlimited Lite 7 Days": "esim_UL_7D_GB_V2",
    "UK – Unlimited Lite 10 Days": "esim_UL_10D_GB_V2",
    "UK – Unlimited Lite 15 Days": "esim_UL_15D_GB_V2",
    "UK – Unlimited Lite 30 Days": "esim_UL_30D_GB_V2",
    // Unlimited Lite Packages - Germany
    "Germany – Unlimited Lite 1 Day": "esim_UL_1D_DE_V2",
    "Germany – Unlimited Lite 3 Days": "esim_UL_3D_DE_V2",
    "Germany – Unlimited Lite 5 Days": "esim_UL_5D_DE_V2",
    "Germany – Unlimited Lite 7 Days": "esim_UL_7D_DE_V2",
    "Germany – Unlimited Lite 10 Days": "esim_UL_10D_DE_V2",
    "Germany – Unlimited Lite 15 Days": "esim_UL_15D_DE_V2",
    "Germany – Unlimited Lite 30 Days": "esim_UL_30D_DE_V2",
    // Unlimited Plus Packages - Imported from unlimited-plus-mapping.json
    ...unlimitedPlusMapping as Record<string, string>,
  };

  const bundleName = bundleMap[packageName];
  
  if (!bundleName) {
    console.error(`❌ Bundle name not found for package: "${packageName}"`);
    console.error(`   Available packages:`, Object.keys(bundleMap));
    // Fallback: package name'den tahmin et (AMA BU YANLIŞ OLABİLİR!)
    const fallback = packageName.toLowerCase().replace(/\s+/g, "-").replace("–", "").replace("esim", "").trim();
    console.error(`   Using fallback: "${fallback}" (THIS MAY BE WRONG!)`);
    return fallback;
  }
  
  console.log(`📦 Package: ${packageName} → Bundle: ${bundleName}`);
  return bundleName;
}

