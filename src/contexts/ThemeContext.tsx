"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Prevent FOUC by setting initial theme immediately
    const root = window.document.documentElement;
    const initialTheme = storedTheme || "system";
    const effectiveTheme = initialTheme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : initialTheme;

    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);

      // Determine effective theme based on user preference
      let effectiveTheme: "light" | "dark";
      if (theme === "system") {
        // Check system preference
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      } else {
        effectiveTheme = theme;
      }

      // Apply theme to document
      document.documentElement.classList.toggle("dark", effectiveTheme === "dark");
      document.documentElement.classList.toggle("light", effectiveTheme === "light");

      // Set meta theme-color for browser UI
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          "content",
          effectiveTheme === "dark" ? "#020302" : "#F5F5F5"
        );
      }
    }
  }, [theme, mounted]);

  // Listen for system theme changes when using "system" mode
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const effectiveTheme = mediaQuery.matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", effectiveTheme === "dark");
      document.documentElement.classList.toggle("light", effectiveTheme === "light");

      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          "content",
          effectiveTheme === "dark" ? "#020302" : "#F5F5F5"
        );
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const effectiveTheme: "light" | "dark" = !mounted
    ? "light"
    : theme === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
