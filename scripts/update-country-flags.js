const fs = require('fs');
const path = require('path');

// app/esim/page.tsx dosyasını oku
const pagePath = path.join(__dirname, '../app/esim/page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Ülke isimlerine göre bayrak emojileri
const flagMap = {
  // Kıtalar ve Bölgeler
  "North America": "🌎",
  "Europa+": "🇪🇺",
  "Europe Lite": "🇪🇺",
  "Asia": "🌏",
  "Global": "🌍",
  "Africa": "🌍",
  "Americas": "🌎",
  "Balkans": "🇧🇦",
  "Caribbean": "🇨🇺",
  "CENAM": "🌎",
  "CIS": "🌍",
  "EU+": "🇪🇺",
  "Middle East & Africa": "🌍",
  "Middle East and North Africa": "🌍",
  "Oceania": "🌏",
  
  // Ülkeler
  "USA": "🇺🇸",
  "United States": "🇺🇸",
  "United States of America": "🇺🇸",
  "UK": "🇬🇧",
  "United Kingdom": "🇬🇧",
  "Germany": "🇩🇪",
  "France": "🇫🇷",
  "Italy": "🇮🇹",
  "Spain": "🇪🇸",
  "Turkey": "🇹🇷",
  "Japan": "🇯🇵",
  "China": "🇨🇳",
  "South Korea": "🇰🇷",
  "Korea-Republic of": "🇰🇷",
  "India": "🇮🇳",
  "Australia": "🇦🇺",
  "Canada": "🇨🇦",
  "Mexico": "🇲🇽",
  "Brazil": "🇧🇷",
  "Argentina": "🇦🇷",
  "Chile": "🇨🇱",
  "Colombia": "🇨🇴",
  "Peru": "🇵🇪",
  "Russia": "🇷🇺",
  "Russian Federation": "🇷🇺",
  "Poland": "🇵🇱",
  "Netherlands": "🇳🇱",
  "Belgium": "🇧🇪",
  "Switzerland": "🇨🇭",
  "Austria": "🇦🇹",
  "Sweden": "🇸🇪",
  "Norway": "🇳🇴",
  "Denmark": "🇩🇰",
  "Finland": "🇫🇮",
  "Greece": "🇬🇷",
  "Portugal": "🇵🇹",
  "Ireland": "🇮🇪",
  "Czech Republic": "🇨🇿",
  "Hungary": "🇭🇺",
  "Romania": "🇷🇴",
  "Bulgaria": "🇧🇬",
  "Croatia": "🇭🇷",
  "Serbia": "🇷🇸",
  "Slovakia": "🇸🇰",
  "Slovenia": "🇸🇮",
  "Lithuania": "🇱🇹",
  "Latvia": "🇱🇻",
  "Estonia": "🇪🇪",
  "Iceland": "🇮🇸",
  "Luxembourg": "🇱🇺",
  "Malta": "🇲🇹",
  "Cyprus": "🇨🇾",
  "Northern Cyprus": "🇨🇾",
  "New Zealand": "🇳🇿",
  "Singapore": "🇸🇬",
  "Malaysia": "🇲🇾",
  "Thailand": "🇹🇭",
  "Indonesia": "🇮🇩",
  "Philippines": "🇵🇭",
  "Vietnam": "🇻🇳",
  "VietNam": "🇻🇳",
  "Hong Kong": "🇭🇰",
  "Taiwan": "🇹🇼",
  "Taiwan-Province of China": "🇹🇼",
  "Saudi Arabia": "🇸🇦",
  "United Arab Emirates": "🇦🇪",
  "Israel": "🇮🇱",
  "Egypt": "🇪🇬",
  "South Africa": "🇿🇦",
  "Nigeria": "🇳🇬",
  "Kenya": "🇰🇪",
  "Morocco": "🇲🇦",
  "Tunisia": "🇹🇳",
  "Algeria": "🇩🇿",
  "Pakistan": "🇵🇰",
  "Bangladesh": "🇧🇩",
  "Sri Lanka": "🇱🇰",
  "Cambodia": "🇰🇭",
  "Laos": "🇱🇦",
  "Mongolia": "🇲🇳",
  "Kazakhstan": "🇰🇿",
  "Uzbekistan": "🇺🇿",
  "Azerbaijan": "🇦🇿",
  "Georgia": "🇬🇪",
  "Armenia": "🇦🇲",
  "Ukraine": "🇺🇦",
  "Belarus": "🇧🇾",
  "Moldova": "🇲🇩",
  "Albania": "🇦🇱",
  "Bosnia And Herzegovina": "🇧🇦",
  "Macedonia": "🇲🇰",
  "Montenegro": "🇲🇪",
  "Kosovo": "🇽🇰",
  "Jordan": "🇯🇴",
  "Qatar": "🇶🇦",
  "Kuwait": "🇰🇼",
  "Bahrain": "🇧🇭",
  "Oman": "🇴🇲",
  "Iraq": "🇮🇶",
  "Iran-Islamic Republic of": "🇮🇷",
  "Uruguay": "🇺🇾",
  "Paraguay": "🇵🇾",
  "Bolivia": "🇧🇴",
  "Ecuador": "🇪🇨",
  "Costa Rica": "🇨🇷",
  "Panama": "🇵🇦",
  "Guatemala": "🇬🇹",
  "Honduras": "🇭🇳",
  "El Salvador": "🇸🇻",
  "Nicaragua": "🇳🇮",
  "Dominican Republic": "🇩🇴",
  "Jamaica": "🇯🇲",
  "Trinidad And Tobago": "🇹🇹",
  "Barbados": "🇧🇧",
  "Bahamas": "🇧🇸",
  "Cuba": "🇨🇺",
  "Haiti": "🇭🇹",
  "Puerto Rico": "🇵🇷",
  "Ghana": "🇬🇭",
  "Tanzania, United Republic of": "🇹🇿",
  "Tanzania": "🇹🇿",
  "Uganda": "🇺🇬",
  "Ethiopia": "🇪🇹",
  "Rwanda": "🇷🇼",
  "Senegal": "🇸🇳",
  "Ivory Coast": "🇨🇮",
  "Cameroon": "🇨🇲",
  "Gabon": "🇬🇦",
  "Congo": "🇨🇬",
  "DR Congo": "🇨🇩",
  "Congo-the Democratic Republic of the": "🇨🇩",
  "Mozambique": "🇲🇿",
  "Madagascar": "🇲🇬",
  "Mauritius": "🇲🇺",
  "Seychelles": "🇸🇨",
  "Botswana": "🇧🇼",
  "Namibia": "🇳🇦",
  "Zambia": "🇿🇲",
  "Lesotho": "🇱🇸",
  "Swaziland": "🇸🇿",
  "Reunion": "🇷🇪",
  "Mayotte": "🇾🇹",
  "Cape Verde": "🇨🇻",
  "Guinea": "🇬🇳",
  "Guinea-Bissau": "🇬🇼",
  "Liberia": "🇱🇷",
  "Mali": "🇲🇱",
  "Burkina Faso": "🇧🇫",
  "Niger": "🇳🇪",
  "Chad": "🇹🇩",
  "Central African Republic": "🇨🇫",
  "Sudan": "🇸🇩",
  "Aaland Islands": "🇦🇽",
  "Andorra": "🇦🇩",
  "Anguilla": "🇦🇮",
  "Antigua And Barbuda": "🇦🇬",
  "Aruba": "🇦🇼",
  "Belize": "🇧🇿",
  "Bermuda": "🇧🇲",
  "Bonaire, saint Eustatius and Saba": "🇧🇶",
  "British Virgin Islands": "🇻🇬",
  "Virgin Islands - British": "🇻🇬",
  "Cayman Islands": "🇰🇾",
  "Curacao": "🇨🇼",
  "Dominica": "🇩🇲",
  "Grenada": "🇬🇩",
  "Guadeloupe": "🇬🇵",
  "Martinique": "🇲🇶",
  "Montserrat": "🇲🇸",
  "Netherlands Antilles": "🇦🇳",
  "Saint Barthelemy": "🇧🇱",
  "Saint Kitts And Nevis": "🇰🇳",
  "Saint Lucia": "🇱🇨",
  "Saint Martin": "🇲🇫",
  "Saint Vincent And The Grenadines": "🇻🇨",
  "Suriname": "🇸🇷",
  "Turks And Caicos Islands": "🇹🇨",
  "US Virgin Islands": "🇻🇮",
  "Virgin Islands - United States": "🇻🇮",
  "Canary Islands": "🇮🇨",
  "Faroe Islands": "🇫🇴",
  "Gibraltar": "🇬🇮",
  "Greenland": "🇬🇱",
  "Guernsey": "🇬🇬",
  "Isle of Man": "🇮🇲",
  "Jersey": "🇯🇪",
  "Liechtenstein": "🇱🇮",
  "Monaco": "🇲🇨",
  "Vatican City": "🇻🇦",
  "Brunei": "🇧🇳",
  "Macao": "🇲🇴",
  "Palestine": "🇵🇸",
  "Tajikistan": "🇹🇯",
  "Turkmenistan": "🇹🇲",
  "Guam": "🇬🇺",
  "Fiji": "🇫🇯",
  "Papua New Guinea": "🇵🇬",
  "Samoa": "🇼🇸",
  "Tonga": "🇹🇴",
  "Vanuatu": "🇻🇺",
  "Nauru": "🇳🇷",
  "Hawaii": "🇺🇸",
  "French Guiana": "🇬🇫",
};

// Bayrak bulma fonksiyonu
function getFlag(countryName) {
  // Önce tam eşleşme
  if (flagMap[countryName]) {
    return flagMap[countryName];
  }
  
  // Kısmi eşleşme
  const normalizedName = countryName.toLowerCase();
  for (const [key, flag] of Object.entries(flagMap)) {
    if (key.toLowerCase() === normalizedName) {
      return flag;
    }
  }
  
  // Varsayılan
  return "🌍";
}

// Her ülke için icon'u güncelle
let updatedCount = 0;
for (const [countryName, flag] of Object.entries(flagMap)) {
  // name: "Country Name" satırını bul ve icon'u güncelle
  const escapedName = countryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `(name: "${escapedName}",[\\s\\S]*?icon: ")[^"]+(")`,
    'm'
  );
  
  if (regex.test(pageContent)) {
    pageContent = pageContent.replace(regex, `$1${flag}$2`);
    updatedCount++;
    console.log(`✅ Updated: ${countryName} → ${flag}`);
  } else {
    // Alternatif: id ile arama
    const idRegex = new RegExp(
      `(id: "[^"]*${countryName.toLowerCase().replace(/\s+/g, '-')}[^"]*",[\\s\\S]*?name: "${escapedName}",[\\s\\S]*?icon: ")[^"]+(")`,
      'm'
    );
    if (idRegex.test(pageContent)) {
      pageContent = pageContent.replace(idRegex, `$1${flag}$2`);
      updatedCount++;
      console.log(`✅ Updated (by id): ${countryName} → ${flag}`);
    }
  }
}

// Dosyayı kaydet
fs.writeFileSync(pagePath, pageContent, 'utf8');

console.log(`\n✅ Done! Updated ${updatedCount} countries with flags.`);











