const fs = require('fs');
const path = require('path');

// JSON dosyasını oku
const jsonPath = path.join(__dirname, '../data/unlimited_lite_retail_prices_by_country.json');
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

// Badge belirleme (7 gün için popular)
function getBadge(days) {
  if (days === '7') {
    return '"🔥 Most Popular"';
  } else if (days === '30') {
    return '"💎 Premium"';
  }
  return 'null';
}

// Popular belirleme
function isPopular(days) {
  return days === '7';
}

// Unlimited Lite paketi oluştur
function createUnlimitedLitePackage(countryName, bundleId, price) {
  const days = getDaysFromBundleId(bundleId);
  const validity = getValidityFromBundleId(bundleId);
  const dayText = days === '1' ? 'Day' : 'Days';
  const badge = getBadge(days);
  const popular = isPopular(days);
  
  return `        {
          name: "${countryName} – Unlimited Lite ${days} ${dayText}",
          bundleId: "${bundleId}",
          data: "Unlimited Lite",
          validity: "${validity}",
          countries: "${countryName}",
          price: ${price},
          currency: "$",
          popular: ${popular},
          badge: ${badge},
          shortDescription: "${getShortDescription(days)}",
        }`;
}

// Ülke adlarını eşleştir (JSON'daki isimler -> Kod'daki isimler)
const countryNameMapping = {
  'Europa+': 'Europa+',
  'Europe Lite': 'Europa+',
  'Congo-the Democratic Republic of the': 'DR Congo',
  'Korea-Republic of': 'South Korea',
  'Russian Federation': 'Russia',
  'Taiwan-Province of China': 'Taiwan',
  'United Kingdom': 'UK',
  'United States of America': 'USA',
  'Middle East & Africa': 'Middle East & Africa',
  'Middle East and North Africa': 'Middle East and North Africa',
  'Bonaire, saint Eustatius and Saba': 'Bonaire, saint Eustatius and Saba',
  'Tanzania, United Republic of': 'Tanzania, United Republic of',
  'Virgin Islands - British': 'Virgin Islands - British',
  'Virgin Islands - United States': 'Virgin Islands - United States',
  'VietNam': 'VietNam',
  // Diğer eşleştirmeler JSON ve kod arasında tam eşleşirse boş bırakılabilir
};

// Her ülke için paketleri oluştur ve dosyaya ekle
let updatedCount = 0;
let notFoundCount = 0;
let alreadyHasPackagesCount = 0;

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
    createUnlimitedLitePackage(normalizedCountryName, pkg.bundleId, pkg.price)
  ).join(',\n');
  
  // Regex ile ülkeyi bul (name: "Country Name" satırını bul)
  // Sonra unlimitedLitePackages: [] veya unlimitedLitePackages: [\n...] kısmını bul
  // Önce boş array'i kontrol et
  const escapedCountryName = normalizedCountryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const emptyArrayRegex = new RegExp(
    `(name: "${escapedCountryName}",[\\s\\S]*?unlimitedLitePackages: )\\[\\s*\\]`,
    'm'
  );
  
  // Eğer boş array bulunursa, onu doldur
  let match = pageContent.match(emptyArrayRegex);
  if (match) {
    const replacement = match[1] + `[\n${packagesString}\n      ]`;
    pageContent = pageContent.replace(emptyArrayRegex, replacement);
    updatedCount++;
    console.log(`✅ Updated: ${normalizedCountryName} (${packages.length} packages)`);
  } else {
    // Eğer boş array bulunamazsa, ülkenin var olup olmadığını kontrol et
    const countryExistsRegex = new RegExp(
      `name: "${escapedCountryName}"`,
      'm'
    );
    if (countryExistsRegex.test(pageContent)) {
      // Ülke var ama zaten paketleri var veya farklı bir format
      alreadyHasPackagesCount++;
      console.log(`⚠️  Already has packages or not empty: ${normalizedCountryName}`);
    } else {
      notFoundCount++;
      console.log(`❌ Not found: ${normalizedCountryName}`);
    }
  }
}

// Dosyayı kaydet
fs.writeFileSync(pagePath, pageContent, 'utf8');

console.log(`\n✅ Done!`);
console.log(`   - Updated: ${updatedCount} countries`);
console.log(`   - Already has packages: ${alreadyHasPackagesCount} countries`);
console.log(`   - Not found: ${notFoundCount} countries`);

