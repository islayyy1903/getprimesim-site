import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | PrimeSim Support",
  description: "Get in touch with PrimeSim for questions, support, or inquiries about our eSim services. We're here to help with your digital SIM card needs.",
  keywords: [
    "contact primesim",
    "esim support",
    "esim help",
    "customer service",
    "esim questions",
  ],
  openGraph: {
    title: "Contact Us | PrimeSim Support",
    description: "Get in touch with PrimeSim for questions, support, or inquiries about our eSim services.",
    url: "https://getprimesim.com/contact",
    siteName: "PrimeSim",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
