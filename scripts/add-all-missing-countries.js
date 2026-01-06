// Script to add all missing countries from JSON files to the eSim page
const fs = require('fs');
const path = require('path');

// Read JSON files
const retailPrices = JSON.parse(fs.readFileSync('data/retail_prices_by_country.json', 'utf8'));
const unlimitedLitePrices = JSON.parse(fs.readFileSync('data/unlimited_lite_retail_prices_by_country.json', 'utf8'));

// Read the page file
const pagePath = 'app/esim/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Countries/regions to exclude (continents and special regions)
const excludeList = [
  'Africa', 'Americas', 'Asia', 'Balkans', 'Caribbean', 'CIS', 'CENAM',
  'EU+', 'Europe Lite', 'Middle East & Africa', 'Middle East and North Africa',
  'North America', 'Oceania', 'Global'
];

// Get all countries from JSON
const allCountries = Object.keys(retailPrices).filter(c => !excludeList.includes(c));

// Extract existing country names from page
const existingMatches = pageContent.matchAll(/name: "([^"]+)",/g);
const existingCountries = new Set();
for (const match of existingMatches) {
  existingCountries.add(match[1]);
}

// Find missing countries
const missingCountries = allCountries.filter(country => !existingCountries.has(country));

console.log(`Total countries in JSON: ${allCountries.length}`);
console.log(`Existing countries on page: ${existingCountries.size}`);
console.log(`Missing countries: ${missingCountries.length}`);

// Convert country name to kebab-case ID
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Extract country code from bundle ID
function getCountryCode(bundleId) {
  const match = bundleId.match(/_([A-Z]{2})_V2$/);
  return match ? match[1] : 'XX';
}

// Generate standard packages
function generateStandardPackages(countryName, prices) {
  if (!prices) return [];
  
  const countryCode = getCountryCode(Object.keys(prices)[0]);
  const packages = [];
  
  const bundleMap = [
    { bundle: 'esim_1GB_7D', data: '1GB', validity: '7 days', index: 0 },
    { bundle: 'esim_2GB_15D', data: '2GB', validity: '15 days', index: 1 },
    { bundle: 'esim_3GB_30D', data: '3GB', validity: '30 days', index: 2 },
    { bundle: 'esim_5GB_30D', data: '5GB', validity: '30 days', index: 3 },
    { bundle: 'esim_10GB_30D', data: '10GB', validity: '30 days', index: 4 },
    { bundle: 'esim_20GB_30D', data: '20GB', validity: '30 days', index: 5 },
    { bundle: 'esim_50GB_30D', data: '50GB', validity: '30 days', index: 6 },
    { bundle: 'esim_100GB_30D', data: '100GB', validity: '30 days', index: 7 },
  ];
  
  bundleMap.forEach(({ bundle, data, validity, index }) => {
    const bundleId = `${bundle}_${countryCode}_V2`;
    if (prices[bundleId]) {
      packages.push({
        name: `${countryName} – ${data}`,
        bundleId,
        data,
        validity,
        countries: countryName,
        price: prices[bundleId],
        currency: '$',
        popular: index === 2, // 3GB is popular
        badge: index === 2 ? '🔥 Most Popular' : (index >= 6 ? '💎 Premium' : null),
        shortDescription: index === 0 ? 'Perfect for short trips' :
                         index === 2 ? 'Best value for extended travel' :
                         index === 7 ? 'Ultimate data package' :
                         index >= 6 ? 'Premium data package' :
                         'Great for extended travel',
      });
    }
  });
  
  return packages;
}

// Generate unlimited lite packages
function generateUnlimitedLitePackages(countryName, prices) {
  if (!prices) return [];
  
  const countryCode = getCountryCode(Object.keys(prices)[0]);
  const packages = [];
  
  const bundleMap = [
    { bundle: 'esim_UL_1D', validity: '1 day', index: 0 },
    { bundle: 'esim_UL_3D', validity: '3 days', index: 1 },
    { bundle: 'esim_UL_5D', validity: '5 days', index: 2 },
    { bundle: 'esim_UL_7D', validity: '7 days', index: 3 },
    { bundle: 'esim_UL_10D', validity: '10 days', index: 4 },
    { bundle: 'esim_UL_15D', validity: '15 days', index: 5 },
    { bundle: 'esim_UL_30D', validity: '30 days', index: 6 },
  ];
  
  bundleMap.forEach(({ bundle, validity, index }) => {
    const bundleId = `${bundle}_${countryCode}_V2`;
    if (prices[bundleId]) {
      packages.push({
        name: `${countryName} – Unlimited Lite ${validity}`,
        bundleId,
        data: 'Unlimited Lite',
        validity,
        countries: countryName,
        price: prices[bundleId],
        currency: '$',
        popular: index === 3, // 7 days is popular
        badge: index === 3 ? '🔥 Most Popular' : (index === 6 ? '💎 Premium' : null),
        shortDescription: index === 0 ? 'Perfect for short trips' :
                         index === 3 ? 'Best value for extended travel' :
                         index === 6 ? 'Maximum coverage for long stays' :
                         'Great for extended travel',
      });
    }
  });
  
  return packages;
}

