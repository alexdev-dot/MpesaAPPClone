"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  phoneNumber: string;
  name: string;
  email: string;
  balance: number;
  mshwariBalance: number;
  mshwariSavings: number;
  airtimeBalance: number;
  dataBalance: string;
  smsBalance: number;
  bongaPoints: number;
  fulizaBalance: number;
  fulizaLimit: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string, pin: string) => boolean;
  loginWithBiometric: () => Promise<boolean>;
  registerBiometric: () => Promise<boolean>;
  isBiometricAvailable: () => boolean;
  hasBiometricRegistered: () => boolean;
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
    // Don't auto-login - user must always enter PIN
    // But load user data if it exists for balance updates etc
    const storedUser = localStorage.getItem("mpesa_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Add missing fields for existing users
      const migratedUser = {
        ...parsedUser,
        email: parsedUser.email ?? "alex@example.com",
        fulizaBalance: parsedUser.fulizaBalance ?? 0,
        fulizaLimit: parsedUser.fulizaLimit ?? 500,
      };
      setUser(migratedUser);
      // Don't set isAuthenticated to true - user must login
      setIsAuthenticated(false);
    }
  }, []);

  const login = (phoneNumber: string, pin: string) => {
    // Allow any PIN for development
    if (phoneNumber.length === 10 && pin.length > 0) {
      const newUser: User = {
        phoneNumber,
        name: "Alex",
        email: "alex@example.com",
        balance: 175,
        mshwariBalance: 0,
        mshwariSavings: 15000,
        airtimeBalance: 0,
        dataBalance: "2.5 GB",
        smsBalance: 120,
        bongaPoints: 0,
        fulizaBalance: 0,
        fulizaLimit: 500,
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("mpesa_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const isBiometricAvailable = () => {
    return typeof window !== 'undefined' && 
           window.navigator !== undefined && 
           window.navigator.credentials !== undefined;
  };

  const hasBiometricRegistered = () => {
    return localStorage.getItem("biometric_credential_id") !== null;
  };

  const registerBiometric = async () => {
    if (!isBiometricAvailable()) {
      return false;
    }

    try {
      // Create a new credential for biometric registration
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const userId = new Uint8Array(16);
      crypto.getRandomValues(userId);

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: {
            name: "M-PESA Clone",
            id: window.location.hostname,
            icon: `${window.location.origin}/favicon-96x96.png`,
          },
          user: {
            id: userId,
            name: "user",
            displayName: "M-PESA User",
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 }, // ES256
            { type: "public-key", alg: -257 }, // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
        },
      } as CredentialCreationOptions);

      if (credential && credential.type === "public-key") {
        const publicKeyCredential = credential as PublicKeyCredential;
        // Store the credential ID for future authentication
        const credentialId = Array.from(new Uint8Array(publicKeyCredential.rawId))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        localStorage.setItem("biometric_credential_id", credentialId);
        return true;
      }
      return false;
    } catch (error) {
      // Silently handle user cancellation or errors
      return false;
    }
  };

  const loginWithBiometric = async () => {
    if (!isBiometricAvailable()) {
      return false;
    }

    const credentialId = localStorage.getItem("biometric_credential_id");
    if (!credentialId) {
      // No credential registered, need to register first
      return false;
    }

    try {
      // Convert stored credential ID back to Uint8Array
      const idArray = new Uint8Array(credentialId.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);

      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: challenge,
          allowCredentials: [{
            id: idArray,
            type: "public-key",
          }],
          userVerification: "required",
          timeout: 60000,
        },
      } as CredentialRequestOptions);

      if (credential) {
        // Biometric authentication successful
        const phoneNumber = "0712345678";
        const newUser: User = {
          phoneNumber,
          name: "Alex",
          email: "alex@example.com",
          balance: 175,
          mshwariBalance: 0,
          mshwariSavings: 15000,
          airtimeBalance: 0,
          dataBalance: "2.5 GB",
          smsBalance: 120,
          bongaPoints: 0,
          fulizaBalance: 0,
          fulizaLimit: 500,
        };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("mpesa_user", JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      // Silently handle user cancellation or errors
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("mpesa_user");
    localStorage.removeItem("biometric_credential_id");
    // Don't remove has_seen_onboarding - user should skip onboarding on logout
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
        loginWithBiometric,
        registerBiometric,
        isBiometricAvailable,
        hasBiometricRegistered,
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
