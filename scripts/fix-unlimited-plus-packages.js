const fs = require('fs');
const path = require('path');

// JSON dosyasını oku
const jsonPath = path.join(__dirname, '../public/unlimited_plus_retail_prices_by_country.json');
const pricesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

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

// Unlimited Plus paketi oluştur
function createUnlimitedPlusPackage(countryName, bundleId, price) {
  const days = getDaysFromBundleId(bundleId);
  const validity = getValidityFromBundleId(bundleId);
  
  // Popular ve badge belirleme
  let popular = false;
  let badge = null;
  if (days === '7') {
    popular = true;
    badge = '"🔥 Most Popular"';
  } else if (days === '30') {
    badge = '"💎 Premium"';
  }
  
  // Short description belirleme
  const descriptions = {
    '1': 'Perfect for short trips',
    '3': 'Great for weekend trips',
    '5': 'Ideal for week-long stays',
    '7': 'Best value for extended travel',
    '10': 'Extended travel coverage',
    '15': 'Perfect for longer stays',
    '30': 'Maximum coverage for long stays'
  };
  
  const shortDescription = descriptions[days] || 'Perfect for your travel needs';
  
  return `        {
          name: "${countryName} – Unlimited Plus ${days} ${days === '1' ? 'Day' : 'Days'}",
          bundleId: "${bundleId}",
          data: "Unlimited Plus",
          validity: "${validity}",
          countries: "${countryName}",
          price: ${price},
          currency: "$",
          popular: ${popular},
          badge: ${badge},
          shortDescription: "${shortDescription}",
        }`;
}

// Her ülke için paketleri oluştur
const output = {};
for (const [countryName, bundles] of Object.entries(pricesData)) {
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
  
  output[countryName] = packages.map(pkg => 
    createUnlimitedPlusPackage(countryName, pkg.bundleId, pkg.price)
  ).join(',\n');
}

// Çıktıyı dosyaya yaz
const outputPath = path.join(__dirname, '../unlimited-plus-packages-fixed.txt');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

console.log('✅ Unlimited Plus packages generated!');
console.log(`📁 Output saved to: ${outputPath}`);
console.log(`📊 Total countries: ${Object.keys(output).length}`);

// Ayrıca bir mapping dosyası oluştur (esimgo.ts için)
const mappingOutput = {};
for (const [countryName, bundles] of Object.entries(pricesData)) {
  for (const [bundleId, price] of Object.entries(bundles)) {
    const days = getDaysFromBundleId(bundleId);
    const packageName = `${countryName} – Unlimited Plus ${days} ${days === '1' ? 'Day' : 'Days'}`;
    mappingOutput[packageName] = bundleId;
  }
}

const mappingPath = path.join(__dirname, '../unlimited-plus-mapping.json');
fs.writeFileSync(mappingPath, JSON.stringify(mappingOutput, null, 2), 'utf8');
console.log(`📁 Mapping saved to: ${mappingPath}`);

