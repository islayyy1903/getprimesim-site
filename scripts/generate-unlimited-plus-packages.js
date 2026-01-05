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
  
  return `        {
          name: "${countryName} – Unlimited Plus ${days} ${days === '1' ? 'Day' : 'Days'}",
          bundleId: "${bundleId}",
          data: "Unlimited Plus",
          validity: "${validity}",
          countries: "${countryName}",
          price: ${price},
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "${days === '1' ? 'Perfect for short trips' : days === '3' ? 'Great for weekend trips' : days === '5' ? 'Ideal for week-long stays' : days === '7' ? 'Best value for extended travel' : days === '10' ? 'Extended travel coverage' : days === '15' ? 'Perfect for longer stays' : 'Maximum coverage for long stays'}",
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
const outputPath = path.join(__dirname, '../unlimited-plus-packages-output.txt');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

console.log('✅ Unlimited Plus packages generated!');
console.log(`📁 Output saved to: ${outputPath}`);
console.log(`📊 Total countries: ${Object.keys(output).length}`);


