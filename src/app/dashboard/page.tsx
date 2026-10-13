"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Search, Menu, Send, ArrowUpRight, Smartphone, Wifi, MessageSquare, Star, MoreHorizontal, ChevronRight, TrendingUp, CreditCard, Calendar, X, User, ChevronDown, Bell, Wallet } from "lucide-react";

// Custom PATA MORE icon component
function PataMoreIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* PATA at the top */}
      <text
        x="8"
        y="16"
        textAnchor="start"
        fontSize="7"
        fontWeight="bold"
        fill="var(--mpesa-green)"
        fontFamily="Arial, sans-serif"
      >
        PATA
      </text>

      {/* M */}
      <text
        x="11"
        y="24"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="var(--mpesa-green)"
        fontFamily="Arial, sans-serif"
      >
        M
      </text>

      {/* Rectangle representing O */}
      <rect
        x="16"
        y="18"
        width="8"
        height="7"
        rx="2"
        fill="transparent"
        stroke="var(--mpesa-red)"
        strokeWidth="1.5"
      />

      {/* RE */}
      <text
        x="31"
        y="24"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="var(--mpesa-green)"
        fontFamily="Arial, sans-serif"
      >
        RE
      </text>
    </svg>
  );
}

// Custom Shopping Basket icon with red handle and green basket
function ShoppingBasketIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Handle - Red */}
      <path
        d="M6 6L7.5 3C7.8 2.4 8.4 2 9 2H15C15.6 2 16.2 2.4 16.5 3L18 6"
        stroke="var(--mpesa-red)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Basket body - Green */}
      <path
        d="M4 6H20L18.5 16C18.3 17.1 17.3 18 16.2 18H7.8C6.7 18 5.7 17.1 5.5 16L4 6Z"
        stroke="var(--mpesa-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Basket lines - Green */}
      <path
        d="M8 10V14"
        stroke="var(--mpesa-green)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 10V14"
        stroke="var(--mpesa-green)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 10V14"
        stroke="var(--mpesa-green)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Custom Home Internet icon with red Wi-Fi signal
function HomeInternetIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* House - Green */}
      <path
        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        stroke="var(--mpesa-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wi-Fi signal - Red with proper arcs */}
      <path
        d="M7 12C8.5 10.5 10.5 9.5 12 9.5C13.5 9.5 15.5 10.5 17 12"
        stroke="var(--mpesa-red)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 14C9.5 13 10.7 12.5 12 12.5C13.3 12.5 14.5 13 15.5 14"
        stroke="var(--mpesa-red)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16C10.5 15.5 11.2 15 12 15C12.8 15 13.5 15.5 14 16"
        stroke="var(--mpesa-red)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot - Red */}
      <circle
        cx="12"
        cy="18"
        r="1"
        fill="var(--mpesa-red)"
      />
    </svg>
  );
}

