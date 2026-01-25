"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser } from "../components/UserContext";
import { fetchWithTimeout } from "../lib/fetchWithTimeout";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { useDiscount } = useUser();
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState<{ sessionId?: string; packageName?: string; customerEmail?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const discountAppliedRef = useRef(false);

  useEffect(() => {
    if (sessionId) {
      // Mark discount as used after successful payment (only once)
      if (!discountAppliedRef.current) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useDiscount(); // This is not a hook, just a function with "use" prefix
        discountAppliedRef.current = true;
      }
      
      // Fetch order status with timeout and retry
      fetchWithTimeout(`/api/order-status?session_id=${sessionId}`, {
        timeout: 30000, // 30 seconds timeout
        retries: 3, // Retry 3 times
        retryDelay: 1000, // 1 second delay between retries
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
          }
          return res.json();
        })
        .then((data) => {
          setOrderStatus(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching order status:", err);
          const errorMessage = err instanceof Error ? err.message : "Failed to fetch order status";
          setError(errorMessage);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <svg
                      className="h-12 w-12 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Payment Successful!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Thank you for your purchase. Your eSim QR code will be sent to your email within minutes.
                </p>
                {orderStatus && (
                  <div className="mb-8 rounded-lg border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-800 dark:bg-cyan-900/20">
                    <p className="text-sm text-cyan-800 dark:text-cyan-200">
                      <strong>Order ID:</strong> {orderStatus.sessionId?.substring(0, 20)}...
                    </p>
                    {orderStatus.packageName && (
                      <p className="text-sm text-cyan-800 dark:text-cyan-200 mt-2">
                        <strong>Package:</strong> {orderStatus.packageName}
                      </p>
                    )}
                    {orderStatus.customerEmail && (
                      <p className="text-sm text-cyan-800 dark:text-cyan-200 mt-2">
                        <strong>Email:</strong> {orderStatus.customerEmail}
                      </p>
                    )}
                  </div>
                )}
                {error && (
                  <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {error}
                    </p>
                  </div>
                )}
                <div className="space-y-4">
                  <Link
                    href="/esim"
                    className="inline-block rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
                  >
                    View More Plans
                  </Link>
                  <div>
                    <Link
                      href="/"
                      className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
                {orderStatus?.customerEmail && /@(hotmail|outlook|live|msn|yahoo)\./i.test(orderStatus.customerEmail) && (
                  <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Outlook / Hotmail / Yahoo kullanıyorsanız:</strong> E-postayı göremiyorsanız <strong>Gereksiz (Junk)</strong> klasörüne bakın. PrimeSim&apos;i &quot;Güvenilir gönderenler&quot;e ekleyin.
                    </p>
                  </div>
                )}
                <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What&apos;s Next?
                  </h3>
                  <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ Check your email for the QR code</li>
                    <li>✓ Scan the QR code in your phone&apos;s eSim settings</li>
                    <li>✓ Start using your eSim immediately</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </main>
        <Footer />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

