import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy eSim Cards Online | 150+ Countries | PrimeSim",
  description: "Buy eSim cards for 150+ countries. Instant activation, no physical SIM needed. Choose from 1GB to Unlimited data plans. USA, UK, Europe, Asia, and more. Best prices, instant delivery via email.",
  keywords: [
    "buy esim",
    "esim card online",
    "digital sim card",
    "travel esim",
    "international esim",
    "usa esim",
    "europe esim",
    "asia esim",
    "unlimited data esim",
    "esim plans",
    "instant esim activation",
  ],
  openGraph: {
    title: "Buy eSim Cards Online | 150+ Countries | PrimeSim",
    description: "Buy eSim cards for 150+ countries. Instant activation, no physical SIM needed. Choose from 1GB to Unlimited data plans.",
    url: "https://getprimesim.com/esim",
    siteName: "PrimeSim",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://getprimesim.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PrimeSim - Buy eSim Cards Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy eSim Cards Online | 150+ Countries | PrimeSim",
    description: "Buy eSim cards for 150+ countries. Instant activation, no physical SIM needed.",
    images: ["https://getprimesim.com/og-image.jpg"],
  },
  alternates: {
    canonical: "/esim",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ESimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "eSim Card",
    "description": "Digital SIM card for international travel. Instant activation, works in 150+ countries.",
    "brand": {
      "@type": "Brand",
      "name": "PrimeSim",
    },
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "500+",
      "lowPrice": "3.99",
      "highPrice": "149.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
    },
    "category": "Telecommunications",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "eSim Card Service",
    "provider": {
      "@type": "Organization",
      "name": "PrimeSim",
      "url": "https://getprimesim.com",
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide",
    },
    "description": "Instant eSim activation service for travelers. Digital SIM cards for 150+ countries.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
