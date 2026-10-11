"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, ArrowLeftRight, List, TrendingUp, LogOut, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ArrowLeftRight, label: "Transact", path: "/send" },
    { icon: List, label: "Services", path: "/services" },
    { icon: TrendingUp, label: "Grow", path: "/grow" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  isActive ? "text-[#4CAF50]" : "text-gray-500"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-50">
              <Menu className="w-6 h-6" />
            </Button>
          }
        />
        <SheetContent side="right" className="w-64">
          <div className="mt-8 space-y-4">
            <div className="text-center pb-4 border-b">
              <p className="text-sm text-gray-600">Welcome</p>
              <p className="font-semibold">{user?.phoneNumber}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => router.push("/statements")}
            >
              <TrendingUp className="w-4 h-4" />
              Statements
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
