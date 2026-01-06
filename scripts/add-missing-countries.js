// Script to generate missing countries for eSim page
const fs = require('fs');

const retailPrices = JSON.parse(fs.readFileSync('data/retail_prices_by_country.json', 'utf8'));
const unlimitedLitePrices = JSON.parse(fs.readFileSync('data/unlimited_lite_retail_prices_by_country.json', 'utf8'));

// Country name to ID mapping (convert to kebab-case)
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Country name to ISO code mapping (simplified - you'll need to add more)
const countryToIso = {
  'Poland': 'PL',
  'Norway': 'NO',
  'Sweden': 'SE',
  'Switzerland': 'CH',
  'Spain': 'ES',
  'Portugal': 'PT',
  'Singapore': 'SG',
  'Thailand': 'TH',
  'Philippines': 'PH',
  'Indonesia': 'ID',
  'Malaysia': 'MY',
  'Vietnam': 'VN',
  'South Africa': 'ZA',
  'Romania': 'RO',
  'Pakistan': 'PK',
  'Bangladesh': 'BD',
  'Nepal': 'NP',
  'Sri Lanka': 'LK',
  'Uruguay': 'UY',
  'Paraguay': 'PY',
  'Peru': 'PE',
  'Panama': 'PA',
  'Nicaragua': 'NI',
  'Honduras': 'HN',
  'Guatemala': 'GT',
  'El Salvador': 'SV',
  'Costa Rica': 'CR',
  'Belize': 'BZ',
  'Jamaica': 'JM',
  'Trinidad And Tobago': 'TT',
  'Barbados': 'BB',
  'Bahamas': 'BS',
  'Dominican Republic': 'DO',
  'Puerto Rico': 'PR',
  'Cuba': 'CU',
  'Haiti': 'HT',
  'Colombia': 'CO',
  'Ecuador': 'EC',
  'Venezuela': 'VE',
  'Guyana': 'GY',
  'Suriname': 'SR',
  'French Guiana': 'GF',
  'Brazil': 'BR',
  'Chile': 'CL',
  'Argentina': 'AR',
  'Bolivia': 'BO',
  'Uruguay': 'UY',
  'Paraguay': 'PY',
  'Falkland Islands': 'FK',
  'South Georgia': 'GS',
  'Turkey': 'TR',
  'Ukraine': 'UA',
  'Russia': 'RU',
  'Kazakhstan': 'KZ',
  'Uzbekistan': 'UZ',
  'Kyrgyzstan': 'KG',
  'Tajikistan': 'TJ',
  'Turkmenistan': 'TM',
  'Mongolia': 'MN',
  'China': 'CN',
  'Hong Kong': 'HK',
  'Macau': 'MO',
  'Taiwan': 'TW',
  'Japan': 'JP',
  'South Korea': 'KR',
  'North Korea': 'KP',
  'Vietnam': 'VN',
  'Laos': 'LA',
  'Cambodia': 'KH',
  'Myanmar': 'MM',
  'Thailand': 'TH',
  'Malaysia': 'MY',
  'Singapore': 'SG',
  'Brunei': 'BN',
  'Indonesia': 'ID',
  'Philippines': 'PH',
  'East Timor': 'TL',
  'Papua New Guinea': 'PG',
  'Fiji': 'FJ',
  'Vanuatu': 'VU',
  'New Caledonia': 'NC',
  'Solomon Islands': 'SB',
  'Samoa': 'WS',
  'Tonga': 'TO',
  'Palau': 'PW',
  'Micronesia': 'FM',
  'Marshall Islands': 'MH',
  'Nauru': 'NR',
  'Kiribati': 'KI',
  'Tuvalu': 'TV',
  'India': 'IN',
  'Pakistan': 'PK',
  'Bangladesh': 'BD',
  'Nepal': 'NP',
  'Bhutan': 'BT',
  'Sri Lanka': 'LK',
  'Maldives': 'MV',
  'Afghanistan': 'AF',
  'Iran': 'IR',
  'Iraq': 'IQ',
  'Syria': 'SY',
  'Lebanon': 'LB',
  'Jordan': 'JO',
  'Israel': 'IL',
  'Palestine': 'PS',
  'Saudi Arabia': 'SA',
  'Yemen': 'YE',
  'Oman': 'OM',
  'UAE': 'AE',
  'Qatar': 'QA',
  'Bahrain': 'BH',
  'Kuwait': 'KW',
  'Egypt': 'EG',
  'Sudan': 'SD',
  'Libya': 'LY',
  'Tunisia': 'TN',
  'Algeria': 'DZ',
  'Morocco': 'MA',
  'Western Sahara': 'EH',
  'Mauritania': 'MR',
  'Mali': 'ML',
  'Niger': 'NE',
  'Chad': 'TD',
  'Sudan': 'SD',
  'Ethiopia': 'ET',
  'Eritrea': 'ER',
  'Djibouti': 'DJ',
  'Somalia': 'SO',
  'Kenya': 'KE',
  'Uganda': 'UG',
  'Tanzania': 'TZ',
  'Rwanda': 'RW',
  'Burundi': 'BI',
  'Democratic Republic of the Congo': 'CD',
  'Republic of the Congo': 'CG',
  'Central African Republic': 'CF',
  'Cameroon': 'CM',
  'Equatorial Guinea': 'GQ',
  'Gabon': 'GA',
  'Sao Tome and Principe': 'ST',
  'Angola': 'AO',
  'Zambia': 'ZM',
  'Malawi': 'MW',
  'Mozambique': 'MZ',
  'Madagascar': 'MG',
  'Mauritius': 'MU',
  'Seychelles': 'SC',
  'Comoros': 'KM',
  'Reunion': 'RE',
  'Mayotte': 'YT',
  'South Africa': 'ZA',
  'Lesotho': 'LS',
  'Eswatini': 'SZ',
  'Botswana': 'BW',
  'Namibia': 'NA',
  'Zimbabwe': 'ZW',
  'Zambia': 'ZM',
  'Malawi': 'MW',
  'Mozambique': 'MZ',
  'Madagascar': 'MG',
  'Mauritius': 'MU',
  'Seychelles': 'SC',
  'Comoros': 'KM',
};

// Generate package entries for a country
function generatePackages(countryName, prices, unlimitedLite, countryId) {
  const standardPackages = [];
  const unlimitedLitePackages = [];
  const unlimitedPlusPackages = [];
  
  if (!prices) return { standardPackages, unlimitedLitePackages, unlimitedPlusPackages };
  
  // Standard packages
  const standardBundles = [
    { bundle: 'esim_1GB_7D', data: '1GB', validity: '7 days' },
    { bundle: 'esim_2GB_15D', data: '2GB', validity: '15 days' },
    { bundle: 'esim_3GB_30D', data: '3GB', validity: '30 days' },
    { bundle: 'esim_5GB_30D', data: '5GB', validity: '30 days' },
    { bundle: 'esim_10GB_30D', data: '10GB', validity: '30 days' },
    { bundle: 'esim_20GB_30D', data: '20GB', validity: '30 days' },
    { bundle: 'esim_50GB_30D', data: '50GB', validity: '30 days' },
    { bundle: 'esim_100GB_30D', data: '100GB', validity: '30 days' },
  ];
  
  // Extract country code from first bundle
  const firstBundleKey = Object.keys(prices)[0];
  const countryCode = firstBundleKey.match(/_([A-Z]{2})_V2$/)?.[1] || 'XX';
  
  standardBundles.forEach((bundle, index) => {
    const bundleKey = `${bundle.bundle}_${countryCode}_V2`;
    if (prices[bundleKey]) {
      standardPackages.push({
        name: `${countryName} – ${bundle.data}`,
        bundleId: bundleKey,
        data: bundle.data,
        validity: bundle.validity,
        countries: countryName,
        price: prices[bundleKey],
        currency: '$',
        popular: index === 2, // Mark 3GB as popular
        badge: index === 2 ? '🔥 Most Popular' : null,
        shortDescription: index === 0 ? 'Perfect for short trips' : 
                         index === 2 ? 'Best value for extended travel' : 
                         index === standardBundles.length - 1 ? 'Ultimate data package' : 
                         'Great for extended travel',
      });
    }
  });
  
  // Unlimited Lite packages
  if (unlimitedLite) {
    const ulBundles = [
      { bundle: 'esim_UL_1D', validity: '1 day' },
      { bundle: 'esim_UL_3D', validity: '3 days' },
      { bundle: 'esim_UL_5D', validity: '5 days' },
      { bundle: 'esim_UL_7D', validity: '7 days' },
      { bundle: 'esim_UL_10D', validity: '10 days' },
      { bundle: 'esim_UL_15D', validity: '15 days' },
      { bundle: 'esim_UL_30D', validity: '30 days' },
    ];
    
    ulBundles.forEach((bundle, index) => {
      const bundleKey = `${bundle.bundle}_${countryCode}_V2`;
      if (unlimitedLite[bundleKey]) {
        unlimitedLitePackages.push({
          name: `${countryName} – Unlimited Lite ${bundle.validity}`,
          bundleId: bundleKey,
          data: 'Unlimited Lite',
          validity: bundle.validity,
          countries: countryName,
          price: unlimitedLite[bundleKey],
          currency: '$',
          popular: index === 3, // Mark 7 days as popular
          badge: index === 3 ? '🔥 Most Popular' : null,
          shortDescription: index === 0 ? 'Perfect for short trips' : 
                           index === 3 ? 'Best value for extended travel' : 
                           'Great for extended travel',
        });
      }
    });
  }
  
  return { standardPackages, unlimitedLitePackages, unlimitedPlusPackages };
}

// Read missing countries
const missingCountries = fs.readFileSync('missing_countries.txt', 'utf8')
  .split('\n')
  .filter(line => line.trim())
  .slice(0, 10); // Process first 10 for now

console.log(`Generating packages for ${missingCountries.length} countries...`);

let output = '\n    // Missing countries added from JSON data\n';
missingCountries.forEach(countryName => {
  if (!countryName.trim()) return;
  
  const countryId = toKebabCase(countryName);
  const prices = retailPrices[countryName];
  const unlimitedLite = unlimitedLitePrices[countryName];
  
  if (!prices) {
    console.log(`⚠️  No prices found for ${countryName}`);
    return;
  }
  
  const packages = generatePackages(countryName, prices, unlimitedLite, countryId);
  
  if (packages.standardPackages.length === 0) {
    console.log(`⚠️  No packages generated for ${countryName}`);
    return;
  }
  
  output += `    {\n`;
  output += `      id: "${countryId}",\n`;
  output += `      name: "${countryName}",\n`;
  output += `      icon: "🌍",\n`;
  output += `      color: "blue",\n`;
  output += `      description: "${countryName}",\n`;
  output += `      standardPackages: [\n`;
  packages.standardPackages.forEach(pkg => {
    output += `        {\n`;
    output += `          name: "${pkg.name}",\n`;
    output += `          bundleId: "${pkg.bundleId}",\n`;
    output += `          data: "${pkg.data}",\n`;
    output += `          validity: "${pkg.validity}",\n`;
    output += `          countries: "${pkg.countries}",\n`;
    output += `          price: ${pkg.price},\n`;
    output += `          currency: "${pkg.currency}",\n`;
    output += `          popular: ${pkg.popular},\n`;
    output += `          badge: ${pkg.badge ? `"${pkg.badge}"` : 'null'},\n`;
    output += `          shortDescription: "${pkg.shortDescription}",\n`;
    output += `        },\n`;
  });
  output += `      ],\n`;
  
  if (packages.unlimitedLitePackages.length > 0) {
    output += `      unlimitedLitePackages: [\n`;
    packages.unlimitedLitePackages.forEach(pkg => {
      output += `        {\n`;
      output += `          name: "${pkg.name}",\n`;
      output += `          bundleId: "${pkg.bundleId}",\n`;
      output += `          data: "${pkg.data}",\n`;
      output += `          validity: "${pkg.validity}",\n`;
      output += `          countries: "${pkg.countries}",\n`;
      output += `          price: ${pkg.price},\n`;
      output += `          currency: "${pkg.currency}",\n`;
      output += `          popular: ${pkg.popular},\n`;
      output += `          badge: ${pkg.badge ? `"${pkg.badge}"` : 'null'},\n`;
      output += `          shortDescription: "${pkg.shortDescription}",\n`;
      output += `        },\n`;
    });
    output += `      ],\n`;
  } else {
    output += `      unlimitedLitePackages: [],\n`;
  }
  
  output += `      unlimitedPlusPackages: [],\n`;
  output += `    },\n`;
  
  console.log(`✅ Generated packages for ${countryName}`);
});

fs.writeFileSync('generated_countries.txt', output);
console.log('\n✅ Generated countries saved to generated_countries.txt');

