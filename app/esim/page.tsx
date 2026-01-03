"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser } from "../components/UserContext";
// Stripe initialization removed - not used in component

export default function ESimPage() {
  const { user, isLoggedIn, isFirstPurchase } = useUser();
  const [loading, setLoading] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("north-america");

  const handleCheckout = async (pkg: { name: string; bundleId?: string; price: number; currency?: string }) => {
    setLoading(pkg.name);
    try {
      const checkoutData = {
        packageId: pkg.bundleId || pkg.name.toLowerCase().replace(/\s+/g, "-"),
        packageName: pkg.name,
        price: pkg.price,
        currency: pkg.currency || "$",
        email: user?.email || undefined,
        isFirstPurchase: isLoggedIn && isFirstPurchase,
      };
      
      console.log("=== CHECKOUT START ===");
      console.log("Package:", pkg.name);
      console.log("Price:", pkg.price);
      console.log("User:", user?.email || "Not logged in");
      console.log("Is First Purchase:", isFirstPurchase);
      console.log("Request data:", checkoutData);
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP error! status: ${response.status}` };
        }
        console.error("Checkout API error:", errorData);
        alert(`Payment Error: ${errorData.error || `HTTP error! Status: ${response.status}`}\n\nPlease check the browser console (F12) for details.`);
        setLoading(null);
        return;
      }

      let data;
      try {
        data = await response.json();
        console.log("Checkout response data:", data);
      } catch (e) {
        console.error("Failed to parse response JSON:", e);
        alert("Invalid response from server. Please try again.");
        setLoading(null);
        return;
      }

      if (data.error) {
        console.error("Checkout error:", data.error);
        // Don't show API keys in error message
        const errorMessage = data.error.replace(/whsec_[^\s]+/g, 'whsec_***').replace(/sk_[^\s]+/g, 'sk_***');
        alert(`Payment Error: ${errorMessage}\n\nPlease check Vercel Environment Variables.`);
        setLoading(null);
        return;
      }

      // Redirect to Stripe Checkout
      if (!data.sessionId && !data.url) {
        console.error("No sessionId or url in response:", data);
        alert("Failed to create payment session. Please try again.\n\nError: Session ID or URL not found.");
        setLoading(null);
        return;
      }

      // Use session URL directly (new Stripe.js approach)
      console.log("=== CHECKOUT RESPONSE ===");
      console.log("Session ID:", data.sessionId);
      console.log("URL:", data.url);
      console.log("Full response:", data);
      
      if (data.url) {
        console.log("✅ Redirecting to Stripe checkout:", data.url);
        // Force redirect - use window.location.replace for immediate redirect
        setTimeout(() => {
          window.location.replace(data.url);
        }, 100);
      } else if (data.sessionId) {
        console.log("⚠️ No URL, using sessionId fallback:", data.sessionId);
        // Fallback: construct URL from session ID
        const checkoutUrl = `https://checkout.stripe.com/c/pay/${data.sessionId}`;
        setTimeout(() => {
          window.location.replace(checkoutUrl);
        }, 100);
      } else {
        console.error("❌ No URL or sessionId in response:", data);
        alert("Payment page could not be opened. Please try again.\n\nResponse: " + JSON.stringify(data, null, 2));
        setLoading(null);
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      const err = error as Error;
      alert(`Failed to start payment: ${err.message || "Unknown error"}\n\nPlease check the browser console (F12) for details.`);
      setLoading(null);
    }
  };

  const packageCategories = [
    // Continents (Kıtalar) - En üstte
    {
      id: "north-america",
      name: "North America",
      icon: "🌎",
      color: "blue",
      description: "Coverage across USA, Canada, and Mexico",
      packages: [
        {
          name: "North America – 1GB",
          bundleId: "esim_1GB_7D_RNA_V2",
          data: "1GB",
          validity: "7 days",
          countries: "USA, Canada, Mexico",
          price: 6.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Perfect for short trips",
        },
        {
          name: "North America – 2GB",
          bundleId: "esim_2GB_15D_RNA_V2",
          data: "2GB",
          validity: "15 days",
          countries: "USA, Canada, Mexico",
          price: 11.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Great for week-long stays",
        },
        {
          name: "North America – 3GB",
          bundleId: "esim_3GB_30D_RNA_V2",
          data: "3GB",
          validity: "30 days",
          countries: "USA, Canada, Mexico",
          price: 15.99,
          currency: "$",
          popular: true,
          badge: "🔥 Most Popular",
          shortDescription: "Best value for extended travel",
        },
        {
          name: "North America – 5GB",
          bundleId: "esim_5GB_30D_RNA_V2",
          data: "5GB",
          validity: "30 days",
          countries: "USA, Canada, Mexico",
          price: 21.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Ideal for heavy data users",
        },
        {
          name: "North America – 10GB",
          bundleId: "esim_10GB_30D_RNA_V2",
          data: "10GB",
          validity: "30 days",
          countries: "USA, Canada, Mexico",
          price: 34.99,
          currency: "$",
          popular: false,
          badge: "💎 Premium",
          shortDescription: "Maximum data for power users",
        },
      ],
    },
    {
      id: "europa",
      name: "Europa+",
      icon: "🇪🇺",
      color: "purple",
      description: "European Union plus extended European coverage",
      packages: [
        {
          name: "Europa+ – 1GB",
          bundleId: "esim_1GB_7D_REUP_V2",
          data: "1GB",
          validity: "7 days",
          countries: "EU + Extended",
          price: 6.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Quick European travel",
        },
        {
          name: "Europa+ – 2GB",
          bundleId: "esim_2GB_15D_REUP_V2",
          data: "2GB",
          validity: "15 days",
          countries: "EU + Extended",
          price: 10.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Week-long European adventures",
        },
        {
          name: "Europa+ – 3GB",
          bundleId: "esim_3GB_30D_REUP_V2",
          data: "3GB",
          validity: "30 days",
          countries: "EU + Extended",
          price: 14.99,
          currency: "$",
          popular: true,
          badge: "🔥 Most Popular",
          shortDescription: "Perfect for month-long stays",
        },
        {
          name: "Europa+ – 5GB",
          bundleId: "esim_5GB_30D_REUP_V2",
          data: "5GB",
          validity: "30 days",
          countries: "EU + Extended",
          price: 19.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Heavy data usage in Europe",
        },
        {
          name: "Europa+ – 10GB",
          bundleId: "esim_10GB_30D_REUP_V2",
          data: "10GB",
          validity: "30 days",
          countries: "EU + Extended",
          price: 29.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Extended European travel",
        },
        {
          name: "Europa+ – 50GB",
          bundleId: "esim_50GB_30D_REUP_V2",
          data: "50GB",
          validity: "30 days",
          countries: "EU + Extended",
          price: 69.99,
          currency: "$",
          popular: false,
          badge: "💎 Premium",
          shortDescription: "Maximum data for long stays",
        },
      ],
    },
    {
      id: "asia",
      name: "Asia",
      icon: "🌏",
      color: "red",
      description: "Coverage across Asia-Pacific region",
      packages: [
        {
          name: "Asia – 1GB",
          bundleId: "esim_1GB_7D_RAS_V2",
          data: "1GB",
          validity: "7 days",
          countries: "Asia-Pacific",
          price: 6.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Quick Asian travel",
        },
        {
          name: "Asia – 2GB",
          bundleId: "esim_2GB_15D_RAS_V2",
          data: "2GB",
          validity: "15 days",
          countries: "Asia-Pacific",
          price: 10.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Week-long Asian adventures",
        },
        {
          name: "Asia – 3GB",
          bundleId: "esim_3GB_30D_RAS_V2",
          data: "3GB",
          validity: "30 days",
          countries: "Asia-Pacific",
          price: 12.99,
          currency: "$",
          popular: true,
          badge: "🔥 Most Popular",
          shortDescription: "Perfect for month-long stays",
        },
        {
          name: "Asia – 5GB",
          bundleId: "esim_5GB_30D_RAS_V2",
          data: "5GB",
          validity: "30 days",
          countries: "Asia-Pacific",
          price: 17.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Heavy data usage in Asia",
        },
        {
          name: "Asia – 10GB",
          bundleId: "esim_10GB_30D_RAS_V2",
          data: "10GB",
          validity: "30 days",
          countries: "Asia-Pacific",
          price: 29.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Extended Asian travel",
        },
        {
          name: "Asia – 50GB",
          bundleId: "esim_50GB_30D_RAS_V2",
          data: "50GB",
          validity: "30 days",
          countries: "Asia-Pacific",
          price: 99.99,
          currency: "$",
          popular: false,
          badge: "💎 Premium",
          shortDescription: "Maximum data for long stays",
        },
      ],
    },
    {
      id: "global",
      name: "Global",
      icon: "🌍",
      color: "indigo",
      description: "Worldwide coverage in 150+ countries",
      packages: [
        {
          name: "Global – 1GB",
          bundleId: "esim_1GB_7D_RGB_V2",
          data: "1GB",
          validity: "7 days",
          countries: "150+ countries",
          price: 9.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Emergency data anywhere",
        },
        {
          name: "Global – 2GB",
          bundleId: "esim_2GB_15D_RGB_V2",
          data: "2GB",
          validity: "15 days",
          countries: "150+ countries",
          price: 15.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Multi-country travel",
        },
        {
          name: "Global – 3GB",
          bundleId: "esim_3GB_30D_RGB_V2",
          data: "3GB",
          validity: "30 days",
          countries: "150+ countries",
          price: 22.99,
          currency: "$",
          popular: true,
          badge: "🔥 Most Popular",
          shortDescription: "Best for global travelers",
        },
        {
          name: "Global – 5GB",
          bundleId: "esim_5GB_30D_RGB_V2",
          data: "5GB",
          validity: "30 days",
          countries: "150+ countries",
          price: 34.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Extended global travel",
        },
        {
          name: "Global – 10GB",
          bundleId: "esim_10GB_30D_RGB_V2",
          data: "10GB",
          validity: "30 days",
          countries: "150+ countries",
          price: 49.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Heavy global data usage",
        },
        {
          name: "Global – 20GB",
          bundleId: "esim_20GB_30D_RGB_V2",
          data: "20GB",
          validity: "30 days",
          countries: "150+ countries",
          price: 69.99,
          currency: "$",
          popular: false,
          badge: "💎 Premium",
          shortDescription: "Maximum global coverage",
        },
      ],
    },
    // Countries (Ülkeler) - Kıtaların altında
    {
      id: "usa",
      name: "USA",
      icon: "🇺🇸",
      color: "blue",
      description: "United States of America",
      packages: [
        {
          name: "USA – 1GB",
          bundleId: "esim_1GB_7D_US_V2",
          data: "1GB",
          validity: "7 days",
          countries: "United States",
          price: 6.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Perfect for short trips",
        },
        {
          name: "USA – 3GB",
          bundleId: "esim_3GB_30D_US_V2",
          data: "3GB",
          validity: "30 days",
          countries: "United States",
          price: 12.99,
          currency: "$",
          popular: true,
          badge: "🔥 Most Popular",
          shortDescription: "Best value for extended travel",
        },
      ],
    },
    {
      id: "uk",
      name: "UK",
      icon: "🇬🇧",
      color: "purple",
      description: "United Kingdom",
      packages: [
        {
          name: "UK – 1GB",
          bundleId: "esim_1GB_7D_GB_V2",
          data: "1GB",
          validity: "7 days",
          countries: "United Kingdom",
          price: 5.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Perfect for short trips",
        },
        {
          name: "UK – 3GB",
          bundleId: "esim_3GB_30D_GB_V2",
          data: "3GB",
          validity: "30 days",
          countries: "United Kingdom",
          price: 11.99,
          currency: "$",
          popular: true,
          badge: "🔥 Most Popular",
          shortDescription: "Best value for extended travel",
        },
      ],
    },
    {
      id: "germany",
      name: "Germany",
      icon: "🇩🇪",
      color: "red",
      description: "Germany",
      packages: [
        {
          name: "Germany – 1GB",
          bundleId: "esim_1GB_7D_DE_V2",
          data: "1GB",
          validity: "7 days",
          countries: "Germany",
          price: 5.99,
          currency: "$",
          popular: false,
          badge: null,
          shortDescription: "Perfect for short trips",
        },
        {
          name: "Germany – 3GB",
          bundleId: "esim_3GB_30D_DE_V2",
          data: "3GB",
          validity: "30 days",
          countries: "Germany",
          price: 11.99,
          currency: "$",
          popular: true,
          badge: "🔥 Most Popular",
          shortDescription: "Best value for extended travel",
        },
      ],
    },
  ];
  
  // Flatten packages for backward compatibility
  const packages = packageCategories.flatMap(cat => cat.packages);

  const calculatePrice = (price: number) => {
    if (isFirstPurchase && isLoggedIn) {
      const discount = price * 0.30;
      return {
        original: price,
        discounted: price - discount,
        discount: discount,
      };
    }
    return {
      original: price,
      discounted: price,
      discount: 0,
    };
  };

  // Generate Product Schema for all packages
  const productSchemas = packages.map((pkg) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pkg.name,
    "description": `eSim plan with ${pkg.data} data, valid for ${pkg.validity}, covering ${pkg.countries}`,
    "brand": {
      "@type": "Brand",
      "name": "PrimeSim",
    },
    "offers": {
      "@type": "Offer",
      "price": pkg.price.toString(),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://getprimesim.com/esim`,
    },
    "category": "Telecommunications",
  }));

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an eSim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An eSim (embedded SIM) is a digital SIM card that works without a physical card. You can activate it instantly with a QR code on compatible devices.",
        },
      },
      {
        "@type": "Question",
        "name": "How do I activate my eSim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After purchase, you'll receive a QR code via email. Scan it in your phone's eSim settings to activate instantly.",
        },
      },
      {
        "@type": "Question",
        "name": "Which countries are covered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our eSim plans cover USA, UK, Germany, and 150+ countries worldwide.",
        },
      },
      {
        "@type": "Question",
        "name": "How long does activation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your eSim activates within minutes after purchase. You'll receive the QR code via email shortly after payment.",
        },
      },
      {
        "@type": "Question",
        "name": "Do I get a discount on my first purchase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! New customers who sign up get 30% off their first purchase. Simply create an account and the discount will be applied automatically.",
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              eSim Plans
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Digital SIM cards that activate instantly with QR code, without physical SIM cards. 
              Fast and reliable internet connection in USA, UK, Germany, and 150+ countries worldwide.
            </p>
            {isFirstPurchase && isLoggedIn && (
              <div className="mt-6 mx-auto max-w-md rounded-lg bg-yellow-400/20 border border-yellow-300/30 p-4">
                <p className="text-yellow-100 font-semibold">
                  🎉 Welcome! Use code <span className="font-mono bg-white/20 px-2 py-1 rounded">WELCOME30</span> for 30% OFF
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Packages by Category with Vertical Tabs */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Vertical Tabs Navigation */}
              <div className="lg:col-span-1">
                <div className="space-y-3">
                  {packageCategories.map((category) => {
                    const colorClasses = {
                      blue: {
                        active: "bg-blue-600 text-white border-blue-600 shadow-lg",
                        inactive: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                        text: "text-blue-600 dark:text-blue-400",
                      },
                      purple: {
                        active: "bg-purple-600 text-white border-purple-600 shadow-lg",
                        inactive: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
                        text: "text-purple-600 dark:text-purple-400",
                      },
                      red: {
                        active: "bg-red-600 text-white border-red-600 shadow-lg",
                        inactive: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20",
                        text: "text-red-600 dark:text-red-400",
                      },
                      indigo: {
                        active: "bg-indigo-600 text-white border-indigo-600 shadow-lg",
                        inactive: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
                        text: "text-indigo-600 dark:text-indigo-400",
                      },
                    };
                    const tabColors = colorClasses[category.color as keyof typeof colorClasses] || colorClasses.blue;
                    const isActive = activeCategory === category.id;

                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                          isActive ? tabColors.active : tabColors.inactive
                        } shadow-md hover:shadow-lg`}
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <div className="text-left flex-1">
                          <div className="font-bold">{category.name}</div>
                          {isActive && (
                            <div className="text-xs opacity-90 mt-0.5">
                              {category.description}
                            </div>
                          )}
                        </div>
                        {isActive && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Category Content */}
              <div className="lg:col-span-3">
                {packageCategories.map((category) => {
                  if (activeCategory !== category.id) return null;

              const colorClasses = {
                blue: {
                  gradient: "from-blue-500 to-blue-600",
                  border: "border-blue-500",
                  text: "text-blue-600",
                  bg: "bg-blue-50 dark:bg-blue-900/20",
                  button: "bg-blue-600 hover:bg-blue-700",
                },
                purple: {
                  gradient: "from-purple-500 to-purple-600",
                  border: "border-purple-500",
                  text: "text-purple-600",
                  bg: "bg-purple-50 dark:bg-purple-900/20",
                  button: "bg-purple-600 hover:bg-purple-700",
                },
                red: {
                  gradient: "from-red-500 to-red-600",
                  border: "border-red-500",
                  text: "text-red-600",
                  bg: "bg-red-50 dark:bg-red-900/20",
                  button: "bg-red-600 hover:bg-red-700",
                },
                indigo: {
                  gradient: "from-indigo-500 to-indigo-600",
                  border: "border-indigo-500",
                  text: "text-indigo-600",
                  bg: "bg-indigo-50 dark:bg-indigo-900/20",
                  button: "bg-indigo-600 hover:bg-indigo-700",
                },
              };
              const colors = colorClasses[category.color as keyof typeof colorClasses] || colorClasses.blue;

              return (
                <div key={category.id} className="animate-in fade-in duration-500">
                  {/* Category Header */}
                  <div className={`mb-8 rounded-2xl ${colors.bg} p-6 border-2 ${colors.border}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-5xl">{category.icon}</span>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Packages Grid */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.packages.map((pkg, index) => {
                      const pricing = calculatePrice(pkg.price);
                      return (
                        <div
                          key={index}
                          className={`group relative rounded-2xl border-2 bg-white p-6 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800 ${
                            pkg.popular
                              ? `${colors.border} scale-105`
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {(pkg.badge || pkg.popular) && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                              <span className={`rounded-full px-4 py-1 text-xs font-semibold text-white ${colors.button}`}>
                                {pkg.badge || "Most Popular"}
                              </span>
                            </div>
                          )}
                          {isFirstPurchase && isLoggedIn && (
                            <div className="absolute -top-3 right-4 z-10">
                              <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-gray-900">
                                -30%
                              </span>
                            </div>
                          )}
                          
                          <div className="text-center">
                            {/* Data & Validity */}
                            <div className={`mb-4 inline-flex items-center gap-2 rounded-full ${colors.bg} px-4 py-2`}>
                              <span className={`text-2xl font-bold ${colors.text} dark:text-white`}>
                                {pkg.data}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {pkg.validity}
                              </span>
                            </div>

                            {/* Package Name */}
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {pkg.name.split("–")[1]?.trim() || pkg.name}
                            </h4>

                            {/* Description */}
                            {pkg.shortDescription && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 min-h-[2.5rem]">
                                {pkg.shortDescription}
                              </p>
                            )}

                            {/* Countries */}
                            <div className="mb-4">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                🌍 {pkg.countries}
                              </p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                              {pricing.discount > 0 ? (
                                <div>
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-lg text-gray-400 line-through">
                                      {pkg.currency}{pricing.original.toFixed(2)}
                                    </span>
                                    <span className={`text-3xl font-bold ${colors.text} dark:text-white`}>
                                      {pkg.currency}{pricing.discounted.toFixed(2)}
                                    </span>
                                  </div>
                                  <p className="text-xs text-green-600 font-semibold mt-1">
                                    Save {pkg.currency}{pricing.discount.toFixed(2)}
                                  </p>
                                </div>
                              ) : (
                                <span className={`text-3xl font-bold ${colors.text} dark:text-white`}>
                                  {pkg.currency}{pricing.original.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Features */}
                            <div className="mb-6 space-y-2 text-left text-sm">
                              <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">Instant Activation</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">No Roaming Fees</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">4G / 5G Ready</span>
                              </div>
                            </div>

                            {isFirstPurchase && isLoggedIn && (
                              <div className="mb-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-2">
                                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                  Code: <span className="font-mono font-bold">WELCOME15</span>
                                </p>
                              </div>
                            )}

                            {/* Buy Button */}
                            <button
                              onClick={() => handleCheckout(pkg)}
                              disabled={loading === pkg.name}
                              className={`w-full rounded-lg ${colors.button} px-6 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {loading === pkg.name ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing...
                                </span>
                              ) : (
                                "Buy Now"
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                How It Works
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Choose Plan</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Select and purchase the eSim plan that fits your needs
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Get QR Code</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Receive your QR code via email (within minutes)
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activate</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Scan the QR code from your phone&apos;s eSim settings
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  4
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Get instant internet connection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-800">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instant Activation</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Becomes active within minutes after purchase
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-800">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">150+ Countries</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Wide coverage area worldwide
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-800">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Affordable Prices</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Much more affordable than traditional roaming
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
