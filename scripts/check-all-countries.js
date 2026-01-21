const fs = require('fs');
const path = require('path');

// JSON dosyasını oku
const jsonPath = path.join(__dirname, '../public/unlimited_plus_retail_prices_by_country.json');
const pricesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// app/esim/page.tsx dosyasını oku
const pagePath = path.join(__dirname, '../app/esim/page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf8');

// Ülke adlarını eşleştir (JSON'daki isimler -> Kod'daki isimler)
const countryNameMapping = {
  'Europa+': 'Europa+',
  'Europe Lite': 'Europe Lite',
  'Congo-the Democratic Republic of the': 'DR Congo',
  'Korea-Republic of': 'South Korea',
  'Russian Federation': 'Russian Federation',
  'Taiwan-Province of China': 'Taiwan-Province of China',
  'United Kingdom': 'UK',
  'United States of America': 'USA',
  'Northern Cyprus': 'Northern Cyprus',
  'Oceania': 'Oceania',
};

// Bundle ID'den ülke kodunu çıkar
function getCountryCodeFromBundleId(bundleId) {
  // Format: esim_ULP_1D_XX_V2
  const match = bundleId.match(/_ULP_\d+D_([A-Z]+)_V2/);
  return match ? match[1] : null;
}

// Bundle ID'den ülke adını tahmin et (ISO kodundan)
function getCountryNameFromBundleId(bundleId) {
  const code = getCountryCodeFromBundleId(bundleId);
  if (!code) return null;
  
  // Bazı özel kodlar
  const codeToName = {
    'HR': 'Croatia',
    'TR': 'Turkey',
    'US': 'USA',
    'GB': 'UK',
    'AX': 'Aaland Islands',
    'RAF': 'Africa',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'RLA': 'Americas',
    'AD': 'Andorra',
    'AI': 'Anguilla',
    'AG': 'Antigua And Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'RAS': 'Asia',
    // Daha fazla eşleştirme gerekebilir
  };
  
  return codeToName[code] || null;
}

// Her ülke için kontrol yap
const issues = [];
const correct = [];
const notFound = [];

for (const [countryName, bundles] of Object.entries(pricesData)) {
  // Ülke adını normalize et
  const normalizedCountryName = countryNameMapping[countryName] || countryName;
  
  // JSON'dan ilk bundle ID'yi al (referans için)
  const firstBundleId = Object.keys(bundles)[0];
  const expectedCountryCode = getCountryCodeFromBundleId(firstBundleId);
  
  // Sayfada ülkeyi bul
  const countryRegex = new RegExp(
    `name: "${normalizedCountryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[\\s\\S]*?unlimitedPlusPackages: (\\[[\\s\\S]*?\\])(?=\\s*[,}])`,
    'm'
  );
  
  const match = pageContent.match(countryRegex);
  
  if (!match) {
    // Ülke sayfada var mı kontrol et
    const countryExistsRegex = new RegExp(
      `name: "${normalizedCountryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
      'm'
    );
    if (countryExistsRegex.test(pageContent)) {
      notFound.push({
        country: normalizedCountryName,
        reason: 'unlimitedPlusPackages not found'
      });
    } else {
      notFound.push({
        country: normalizedCountryName,
        reason: 'country not found in page'
      });
    }
    continue;
  }
  
  // unlimitedPlusPackages içeriğini al
  const packagesContent = match[1];
  
  // İlk paketin bundleId'sini bul
  const firstPackageMatch = packagesContent.match(/bundleId: "([^"]+)"/);
  
  if (!firstPackageMatch) {
    issues.push({
      country: normalizedCountryName,
      reason: 'no packages found in unlimitedPlusPackages',
      expected: expectedCountryCode
    });
    continue;
  }
  
  const actualBundleId = firstPackageMatch[1];
  const actualCountryCode = getCountryCodeFromBundleId(actualBundleId);
  const actualCountryName = getCountryNameFromBundleId(actualBundleId);
  
  // Tüm paketlerin doğru ülkeye ait olup olmadığını kontrol et
  const allBundleIds = packagesContent.match(/bundleId: "([^"]+)"/g) || [];
  let allCorrect = true;
  const wrongPackages = [];
  
  for (const bundleIdMatch of allBundleIds) {
    const bundleId = bundleIdMatch.match(/bundleId: "([^"]+)"/)[1];
    const bundleCountryCode = getCountryCodeFromBundleId(bundleId);
    const bundleCountryName = getCountryNameFromBundleId(bundleId);
    
    if (bundleCountryCode !== expectedCountryCode) {
      allCorrect = false;
      wrongPackages.push({
        bundleId,
        expected: expectedCountryCode,
        actual: bundleCountryCode,
        countryName: bundleCountryName
      });
    }
  }
  
  if (allCorrect && actualCountryCode === expectedCountryCode) {
    correct.push(normalizedCountryName);
  } else {
    issues.push({
      country: normalizedCountryName,
      expected: expectedCountryCode,
      actual: actualCountryCode,
      actualCountryName: actualCountryName,
      wrongPackages: wrongPackages.length > 0 ? wrongPackages : undefined
    });
  }
}

// Sonuçları yazdır
console.log('\n=== COUNTRY PACKAGE VERIFICATION REPORT ===\n');
console.log(`✅ Correct countries: ${correct.length}`);
console.log(`❌ Issues found: ${issues.length}`);
console.log(`⚠️  Not found: ${notFound.length}`);
console.log(`\nTotal countries in JSON: ${Object.keys(pricesData).length}\n`);

if (issues.length > 0) {
  console.log('\n❌ COUNTRIES WITH WRONG PACKAGES:\n');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.country}`);
    console.log(`   Expected: ${issue.expected}`);
    console.log(`   Actual: ${issue.actual} (${issue.actualCountryName || 'unknown'})`);
    if (issue.wrongPackages && issue.wrongPackages.length > 0) {
      console.log(`   Wrong packages:`);
      issue.wrongPackages.forEach(pkg => {
        console.log(`     - ${pkg.bundleId} (expected ${pkg.expected}, got ${pkg.actual} - ${pkg.countryName})`);
      });
    }
    console.log('');
  });
}

if (notFound.length > 0) {
  console.log('\n⚠️  COUNTRIES NOT FOUND OR MISSING PACKAGES:\n');
  notFound.forEach((item, index) => {
    console.log(`${index + 1}. ${item.country} - ${item.reason}`);
  });
  console.log('');
}

if (correct.length > 0 && issues.length === 0 && notFound.length === 0) {
  console.log('\n✅ All countries have correct packages!\n');
} else {
  console.log(`\n📊 Summary:`);
  console.log(`   - Correct: ${correct.length}`);
  console.log(`   - Issues: ${issues.length}`);
  console.log(`   - Not found: ${notFound.length}`);
}





