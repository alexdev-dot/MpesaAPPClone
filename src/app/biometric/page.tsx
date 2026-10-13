"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Fingerprint, Shield } from "lucide-react";

export default function BiometricPage() {
  const router = useRouter();
  const [unlockAppEnabled, setUnlockAppEnabled] = useState(false);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Back Arrow and Title - Fixed Header */}
      <div className="sticky top-0 z-20 bg-background">
        <div className="px-4 py-2 flex items-center justify-center relative">
          <button
            onClick={() => router.push("/profile")}
            className="absolute left-4 w-10 h-10 flex items-center justify-center bg-card border border-border rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" strokeWidth={2} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Biometric</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Fingerprint Icon */}
        <div className="flex items-center justify-center mt-12">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center relative">
            <Fingerprint className="w-14 h-14 text-mpesa-green" strokeWidth={1.5} />
            <div className="absolute inset-0 w-14 h-14 bg-linear-to-b from-transparent via-mpesa-red/40 to-transparent opacity-60"></div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center mt-6 px-4">
          <h2 className="text-lg font-semibold text-foreground mb-2">Turn on Biometrics?</h2>
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-nowrap">
            when enabled, you will use your device biometric to unlock<br />
            the app and authenticate your transactions
          </p>
        </div>

        {/* Unlock App Card */}
        <div className="bg-card mx-4 mt-6 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Left side - Icon and Text */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Shield - green */}
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="var(--mpesa-green)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Bug/Beetle - red */}
                  <circle cx="12" cy="12" r="2" stroke="var(--mpesa-red)" strokeWidth="1.5" fill="none" />
                  <path d="M12 10V8" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 14V16" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10 12H8" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 12H16" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10.5 10.5L9 9" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M13.5 10.5L15 9" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10.5 13.5L9 15" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M13.5 13.5L15 15" stroke="var(--mpesa-red)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-foreground">Unlock APP</h3>
                <p className="text-[10px] text-muted-foreground">
                  Turn on if you wish to use biometric to unlock the app
                </p>
              </div>
            </div>

            {/* Right side - Button */}
            <button
              onClick={() => setUnlockAppEnabled(!unlockAppEnabled)}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ${
                unlockAppEnabled ? "bg-mpesa-green" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                  unlockAppEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
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