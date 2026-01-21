const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/countries.json', 'utf8'));

const getCountryCode = (bundleId) => {
  const match = bundleId.match(/esim_\d+GB_\d+D_([A-Z]+)_V2/);
  return match ? match[1] : null;
};

let added = 0;

data.forEach(country => {
  if (country.standardPackages && country.standardPackages.length > 0) {
    const code = getCountryCode(country.standardPackages[0].bundleId);
    if (code) {
      const basePrice = country.standardPackages[0].price;
      
      // Get all unique validities from standard packages
      const validities = [...new Set(country.standardPackages.map(p => p.validity))];
      
      // Add additional common durations if not present
      const allValidities = [...validities];
      const has7Days = validities.some(v => v.includes('7 days'));
      const has15Days = validities.some(v => v.includes('15 days'));
      const has30Days = validities.some(v => v.includes('30 days'));
      
      if (!has7Days) allValidities.push('7 days');
      if (!has15Days) allValidities.push('15 days');
      if (!has30Days) allValidities.push('30 days');
      
      // Add more options: 14, 21, 60, 90 days
      allValidities.push('14 days', '21 days', '60 days', '90 days');
      
      // Sort by days
      allValidities.sort((a, b) => {
        const daysA = parseInt(a.split(' ')[0]);
        const daysB = parseInt(b.split(' ')[0]);
        return daysA - daysB;
      });
      
      // Create unlimited plus packages for each validity (premium pricing)
      country.unlimitedPlusPackages = allValidities.map((validity, index) => {
        const days = parseInt(validity.split(' ')[0]);
        let multiplier;
        let isPopular = false;
        
        // Premium pricing - higher than unlimited lite
        if (days === 7) multiplier = 2.0;
        else if (days === 14) multiplier = 2.8;
        else if (days === 15) {
          multiplier = 3.5;
          isPopular = true;
        }
        else if (days === 21) multiplier = 4.2;
        else if (days === 30) multiplier = 5.5;
        else if (days === 60) multiplier = 9.5;
        else if (days === 90) multiplier = 13.5;
        else multiplier = 2.0 + (days / 7) * 0.7; // Dynamic calculation for other durations
        
        return {
          name: `${country.name} – Unlimited Plus ${validity}`,
          bundleId: `esim_unlimited_plus_${days}D_${code}_V2`,
          data: "Unlimited Plus",
          validity: validity,
          countries: country.name,
          price: parseFloat((basePrice * multiplier).toFixed(2)),
          currency: "$",
          popular: isPopular,
          badge: isPopular ? "🔥 Most Popular" : null,
          shortDescription: "Premium unlimited data with no speed restrictions"
        };
      });
      
      added++;
    }
  }
});

console.log(`Added Unlimited Plus packages to ${added} countries`);
fs.writeFileSync('./data/countries.json', JSON.stringify(data, null, 2));
console.log('✅ countries.json updated successfully');



