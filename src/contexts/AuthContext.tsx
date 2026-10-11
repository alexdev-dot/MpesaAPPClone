"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  phoneNumber: string;
  name: string;
  balance: number;
  mshwariBalance: number;
  mshwariSavings: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string, pin: string) => boolean;
  logout: () => void;
  updateBalance: (amount: number) => void;
  updateMshwariBalance: (amount: number) => void;
  updateMshwariSavings: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("mpesa_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (phoneNumber: string, pin: string) => {
    if (phoneNumber.length === 10 && pin.length === 4) {
      const newUser: User = {
        phoneNumber,
        name: "Hussein",
        balance: 175,
        mshwariBalance: 0,
        mshwariSavings: 15000,
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("mpesa_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("mpesa_user");
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem("mpesa_user", JSON.stringify(updatedUser));
    }
  };

  const updateMshwariBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, mshwariBalance: user.mshwariBalance + amount };
      setUser(updatedUser);
      localStorage.setItem("mpesa_user", JSON.stringify(updatedUser));
    }
  };

  const updateMshwariSavings = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, mshwariSavings: user.mshwariSavings + amount };
      setUser(updatedUser);
      localStorage.setItem("mpesa_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateBalance,
        updateMshwariBalance,
        updateMshwariSavings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
