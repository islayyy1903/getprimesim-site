import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./components/UserContext";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeSim - eSim Services | Worldwide Mobile Data Plans",
  description: "Premium eSim services for travelers and digital nomads. Stay connected worldwide with instant activation, 150+ country coverage, and affordable prices. Get your digital SIM card today!",
  metadataBase: new URL("https://getprimesim.com"),
  alternates: {
    canonical: "/",
  },
  keywords: ["esim", "esim card", "digital sim", "travel sim", "mobile data", "international sim", "roaming", "travel internet", "esim plans", "global connectivity"],
  openGraph: {
    title: "PrimeSim - eSim Services | Worldwide Mobile Data Plans",
    description: "Premium eSim services for travelers and digital nomads. Stay connected worldwide with instant activation, 150+ country coverage, and affordable prices.",
    url: "https://getprimesim.com",
    siteName: "PrimeSim",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://getprimesim.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PrimeSim - eSim Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeSim - eSim Services | Worldwide Mobile Data Plans",
    description: "Premium eSim services for travelers and digital nomads. Stay connected worldwide with instant activation.",
    images: ["https://getprimesim.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "hicGUyJdEwjxF5oH3e6FQ",
  },
  icons: {
    icon: [
      { url: "/icon.png?v=7", sizes: "512x341", type: "image/png" },
      { url: "/favicon.ico?v=7", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=7", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PrimeSim",
    "url": "https://getprimesim.com",
    "logo": "https://getprimesim.com/logo.png",
    "description": "Premium eSim services for travelers and digital nomads worldwide",
    "email": "info@getprimesim.com",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@getprimesim.com",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png?v=7" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
