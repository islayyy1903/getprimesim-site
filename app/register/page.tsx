"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser } from "../components/UserContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useUser();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Save user to localStorage
    const userData = {
      email,
      name,
      isFirstPurchase: true,
    };
    localStorage.setItem("primesim_user", JSON.stringify(userData));
    
    // Save user to database
    try {
      await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
    } catch (error) {
      console.error('Failed to save user to database:', error);
      // Continue anyway - user is saved in localStorage
    }
    
    login(email, name);

    // Redirect to eSim page
    router.push("/esim?welcome=true");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-600 to-cyan-700 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Create Account
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cyan-100">
              Join PrimeSim and get <span className="font-bold text-yellow-300">25% OFF</span> on your first purchase!
            </p>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-800">
              {/* Special Offer Banner */}
              <div className="mb-6 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 p-4 text-center">
                <p className="text-lg font-bold text-white">
                  🎉 Welcome Bonus: 25% OFF First Purchase!
                </p>
                <p className="mt-1 text-sm text-white/90">
                  Use code: <span className="font-mono font-bold">WELCOME25</span>
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    placeholder="Minimum 8 characters"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
                >
                  Create Account & Get 25% OFF
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Member Benefits:</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  25% discount on first purchase
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Exclusive member-only deals
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Order history tracking
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Faster checkout process
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
