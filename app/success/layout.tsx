import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful | PrimeSim",
  description: "Your eSim order has been processed successfully. Your QR code will be sent to your email shortly.",
  robots: {
    index: false, // Don't index success pages
    follow: false,
  },
  alternates: {
    canonical: "/success",
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
