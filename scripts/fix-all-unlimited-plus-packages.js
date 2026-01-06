const fs = require('fs');
const path = require('path');

// JSON dosyasını oku
const jsonPath = path.join(__dirname, '../public/unlimited_plus_retail_prices_by_country.json');
const pricesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// app/esim/page.tsx dosyasını oku
const pagePath = path.join(__dirname, '../app/esim/page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Bundle ID'den gün sayısını çıkar
function getDaysFromBundleId(bundleId) {
  const match = bundleId.match(/_(\d+)D_/);
  return match ? match[1] : null;
}

// Bundle ID'den validity string'i oluştur
function getValidityFromBundleId(bundleId) {
  const days = getDaysFromBundleId(bundleId);
  if (!days) return '';
  return days === '1' ? '1 day' : `${days} days`;
}

// Short description oluştur
function getShortDescription(days) {
  const descMap = {
    '1': 'Perfect for short trips',
    '3': 'Great for weekend trips',
    '5': 'Ideal for week-long stays',
    '7': 'Best value for extended travel',
    '10': 'Extended travel coverage',
    '15': 'Perfect for longer stays',
    '30': 'Maximum coverage for long stays'
  };
  return descMap[days] || 'Premium data package';
}

// Unlimited Plus paketi oluştur
function createUnlimitedPlusPackage(countryName, bundleId, price) {
  const days = getDaysFromBundleId(bundleId);
  const validity = getValidityFromBundleId(bundleId);
  const dayText = days === '1' ? 'Day' : 'Days';
  
  return `        {
          name: "${countryName} – Unlimited Plus ${days} ${dayText}",
          bundleId: "${bundleId}",
          data: "Unlimited Plus",
          validity: "${validity}",
          countries: "${countryName}",
          price: ${price},
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "${getShortDescription(days)}",
        }`;
}

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

// Her ülke için paketleri oluştur ve dosyaya ekle
let updatedCount = 0;
for (const [countryName, bundles] of Object.entries(pricesData)) {
  // Ülke adını normalize et
  const normalizedCountryName = countryNameMapping[countryName] || countryName;
  
  // Paketleri oluştur
  const packages = [];
  for (const [bundleId, price] of Object.entries(bundles)) {
    packages.push({
      bundleId,
      price,
      days: parseInt(getDaysFromBundleId(bundleId))
    });
  }
  
  // Gün sayısına göre sırala
  packages.sort((a, b) => a.days - b.days);
  
  // Paket string'lerini oluştur
  const packagesString = packages.map(pkg => 
    createUnlimitedPlusPackage(normalizedCountryName, pkg.bundleId, pkg.price)
  ).join(',\n');
  
  // Her ülke için unlimitedPlusPackages'ı bul ve değiştir
  // Önce ülkenin name field'ını bul
  const countryRegex = new RegExp(
    `(name: "${normalizedCountryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[\\s\\S]*?unlimitedPlusPackages: )\\[[\\s\\S]*?\\](?=\\s*[,}])`,
    'm'
  );
  
  let match = pageContent.match(countryRegex);
  if (match) {
    const replacement = match[1] + `[\n${packagesString}\n      ]`;
    pageContent = pageContent.replace(countryRegex, replacement);
    updatedCount++;
    console.log(`✅ Fixed: ${normalizedCountryName}`);
  } else {
    // Eğer bulunamazsa, ülkenin var olup olmadığını kontrol et
    const countryExistsRegex = new RegExp(
      `name: "${normalizedCountryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
      'm'
    );
    if (countryExistsRegex.test(pageContent)) {
      console.log(`⚠️  Could not find unlimitedPlusPackages for: ${normalizedCountryName}`);
    } else {
      console.log(`⚠️  Country not found: ${normalizedCountryName}`);
    }
  }
}

// Dosyayı kaydet
fs.writeFileSync(pagePath, pageContent, 'utf8');

console.log(`\n✅ Done! Fixed ${updatedCount} countries.`);

