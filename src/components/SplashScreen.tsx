"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Start fade out animation after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setAnimateOut(true);
    }, 2500);

    // Navigate to login after animation completes (3.5 seconds total)
    const navigateTimer = setTimeout(() => {
      setShowSplash(false);
      router.push("/login");
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [router]);

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${
        animateOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          animateOut ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* M-Pesa Logo Image - Centered */}
        <img
          src="/assets/brands/safaricom-mpesa.png"
          alt="M-PESA"
          className="w-64 h-64 object-contain"
        />
      </div>
    </div>
  );
}
