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
      { url: "/logo-icon.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/logo-icon.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    shortcut: "/logo-icon.svg",
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
    "logo": "https://getprimesim.com/logo.svg",
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
