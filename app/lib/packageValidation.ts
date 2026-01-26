import countriesData from "@/data/countries.json";

/**
 * Package interface - matches the structure in countries.json
 */
export interface Package {
  name: string;
  bundleId: string;
  data: string;
  validity: string;
  countries: string;
  price: number;
  currency: string;
  popular?: boolean;
  badge?: string | null;
  shortDescription?: string;
}

/**
 * Country interface - matches the structure in countries.json
 */
interface Country {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  standardPackages?: Package[];
  unlimitedLitePackages?: Package[];
  unlimitedPlusPackages?: Package[];
}

/**
 * Cache for package lookup to avoid repeated JSON parsing
 * Key: bundleId, Value: Package
 */
let packageCache: Map<string, Package> | null = null;

/**
 * Initialize package cache from countries.json
 * This is called once on first use
 */
function initializeCache(): void {
  if (packageCache !== null) {
    return; // Already initialized
  }

  packageCache = new Map<string, Package>();

  (countriesData as Country[]).forEach((country) => {
    const allPackages = [
      ...(country.standardPackages || []),
      ...(country.unlimitedLitePackages || []),
      ...(country.unlimitedPlusPackages || []),
    ];

    allPackages.forEach((pkg) => {
      packageCache!.set(pkg.bundleId, pkg);
    });
  });

  console.log(`📦 Package cache initialized with ${packageCache.size} packages`);
}

/**
 * Find a package by its bundleId
 * @param packageId - The bundleId to search for (e.g., "esim_3GB_30D_US_V2")
 * @returns The Package object if found, null otherwise
 */
export function findPackageById(packageId: string): Package | null {
  if (!packageId || typeof packageId !== "string") {
    return null;
  }

  // Initialize cache on first use
  if (packageCache === null) {
    initializeCache();
  }

  return packageCache!.get(packageId) || null;
}

/**
 * Calculate discounted price with rounding
 * @param originalPrice - Original price of the package
 * @param discountRate - Discount rate (e.g., 0.15 for 15% off)
 * @returns Discounted price rounded to 2 decimal places
 */
export function calculateDiscountedPrice(
  originalPrice: number,
  discountRate: number = 0.15
): number {
  if (originalPrice <= 0) {
    throw new Error("Original price must be positive");
  }

  if (discountRate < 0 || discountRate >= 1) {
    throw new Error("Discount rate must be between 0 and 1");
  }

  // Calculate: originalPrice * (1 - discountRate)
  // Round to 2 decimal places
  return Math.round(originalPrice * (1 - discountRate) * 100) / 100;
}

/**
 * Validate price with tolerance for floating point errors
 * @param receivedPrice - Price received from frontend
 * @param expectedPrice - Expected price (calculated from package data)
 * @param tolerance - Allowed difference (default: 0.01)
 * @returns true if prices match within tolerance, false otherwise
 */
export function validatePrice(
  receivedPrice: number,
  expectedPrice: number,
  tolerance: number = 0.01
): boolean {
  return Math.abs(receivedPrice - expectedPrice) <= tolerance;
}

/**
 * Normalize currency symbol to standard format
 * Maps various currency representations to standard symbols
 * @param currency - Currency string from frontend
 * @returns Normalized currency symbol
 */
export function normalizeCurrency(currency: string | undefined): string {
  if (!currency) {
    return "$";
  }

  const currencyMap: { [key: string]: string } = {
    usd: "$",
    eur: "€",
    gbp: "£",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  return currencyMap[currency] || currency;
}
