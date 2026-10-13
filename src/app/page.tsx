"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("has_seen_onboarding");

    // Navigate after splash completes (3.5 seconds)
    const timer = setTimeout(() => {
      if (hasSeenOnboarding) {
        router.push("/login");
      } else {
        router.push("/onboarding");
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
