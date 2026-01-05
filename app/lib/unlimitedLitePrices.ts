/**
 * Unlimited Lite fiyatlarını JSON dosyasından yükler
 * Client component'lerde kullanım için fetch ile çalışır
 */

type UnlimitedLitePrices = Record<string, Record<string, number>>;

let cachedPrices: UnlimitedLitePrices | null = null;

/**
 * JSON dosyasını yükler (cache'lenmiş)
 */
async function loadPrices(): Promise<UnlimitedLitePrices> {
  // Return cached prices if available
  if (cachedPrices !== null) {
    const result: UnlimitedLitePrices = cachedPrices;
    return result;
  }
  
  try {
    const response = await fetch('/unlimited_lite_retail_prices_by_country.json');
    if (!response.ok) {
      throw new Error(`Failed to load prices: ${response.status}`);
    }
    const jsonData: unknown = await response.json();
    const prices: UnlimitedLitePrices = jsonData as UnlimitedLitePrices;
    cachedPrices = prices;
    return prices;
  } catch (error) {
    console.error('Error loading unlimited lite prices:', error);
    const emptyPrices: UnlimitedLitePrices = {};
    cachedPrices = emptyPrices;
    return emptyPrices;
  }
}

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
 * Bundle ID'den fiyat bulur (async)
 * ULP formatını UL formatına çevirir (esim_ULP_1D_RNA_V2 -> esim_UL_1D_RNA_V2)
 */
export async function getUnlimitedLitePrice(bundleId: string): Promise<number | null> {
  const prices = await loadPrices();
  // Bundle ID'yi UL formatına çevir (ULP -> UL)
  const ulBundleId = bundleId.replace("esim_ULP_", "esim_UL_");
  
  // Tüm ülkelerde ara
  for (const country in prices) {
    const countryPrices = prices[country];
    if (countryPrices && typeof countryPrices === 'object') {
      const price = countryPrices[ulBundleId];
      if (typeof price === 'number') {
        return price;
      }
    }
  }
  
  return null;
}

/**
 * Ülke adı ve bundle ID'den fiyat bulur (sync - preloaded prices ile)
 */
export function getUnlimitedLitePriceByCountrySync(
  prices: UnlimitedLitePrices,
  countryName: string,
  bundleId: string
): number | null {
  // Bundle ID'yi UL formatına çevir (ULP -> UL)
  const ulBundleId = bundleId.replace("esim_ULP_", "esim_UL_");
  
  // Ülke adı mapping'ini kontrol et
  const mappedCountryName = countryNameMapping[countryName] || countryName;
  
  const countryPrices = prices[mappedCountryName];
  if (countryPrices && typeof countryPrices === 'object') {
    const price = countryPrices[ulBundleId];
    if (typeof price === 'number') {
      return price;
    }
  }
  
  return null;
}

/**
 * Ülke adı ve bundle ID'den fiyat bulur (async)
 */
export async function getUnlimitedLitePriceByCountry(countryName: string, bundleId: string): Promise<number | null> {
  const prices = await loadPrices();
  return getUnlimitedLitePriceByCountrySync(prices, countryName, bundleId);
}
