"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  isFirstPurchase: boolean;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  isFirstPurchase: boolean;
  discountCode: string;
  useDiscount: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstPurchase, setIsFirstPurchase] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("primesim_user");
      const discountUsed = localStorage.getItem("primesim_discount_used");
      
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // Use setTimeout to avoid calling setState synchronously within effect
        setTimeout(() => {
          setUser(userData);
          if (!discountUsed) {
            setIsFirstPurchase(true);
          }
        }, 0);
      }
    }
  }, []);

  const login = (email: string, name: string) => {
    const userData: User = {
      email,
      name,
      isFirstPurchase: true,
    };
    setUser(userData);
    localStorage.setItem("primesim_user", JSON.stringify(userData));
    setIsFirstPurchase(true);
  };

  const logout = () => {
    setUser(null);
    setIsFirstPurchase(false);
    localStorage.removeItem("primesim_user");
  };

  const useDiscount = () => {
    localStorage.setItem("primesim_discount_used", "true");
    setIsFirstPurchase(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        logout,
        isFirstPurchase,
        discountCode: "WELCOME15",
        useDiscount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

