"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import countriesData from "../../data/countries.json";
import * as Flags from 'country-flag-icons/react/3x2';

interface Package {
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

interface Country {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  standardPackages: Package[];
  unlimitedLitePackages: Package[];
  unlimitedPlusPackages: Package[];
}

// Get country code from bundleId (e.g., "esim_1GB_7D_US_V2" -> "US")
const getCountryCodeFromBundle = (bundleId: string): string | null => {
  const match = bundleId.match(/esim_\d+GB_\d+D_([A-Z]{2})_V2/);
  return match ? match[1] : null;
};

// Get country code from country name or bundleId
const getCountryCode = (country: Country): string | null => {
  // Try to get from first package's bundleId
  if (country.standardPackages && country.standardPackages.length > 0) {
    const code = getCountryCodeFromBundle(country.standardPackages[0].bundleId);
    if (code) return code;
  }
  
  // Fallback: map common country names to ISO codes
  const nameToCode: Record<string, string> = {
    "united states": "US",
    "usa": "US",
    "united kingdom": "GB",
    "uk": "GB",
    "germany": "DE",
    "france": "FR",
    "italy": "IT",
    "spain": "ES",
    "japan": "JP",
    "canada": "CA",
    "australia": "AU",
    "turkey": "TR",
    "china": "CN",
    "india": "IN",
    "brazil": "BR",
    "mexico": "MX",
    "russia": "RU",
    "south korea": "KR",
    "netherlands": "NL",
    "belgium": "BE",
    "switzerland": "CH",
    "austria": "AT",
    "sweden": "SE",
    "norway": "NO",
    "denmark": "DK",
    "finland": "FI",
    "poland": "PL",
    "portugal": "PT",
    "greece": "GR",
    "ireland": "IE",
    "new zealand": "NZ",
    "south africa": "ZA",
    "egypt": "EG",
    "united arab emirates": "AE",
    "uae": "AE",
    "saudi arabia": "SA",
    "israel": "IL",
    "singapore": "SG",
    "thailand": "TH",
    "malaysia": "MY",
    "indonesia": "ID",
    "philippines": "PH",
    "vietnam": "VN",
    "hong kong": "HK",
    "taiwan": "TW",
    "argentina": "AR",
    "chile": "CL",
    "colombia": "CO",
    "peru": "PE",
  };
  
  const lowerName = country.name.toLowerCase();
  return nameToCode[lowerName] || null;
};

// Get Flag component for a country
const getCountryFlag = (country: Country) => {
  const code = getCountryCode(country);
  if (!code) return null;
  
  try {
    // Try to get flag dynamically from Flags object
    const FlagComponent = (Flags as any)[code];
    if (FlagComponent) {
      return <FlagComponent className="w-5 h-4 rounded" />;
    }
  } catch (e) {
    // Flag not found, return null
  }
  
  return null;
};

const continents = [
  { name: "North America", countries: ["United States", "USA", "Canada", "Mexico"] },
  { 
    name: "Europe", 
    countries: [
      "United Kingdom", "UK", "Germany", "France", "Italy", "Spain", 
      "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", 
      "Norway", "Denmark", "Finland", "Poland", "Portugal", "Greece", 
      "Ireland", "Czech Republic", "Hungary", "Romania", "Bulgaria", 
      "Croatia", "Slovakia", "Slovenia", "Estonia", "Latvia", "Lithuania",
      "Iceland", "Luxembourg", "Malta", "Cyprus", "Albania", "Andorra",
      "Belarus", "Bosnia", "Monaco", "Montenegro", "Moldova", "Serbia",
      "Ukraine", "Russia", "Liechtenstein", "San Marino", "Vatican City"
    ] 
  },
  { 
    name: "Asia", 
    countries: [
      "Japan", "South Korea", "Singapore", "Thailand", "India", "China",
      "Malaysia", "Indonesia", "Philippines", "Vietnam", "VietNam", "Hong Kong",
      "Taiwan", "Bangladesh", "Pakistan", "Sri Lanka", "Cambodia", "Laos",
      "Mongolia"
    ] 
  },
  { 
    name: "Middle East", 
    countries: [
      "United Arab Emirates", "UAE", "Saudi Arabia", "Israel", "Turkey",
      "Qatar", "Kuwait", "Bahrain", "Oman", "Jordan", "Lebanon", "Iraq",
      "Iran"
    ] 
  },
  { name: "South America", countries: ["Brazil", "Argentina", "Chile", "Colombia"] },
  { 
    name: "Africa", 
    countries: [
      "South Africa", "Egypt", "Kenya", "Nigeria", "Morocco", "Algeria",
      "Tunisia", "Ghana", "Ethiopia", "Tanzania", "Uganda", "Zimbabwe",
      "Zambia", "Botswana", "Namibia", "Senegal", "Ivory Coast", "Cameroon",
      "Angola", "Mozambique"
    ] 
  },
];

export default function ESimPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [countries] = useState<Country[]>(countriesData as Country[]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [activeSection, setActiveSection] = useState<"standard" | "unlimited-lite" | "unlimited-plus">("standard");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(countries);
      // Arama temizlendiğinde seçili ülkeyi temizle
      if (selectedCountry) {
        setSelectedCountry(null);
      }
    } else {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
      
      // Eğer arama sonucu tek bir ülkeye eşleşiyorsa, otomatik olarak seç
      if (filtered.length === 1) {
        setSelectedCountry(filtered[0]);
        setActiveSection("standard");
      } else if (filtered.length > 1) {
        // Eğer birden fazla sonuç varsa ve tam eşleşme varsa, onu seç
        const exactMatch = filtered.find(
          (country) => country.name.toLowerCase() === searchQuery.toLowerCase().trim()
        );
        if (exactMatch) {
          setSelectedCountry(exactMatch);
          setActiveSection("standard");
        }
      }
    }
  }, [searchQuery, countries]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setActiveSection("standard");
  };

  const handleCheckout = async (pkg: Package) => {
    const originalPrice = pkg.price;
    const discountedPrice = calculateDiscountPrice(originalPrice);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: pkg.bundleId,
          packageName: `${selectedCountry?.name} ${pkg.data} - ${pkg.validity}`,
          price: discountedPrice, // Use discounted price
          currency: pkg.currency,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Error initiating checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error initiating checkout. Please try again.');
    }
  };

  // Calculate discounted price (15% off)
  const calculateDiscountPrice = (originalPrice: number): number => {
    return Math.round(originalPrice * 0.85 * 100) / 100; // Round to 2 decimal places
  };

  // Extract GB number from data string (e.g., "5GB" -> 5, "Unlimited" -> Infinity)
  const getDataGB = (data: string): number => {
    const match = data.match(/(\d+(?:\.\d+)?)\s*GB/i);
    if (match) {
      return parseFloat(match[1]);
    }
    // If "Unlimited" or no number found, return Infinity
    return Infinity;
  };

  // Determine badge for each package - 1 Most Popular and 1 Premium per section
  // Most Popular is never the cheapest, varies by country, max 20GB for standard, and not too expensive for unlimited
  const getBadgeForPackage = (packages: Package[], index: number, countryId?: string, sectionType?: 'standard' | 'unlimited-lite' | 'unlimited-plus'): 'most-popular' | 'premium' | null => {
    if (packages.length === 0) return null;

    // Sort packages by price
    const sortedByPrice = packages.map((pkg, idx) => ({ pkg, idx, price: pkg.price }))
      .sort((a, b) => a.price - b.price);

    // Find cheapest index (we'll never use this for Most Popular)
    const cheapestIndex = sortedByPrice[0]?.idx;

    // Find most expensive index for Premium
    const mostExpensiveIndex = sortedByPrice[sortedByPrice.length - 1]?.idx;

    // Calculate average price
    const avgPrice = sortedByPrice.reduce((sum, { price }) => sum + price, 0) / sortedByPrice.length;

    // Filter packages eligible for Most Popular
    let eligiblePackages = sortedByPrice;
    
    if (sectionType === 'standard') {
      // For standard: max 20GB
      eligiblePackages = sortedByPrice.filter(({ pkg }) => {
        const dataGB = getDataGB(pkg.data);
        return dataGB <= 20;
      });
    } else if (sectionType === 'unlimited-lite' || sectionType === 'unlimited-plus') {
      // For unlimited: exclude packages that are too expensive (above average + 30%)
      const maxPriceThreshold = avgPrice * 1.3;
      eligiblePackages = sortedByPrice.filter(({ price }) => price <= maxPriceThreshold);
    }

    // Determine Most Popular based on country and package count
    // Use country ID hash to make it different for each country
    let mostPopularIndex: number;
    
    if (eligiblePackages.length === 0) {
      // If no eligible packages, don't assign Most Popular
      mostPopularIndex = -1;
    } else if (countryId) {
      // Create a hash from country ID for consistency
      const hash = countryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      // Exclude cheapest from eligible packages
      const availablePackages = eligiblePackages.filter(({ idx }) => idx !== cheapestIndex);
      
      if (availablePackages.length === 0) {
        // If cheapest is the only eligible one, use it
        mostPopularIndex = eligiblePackages[0]?.idx;
      } else {
        // Use hash to select different package for each country
        const selectedIdx = hash % availablePackages.length;
        mostPopularIndex = availablePackages[selectedIdx]?.idx || availablePackages[0]?.idx;
      }
    } else {
      // Fallback: choose second cheapest among eligible if available
      if (eligiblePackages.length > 1) {
        mostPopularIndex = eligiblePackages[1]?.idx;
      } else {
        mostPopularIndex = eligiblePackages[0]?.idx;
      }
    }

    // Ensure Most Popular is never the cheapest (if there are other options)
    if (mostPopularIndex === cheapestIndex && eligiblePackages.length > 1) {
      const alternatives = eligiblePackages.filter(({ idx }) => idx !== cheapestIndex);
      if (alternatives.length > 0) {
        mostPopularIndex = alternatives[0]?.idx;
      }
    }

    // Assign badges
    if (index === mostPopularIndex && mostPopularIndex !== -1) {
      return 'most-popular';
    }

    // Premium goes to most expensive (but not if it's also Most Popular)
    if (index === mostExpensiveIndex && index !== mostPopularIndex) {
      return 'premium';
    }

    // If most expensive is also most popular, give premium to second most expensive
    if (mostExpensiveIndex === mostPopularIndex && sortedByPrice.length > 1) {
      const secondMostExpensiveIndex = sortedByPrice[sortedByPrice.length - 2]?.idx;
      if (index === secondMostExpensiveIndex) {
        return 'premium';
      }
    }

    return null;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-cyan-600 via-teal-700 to-cyan-800 px-4 pt-12 pb-32 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">
                Where is your destination
              </h2>
              <p className="text-cyan-50 mb-8 text-lg sm:text-xl">
                Search by country or browse our available regions
              </p>
              <div className="max-w-2xl mx-auto relative z-10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border-0 bg-white px-4 py-4 pl-12 text-gray-900 placeholder-gray-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <svg
                    className="absolute left-4 top-4 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  
                  {/* Search Results Dropdown */}
                  {searchQuery.trim() !== "" && filteredCountries.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-[100]">
                      <div className="p-2">
                        {filteredCountries.slice(0, 10).map((country) => (
                          <button
                            key={country.id}
                            onClick={() => {
                              handleCountrySelect(country);
                              setSearchQuery("");
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center"
                          >
                            <span className="mr-3 flex-shrink-0">
                              {getCountryFlag(country) || <span className="text-lg">{country.icon}</span>}
                            </span>
                            <span className="text-gray-900 dark:text-white">{country.name}</span>
                          </button>
                        ))}
                        {filteredCountries.length > 10 && (
                          <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                            +{filteredCountries.length - 10} more results
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Sidebar + Packages */}
        <section className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900 min-h-screen p-4 lg:p-6 gap-4 lg:gap-6">
          {/* Mobilde: Eğer ülke seçiliyse, sidebar'ı tamamen gizle */}
          {/* Desktop'ta: Her zaman göster */}
          {!selectedCountry && (
            <div className="w-full lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col h-[calc(100vh-250px)] lg:h-[calc(100vh-150px)]">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Countries & Regions</h3>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {/* Continents */}
                {continents.map((continent) => (
                  <div key={continent.name} className="mb-4">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        {continent.name}
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {countries
                        .filter((country: Country) =>
                          continent.countries.some((c) =>
                            country.name.toLowerCase().includes(c.toLowerCase())
                          )
                        )
                        .map((country: Country) => (
                          <button
                            key={country.id}
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-cyan-50 dark:hover:bg-gray-700 transition-colors rounded-md flex items-center ${
                              selectedCountry?.id === country.id
                                ? "bg-cyan-100 dark:bg-gray-700 border-l-4 border-cyan-600 dark:border-cyan-400 font-semibold"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <span className="mr-2 flex-shrink-0">
                              {getCountryFlag(country) || <span>{country.icon}</span>}
                            </span>
                            {country.name}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}

                {/* All Countries List */}
                <div className="mb-4">
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      All Countries
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {filteredCountries.map((country: Country) => (
                      <button
                        key={country.id}
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-cyan-50 dark:hover:bg-gray-700 transition-colors rounded-md flex items-center ${
                          selectedCountry?.id === country.id
                            ? "bg-cyan-100 dark:bg-gray-700 border-l-4 border-cyan-600 dark:border-cyan-400 font-semibold"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="mr-2 flex-shrink-0">
                          {getCountryFlag(country) || <span>{country.icon}</span>}
                        </span>
                        {country.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Right Content - Packages */}
          {/* Mobilde: Eğer ülke seçiliyse, paketleri tam genişlikte ve en üstte göster */}
          <div className={`${selectedCountry ? 'w-full order-first lg:order-none' : 'flex-1'} p-6 lg:p-8`}>
            {selectedCountry ? (
              <div className="space-y-8">
                {/* Mobilde: Geri butonu ekle */}
                <div className="flex items-center gap-4 mb-4 lg:mb-0">
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="lg:hidden flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Countries</span>
                  </button>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedCountry.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCountry.description}
                  </p>
                </div>

                {/* Section Tabs */}
                <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveSection("standard")}
                    className={`flex items-center gap-3 px-6 py-4 rounded-t-lg transition-all ${
                      activeSection === "standard"
                        ? "bg-white dark:bg-gray-800 border-b-2 border-cyan-600 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      activeSection === "standard"
                        ? "bg-cyan-100 dark:bg-cyan-900"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}>
                      <svg className={`h-5 w-5 ${activeSection === "standard" ? "text-cyan-600 dark:text-cyan-400" : "text-gray-600 dark:text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Standard Data</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Fixed data packages</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection("unlimited-lite")}
                    className={`flex items-center gap-3 px-6 py-4 rounded-t-lg transition-all ${
                      activeSection === "unlimited-lite"
                        ? "bg-white dark:bg-gray-800 border-b-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      activeSection === "unlimited-lite"
                        ? "bg-purple-100 dark:bg-purple-900"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}>
                      <svg className={`h-5 w-5 ${activeSection === "unlimited-lite" ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Unlimited Lite</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">High-speed data</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection("unlimited-plus")}
                    className={`flex items-center gap-3 px-6 py-4 rounded-t-lg transition-all ${
                      activeSection === "unlimited-plus"
                        ? "bg-white dark:bg-gray-800 border-b-2 border-orange-600 dark:border-orange-400 text-orange-600 dark:text-orange-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      activeSection === "unlimited-plus"
                        ? "bg-orange-100 dark:bg-orange-900"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}>
                      <svg className={`h-5 w-5 ${activeSection === "unlimited-plus" ? "text-orange-600 dark:text-orange-400" : "text-gray-600 dark:text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Unlimited Plus</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Premium unlimited</p>
                    </div>
                  </button>
                </div>

                {/* Packages Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                  {/* Standard Data Packages */}
                  {activeSection === "standard" && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedCountry.standardPackages.map((pkg, index) => {
                          const badgeType = getBadgeForPackage(selectedCountry.standardPackages, index, selectedCountry.id, 'standard');
                          const originalPrice = pkg.price;
                          const discountedPrice = calculateDiscountPrice(originalPrice);
                          const hasBadge = badgeType !== null;

                          return (
                            <div
                              key={index}
                              className={`relative rounded-xl border-2 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col ${
                                badgeType === 'most-popular'
                                  ? "border-blue-900 dark:border-blue-700 ring-2 ring-blue-900/20 dark:ring-blue-700/20"
                                  : badgeType === 'premium'
                                  ? "border-purple-500 dark:border-purple-400 ring-2 ring-purple-500/20 dark:ring-purple-400/20"
                                  : "border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600"
                              }`}
                            >
                              {badgeType === 'most-popular' && (
                                <div className="absolute -top-3 right-4 z-10">
                                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    <span>🔥</span>
                                    Most Popular
                                  </span>
                                </div>
                              )}
                              {badgeType === 'premium' && (
                                <div className="absolute -top-3 right-4 z-10">
                                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    <span>⭐</span>
                                    Premium
                                  </span>
                                </div>
                              )}
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-medium">
                                {selectedCountry.name}
                              </p>
                              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {pkg.data}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-1">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {pkg.validity}
                              </p>
                              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-semibold text-gray-400 dark:text-gray-500 line-through">
                                    {pkg.currency}{originalPrice.toFixed(2)}
                                  </span>
                                  <span className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                                    {pkg.currency}{discountedPrice.toFixed(2)}
                                  </span>
                                </div>
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                  15% OFF
                                </span>
                              </div>
                              <button 
                                onClick={() => handleCheckout(pkg)}
                                className="mt-auto w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                Buy Now
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      {selectedCountry.standardPackages.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 dark:text-gray-400">
                            No Standard Data packages available for this country yet.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unlimited Lite Packages */}
                  {activeSection === "unlimited-lite" && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedCountry.unlimitedLitePackages.map((pkg, index) => {
                          const badgeType = getBadgeForPackage(selectedCountry.unlimitedLitePackages, index, selectedCountry.id, 'unlimited-lite');
                          const originalPrice = pkg.price;
                          const discountedPrice = calculateDiscountPrice(originalPrice);
                          const hasBadge = badgeType !== null;

                          return (
                            <div
                              key={index}
                              className={`relative rounded-xl border-2 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col ${
                                hasBadge
                                  ? "border-purple-500 dark:border-purple-400 ring-2 ring-purple-500/20 dark:ring-purple-400/20"
                                  : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                              }`}
                            >
                              {badgeType === 'most-popular' && (
                                <div className="absolute -top-3 right-4 z-10">
                                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    <span>🔥</span>
                                    Most Popular
                                  </span>
                                </div>
                              )}
                              {badgeType === 'premium' && (
                                <div className="absolute -top-3 right-4 z-10">
                                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    <span>⭐</span>
                                    Premium
                                  </span>
                                </div>
                              )}
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-medium">
                                {selectedCountry.name}
                              </p>
                              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {pkg.data}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-1">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {pkg.validity}
                              </p>
                              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-semibold text-gray-400 dark:text-gray-500 line-through">
                                    {pkg.currency}{originalPrice.toFixed(2)}
                                  </span>
                                  <span className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                                    {pkg.currency}{discountedPrice.toFixed(2)}
                                  </span>
                                </div>
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                  15% OFF
                                </span>
                              </div>
                              <button 
                                onClick={() => handleCheckout(pkg)}
                                className="mt-auto w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                Buy Now
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      {selectedCountry.unlimitedLitePackages.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 dark:text-gray-400">
                            No Unlimited Lite packages available for this country yet.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unlimited Plus Packages */}
                  {activeSection === "unlimited-plus" && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedCountry.unlimitedPlusPackages.map((pkg, index) => {
                          const badgeType = getBadgeForPackage(selectedCountry.unlimitedPlusPackages, index, selectedCountry.id, 'unlimited-plus');
                          const originalPrice = pkg.price;
                          const discountedPrice = calculateDiscountPrice(originalPrice);
                          const hasBadge = badgeType !== null;

                          return (
                            <div
                              key={index}
                              className={`relative rounded-xl border-2 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col ${
                                hasBadge
                                  ? "border-orange-500 dark:border-orange-400 ring-2 ring-orange-500/20 dark:ring-orange-400/20"
                                  : "border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600"
                              }`}
                            >
                              {badgeType === 'most-popular' && (
                                <div className="absolute -top-3 right-4 z-10">
                                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    <span>🔥</span>
                                    Most Popular
                                  </span>
                                </div>
                              )}
                              {badgeType === 'premium' && (
                                <div className="absolute -top-3 right-4 z-10">
                                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    <span>⭐</span>
                                    Premium
                                  </span>
                                </div>
                              )}
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-medium">
                                {selectedCountry.name}
                              </p>
                              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {pkg.data}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-1">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {pkg.validity}
                              </p>
                              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-semibold text-gray-400 dark:text-gray-500 line-through">
                                    {pkg.currency}{originalPrice.toFixed(2)}
                                  </span>
                                  <span className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                                    {pkg.currency}{discountedPrice.toFixed(2)}
                                  </span>
                                </div>
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                  15% OFF
                                </span>
                              </div>
                              <button 
                                onClick={() => handleCheckout(pkg)}
                                className="mt-auto w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                Buy Now
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      {selectedCountry.unlimitedPlusPackages.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 dark:text-gray-400">
                            No Unlimited Plus packages available for this country yet.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {selectedCountry.standardPackages.length === 0 &&
                  selectedCountry.unlimitedLitePackages.length === 0 &&
                  selectedCountry.unlimitedPlusPackages.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400">
                        No packages available for this country yet.
                      </p>
                    </div>
                  )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[600px]">
                <div className="text-center max-w-2xl mx-auto px-4">
                  {/* Animated Globe Icon */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full p-8 shadow-2xl">
                        <svg 
                          className="w-24 h-24 text-white animate-spin-slow" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          style={{ animation: 'spin 20s linear infinite' }}
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Main Message */}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Discover Global Connectivity
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Select a country from the left to view available packages
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900 dark:to-cyan-800 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">150+ Countries</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stay connected in over 150 countries worldwide with our extensive coverage
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Activation</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get connected immediately with instant eSIM activation via QR code
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure & Reliable</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trusted by thousands of travelers with secure payment and reliable service
                      </p>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-10">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      💡 <span className="font-medium">Tip:</span> Use the search bar at the top to quickly find your destination
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
