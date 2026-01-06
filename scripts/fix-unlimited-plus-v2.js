const fs = require('fs');
const path = require('path');

// unlimited-plus-mapping.json dosyasını oku
const mappingPath = path.join(__dirname, '../unlimited-plus-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// app/esim/page.tsx dosyasını oku
const pagePath = path.join(__dirname, '../app/esim/page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

console.log('🔍 Fixing Unlimited Plus packages...\n');

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

console.log(`✅ Found ${Object.keys(countryPackages).length} countries\n`);

// Her ülke için paket objesi oluştur
function createPackageObject(countryName, pkg) {
  const days = pkg.days;
  const validity = days === 1 ? '1 day' : `${days} days`;
  const dayText = days === 1 ? 'Day' : 'Days';
  
  // Popular ve badge
  let popular = false;
  let badge = 'null';
  if (days === 7) {
    popular = true;
    badge = '"🔥 Most Popular"';
  } else if (days === 30) {
    badge = '"💎 Premium"';
  }
  
  // Short description
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
  
  // Fiyat tahmini
  const basePrice = days === 1 ? 4.99 : days === 3 ? 9.99 : days === 5 ? 14.99 : 
                   days === 7 ? 19.99 : days === 10 ? 24.99 : days === 15 ? 34.99 : 59.99;
  
  return {
    name: `${countryName} – Unlimited Plus ${days} ${dayText}`,
    bundleId: pkg.bundleId,
    data: 'Unlimited Plus',
    validity: validity,
    countries: countryName,
    price: basePrice,
    currency: '$',
    popular: popular,
    badge: badge,
    shortDescription: shortDescription
  };
}

// Her kategori için unlimitedPlusPackages array'ini bul ve düzelt
let fixedCount = 0;
let checkedCount = 0;

// Satır satır işle
const lines = pageContent.split('\n');
const newLines = [];
let i = 0;
let inUnlimitedPlus = false;
let currentCountry = null;
let packageStartLine = -1;
let packageIndent = '';

while (i < lines.length) {
  const line = lines[i];
  
  // Kategori başlangıcını bul
  if (line.match(/^\s*id:\s*"[^"]+",\s*$/)) {
    // Sonraki satırda name'i kontrol et
    if (i + 1 < lines.length) {
      const nameMatch = lines[i + 1].match(/^\s*name:\s*"([^"]+)",\s*$/);
      if (nameMatch) {
        currentCountry = nameMatch[1];
      }
    }
  }
  
  // unlimitedPlusPackages başlangıcını bul
  if (line.match(/^\s*unlimitedPlusPackages:\s*\[\s*$/)) {
    inUnlimitedPlus = true;
    packageStartLine = newLines.length;
    packageIndent = line.match(/^(\s*)/)[1];
    newLines.push(line);
    i++;
    continue;
  }
  
  // unlimitedPlusPackages içindeyken
  if (inUnlimitedPlus) {
    // Array sonunu bul
    if (line.match(/^\s*\],\s*$/)) {
      // Bu ülke için doğru paketleri oluştur
      if (currentCountry && countryPackages[currentCountry]) {
        const packages = countryPackages[currentCountry];
        const packageObjects = packages.map(pkg => {
          const obj = createPackageObject(currentCountry, pkg);
          return `${packageIndent}        {
          name: "${obj.name}",
          bundleId: "${obj.bundleId}",
          data: "${obj.data}",
          validity: "${obj.validity}",
          countries: "${obj.countries}",
          price: ${obj.price},
          currency: "${obj.currency}",
          popular: ${obj.popular},
          badge: ${obj.badge},
          shortDescription: "${obj.shortDescription}",
        }`;
        });
        
        newLines.push(packageObjects.join(',\n'));
        console.log(`✅ Fixed: ${currentCountry} (${packages.length} packages)`);
        fixedCount++;
      } else {
        // Mevcut paketleri koru
        let j = packageStartLine + 1;
        while (j < newLines.length && !newLines[j].match(/^\s*\],\s*$/)) {
          // Paketleri koru
        }
        // Mevcut içeriği ekle (basit yaklaşım - mevcut paketleri koru)
        const oldContent = lines.slice(i - (newLines.length - packageStartLine - 1), i);
        newLines.push(...oldContent);
      }
      
      newLines.push(line);
      inUnlimitedPlus = false;
      currentCountry = null;
      i++;
      continue;
    }
    
    // Paket içeriğini atla (sonra değiştireceğiz)
    i++;
    continue;
  }
  
  // Normal satır
  newLines.push(line);
  i++;
}

// Dosyayı kaydet
const newContent = newLines.join('\n');
fs.writeFileSync(pagePath, newContent, 'utf8');

console.log(`\n✅ Fixed ${fixedCount} categories`);
console.log(`📁 Updated: ${pagePath}`);
console.log('\n🎉 Done!');



