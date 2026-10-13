"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showBiometricOption, setShowBiometricOption] = useState(false);
  const { login, loginWithBiometric, registerBiometric, isBiometricAvailable, hasBiometricRegistered, isAuthenticated } = useAuth();
  const router = useRouter();
  const biometricAttempted = useRef(false);

  const handleBiometricAuth = async () => {
    // Check if WebAuthn is supported
    if (!isBiometricAvailable()) {
      setError("Biometric authentication not supported on this device");
      return;
    }

    try {
      setIsValidating(true);
      setError("");

      // Check if biometric is already registered
      if (!hasBiometricRegistered()) {
        // First time - register biometric
        const registered = await registerBiometric();
        if (registered) {
          setError("Biometric registered! Try again to login.");
          setIsValidating(false);
          return;
        } else {
          setError("Biometric registration failed. Use PIN to login.");
          setIsValidating(false);
          return;
        }
      }

      // Biometric already registered - authenticate
      const success = await loginWithBiometric();
      if (success) {
        setError("");
        setIsValidating(false);
        setPin("");
      } else {
        setError("Authentication failed. Use PIN to login.");
        setIsValidating(false);
      }
    } catch (err) {
      // User cancelled or biometric not available
      setError("Use PIN to login");
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("has_seen_onboarding");
    if (!hasSeenOnboarding) {
      router.push("/splash");
    } else if (isAuthenticated) {
      router.push("/dashboard");
    } else if (isBiometricAvailable() && !biometricAttempted.current) {
      // Show biometric option if available
      biometricAttempted.current = true;
      setShowBiometricOption(true);
    }
  }, [isAuthenticated, router, isBiometricAvailable]);

  // Auto-submit when PIN is complete
  useEffect(() => {
    if (pin.length === 4 && !isValidating) {
      handleSubmit();
    }
  }, [pin, isValidating]);

  const handlePinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      setError("");
    }
  };

  const handleSubmit = () => {
    if (pin.length !== 4) {
      setError("Please enter your 4-digit M-PESA PIN");
      return;
    }

    setIsValidating(true);
    setError("");

    // Simulate validation delay
    setTimeout(() => {
      const phoneNumber = "0712345678";
      if (!login(phoneNumber, pin)) {
        setError("Wrong M-PESA PIN, please try again");
        setIsValidating(false);
      } else {
        setError("");
        setIsValidating(false);
        setPin("");
      }
    }, 1000);
  };


  return (
    <div className="h-screen bg-card flex flex-col overflow-hidden safe-area-inset" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center px-4 py-2 shrink-0 pt-safe">
        <h1 className="flex-1 text-center text-lg font-medium text-foreground" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
          {isValidating ? "Authenticating..." : "Enter your M-PESA PIN"}
        </h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center pt-10 pb-3 shrink-0">
        {/* Profile Image */}
        <div className="w-14 h-14 rounded-full overflow-hidden mb-3 border-2 border-border">
          <img
            src="/assets/avatars/profile-default.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Name */}
        <h2 className="text-sm font-medium text-foreground mb-2" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>User Name</h2>

        {/* Masked Phone Number */}
        <p className="text-muted-foreground text-xs mb-3" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>071*****78</p>

        {/* Biometric Prompt */}
        {showBiometricOption && !isValidating && (
          <button
            onClick={handleBiometricAuth}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-mpesa-green bg-card hover:bg-muted transition-all active:scale-95"
          >
            <svg
              className="w-5 h-5 text-mpesa-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.577-4.147"
              />
            </svg>
            <span className="text-xs font-medium text-mpesa-green" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
              {hasBiometricRegistered() ? "Use Biometric" : "Set up Biometric"}
            </span>
          </button>
        )}
      </div>

      {/* Alert Message Card */}
      <div className="px-6 py-2 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border max-w-xs mx-auto" style={{ backgroundColor: 'rgba(58, 163, 53, 0.15)', borderColor: 'rgba(58, 163, 53, 0.25)' }}>
          <img
            src="/assets/icons/common/info.png"
            alt="Info"
            className="w-4 h-4 shrink-0"
            style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(86deg) brightness(96%) contrast(97%)' }}
          />
          <p className="text-xs text-foreground font-medium" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
            This app will not use any of your data bundles
          </p>
        </div>
      </div>

      {/* PIN Entry Section */}
      <div className="flex flex-col items-center justify-start px-6 py-3 shrink-0">
        {/* PIN Squares */}
        <div className="flex gap-4 justify-center mb-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                pin[index]
                  ? "border-mpesa-green bg-card"
                  : "border bg-card dark:border-white/50"
              }`}
            >
              {pin[index] && (
                <div className="w-2.5 h-2.5 rounded-full bg-mpesa-green" />
              )}
            </div>
          ))}
        </div>

        {/* Validating Message */}
        {isValidating && (
          <p className="text-center text-muted-foreground text-xs animate-pulse mb-2" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
            Validating PIN...
          </p>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border max-w-xs mx-auto mb-2" style={{ backgroundColor: 'rgba(58, 163, 53, 0.15)', borderColor: 'rgba(58, 163, 53, 0.25)' }}>
            <img
              src="/assets/icons/common/info.png"
              alt="Info"
              className="w-4 h-4 shrink-0"
              style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(86deg) brightness(96%) contrast(97%)' }}
            />
            <p className="text-xs text-mpesa-red dark:text-white font-medium" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Numeric Keypad */}
      <div className="flex-1 px-6 pb-4 pt-2 flex items-end pb-safe">
        <div className="grid grid-cols-3 gap-2 w-full">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handlePinChange(pin + num)}
              disabled={isValidating}
              className="w-full rounded-lg bg-card hover:bg-muted active:scale-95 text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontSize: '10rem', lineHeight: '1', minHeight: '80px' }}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBiometricAuth}
            disabled={isValidating}
            className="w-full rounded-lg bg-card hover:bg-muted active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ minHeight: '80px' }}
            title="Use biometric authentication"
          >
            <svg
              className="w-6 h-6 text-mpesa-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.577-4.147"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handlePinChange(pin + "0")}
            disabled={isValidating}
            className="w-full rounded-lg bg-card hover:bg-muted active:scale-95 text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontSize: '10rem', lineHeight: '1', minHeight: '80px' }}
          >
            0
          </button>
          <button
            type="button"
            onClick={() => setPin(pin.slice(0, -1))}
            disabled={isValidating}
            className="w-full rounded-lg bg-card hover:bg-muted active:scale-95 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '80px' }}
          >
            <svg
              className="w-6 h-6 text-mpesa-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="px-6 pb-4 pt-2 shrink-0 border-t border-border mt-2">
        <p className="text-center text-[11px] text-muted-foreground leading-tight font-medium">
          Educational Clone Only — Not Affiliated with Safaricom
        </p>
        <p className="text-center text-[11px] text-muted-foreground leading-tight mt-1">
          For training and demonstration purposes only.
        </p>
      </div>
    </div>
  );
}
