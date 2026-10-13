"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenOnboarding = localStorage.getItem("has_seen_onboarding");
    if (hasSeenOnboarding) {
      router.push("/login");
    }
  }, [router]);

  const slides = [
    {
      image: "/assets/landing-onboarding/mockup-phone1.png",
      title: "Transact & Access your Favourite Services",
      description: "One place to manage your home WiFi, data, sms and airtime",
      highlightText: "Favourite Services",
    },
    {
      image: "/assets/landing-onboarding/mockup-phone2.png",
      title: "Manage your Data, SMS & Airtime",
      description: "One place to manage your home WiFi, data, sms and airtime",
      highlightText: "Data, SMS & Airtime",
    },
  ];

  const handleGetStarted = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem("has_seen_onboarding", "true");
      router.push("/login");
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/landing-onboarding/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-0% via-transparent via-10% to-white to-100%" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full w-full px-6 py-2">
        {/* Phone Mockup */}
        <div className="w-full relative max-w-7xl flex items-center justify-center mb-2">
          <div className="relative aspect-9/16 w-full max-h-[75vh]">
            <Image
              src={slides[currentSlide].image}
              alt={`Onboarding screen ${currentSlide + 1}`}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="w-full shrink-0">
          {/* Text Content */}
          <div className="text-center mb-2">
            <h1 className="text-base font-bold text-gray-900 mb-0.5">
              {slides[currentSlide].highlightText ? (
                <>
                  {slides[currentSlide].title.split(slides[currentSlide].highlightText)[0]}
                  <span className="text-green-600">{slides[currentSlide].highlightText}</span>
                  {slides[currentSlide].title.split(slides[currentSlide].highlightText)[1]}
                </>
              ) : (
                slides[currentSlide].title
              )}
            </h1>
            <p className="text-xs text-gray-600 leading-tight">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2 justify-center mb-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-6 bg-green-600"
                    : "w-1.5 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            className="w-full py-2.5 mb-4 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
}