// Generate country entry
function generateCountryEntry(countryName) {
  const countryId = toKebabCase(countryName);
  const prices = retailPrices[countryName];
  const unlimitedLite = unlimitedLitePrices[countryName];
  
  if (!prices || Object.keys(prices).length === 0) {
    console.log(`⚠️  No prices found for ${countryName}`);
    return null;
  }
  
  const standardPackages = generateStandardPackages(countryName, prices);
  const unlimitedLitePackages = generateUnlimitedLitePackages(countryName, unlimitedLite);
  
  if (standardPackages.length === 0) {
    console.log(`⚠️  No packages generated for ${countryName}`);
    return null;
  }
  
  let entry = `    {\n`;
  entry += `      id: "${countryId}",\n`;
  entry += `      name: "${countryName}",\n`;
  entry += `      icon: "🌍",\n`;
  entry += `      color: "blue",\n`;
  entry += `      description: "${countryName}",\n`;
  entry += `      standardPackages: [\n`;
  
  standardPackages.forEach(pkg => {
    entry += `        {\n`;
    entry += `          name: "${pkg.name}",\n`;
    entry += `          bundleId: "${pkg.bundleId}",\n`;
    entry += `          data: "${pkg.data}",\n`;
    entry += `          validity: "${pkg.validity}",\n`;
    entry += `          countries: "${pkg.countries}",\n`;
    entry += `          price: ${pkg.price},\n`;
    entry += `          currency: "${pkg.currency}",\n`;
    entry += `          popular: ${pkg.popular},\n`;
    entry += `          badge: ${pkg.badge ? `"${pkg.badge}"` : 'null'},\n`;
    entry += `          shortDescription: "${pkg.shortDescription}",\n`;
    entry += `        },\n`;
  });
  
  entry += `      ],\n`;
  
  if (unlimitedLitePackages.length > 0) {
    entry += `      unlimitedLitePackages: [\n`;
    unlimitedLitePackages.forEach(pkg => {
      entry += `        {\n`;
      entry += `          name: "${pkg.name}",\n`;
      entry += `          bundleId: "${pkg.bundleId}",\n`;
      entry += `          data: "${pkg.data}",\n`;
      entry += `          validity: "${pkg.validity}",\n`;
      entry += `          countries: "${pkg.countries}",\n`;
      entry += `          price: ${pkg.price},\n`;
      entry += `          currency: "${pkg.currency}",\n`;
      entry += `          popular: ${pkg.popular},\n`;
      entry += `          badge: ${pkg.badge ? `"${pkg.badge}"` : 'null'},\n`;
      entry += `          shortDescription: "${pkg.shortDescription}",\n`;
      entry += `        },\n`;
    });
    entry += `      ],\n`;
  } else {
    entry += `      unlimitedLitePackages: [],\n`;
  }
  
  entry += `      unlimitedPlusPackages: [],\n`;
  entry += `    },\n`;
  
  return entry;
}

// Generate all missing countries
let allEntries = '\n    // Missing countries added from JSON data\n';
let addedCount = 0;
let skippedCount = 0;

missingCountries.forEach(countryName => {
  const entry = generateCountryEntry(countryName);
  if (entry) {
    allEntries += entry;
    addedCount++;
    console.log(`✅ Generated: ${countryName}`);
  } else {
    skippedCount++;
  }
});

console.log(`\n✅ Generated ${addedCount} countries`);
console.log(`⚠️  Skipped ${skippedCount} countries`);

// Find the insertion point (before the closing bracket of packageCategories array)
const insertionPoint = pageContent.lastIndexOf('  ];');
if (insertionPoint === -1) {
  console.error('❌ Could not find insertion point in page.tsx');
  process.exit(1);
}

// Insert the new countries before the closing bracket
const beforeInsertion = pageContent.substring(0, insertionPoint);
const afterInsertion = pageContent.substring(insertionPoint);

// Remove the last closing bracket and comma from the last entry if needed
const newContent = beforeInsertion + allEntries + afterInsertion;

// Write the updated content
fs.writeFileSync(pagePath, newContent, 'utf8');
console.log(`\n✅ Successfully added ${addedCount} countries to ${pagePath}`);



