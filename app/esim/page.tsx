"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser } from "../components/UserContext";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe - works in both client and server
const getStripeKey = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  }
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};

const stripeKey = getStripeKey();
const stripePromise = stripeKey && !stripeKey.includes("YOUR_PUBLISHABLE_KEY") && stripeKey.startsWith("pk_")
  ? loadStripe(stripeKey) 
  : null;

export default function eSimPage() {
  const { user, isLoggedIn, isFirstPurchase } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (pkg: typeof packages[0]) => {
    setLoading(pkg.name);
    try {
      const checkoutData = {
        packageId: pkg.name.toLowerCase().replace(/\s+/g, "-"),
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
        } catch (e) {
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
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(`Failed to start payment: ${error.message || "Unknown error"}\n\nPlease check the browser console (F12) for details.`);
      setLoading(null);
    }
  };

  const packages = [
    {
      name: "USA eSIM – 1GB",
      data: "1GB",
      validity: "7 days",
      countries: "United States",
      price: 6.99,
      currency: "$",
      popular: false,
      badge: null,
      shortDescription: "Fast & Reliable Data in the USA",
      features: [
        "1GB High-Speed Data",
        "Valid for 7 Days",
        "Instant eSIM Delivery",
        "Works on 4G / 5G Networks",
        "No Roaming Fees",
      ],
    },
    {
      name: "USA eSIM – 3GB",
      data: "3GB",
      validity: "30 days",
      countries: "United States",
      price: 12.99,
      currency: "$",
      popular: true,
      badge: "🔥 Most Popular",
      shortDescription: "Best Value for Travelers to the USA",
      features: [
        "3GB High-Speed Data",
        "Valid for 30 Days",
        "Instant Activation",
        "Stable 4G / 5G Coverage",
        "No Physical SIM Needed",
      ],
    },
    {
      name: "UK eSIM – 1GB",
      data: "1GB",
      validity: "7 days",
      countries: "United Kingdom",
      price: 5.99,
      currency: "£",
      popular: false,
      badge: null,
      shortDescription: "Stay Connected Across the UK",
      features: [
        "1GB High-Speed Data",
        "7 Days Validity",
        "Instant eSIM QR Code",
        "No Contracts",
      ],
    },
    {
      name: "UK eSIM – 3GB",
      data: "3GB",
      validity: "30 days",
      countries: "United Kingdom",
      price: 11.99,
      currency: "£",
      popular: false,
      badge: "⭐ Best Value",
      shortDescription: "Perfect for UK Travel & Business",
      features: [
        "3GB Data",
        "30 Days",
        "Fast & Secure Connection",
        "Easy Setup",
      ],
    },
    {
      name: "Germany eSIM – 1GB",
      data: "1GB",
      validity: "7 days",
      countries: "Germany",
      price: 5.99,
      currency: "€",
      popular: false,
      badge: null,
      shortDescription: "Reliable Internet in Germany",
      features: [
        "1GB High-Speed Data",
        "7 Days",
        "Works Nationwide",
        "Instant Activation",
      ],
    },
    {
      name: "Germany eSIM – 3GB",
      data: "3GB",
      validity: "30 days",
      countries: "Germany",
      price: 11.99,
      currency: "€",
      popular: false,
      badge: "⭐ Best Value",
      shortDescription: "Ideal for Extended Stays in Germany",
      features: [
        "3GB Data",
        "30 Days",
        "No Roaming Charges",
        "Secure 4G / 5G",
      ],
    },
    {
      name: "Global eSIM – 1GB",
      data: "1GB",
      validity: "7 days",
      countries: "150+ countries",
      price: 9.99,
      currency: "$",
      popular: false,
      badge: null,
      shortDescription: "Emergency Data Anywhere in the World",
      features: [
        "1GB Global Coverage",
        "7 Days",
        "Works in Multiple Countries",
        "Instant Setup",
      ],
    },
    {
      name: "Global eSIM – 3GB",
      data: "3GB",
      validity: "30 days",
      countries: "150+ countries",
      price: 24.99,
      currency: "$",
      popular: false,
      badge: "🌍 Premium",
      shortDescription: "One eSIM. Multiple Countries.",
      features: [
        "3GB Global Data",
        "30 Days",
        "Ideal for Multi-Country Travel",
        "No SIM Swapping",
      ],
    },
  ];

  const calculatePrice = (price: number) => {
    if (isFirstPurchase && isLoggedIn) {
      const discount = price * 0.15;
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
          "text": "Yes! New customers who sign up get 15% off their first purchase. Simply create an account and the discount will be applied automatically.",
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
                  🎉 Welcome! Use code <span className="font-mono bg-white/20 px-2 py-1 rounded">WELCOME15</span> for 15% OFF
                </p>
              </div>
            )}
            {!isLoggedIn && (
              <div className="mt-6">
                <p className="text-blue-100 mb-2">New customers get 15% off first purchase!</p>
                <Link
                  href="/register"
                  className="inline-block rounded-lg bg-yellow-400 px-6 py-3 text-base font-semibold text-blue-900 shadow-lg transition-all hover:bg-yellow-300"
                >
                  Sign Up for Discount (Optional)
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
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

        {/* Packages */}
        <section className="bg-gray-50 py-16 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Plans
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                Choose the plan that fits your needs
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg, index) => {
                const pricing = calculatePrice(pkg.price);
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl border-2 bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 ${
                      pkg.popular
                        ? "border-blue-500 scale-105"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {(pkg.badge || pkg.popular) && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                          {pkg.badge || "Most Popular"}
                        </span>
                      </div>
                    )}
                    {isFirstPurchase && isLoggedIn && (
                      <div className="absolute -top-4 right-4">
                        <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-gray-900">
                          -15%
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.name}</h3>
                      {pkg.shortDescription && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {pkg.shortDescription}
                        </p>
                      )}
                      <div className="mt-4">
                        {pricing.discount > 0 ? (
                          <div>
                            <span className="text-2xl text-gray-400 line-through">{pkg.currency || "$"}{pricing.original.toFixed(2)}</span>
                            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 ml-2">
                              {pkg.currency || "$"}{pricing.discounted.toFixed(2)}
                            </span>
                            <div className="mt-1 text-sm text-green-600 font-semibold">
                              Save {pkg.currency || "$"}{pricing.discount.toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{pkg.currency || "$"}{pricing.original.toFixed(2)}</span>
                        )}
                      </div>
                      {pkg.features && pkg.features.length > 0 && (
                        <div className="mt-6 space-y-2 text-left">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {isFirstPurchase && isLoggedIn && (
                        <div className="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-2">
                          <p className="text-xs text-yellow-800 dark:text-yellow-200">
                            Discount code: <span className="font-mono font-bold">WELCOME15</span>
                          </p>
                        </div>
                      )}
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <span>✅</span> Instant Delivery
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span>✅</span> No Roaming
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span>✅</span> Secure Payment
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleCheckout(pkg)}
                        disabled={loading === pkg.name}
                        className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading === pkg.name ? "Processing..." : "Buy Now"}
                      </button>
                    </div>
                  </div>
                );
              })}
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
                  Scan the QR code from your phone's eSim settings
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
      </main>
      <Footer />
    </div>
  );
}
