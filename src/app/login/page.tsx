"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

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
    <div className="h-screen bg-white flex flex-col overflow-hidden safe-area-inset" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100 shrink-0 pt-safe">
        <h1 className="flex-1 text-center text-lg font-medium text-gray-900" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>Enter your M-PESA PIN</h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center pt-4 pb-4 shrink-0">
        {/* Grey Profile Circle */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3 border-2 border-gray-300">
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        {/* User Name */}
        <h2 className="text-base font-medium text-gray-900 mb-1" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>User Name</h2>

        {/* Masked Phone Number */}
        <p className="text-gray-500 text-sm" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>***********</p>

        {/* Alert Message */}
        <div className="mt-3 px-4 py-2 bg-green-100 rounded-none">
          <p className="text-center text-green-800 text-sm" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
            This app will not use any of your data bundles
          </p>
        </div>
      </div>

      {/* PIN Entry Section */}
      <div className="flex flex-col items-center justify-start px-6 py-4 shrink-0">
        {/* PIN Squares */}
        <div className="flex gap-4 justify-center mb-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                pin[index]
                  ? "border-[#4CAF50] bg-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              {pin[index] && (
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
              )}
            </div>
          ))}
        </div>

        {/* Validating Message */}
        {isValidating && (
          <p className="text-center text-gray-600 text-sm animate-pulse mb-2" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
            Validating PIN...
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 text-sm font-medium mb-2" style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
            {error}
          </p>
        )}
      </div>

      {/* Numeric Keypad */}
      <div className="flex-1 px-6 pb-6 pt-8 flex items-end pb-safe">
        <div className="grid grid-cols-3 gap-4 w-full">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handlePinChange(pin + num)}
              disabled={isValidating}
              className="w-full h-18 rounded-lg bg-white hover:bg-gray-50 active:scale-95 text-3xl font-medium text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}
            >
              {num}
            </button>
          ))}
          <div className="w-full h-18" />
          <button
            type="button"
            onClick={() => handlePinChange(pin + "0")}
            disabled={isValidating}
            className="w-full h-18 rounded-lg bg-white hover:bg-gray-50 active:scale-95 text-3xl font-medium text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}
          >
            0
          </button>
          <button
            type="button"
            onClick={() => setPin(pin.slice(0, -1))}
            disabled={isValidating}
            className="w-full h-18 rounded-lg bg-white hover:bg-gray-50 active:scale-95 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6 text-[#4CAF50]"
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
    </div>
  );
}
