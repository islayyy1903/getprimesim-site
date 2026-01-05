const fs = require('fs');
const path = require('path');

// JSON dosyasını oku
const jsonPath = path.join(__dirname, '../data/retail_prices_by_country.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Mevcut kategoriler (bunları atlayacağız)
const existingCategories = new Set([
  'North America',
  'EU Europa+',
  'Asia',
  'Global',
  'USA',
  'United Kingdom',
  'Germany'
]);

// Bundle ID'den data, validity bilgisi çıkar
function parseBundleId(bundleId) {
  // Standard paket formatı: esim_1GB_7D_RNA_V2, esim_2GB_15D_RNA_V2, etc.
  const match = bundleId.match(/esim_(\d+GB)_(\d+D)_(\w+)_V2/);
  if (!match) return null;
  
  const data = match[1];
  const days = match[2];
  const countryCode = match[3];
  
  const dataValue = data;
  const validity = `${days} days`;
  
  return { data: dataValue, validity, countryCode };
}

// Ülke isminden slug oluştur
function nameToSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Ülke isminden icon seç (basit bir mapping)
function getCountryIcon(countryName) {
  // Basit bir mapping - daha iyi bir mapping yapılabilir
  if (countryName.includes('Europe') || countryName.includes('EU')) return '🇪🇺';
  if (countryName.includes('America') || countryName.includes('USA')) return '🇺🇸';
  if (countryName.includes('Asia')) return '🌏';
  if (countryName.includes('Africa')) return '🌍';
  if (countryName.includes('Global')) return '🌐';
  if (countryName.includes('United Kingdom') || countryName.includes('UK')) return '🇬🇧';
  if (countryName.includes('Germany')) return '🇩🇪';
  if (countryName.includes('France')) return '🇫🇷';
  if (countryName.includes('Italy')) return '🇮🇹';
  if (countryName.includes('Spain')) return '🇪🇸';
  if (countryName.includes('Japan')) return '🇯🇵';
  if (countryName.includes('China')) return '🇨🇳';
  if (countryName.includes('India')) return '🇮🇳';
  if (countryName.includes('Turkey')) return '🇹🇷';
  if (countryName.includes('Australia')) return '🇦🇺';
  if (countryName.includes('Canada')) return '🇨🇦';
  if (countryName.includes('Brazil')) return '🇧🇷';
  if (countryName.includes('Mexico')) return '🇲🇽';
  if (countryName.includes('Russia')) return '🇷🇺';
  if (countryName.includes('South Korea') || countryName.includes('Korea')) return '🇰🇷';
  // Varsayılan
  return '🌎';
}

// Yeni kategoriler oluştur
const newCategories = [];

for (const [countryName, packages] of Object.entries(data)) {
  // Mevcut kategorileri atla
  if (existingCategories.has(countryName)) {
    continue;
  }
  
  // Standard paketleri oluştur
  const standardPackages = [];
  
  for (const [bundleId, price] of Object.entries(packages)) {
    const parsed = parseBundleId(bundleId);
    if (!parsed) {
      continue; // Parse edilemeyen paketleri atla
    }
    
    const dataValue = parsed.data;
    const validity = parsed.validity;
    
    standardPackages.push({
      name: `${countryName} – ${dataValue}`,
      bundleId: bundleId,
      data: dataValue,
      validity: validity,
      countries: countryName,
      price: price,
      currency: "$",
      popular: standardPackages.length === 2, // 3. paketi popular yap (index 2)
      badge: null,
      shortDescription: dataValue === "1GB" ? "Perfect for short trips" :
                       dataValue === "2GB" ? "Great for week-long stays" :
                       dataValue === "3GB" ? "Best value for extended travel" :
                       dataValue === "5GB" ? "Ideal for heavy data users" :
                       dataValue === "10GB" ? "Maximum data for power users" :
                       "Great coverage",
    });
  }
  
  // Sadece paketleri varsa ekle
  if (standardPackages.length > 0) {
    newCategories.push({
      id: nameToSlug(countryName),
      name: countryName,
      icon: getCountryIcon(countryName),
      color: "blue",
      description: `Coverage in ${countryName}`,
      standardPackages: standardPackages,
      unlimitedLitePackages: [],
      unlimitedPlusPackages: [],
    });
  }
}

// Sonucu JSON olarak yazdır
console.log(JSON.stringify(newCategories, null, 2));
console.log(`\nTotal new countries: ${newCategories.length}`);

