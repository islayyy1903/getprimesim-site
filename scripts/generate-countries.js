const fs = require('fs');
const path = require('path');

// Fiyat listesini oku
const pricesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/retail_prices_by_country.json'), 'utf8')
);

// Ülke kodları için mapping (bazı özel durumlar için)
const countryCodeMap = {
  'United States of America': 'US',
  'United Kingdom': 'GB',
  'Korea-Republic of': 'KR',
  'Taiwan-Province of China': 'TW',
  'Congo-the Democratic Republic of the': 'CD',
  'Bonaire, saint Eustatius and Saba': 'BQ',
  'Saint Kitts And Nevis': 'KN',
  'Saint Vincent And The Grenadines': 'VC',
  'Virgin Islands - British': 'VG',
  'Virgin Islands - United States': 'VI',
  'Iran-Islamic Republic of': 'IR',
  'Tanzania, United Republic of': 'TZ',
};

// Bundle ID'den ülke kodunu çıkar
function extractCountryCode(countryName, bundleId) {
  // Önce özel mapping'leri kontrol et
  if (countryCodeMap[countryName]) {
    return countryCodeMap[countryName];
  }
  
  // Bundle ID'den çıkar: esim_1GB_7D_US_V2 -> US
  const match = bundleId.match(/esim_\d+GB_\d+D_([^_]+)_V2/);
  if (match) {
    return match[1];
  }
  
  // Fallback: ülke adının ilk 2 harfini büyük harfe çevir (basit yaklaşım)
  return countryName.substring(0, 2).toUpperCase();
}

// ID için ülke adını normalize et
function normalizeId(countryName) {
  return countryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Ülke adını kısa formata çevir (display için)
function getShortName(countryName) {
  const shortNames = {
    'United States of America': 'USA',
    'United Kingdom': 'UK',
    'Russian Federation': 'Russia',
    'Korea-Republic of': 'South Korea',
    'Taiwan-Province of China': 'Taiwan',
    'Congo-the Democratic Republic of the': 'DR Congo',
  };
  return shortNames[countryName] || countryName;
}

// Bundle ID'den data ve validity çıkar
function parseBundleId(bundleId) {
  const match = bundleId.match(/esim_(\d+GB)_(\d+)D_([^_]+)_V2/);
  if (!match) return null;
  
  const data = match[1];
  const days = parseInt(match[2]);
  
  let validity;
  if (days === 7) validity = '7 days';
  else if (days === 15) validity = '15 days';
  else if (days === 30) validity = '30 days';
  else validity = `${days} days`;
  
  return { data, validity };
}

// Mevcut kategorileri oku (bazıları zaten ekli)
const existingIds = new Set([
  'north-america',
  'europa',
  'asia',
  'global',
  'usa',
  'uk',
  'germany',
  'europe-lite',
  'europa-plus',
  'eu-plus',
]);

// Ülkeleri generate et
const newCountries = [];

Object.keys(pricesData).forEach(countryName => {
  const id = normalizeId(countryName);
  
  // Zaten ekli olanları atla
  if (existingIds.has(id)) {
    return;
  }
  
  const bundles = pricesData[countryName];
  const bundleIds = Object.keys(bundles);
  
  if (bundleIds.length === 0) {
    return;
  }
  
  // İlk bundle ID'den ülke kodunu çıkar
  const countryCode = extractCountryCode(countryName, bundleIds[0]);
  const shortName = getShortName(countryName);
  
  // Standard paketleri oluştur
  const standardPackages = bundleIds
    .map(bundleId => {
      const price = bundles[bundleId];
      const parsed = parseBundleId(bundleId);
      
      if (!parsed) return null;
      
      const { data, validity } = parsed;
      
      // Popular badge için (3GB veya 5GB genellikle popular)
      const isPopular = data === '3GB' || data === '5GB';
      
      // Premium badge için (50GB ve üzeri)
      const isPremium = parseInt(data) >= 50;
      
      return {
        name: `${shortName} – ${data}`,
        bundleId: bundleId,
        data: data,
        validity: validity,
        countries: countryName,
        price: price,
        currency: '$',
        popular: isPopular && bundleIds.length > 3, // Sadece yeterli paket varsa popular yap
        badge: isPremium ? '💎 Premium' : (isPopular && bundleIds.length > 3 ? '🔥 Most Popular' : null),
        shortDescription: getShortDescription(data, validity),
      };
    })
    .filter(pkg => pkg !== null)
    .sort((a, b) => {
      // Data miktarına göre sırala
      const aData = parseInt(a.data);
      const bData = parseInt(b.data);
      return aData - bData;
    });
  
  if (standardPackages.length === 0) {
    return;
  }
  
  // Icon için ülke kodunu emoji'ye çevir (basit yaklaşım - gerçekte ülke kodlarına göre emoji mapping gerekir)
  const icon = '🌍'; // Default icon, daha sonra country code'a göre özelleştirilebilir
  
  // Color rotation
  const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'indigo', 'red'];
  const colorIndex = newCountries.length % colors.length;
  const color = colors[colorIndex];
  
  newCountries.push({
    id: id,
    name: shortName,
    icon: icon,
    color: color,
    description: countryName,
    standardPackages: standardPackages,
    unlimitedLitePackages: [],
    unlimitedPlusPackages: [],
  });
});

// Short description helper
function getShortDescription(data, validity) {
  const dataNum = parseInt(data);
  if (dataNum <= 1) return 'Perfect for short trips';
  if (dataNum <= 3) return 'Great for week-long stays';
  if (dataNum <= 5) return 'Ideal for heavy data users';
  if (dataNum <= 10) return 'Extended travel coverage';
  if (dataNum <= 20) return 'Maximum data for power users';
  return 'Premium data package';
}

console.log(`Generated ${newCountries.length} countries`);
console.log(`Sample countries: ${newCountries.slice(0, 5).map(c => c.name).join(', ')}`);

// JSON olarak kaydet
fs.writeFileSync(
  path.join(__dirname, '../scripts/generated-countries.json'),
  JSON.stringify(newCountries, null, 2),
  'utf8'
);

console.log('Generated countries saved to scripts/generated-countries.json');