// Custom TUUNZA MAPATA icon with white text inside a circle
function TuunzaMapataIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle background */}
      <circle
        cx="28"
        cy="28"
        r="26"
        fill="var(--mpesa-green)"
      />

      {/* TUUNZA at the top */}
      <text
        x="28"
        y="22"
        textAnchor="middle"
        fontSize="9"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        TUUNZA
      </text>

      {/* MAPATA at the bottom */}
      <text
        x="28"
        y="38"
        textAnchor="middle"
        fontSize="9"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        MAPATA
      </text>
    </svg>
  );
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showFrequentDropdown, setShowFrequentDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Apps");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const frequentDropdownRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalCards = 2;
  const [isQRCodeCollapsed, setIsQRCodeCollapsed] = useState(false);
  const [showHelpCard, setShowHelpCard] = useState(false);

  // Get dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 17) return "Good afternoon,";
    return "Good evening,";
  };

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    setMounted(true);
    const storedBalanceVisible = localStorage.getItem("balanceVisible");
    if (storedBalanceVisible) {
      setBalanceVisible(storedBalanceVisible === "true");
    }
  }, []);

  // Show help card for 3 seconds when user enters dashboard
  useEffect(() => {
    console.log('Showing help card');
    setShowHelpCard(true);
    const timer = setTimeout(() => {
      console.log('Hiding help card');
      setShowHelpCard(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("balanceVisible", balanceVisible.toString());
    }
  }, [balanceVisible, mounted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (frequentDropdownRef.current && !frequentDropdownRef.current.contains(event.target as Node)) {
        setShowFrequentDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-transition slides
  useEffect(() => {
    const totalSlides = 4;
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Handle scroll to collapse QR code card
  useEffect(() => {
    const scrollElement = contentScrollRef.current;
    const handleScroll = () => {
      if (scrollElement) {
        const scrollY = scrollElement.scrollTop;
        if (scrollY > 50) {
          setIsQRCodeCollapsed(true);
        } else {
          setIsQRCodeCollapsed(false);
        }
      }
    };

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = 288 + 12; // card width (72 * 4) + gap (12)
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCard(Math.min(newIndex, totalCards - 1));
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const formatBalance = (amount: number | undefined) => {
    if (amount === undefined || amount === null) return "KSh 0.00";
    return `KSh ${amount.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const maskBalance = (amount: number | undefined) => {
    return "****";
  };

  const quickActions: Array<{
    icon: any;
    label: string;
    color: string;
    image?: string;
    hasCornerMarker?: boolean;
  }> = [
    { icon: Send, label: "Send Money", color: "bg-mpesa-green", image: "/assets/icons/common/send.png" },
    { icon: ShoppingBasketIcon, label: "Lipa na M-PESA", color: "bg-mpesa-green" },
    { icon: Wallet, label: "Withdraw Money", color: "bg-mpesa-green" },
    { icon: PataMoreIcon, label: "Buy Bundles", color: "bg-mpesa-green" },
    { icon: ArrowUpRight, label: "International Transfer", color: "bg-mpesa-green", image: "/assets/icons/dashboard/earth-grid-symbol.png" },
    { icon: MessageSquare, label: "Airtime Top up", color: "bg-mpesa-green", image: "/assets/icons/dashboard/phone-call.png", hasCornerMarker: true },
    { icon: Star, label: "Tunukiwa Bundles", color: "bg-mpesa-green", image: "/assets/icons/dashboard/bundle-gift.png" },
    { icon: HomeInternetIcon, label: "Home Internet", color: "bg-mpesa-green" },
  ];

  const frequentTransactions = [
    { name: "John Doe", phone: "0722 123 456", type: "Send Money" },
    { name: "Jane Smith", phone: "0733 987 654", type: "Send Money" },
    { name: "Supermarket", phone: "Pay Bill 123456", type: "Pay Bill" },
    { name: "Mary Johnson", phone: "0711 555 333", type: "Send Money" },
    { name: "KPLC", phone: "Pay Bill 888880", type: "Pay Bill" },
    { name: "Bob Wilson", phone: "0725 777 888", type: "Send Money" },
  ];

  const recentTransactions = [
    { id: 1, description: "Send Money to John Doe", recipient: "0722 123 456", date: "Today, 10:30 AM", amount: -1500, type: "sent" },
    { id: 2, description: "Received from Jane Smith", recipient: "0733 987 654", date: "Today, 9:15 AM", amount: 2500, type: "received" },
    { id: 3, description: "Pay Bill - KPLC", recipient: "888880", date: "Yesterday, 5:45 PM", amount: -2500, type: "bill" },
    { id: 4, description: "Buy Airtime", recipient: "Self", date: "Yesterday, 2:20 PM", amount: -100, type: "airtime" },
  ];

  const monthlySpending = {
    total: 8750,
    transactions: 23,
    period: "October 2026",
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-background px-4 py-1.5 flex items-center shrink-0 border-b border-border">
        {/* Profile Icon */}
        <div className="relative -ml-2">
          <button
            onClick={() => router.push("/profile")}
            className="relative"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/assets/avatars/profile-default.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dropdown Icon */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center border-2 border-mpesa-green">
              <ChevronDown className="w-2 h-2 text-mpesa-red" strokeWidth={2} />
            </div>
          </button>
        </div>

        {/* Greeting and Name */}
        <div className="flex flex-col ml-2">
          <div className="text-[10px] text-muted-foreground">{getGreeting()}</div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-foreground">{user?.name}</span>
            <span className="text-sm">👋</span>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="ml-auto flex items-center gap-3">
          <button className="relative w-8 h-8 bg-card rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" className="text-mpesa-green" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" className="text-mpesa-green" />
              <line x1="12" y1="8" x2="12" y2="14" className="text-mpesa-red" strokeWidth="1.5" />
            </svg>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-mpesa-red rounded-full border-2 border-background"></span>
          </button>
          <button className="w-8 h-8 bg-card rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" className="text-mpesa-green" />
              <path d="m21 21-4.35-4.35" className="text-mpesa-red" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div ref={contentScrollRef} className="flex-1 overflow-y-auto">
      {/* Balance Cards - Horizontal Scroll */}
      <div className="mx-3 mt-1 shrink-0">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto"
        >
          <div className="flex gap-3 pb-2">
          {/* M-PESA Balance Card */}
          <div className="bg-card rounded-xl p-3 shrink-0 w-72 flex flex-col relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-linear-to-b from-green-500 to-blue-500 rounded-l-xl" />
            <div className="flex items-center justify-between mb-1.5 ml-2">
              <span className="text-xs font-medium text-mpesa-green">M-PESA Balance</span>
            </div>
            <div className="flex items-center gap-2 mb-1 ml-2">
              <div className="text-base font-semibold text-foreground">
                {balanceVisible ? (
                  formatBalance(0)
                ) : (
                  <div className="h-5 w-28 bg-muted rounded animate-pulse" />
                )}
              </div>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                {balanceVisible ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                )}
              </button>
            </div>
            <div className="text-[10px] text-muted-foreground mb-1.5 ml-2">
              {balanceVisible ? (
                `Available fuliza: ${formatBalance(0)}`
              ) : null}
            </div>
            <button className="w-full py-0.5 mx-2 border border-mpesa-green text-mpesa-green font-medium rounded-md hover:bg-mpesa-green/10 transition-colors text-[9px] mt-auto">
              View Statements
            </button>
          </div>

          {/* My Balances Card */}
          <div className="bg-card rounded-xl p-3 shrink-0 w-72 flex flex-col relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-linear-to-b from-green-500 to-blue-500 rounded-l-xl" />
            <h3 className="text-xs font-medium text-mpesa-green mb-1.5 ml-2">My Balances</h3>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex flex-col items-start flex-1 ml-2">
                <div className="text-[10px] font-medium text-foreground mb-0.5">Airtime</div>
                <div className="text-base font-semibold text-foreground">KSh. 0.00</div>
              </div>
              <div className="h-8 w-px bg-border mx-4" />
              <div className="flex flex-col items-end flex-1 ml-4 mr-2 min-w-fit">
                <div className="text-[10px] font-medium text-foreground">Bonga</div>
                <div className="text-base font-semibold text-foreground">0 <span className="text-[10px] font-semibold text-foreground">Points</span></div>
              </div>
            </div>
            <button className="w-full py-0.5 mx-2 border border-mpesa-green text-mpesa-green font-medium rounded-md hover:bg-mpesa-green/10 transition-colors text-[9px] mt-auto">
              View All Balances
            </button>
          </div>
        </div>
        </div>
        {/* Carousel Dots */}
        <div className="flex justify-center gap-1.5 mt-1">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = 288 + 12; // card width + gap
                  scrollContainerRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: "smooth",
                  });
                }
              }}
              className={`h-0.5 rounded-full transition-all ${
                index === currentCard
                  ? "bg-mpesa-green w-4"
                  : "bg-muted w-1.5 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card mx-3 mt-1 rounded-md p-2 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-foreground">Quick Actions</h3>
          <button className="text-[10px] text-mpesa-green font-medium flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  if (action.label === "Send Money") {
                    router.push("/send-money");
                  } else if (action.label === "Lipa na M-PESA") {
                    router.push("/lipa-na-mpesa");
                  } else if (action.label === "Withdraw Money") {
                    router.push("/withdraw-money");
                  }
                }}
                className="flex flex-col items-center gap-1 p-1.5 rounded-lg"
              >
                <div className="w-11 h-11 bg-muted rounded-full flex items-center justify-center relative">
                  {action.image ? (
                    <img src={action.image} alt={action.label} className="w-5 h-5 object-contain" style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1000%) hue-rotate(110deg) brightness(90%) contrast(90%)'}} />
                  ) : action.icon === PataMoreIcon ? (
                    <PataMoreIcon className="w-9 h-9" />
                  ) : action.icon === ShoppingBasketIcon ? (
                    <ShoppingBasketIcon className="w-5 h-5" />
                  ) : action.icon === HomeInternetIcon ? (
                    <HomeInternetIcon className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5 text-mpesa-green" />
                  )}
                  {/* Red corner marker for Airtime Top up */}
                  {action.hasCornerMarker && (
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute w-3 h-3 top-1.5 right-1.5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 3H21V11"
                        stroke="#dc2626"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[10px] text-center text-foreground font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frequent Transactions */}
      <div className="bg-card mx-3 mt-1 rounded-md p-2 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-foreground">Frequents</h3>
          <button
            onClick={() => setShowFrequentDropdown(!showFrequentDropdown)}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                showFrequentDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Frequent Dropdown with Tabs */}
        {showFrequentDropdown && (
          <div className="mt-2">
            {/* Tabs */}
            <div className="bg-muted rounded-2xl flex mb-3">
              {["Apps", "Send", "Pay", "Bundles"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-3 py-0.5 text-[10px] font-medium rounded-xl transition-colors ${
                    activeTab === tab
                      ? "bg-mpesa-green text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-3">
              {activeTab === "Apps" && (
                <div className="text-center text-muted-foreground text-[10px]">
                  No apps added yet
                </div>
              )}
              {activeTab === "Send" && (
                <div className="text-center text-muted-foreground text-[10px]">
                  No frequent contacts for sending
                </div>
              )}
              {activeTab === "Pay" && (
                <div className="text-center text-muted-foreground text-[10px]">
                  No frequent payees
                </div>
              )}
              {activeTab === "Bundles" && (
                <div className="text-center text-muted-foreground text-[10px]">
                  No frequent bundle purchases
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Monthly Spending Summary */}
      <div className="mx-3 mt-1 mb-2">
        <div className="flex items-center mb-2">
          <h3 className="text-xs font-semibold text-foreground">Explore & Discover Deals 🔥</h3>
        </div>
        <div className="relative h-28 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 0 ? 1 : 0 }}
          >
            <img
              src="/assets/banners/slide1.png"
              alt="Deal 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 1 ? 1 : 0 }}
          >
            <img
              src="/assets/banners/slide2.jpg"
              alt="Deal 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 2 ? 1 : 0 }}
          >
            <img
              src="/assets/banners/slide3.jpg"
              alt="Deal 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 3 ? 1 : 0 }}
          >
            <img
              src="/assets/banners/slide4.jpg"
              alt="Deal 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* My Finances */}
      <div className="bg-card mx-3 mt-1 mb-2 rounded-md p-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">My Finances</h3>
          <button className="text-sm text-mpesa-green font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto pb-1" style={{ maxWidth: '320px' }}>
          <div className="flex justify-start" style={{ width: 'max-content', gap: '0px' }}>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-green-100/60 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/services/ziidi-trader.png"
                  alt="Ziidi Trader"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-[10px] text-center text-foreground font-medium">
                <span>Ziidi</span>
                <br />
                <span>trader</span>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-green-100/60 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src="/assets/services/ziidi.png"
                    alt="Ziiidi"
                    className="w-6 h-6 object-contain"
                    style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1000%) hue-rotate(110deg) brightness(90%) contrast(90%)'}}
                  />
                </div>
              </div>
              <div className="text-[10px] text-center text-foreground font-medium">
                <span>Ziiidi</span>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-green-100/60 rounded-lg flex items-center justify-center overflow-hidden">
                <TuunzaMapataIcon className="w-8 h-8" />
              </div>
              <div className="text-[10px] text-center text-foreground font-medium">
                <span>Tuunza</span>
                <br />
                <span>Mapata</span>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-purple-100/60 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <img
                    src="/assets/brands/shiriki-pay.png"
                    alt="Shiriki Pay"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
              <span className="text-[10px] text-center text-foreground font-medium">Shiriki Pay</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-green-100/60 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mpesa-green)' }}>
                  <img
                    src="/assets/icons/common/Mali.png"
                    alt="Mali"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
              <div className="text-[10px] text-center text-foreground font-medium">
                <span>Mali</span>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-gray-300/60 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/services/Mpesa-ratiba.png"
                  alt="M-pesa Ratiba"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="text-[10px] text-center text-foreground font-medium">
                <span>M-pesa</span>
                <br />
                <span>Ratiba</span>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-orange-100/60 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/services/mpesa-GO.png"
                  alt="Mpesa Go"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="text-[10px] text-center text-foreground font-medium">
                <span>Mpesa</span>
                <br />
                <span>Go</span>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 p-1 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-purple-100/60 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src="/assets/services/M-Shwari.jpg"
                    alt="M-Shwari"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
              <div className="text-[10px] text-center text-foreground font-medium">
                <span>M-Shwari</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Entertainment */}
      <div className="bg-card mx-3 mt-1 mb-2 rounded-md p-2">
        <div className="flex items-center justify-start mb-2">
          <h3 className="text-xs font-semibold text-foreground">Entertainment</h3>
        </div>
        <div className="flex justify-start gap-3">
          <button className="flex flex-col items-center gap-1 p-1 rounded-lg">
            <div className="w-12 h-12 bg-purple-100/60 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/assets/services/baze.png"
                alt="Baze"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[10px] text-center text-foreground font-medium">Baze</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-1 rounded-lg">
            <div className="w-12 h-12 bg-blue-100/60 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/assets/services/games.png"
                alt="Games"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[10px] text-center text-foreground font-medium">Games</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-1 rounded-lg">
            <div className="w-12 h-12 bg-orange-100/60 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/assets/services/news-paper.png"
                alt="News Paper"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[10px] text-center text-foreground font-medium">News Paper</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-1 rounded-lg">
            <div className="w-12 h-12 bg-green-100/60 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/assets/services/skiza.png"
                alt="Skiza"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[10px] text-center text-foreground font-medium">Skiza</span>
          </button>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-background/95 backdrop-blur-sm px-3 py-1 border-t border-border mt-2">
        <p className="text-center text-[9px] text-muted-foreground leading-tight">
          Educational Clone Only — Not Affiliated with Safaricom. For training and demonstration purposes only.
        </p>
      </div>
      </div>

      {/* Floating Help Card - Bouncing Animation */}
      {showHelpCard && (
        <button
          onClick={() => router.push("/chat-zuri")}
          className="fixed bottom-24 right-20 message-card px-2 py-1 rounded-md shadow-md z-50 animate-bounce-smooth max-w-none flex items-center hover:opacity-80 transition-opacity"
        >
          <span className="text-[10px] font-medium whitespace-nowrap">Need help? Talk to zuri</span>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] message-card-pointer"></div>
        </button>
      )}

      {/* Floating Avatar on Bottom Right */}
      <button
        onClick={() => router.push("/chat-zuri")}
        className="fixed bottom-20 right-3 w-14 h-14 bg-card rounded-xl shadow-lg flex items-center justify-center border-2 border-border z-50 hover:bg-muted transition-colors"
      >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <img
            src="/assets/avatars/zuri-avatar.png"
            alt="Zuri Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </button>

      {/* Floating QR Code below Avatar */}
      <button
        onClick={() => router.push("/chat-zuri")}
        className={`fixed bottom-4 right-3 bg-card rounded-lg shadow-lg border-2 border-border z-50 flex items-center transition-all duration-300 ease-in-out hover:bg-muted ${isQRCodeCollapsed ? 'w-14 h-14 p-0 justify-center' : 'w-48 h-12 p-2 justify-between'}`}
      >
        <div className={`w-7 h-7 bg-card rounded flex items-center justify-center relative ${isQRCodeCollapsed ? 'mx-auto' : 'ml-4'}`}>
          {/* Top-left corner marker outside QR code */}
          <svg
            viewBox="0 0 24 24"
            className={`absolute w-5 h-5 transition-all duration-300 ${isQRCodeCollapsed ? 'top-0 left-0' : '-top-1 -left-1'}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11V3H11"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Top-right corner marker outside QR code */}
          <svg
            viewBox="0 0 24 24"
            className={`absolute w-5 h-5 transition-all duration-300 ${isQRCodeCollapsed ? 'top-0 right-0' : '-top-1 -right-1'}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 11V3H13"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Bottom-left corner marker outside QR code */}
          <svg
            viewBox="0 0 24 24"
            className={`absolute w-5 h-5 transition-all duration-300 ${isQRCodeCollapsed ? 'bottom-0 left-0' : '-bottom-1 -left-1'}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 13V21H11"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Bottom-right corner marker outside QR code */}
          <svg
            viewBox="0 0 24 24"
            className={`absolute w-5 h-5 transition-all duration-300 ${isQRCodeCollapsed ? 'bottom-0 right-0' : '-bottom-1 -right-1'}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 13V21H13"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg className="w-6 h-6 text-mpesa-green" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="6" height="6" rx="1" />
            <rect x="4" y="4" width="2" height="2" fill="currentColor" />
            <rect x="16" y="2" width="6" height="6" rx="1" />
            <rect x="18" y="4" width="2" height="2" fill="currentColor" />
            <rect x="2" y="16" width="6" height="6" rx="1" />
            <rect x="4" y="18" width="2" height="2" fill="currentColor" />
            <rect x="10" y="2" width="2" height="2" />
            <rect x="12" y="4" width="2" height="2" />
            <rect x="14" y="6" width="2" height="2" />
            <rect x="10" y="8" width="2" height="2" />
            <rect x="12" y="10" width="2" height="2" />
            <rect x="14" y="12" width="2" height="2" />
            <rect x="10" y="14" width="2" height="2" />
            <rect x="12" y="16" width="2" height="2" />
            <rect x="16" y="10" width="2" height="2" />
            <rect x="18" y="12" width="2" height="2" />
            <rect x="20" y="14" width="2" height="2" />
            <rect x="16" y="16" width="2" height="2" />
            <rect x="18" y="18" width="2" height="2" />
            <rect x="10" y="18" width="2" height="2" />
            <rect x="12" y="20" width="2" height="2" />
          </svg>
        </div>
        <span className={`flex-1 mr-2 ml-3 text-[11px] font-semibold text-foreground ${isQRCodeCollapsed ? 'hidden' : 'opacity-100'}`}>Scan to Pay</span>
      </button>
    </div>
  );
}
