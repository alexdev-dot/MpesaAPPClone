"use client";

import { Moon, Settings, Check, ChevronLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeCard({
  isOpen,
  onClose,
}: ThemeCardProps) {
  const { theme, setTheme, effectiveTheme } = useTheme();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-none transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Theme Card */}
      <div className="relative rounded-t-2xl p-6 w-full mx-0 mb-0 shadow-2xl animate-slide-up bg-card">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 w-10 h-10 flex items-center justify-center bg-card border border-border rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" strokeWidth={2} />
        </button>

        {/* Card Title */}
        <h3 className="text-lg font-semibold mb-6 text-center text-foreground">Theme</h3>

        {/* Theme Options */}
        <div className="flex items-center justify-center gap-12">
          {/* Light Mode */}
          <button
            onClick={() => {
              setTheme("light");
              onClose();
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
              theme === "light" ? "bg-muted" : "bg-muted"
            }`}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <circle cx="12" cy="12" r="5" stroke={theme === "light" ? "var(--foreground)" : "#999999"} fill="none" />
                <line x1="12" y1="1" x2="12" y2="3" stroke="#dc2626" />
                <line x1="12" y1="21" x2="12" y2="23" stroke="#dc2626" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#dc2626" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#dc2626" />
                <line x1="1" y1="12" x2="3" y2="12" stroke="#dc2626" />
                <line x1="21" y1="12" x2="23" y2="12" stroke="#dc2626" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#dc2626" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#dc2626" />
              </svg>
              {theme === "light" && (
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center bg-mpesa-green">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">Light Mode</span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => {
              setTheme("dark");
              onClose();
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
              theme === "dark" ? "bg-muted" : "bg-muted"
            }`}>
              <Moon className={`w-7 h-7 ${theme === "dark" ? "text-foreground" : "text-gray-500"}`} strokeWidth={2} />
              {theme === "dark" && (
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center bg-mpesa-green">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">Dark Mode</span>
          </button>

          {/* System */}
          <button
            onClick={() => {
              setTheme("system");
              onClose();
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
              theme === "system" ? "bg-muted" : "bg-muted"
            }`}>
              <Settings className={`w-7 h-7 ${theme === "system" ? "text-foreground" : "text-gray-500"}`} strokeWidth={2} />
              {theme === "system" && (
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center bg-mpesa-green">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">System</span>
          </button>
        </div>
      </div>
    </div>
  );
}
