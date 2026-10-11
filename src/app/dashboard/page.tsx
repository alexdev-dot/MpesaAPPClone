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
        fill="#16a34a"
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
        fill="#16a34a"
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
        stroke="#dc2626"
        strokeWidth="1.5"
      />

      {/* RE */}
      <text
        x="31"
        y="24"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="#16a34a"
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
        stroke="#dc2626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Basket body - Green */}
      <path
        d="M4 6H20L18.5 16C18.3 17.1 17.3 18 16.2 18H7.8C6.7 18 5.7 17.1 5.5 16L4 6Z"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Basket lines - Green */}
      <path
        d="M8 10V14"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 10V14"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 10V14"
        stroke="#16a34a"
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
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wi-Fi signal - Red with proper arcs */}
      <path
        d="M7 12C8.5 10.5 10.5 9.5 12 9.5C13.5 9.5 15.5 10.5 17 12"
        stroke="#dc2626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 14C9.5 13 10.7 12.5 12 12.5C13.3 12.5 14.5 13 15.5 14"
        stroke="#dc2626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16C10.5 15.5 11.2 15 12 15C12.8 15 13.5 15.5 14 16"
        stroke="#dc2626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot - Red */}
      <circle
        cx="12"
        cy="18"
        r="1"
        fill="#dc2626"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showFrequentDropdown, setShowFrequentDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Apps");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const frequentDropdownRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalCards = 2;
  const [isQRCodeCollapsed, setIsQRCodeCollapsed] = useState(false);

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
    { icon: Send, label: "Send Money", color: "bg-green-500", image: "/assets/icons/send.png" },
    { icon: ShoppingBasketIcon, label: "Lipa na M-PESA", color: "bg-green-500" },
    { icon: Wallet, label: "Withdraw Money", color: "bg-green-500" },
    { icon: PataMoreIcon, label: "Buy Bundles", color: "bg-green-500" },
    { icon: ArrowUpRight, label: "International Transfer", color: "bg-green-500", image: "/assets/icons/earth-grid-symbol.png" },
    { icon: MessageSquare, label: "Airtime Top up", color: "bg-green-500", image: "/assets/icons/phone-call.png", hasCornerMarker: true },
    { icon: Star, label: "Tunukiwa Bundles", color: "bg-green-500", image: "/assets/icons/bundle-gift.png" },
    { icon: HomeInternetIcon, label: "Home Internet", color: "bg-green-500" },
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
    <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-2 flex items-center shrink-0">
        {/* Profile Icon */}
        <div className="relative -ml-2">
          <button
            onClick={() => router.push("/profile")}
            className="relative"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/assets/profile image.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>

        {/* Greeting and Name */}
        <div className="flex flex-col ml-3">
          <div className="text-sm text-gray-500">{getGreeting()}</div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900">{user?.name}</span>
            <span className="text-xl">👋</span>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="ml-auto flex items-center gap-4">
          <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" className="text-green-600" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" className="text-green-600" />
              <line x1="12" y1="8" x2="12" y2="14" className="text-red-500" strokeWidth="1.5" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" className="text-green-600" />
              <path d="m21 21-4.35-4.35" className="text-red-500" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div ref={contentScrollRef} className="flex-1 overflow-y-auto">
      {/* Balance Cards - Horizontal Scroll */}
      <div className="mx-4 mt-2 shrink-0">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto"
        >
          <div className="flex gap-3 pb-2">
          {/* M-PESA Balance Card */}
          <div className="bg-white rounded-xl p-4 shrink-0 w-72 flex flex-col relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-linear-to-b from-green-500 to-blue-500 rounded-l-xl" />
            <div className="flex items-center justify-between mb-2 ml-2">
              <span className="text-sm font-medium text-green-600">M-PESA Balance</span>
            </div>
            <div className="flex items-center gap-2 mb-1 ml-2">
              <div className="text-lg font-semibold text-gray-900">
                {balanceVisible ? (
                  formatBalance(0)
                ) : (
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                )}
              </div>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                {balanceVisible ? (
                  <EyeOff className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                ) : (
                  <Eye className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-600 mb-2 ml-2">
              {balanceVisible ? (
                `Available fuliza: ${formatBalance(0)}`
              ) : (
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              )}
            </div>
            <button className="w-full py-1.5 mx-2 border border-green-500 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors text-sm mt-auto">
              View Statements
            </button>
          </div>

          {/* My Balances Card */}
          <div className="bg-white rounded-xl p-4 shrink-0 w-72 flex flex-col relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-linear-to-b from-green-500 to-blue-500 rounded-l-xl" />
            <h3 className="text-sm font-medium text-green-600 mb-2 ml-2">My Balances</h3>
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col items-start flex-1 ml-2">
                <div className="text-xs font-medium text-gray-900 mb-0.5">Airtime</div>
                <div className="text-lg font-semibold text-gray-900">KSh. 0.00</div>
              </div>
              <div className="h-8 w-px bg-gray-300 mx-4" />
              <div className="flex flex-col items-end flex-1 ml-4 mr-2 min-w-fit">
                <div className="text-xs font-medium text-gray-900">Bonga</div>
                <div className="text-lg font-semibold text-gray-900">0 <span className="text-xs font-semibold text-gray-900">Points</span></div>
              </div>
            </div>
            <button className="w-full py-1.5 mx-2 border border-green-500 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors text-sm mt-auto">
              View All Balances
            </button>
          </div>
        </div>
        </div>
        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-2">
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
              className={`h-1 rounded-full transition-all ${
                index === currentCard
                  ? "bg-green-500 w-6"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white mx-4 mt-2 rounded-md p-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Quick Actions</h3>
          <button className="text-sm text-green-600 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-center gap-2 p-2 rounded-lg"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center relative">
                  {action.image ? (
                    <img src={action.image} alt={action.label} className="w-5 h-5 object-contain" style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1000%) hue-rotate(110deg) brightness(90%) contrast(90%)'}} />
                  ) : action.icon === PataMoreIcon ? (
                    <PataMoreIcon className="w-9 h-9 text-green-600" />
                  ) : action.icon === ShoppingBasketIcon ? (
                    <ShoppingBasketIcon className="w-5 h-5" />
                  ) : action.icon === HomeInternetIcon ? (
                    <HomeInternetIcon className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5 text-green-600" />
                  )}
                  {/* Red corner marker for Airtime Top up */}
                  {action.hasCornerMarker && (
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute w-4 h-4 top-2 right-2"
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
                <span className="text-xs text-center text-gray-700 font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frequent Transactions */}
      <div className="bg-white mx-4 mt-2 rounded-md p-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Frequent</h3>
          <button
            onClick={() => setShowFrequentDropdown(!showFrequentDropdown)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                showFrequentDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Frequent Dropdown with Tabs */}
        {showFrequentDropdown && (
          <div className="mt-3">
            {/* Tabs */}
            <div className="bg-slate-100 rounded-2xl flex mb-4">
              {["Apps", "Send", "Pay", "Bundles"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-1 text-sm font-medium rounded-xl transition-colors ${
                    activeTab === tab
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-4">
              {activeTab === "Apps" && (
                <div className="text-center text-gray-500 text-sm">
                  No apps added yet
                </div>
              )}
              {activeTab === "Send" && (
                <div className="text-center text-gray-500 text-sm">
                  No frequent contacts for sending
                </div>
              )}
              {activeTab === "Pay" && (
                <div className="text-center text-gray-500 text-sm">
                  No frequent payees
                </div>
              )}
              {activeTab === "Bundles" && (
                <div className="text-center text-gray-500 text-sm">
                  No frequent bundle purchases
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Monthly Spending Summary */}
      <div className="mx-4 mt-2 mb-4">
        <div className="flex items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Explore & Discover Deals 🔥</h3>
        </div>
        <div className="relative h-40 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 0 ? 1 : 0 }}
          >
            <img
              src="/assets/banner/slide1.png"
              alt="Deal 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 1 ? 1 : 0 }}
          >
            <img
              src="/assets/banner/slide2.jpg"
              alt="Deal 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 2 ? 1 : 0 }}
          >
            <img
              src="/assets/banner/slide3.jpg"
              alt="Deal 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === 3 ? 1 : 0 }}
          >
            <img
              src="/assets/banner/slide4.jpg"
              alt="Deal 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* My Finances */}
      <div className="bg-white mx-4 mt-2 mb-4 rounded-md p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">My Finances</h3>
          <button className="text-sm text-green-600 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-start">
          <button className="flex flex-col items-center gap-2 p-2 rounded-lg">
            <div className="w-14 h-14 bg-green-100/60 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/assets/ziidi-trader.png"
                alt="Ziidi Trader"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs text-center text-gray-700 font-medium">Ziidi Trader</span>
          </button>
        </div>
      </div>

      {/* Entertainment */}
      <div className="bg-white mx-4 mt-2 mb-4 rounded-md p-3">
        <div className="flex items-center justify-start mb-3">
          <h3 className="font-semibold text-gray-900">Entertainment</h3>
        </div>
        <div className="flex justify-start">
          <button className="flex flex-col items-center gap-2 p-2 rounded-lg">
            <div className="w-14 h-14 bg-purple-100/60 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/assets/baze.png"
                alt="Baze"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs text-center text-gray-700 font-medium">Baze</span>
          </button>
        </div>
      </div>
      </div>

      {/* Floating Avatar on Bottom Right */}
      <div className="fixed bottom-24 right-4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-gray-200 z-50">
        <img
          src="/assets/zuri-avatar.png"
          alt="Zuri Avatar"
          className="w-14 h-14 rounded-lg object-cover"
        />
      </div>

      {/* Floating QR Code below Avatar */}
      <div
        className={`fixed bottom-6 right-4 bg-white rounded-lg shadow-lg border-2 border-gray-200 z-50 flex items-center transition-all duration-300 ease-in-out ${isQRCodeCollapsed ? 'w-16 h-16 p-0 justify-center' : 'w-52 p-2 justify-between'}`}
      >
        <div className={`w-10 h-10 bg-gray-100 rounded flex items-center justify-center relative ${isQRCodeCollapsed ? 'mx-auto' : 'ml-4'}`}>
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
          <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="6" height="6" rx="1" />
            <rect x="4" y="4" width="2" height="2" fill="white" />
            <rect x="16" y="2" width="6" height="6" rx="1" />
            <rect x="18" y="4" width="2" height="2" fill="white" />
            <rect x="2" y="16" width="6" height="6" rx="1" />
            <rect x="4" y="18" width="2" height="2" fill="white" />
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
        <div className={`flex flex-col flex-1 mr-4 ml-10 text-center ${isQRCodeCollapsed ? 'hidden' : 'opacity-100'}`}>
          <span className="text-sm font-semibold text-gray-900">Scan to Pay</span>
        </div>
      </div>
    </div>
  );
}
