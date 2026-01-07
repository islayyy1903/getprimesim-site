"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "./UserContext";

export default function Header() {
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-0 py-0 sm:px-0 lg:px-0">
        <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
          <Image 
            src="/logo.png" 
            alt="PrimeSim - eSim Services Logo" 
            width={384} 
            height={256}
            className="h-auto"
            style={{ display: 'block' }}
            priority
          />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400">
            Home
          </Link>
          <Link href="/esim" className="rounded-lg bg-cyan-600 px-3 py-1.5 text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-700">
            eSim
          </Link>
          <Link href="/contact" className="text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400">
            Contact
          </Link>
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400">
                Sign In
              </Link>
              <Link href="/register" className="group relative inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-3 py-1.5 font-semibold text-white transition-all hover:bg-cyan-700">
                <span>Sign Up</span>
                <span className="relative inline-flex items-center gap-0.5 bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-md" style={{
                  clipPath: 'polygon(0% 0%, calc(100% - 4px) 0%, 100% 50%, calc(100% - 4px) 100%, 0% 100%, 4px 50%)'
                }}>
                  <span className="animate-pulse">🔥</span>
                  <span>25%</span>
                  <span className="text-[10px]">OFF</span>
                </span>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/esim" 
              className="block rounded-lg bg-cyan-600 px-3 py-1.5 text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-700"
              onClick={closeMobileMenu}
            >
              eSim
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            {user ? (
              <>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="block w-full text-left text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  <Link 
                    href="/login" 
                    className="block text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/register" 
                    className="group relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-1.5 font-semibold text-white transition-all hover:bg-cyan-700"
                    onClick={closeMobileMenu}
                  >
                    <span>Sign Up</span>
                    <span className="relative inline-flex items-center gap-0.5 bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-md" style={{
                      clipPath: 'polygon(0% 0%, calc(100% - 4px) 0%, 100% 50%, calc(100% - 4px) 100%, 0% 100%, 4px 50%)'
                    }}>
                      <span className="animate-pulse">🔥</span>
                      <span>50%</span>
                      <span className="text-[10px]">OFF</span>
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
