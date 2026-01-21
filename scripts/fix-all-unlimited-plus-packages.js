const fs = require('fs');
const path = require('path');

// unlimited-plus-mapping.json dosyasını oku
const mappingPath = path.join(__dirname, '../unlimited-plus-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// app/esim/page.tsx dosyasını oku
const pagePath = path.join(__dirname, '../app/esim/page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

console.log('🔍 Analyzing Unlimited Plus packages...\n');

// Mapping'den ülke isimlerini çıkar ve grupla
const countryPackages = {};
Object.keys(mapping).forEach(packageName => {
  const match = packageName.match(/^(.+?)\s*–\s*Unlimited Plus\s+(\d+)\s+Day/i);
  if (match) {
    const countryName = match[1].trim();
    const days = parseInt(match[2]);
    const bundleId = mapping[packageName];
    
    if (!countryPackages[countryName]) {
      countryPackages[countryName] = [];
    }
    
    countryPackages[countryName].push({
      days,
      bundleId,
      packageName
    });
  }
});

// Gün sayısına göre sırala
Object.keys(countryPackages).forEach(country => {
  countryPackages[country].sort((a, b) => a.days - b.days);
});

console.log(`✅ Found ${Object.keys(countryPackages).length} countries with Unlimited Plus packages\n`);

// Her ülke için paket array'i oluştur
function createPackageArray(countryName, packages) {
  const packageObjects = packages.map((pkg, index) => {
    const days = pkg.days;
    const validity = days === 1 ? '1 day' : `${days} days`;
    const dayText = days === 1 ? 'Day' : 'Days';
    
    // Popular ve badge belirleme
    let popular = false;
    let badge = null;
    if (days === 7) {
      popular = true;
      badge = '"🔥 Most Popular"';
    } else if (days === 30) {
      badge = '"💎 Premium"';
    }
    
    // Short description belirleme
    const descriptions = {
      1: 'Perfect for short trips',
      3: 'Great for weekend trips',
      5: 'Ideal for week-long stays',
      7: 'Best value for extended travel',
      10: 'Extended travel coverage',
      15: 'Perfect for longer stays',
      30: 'Maximum coverage for long stays'
    };
    
    const shortDescription = descriptions[days] || 'Perfect for your travel needs';
    
    // Fiyat tahmini (gün sayısına göre)
    const basePrice = days === 1 ? 4.99 : days === 3 ? 9.99 : days === 5 ? 14.99 : 
                     days === 7 ? 19.99 : days === 10 ? 24.99 : days === 15 ? 34.99 : 59.99;
    
    return `        {
          name: "${countryName} – Unlimited Plus ${days} ${dayText}",
          bundleId: "${pkg.bundleId}",
          data: "Unlimited Plus",
          validity: "${validity}",
          countries: "${countryName}",
          price: ${basePrice},
          currency: "$",
          popular: ${popular},
          badge: ${badge},
          shortDescription: "${shortDescription}",
        }`;
  });
  
  return `      unlimitedPlusPackages: [
${packageObjects.join(',\n')}
      ],`;
}

// Tüm kategorileri bul ve düzelt
let fixedCount = 0;
let totalCategories = 0;

// Her kategori için unlimitedPlusPackages array'ini bul ve düzelt
const categoryPattern = /(\s+)(id:\s*"[^"]+",\s*name:\s*"([^"]+)",[^}]+unlimitedPlusPackages:\s*\[)([\s\S]*?)(\s+\],)/g;

pageContent = pageContent.replace(categoryPattern, (match, indent, before, countryName, packagesContent, after) => {
  totalCategories++;
  
  // Bu ülke için doğru paketleri bul
  const correctPackages = countryPackages[countryName];
  
  if (!correctPackages || correctPackages.length === 0) {
    console.log(`⚠️  No mapping found for: ${countryName}`);
    return match; // Değiştirme
  }
  
  // Mevcut paketlerin ilk satırını kontrol et
  const firstPackageMatch = packagesContent.match(/name:\s*"([^"]+)\s*–\s*Unlimited Plus/);
  if (firstPackageMatch) {
    const currentCountry = firstPackageMatch[1].trim();
    if (currentCountry === countryName) {
      // Zaten doğru ülke, sadece bundleId'leri kontrol et
      let needsUpdate = false;
      correctPackages.forEach(pkg => {
        const expectedName = `${countryName} – Unlimited Plus ${pkg.days} ${pkg.days === 1 ? 'Day' : 'Days'}`;
        if (!packagesContent.includes(`name: "${expectedName}"`)) {
          needsUpdate = true;
        }
      });
      
      if (!needsUpdate) {
        return match; // Değiştirme gerekmiyor
      }
    }
  }
  
  // Paketleri değiştir
  console.log(`✅ Fixing packages for: ${countryName}`);
  fixedCount++;
  
  const newPackagesArray = createPackageArray(countryName, correctPackages);
  return before + '\n' + newPackagesArray + after;
});

// Dosyayı kaydet
fs.writeFileSync(pagePath, pageContent, 'utf8');

console.log(`\n✅ Fixed ${fixedCount} out of ${totalCategories} categories`);
console.log(`📁 Updated file: ${pagePath}`);
console.log('\n🎉 All Unlimited Plus packages have been fixed!');
