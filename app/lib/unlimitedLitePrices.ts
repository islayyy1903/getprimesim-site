import unlimitedLitePrices from "../../data/unlimited_lite_retail_prices_by_country.json";

type UnlimitedLitePrices = typeof unlimitedLitePrices;

/**
 * Ülke adı mapping - kodda kullanılan isimler -> JSON'daki isimler
 */
const countryNameMapping: Record<string, string> = {
  "Europa+": "Europe Lite",
  "Asia": "Asia",
  "North America": "North America",
  "Global": "Global",
  // Diğer eşleşmeler buraya eklenebilir
};

/**
 * Bundle ID'den fiyat bulur
 * ULP formatını UL formatına çevirir (esim_ULP_1D_RNA_V2 -> esim_UL_1D_RNA_V2)
 */
export function getUnlimitedLitePrice(bundleId: string): number | null {
  // Bundle ID'yi UL formatına çevir (ULP -> UL)
  const ulBundleId = bundleId.replace("esim_ULP_", "esim_UL_");
  
  // Tüm ülkelerde ara
  for (const country in unlimitedLitePrices) {
    const countryPrices = unlimitedLitePrices[country as keyof UnlimitedLitePrices];
    if (countryPrices && typeof countryPrices === 'object') {
      const price = countryPrices[ulBundleId as keyof typeof countryPrices];
      if (typeof price === 'number') {
        return price;
      }
    }
  }
  
  return null;
}

/**
 * Ülke adı ve bundle ID'den fiyat bulur
 */
export function getUnlimitedLitePriceByCountry(countryName: string, bundleId: string): number | null {
  // Bundle ID'yi UL formatına çevir (ULP -> UL)
  const ulBundleId = bundleId.replace("esim_ULP_", "esim_UL_");
  
  // Ülke adı mapping'ini kontrol et
  const mappedCountryName = countryNameMapping[countryName] || countryName;
  
  const countryPrices = unlimitedLitePrices[mappedCountryName as keyof UnlimitedLitePrices];
  if (countryPrices && typeof countryPrices === 'object') {
    const price = countryPrices[ulBundleId as keyof typeof countryPrices];
    if (typeof price === 'number') {
      return price;
    }
  }
  
  return null;
}

