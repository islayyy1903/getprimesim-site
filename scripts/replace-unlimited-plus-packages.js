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

// Ülke isimlerini normalize et (JSON'daki isimlerle eşleştirmek için)
function normalizeCountryName(name) {
  // Bazı özel durumlar
  const specialCases = {
    'North America': 'North America',
    'Europa+': 'Europa+',
    'Asia': 'Asia',
    'Global': 'Global',
    'USA': 'USA',
    'UK': 'UK',
    'Germany': 'Germany',
    'Africa': 'Africa',
    'Americas': 'Americas',
  };
  
  if (specialCases[name]) {
    return specialCases[name];
  }
  
  return name;
}

// Her ülke için unlimited plus paketlerini oluştur
const countryPackages = {};
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
  
  countryPackages[countryName] = packages.map(pkg => 
    createUnlimitedPlusPackage(countryName, pkg.bundleId, pkg.price)
  ).join(',\n');
}

// Regex ile unlimitedPlusPackages array'lerini bul ve değiştir
// Pattern: unlimitedPlusPackages: [ ... ], (tüm içeriği yakala)
const unlimitedPlusPattern = /(\s+unlimitedPlusPackages:\s*\[)([\s\S]*?)(\s+\],)/g;

let match;
let replacements = [];

// Tüm eşleşmeleri bul
while ((match = unlimitedPlusPattern.exec(pageContent)) !== null) {
  const fullMatch = match[0];
  const startTag = match[1];
  const content = match[2];
  const endTag = match[3];
  
  // Ülke ismini bulmaya çalış (önceki satırlara bak - category objesinin name field'ına bak)
  const beforeMatch = pageContent.substring(Math.max(0, match.index - 1000), match.index);
  // Category objesinin name field'ını bul
  const categoryNameMatch = beforeMatch.match(/name:\s*"([^"]+)",\s*\n\s*icon:/);
  const countryName = categoryNameMatch ? categoryNameMatch[1] : null;
  
  if (countryName) {
    const normalizedName = normalizeCountryName(countryName);
    
    // Eğer bu ülke için paketler varsa, değiştir
    if (countryPackages[normalizedName]) {
      const newContent = startTag + '\n' + countryPackages[normalizedName] + '\n' + endTag;
      replacements.push({
        old: fullMatch,
        new: newContent,
        country: normalizedName
      });
    } else {
      console.log(`⚠️  No packages found for: ${normalizedName} (original: ${countryName})`);
    }
  } else {
    // Alternatif: unlimited plus paketinin ilk satırındaki ülke ismini bul
    const firstPackageMatch = content.match(/name:\s*"([^"]+)\s*–\s*Unlimited Plus/);
    if (firstPackageMatch) {
      const packageCountryName = firstPackageMatch[1].trim(); // Trim boşlukları
      const normalizedName = normalizeCountryName(packageCountryName);
      
      // JSON'daki ülke isimlerini kontrol et
      if (countryPackages[normalizedName]) {
        const newContent = startTag + '\n' + countryPackages[normalizedName] + '\n' + endTag;
        replacements.push({
          old: fullMatch,
          new: newContent,
          country: normalizedName
        });
      } else {
        // Debug: JSON'daki tüm ülke isimlerini listele
        const jsonCountries = Object.keys(countryPackages);
        const foundMatch = jsonCountries.find(c => c.toLowerCase() === normalizedName.toLowerCase());
        if (foundMatch) {
          const newContent = startTag + '\n' + countryPackages[foundMatch] + '\n' + endTag;
          replacements.push({
            old: fullMatch,
            new: newContent,
            country: foundMatch
          });
        } else {
          console.log(`⚠️  No packages found for: "${normalizedName}" (from package name: "${packageCountryName}")`);
          // İlk 5 JSON ülkesini göster
          console.log(`   Available countries (first 5): ${jsonCountries.slice(0, 5).join(', ')}`);
        }
      }
    }
  }
}

// Değişiklikleri uygula
let newPageContent = pageContent;
let replacementCount = 0;

for (const replacement of replacements) {
  if (newPageContent.includes(replacement.old)) {
    newPageContent = newPageContent.replace(replacement.old, replacement.new);
    replacementCount++;
    console.log(`✅ Replaced packages for: ${replacement.country}`);
  }
}

// Dosyayı yaz
if (replacementCount > 0) {
  fs.writeFileSync(pagePath, newPageContent, 'utf8');
  console.log(`\n✅ Successfully replaced ${replacementCount} unlimited plus package arrays!`);
} else {
  console.log('\n⚠️  No replacements made. Check the country name matching.');
}

