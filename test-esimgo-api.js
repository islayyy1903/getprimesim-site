/**
 * eSimGo API Endpoint URL Test
 * 
 * Bu kodu çalıştırarak eSimGo API endpoint URL'ini test edebilirsiniz.
 * Farklı URL formatlarını deneyin.
 */

// Test edilecek API URL'leri
const apiUrls = [
  'https://api.esimgo.com/v3',
  'https://api.esimgo.io/v3',
  'https://esimgo.com/api/v3',
  'https://api.esimgo.com/api/v3',
  'https://api.esimgo.io/api/v3',
];

// API Key (Vercel'deki key)
const apiKey = 'lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT';

// Test paket ID
const testPackageId = 'usa-1gb-7days';
const testEmail = 'test@example.com';
const callbackUrl = 'https://getprimesim.com/api/esimgo/webhook';

/**
 * API URL'ini test et
 */
async function testApiUrl(apiUrl) {
  console.log(`\n🔍 Testing: ${apiUrl}`);
  
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-API-Version': 'v3',
      },
      body: JSON.stringify({
        package_id: testPackageId,
        email: testEmail,
        quantity: 1,
        callback_url: callbackUrl,
        version: 'v3',
      }),
    });

    console.log(`  Status: ${response.status}`);
    console.log(`  Status Text: ${response.statusText}`);
    
    const responseText = await response.text();
    console.log(`  Response: ${responseText.substring(0, 200)}...`);
    
    if (response.ok) {
      console.log(`  ✅ SUCCESS! Bu URL çalışıyor: ${apiUrl}`);
      return { success: true, url: apiUrl, response: responseText };
    } else {
      console.log(`  ❌ Failed: ${response.status}`);
      return { success: false, url: apiUrl, status: response.status };
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    if (error.message.includes('ENOTFOUND')) {
      console.log(`  ⚠️  DNS hatası: Domain bulunamadı`);
    }
    return { success: false, url: apiUrl, error: error.message };
  }
}

/**
 * Tüm URL'leri test et
 */
async function testAllUrls() {
  console.log('🚀 eSimGo API Endpoint URL Test Başlıyor...\n');
  console.log('Test edilecek URL\'ler:');
  apiUrls.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
  
  const results = [];
  
  for (const apiUrl of apiUrls) {
    const result = await testApiUrl(apiUrl);
    results.push(result);
    
    // Başarılı olursa dur
    if (result.success) {
      console.log(`\n✅ ÇALIŞAN URL BULUNDU: ${result.url}`);
      console.log(`\n📋 Vercel'e ekleyin:`);
      console.log(`   Name: ESIMGO_API_URL`);
      console.log(`   Value: ${result.url}`);
      break;
    }
    
    // 1 saniye bekle (rate limit için)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Test Sonuçları:');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    console.log(`  ${status} ${apiUrls[index]}`);
  });
}

// Node.js'de çalıştır
if (typeof require !== 'undefined' && require.main === module) {
  testAllUrls().catch(console.error);
}

// Browser'da çalıştır
if (typeof window !== 'undefined') {
  window.testEsimGoApi = testAllUrls;
}

module.exports = { testApiUrl, testAllUrls };











