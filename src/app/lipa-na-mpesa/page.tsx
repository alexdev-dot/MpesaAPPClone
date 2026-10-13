"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronLeft, Store, Ticket, Check, Building2, Search } from "lucide-react";

export default function LipaNaMpesaPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy-goods");
  const [merchantNumber, setMerchantNumber] = useState("");
  const [amount, setAmount] = useState("0");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mpesa");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [merchantInputActive, setMerchantInputActive] = useState(false);
  const [amountInputActive, setAmountInputActive] = useState(false);
  const [accountInputActive, setAccountInputActive] = useState(false);

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

  if (!isAuthenticated || !user) {
    return null;
  }

  const formatBalance = (amount: number | undefined) => {
    if (amount === undefined || amount === null) return "KSh 0.00";
    return `KSh ${amount.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleContinue = () => {
    if (activeTab === "buy-goods" && merchantNumber && amount) {
      console.log("Processing Buy Goods transaction:", { merchantNumber, amount, paymentMethod: selectedPaymentMethod });
    } else if (activeTab === "pay-bill" && merchantNumber && accountNumber && amount) {
      console.log("Processing Pay Bill transaction:", { merchantNumber, accountNumber, amount, paymentMethod: selectedPaymentMethod });
    } else if (activeTab === "pochi-la-biashara" && merchantNumber && amount) {
      console.log("Processing Pochi la Biashara transaction:", { merchantNumber, amount, paymentMethod: selectedPaymentMethod });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-background">
        <div className="px-4 py-2 flex items-center justify-center relative">
          <button
            onClick={() => router.push("/dashboard")}
            className="absolute left-4 w-10 h-10 flex items-center justify-center bg-card border border-border rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" strokeWidth={2} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Lipa na M-PESA</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-2">
        {/* Navigation Tabs */}
        <div className="mx-4 mt-2">
          <div className="bg-muted rounded-2xl flex p-1 border border-border">
            <button
              onClick={() => setActiveTab("buy-goods")}
              className={`flex-1 px-2 py-2 text-xs font-medium rounded-2xl transition-colors whitespace-nowrap ${
                activeTab === "buy-goods"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Buy Goods
            </button>
            <button
              onClick={() => setActiveTab("pay-bill")}
              className={`flex-1 px-2 py-2 text-xs font-medium rounded-2xl transition-colors whitespace-nowrap ${
                activeTab === "pay-bill"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pay Bill
            </button>
            <button
              onClick={() => setActiveTab("pochi-la-biashara")}
              className={`flex-1 px-2 py-2 text-xs font-medium rounded-2xl transition-colors whitespace-nowrap ${
                activeTab === "pochi-la-biashara"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pochi la Biashara
            </button>
          </div>
        </div>

        {activeTab === "buy-goods" ? (
          <>
            {/* Favourites Section */}
            <div className="mx-4 mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Favourites</h3>
                <button className="text-sm text-muted-foreground font-medium">View All</button>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <button className="w-14 h-14 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border hover:border-mpesa-green transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" stroke="var(--mpesa-green)" />
                      <line x1="5" y1="12" x2="19" y2="12" stroke="#dc2626" />
                    </svg>
                  </button>
                  <span className="text-xs text-foreground">Add</span>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="mx-4 mt-2 space-y-1.5">
              {/* Merchant Number Input */}
              <h3 className="text-foreground">Enter till number</h3>
              <div className={`bg-background rounded-xl p-3 border-2 transition-colors ${merchantInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="tel"
                    placeholder="Enter till Number"
                    value={merchantNumber}
                    onChange={(e) => {
                      setMerchantNumber(e.target.value);
                      setMerchantInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setMerchantInputActive(true)}
                    onBlur={() => setMerchantInputActive(merchantNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                  />
                  <button className="w-7 h-7 bg-muted rounded-full flex items-center justify-center relative">
                    {/* Top-left corner marker */}
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute w-2.5 h-2.5 top-0 left-0"
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
                    {/* Top-right corner marker */}
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute w-2.5 h-2.5 top-0 right-0"
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
                    {/* Bottom-left corner marker */}
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute w-2.5 h-2.5 bottom-0 left-0"
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
                    {/* Bottom-right corner marker */}
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute w-2.5 h-2.5 bottom-0 right-0"
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
                    <svg className="w-7 h-7 text-mpesa-green" viewBox="0 0 24 24" fill="currentColor">
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
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <h3 className="text-foreground">Enter amount</h3>
              <div className={`bg-background rounded-xl p-3 border-2 transition-colors ${amountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAmountInputActive(true)}
                    onBlur={() => setAmountInputActive(amount.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none text-muted-foreground"
                  />
                  <span className="text-muted-foreground font-medium">Ksh</span>
                </div>
              </div>

              {/* Balance Information */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {balanceVisible ? (
                  <>
                    <span>Balance: {formatBalance(0)}</span>
                    <span>-</span>
                    <span>Fuliza: {formatBalance(83.99)}</span>
                  </>
                ) : (
                  <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                )}
              </div>
            </div>
          </>
        ) : activeTab === "pay-bill" ? (
          <>
            {/* Favourites Section */}
            <div className="mx-4 mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Favourites</h3>
                <button className="text-sm text-muted-foreground font-medium">View All</button>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <button className="w-14 h-14 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border hover:border-mpesa-green transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" stroke="var(--mpesa-green)" />
                      <line x1="5" y1="12" x2="19" y2="12" stroke="#dc2626" />
                    </svg>
                  </button>
                  <span className="text-xs text-foreground">Add</span>
                </div>
              </div>
            </div>

            <div className="mx-4 mt-2 space-y-1.5">
              {/* Business Number Input */}
              <h3 className="text-foreground">Enter paybill</h3>
              <div className={`bg-background rounded-xl p-3 border-2 transition-colors ${merchantInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="tel"
                    placeholder="Enter paybill"
                    value={merchantNumber}
                    onChange={(e) => {
                      setMerchantNumber(e.target.value);
                      setMerchantInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setMerchantInputActive(true)}
                    onBlur={() => setMerchantInputActive(merchantNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <Search className="w-6 h-6 text-mpesa-green" strokeWidth={1.5} />
                    <div className="h-6 w-px bg-border"></div>
                    <button className="w-7 h-7 bg-muted rounded-full flex items-center justify-center relative">
                      {/* Top-left corner marker */}
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute w-2.5 h-2.5 top-0 left-0"
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
                      {/* Top-right corner marker */}
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute w-2.5 h-2.5 top-0 right-0"
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
                      {/* Bottom-left corner marker */}
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute w-2.5 h-2.5 bottom-0 left-0"
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
                      {/* Bottom-right corner marker */}
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute w-2.5 h-2.5 bottom-0 right-0"
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
                      <svg className="w-7 h-7 text-mpesa-green" viewBox="0 0 24 24" fill="currentColor">
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
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Number Input */}
              <h3 className="text-foreground">Enter account number</h3>
              <div className={`bg-background rounded-xl p-3 border-2 transition-colors ${accountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter Account Number"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value);
                      setAccountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAccountInputActive(true)}
                    onBlur={() => setAccountInputActive(accountNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <Ticket className="w-6 h-6 text-mpesa-green" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <h3 className="text-foreground">Enter amount</h3>
              <div className={`bg-background rounded-xl p-3 border-2 transition-colors ${amountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAmountInputActive(true)}
                    onBlur={() => setAmountInputActive(amount.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none text-muted-foreground"
                  />
                  <span className="text-muted-foreground font-medium">Ksh</span>
                </div>
              </div>

              {/* Balance Information */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {balanceVisible ? (
                  <>
                    <span>Balance: {formatBalance(0)}</span>
                    <span>-</span>
                    <span>Fuliza: {formatBalance(83.99)}</span>
                  </>
                ) : (
                  <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                )}
              </div>
            </div>
          </>
        ) : activeTab === "pochi-la-biashara" ? (
          <>
            {/* Favourites Section */}
            <div className="mx-4 mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Favourites</h3>
                <button className="text-sm text-muted-foreground font-medium">View All</button>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <button className="w-14 h-14 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border hover:border-mpesa-green transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" stroke="var(--mpesa-green)" />
                      <line x1="5" y1="12" x2="19" y2="12" stroke="#dc2626" />
                    </svg>
                  </button>
                  <span className="text-xs text-foreground">Add</span>
                </div>
              </div>
            </div>

            <div className="mx-4 mt-2 space-y-1.5">
              {/* Merchant Input */}
              <h3 className="text-foreground">Enter your phone number</h3>
              <div className={`bg-background rounded-xl p-3 border-2 transition-colors ${merchantInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={merchantNumber}
                    onChange={(e) => {
                      setMerchantNumber(e.target.value);
                      setMerchantInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setMerchantInputActive(true)}
                    onBlur={() => setMerchantInputActive(merchantNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <img src="/assets/icons/common/user.png" alt="User" className="w-6 h-6" style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)'}} />
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <h3 className="text-foreground">Enter amount</h3>
              <div className={`bg-background rounded-xl p-3 border-2 transition-colors ${amountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAmountInputActive(true)}
                    onBlur={() => setAmountInputActive(amount.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none text-muted-foreground"
                  />
                  <span className="text-muted-foreground font-medium">Ksh</span>
                </div>
              </div>

              {/* Balance Information */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {balanceVisible ? (
                  <>
                    <span>Balance: {formatBalance(0)}</span>
                    <span>-</span>
                    <span>Fuliza: {formatBalance(83.99)}</span>
                  </>
                ) : (
                  <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                )}
              </div>
            </div>
          </>
        ) : null}

        {/* Select Payment Method */}
        <div className="mx-4 mt-2">
          <h3 className="font-semibold text-sm text-foreground mb-2">Select Payment Method</h3>
          <div className="flex gap-3">
            {/* M-PESA Card */}
            <button
              onClick={() => setSelectedPaymentMethod("mpesa")}
              className={`flex-1 h-28 rounded-xl border-2 transition-colors relative ${
                selectedPaymentMethod === "mpesa"
                  ? "bg-mpesa-green/10 border-mpesa-green"
                  : "bg-card border-border hover:border-muted-foreground/50"
              }`}
            >
              {selectedPaymentMethod === "mpesa" && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-mpesa-green flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}>
                  <Check className="w-3 h-3 text-white absolute top-1 right-1" strokeWidth={2.5} />
                </div>
              )}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 flex items-center justify-center mb-2">
                  <img src="/assets/brands/shiriki-pay.png" alt="M-PESA" className="w-6 h-6 rotate-20" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm text-foreground">M-PESA</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Ksh. ******
                  </div>
                </div>
              </div>
            </button>

            {activeTab !== "pochi-la-biashara" && (
              <>
            {/* Bonga Points Card */}
            <button
              onClick={() => setSelectedPaymentMethod("bonga")}
              className={`flex-1 h-28 rounded-xl border-2 transition-colors relative ${
                selectedPaymentMethod === "bonga"
                  ? "bg-mpesa-green border-mpesa-green"
                  : "bg-card border-border hover:border-muted-foreground/50"
              }`}
            >
              {selectedPaymentMethod === "bonga" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-card rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-mpesa-green" strokeWidth={2.5} />
                </div>
              )}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center mb-2">
                  <img src="/assets/services/clay-crafting.png" alt="Bonga Points" className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className={`font-medium text-sm ${
                    selectedPaymentMethod === "bonga" ? "text-white" : "text-foreground"
                  }`}>Bonga Points</div>
                  {selectedPaymentMethod === "bonga" ? (
                    <div className={`text-xs mt-1 ${
                      selectedPaymentMethod === "bonga" ? "text-white/90" : "text-muted-foreground"
                    }`}>
                      {balanceVisible ? `Ksh. ${formatBalance(0)}` : <div className="h-3 w-12 bg-muted rounded animate-pulse mx-auto" />}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground mt-1">Ksh. 0</span>
                  )}
                </div>
              </div>
            </button>
              </>
            )}

            {/* Shiriki Pay Card */}
            <button
              onClick={() => setSelectedPaymentMethod("shiriki")}
              className={`flex-1 h-28 rounded-xl border-2 transition-colors relative ${
                selectedPaymentMethod === "shiriki"
                  ? "bg-mpesa-green border-mpesa-green"
                  : "bg-card border-border hover:border-muted-foreground/50"
              }`}
            >
              {selectedPaymentMethod === "shiriki" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-card rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-mpesa-green" strokeWidth={2.5} />
                </div>
              )}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="rgba(34, 197, 94, 0.2)" />
                    <text
                      x="12"
                      y="16"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="bold"
                      fill="#22c55e"
                      fontFamily="Arial, sans-serif"
                    >
                      S
                    </text>
                  </svg>
                </div>
                <div className="text-center">
                  <div className={`font-medium text-sm ${
                    selectedPaymentMethod === "shiriki" ? "text-white" : "text-foreground"
                  }`}>Shiriki Pay</div>
                  {selectedPaymentMethod === "shiriki" ? (
                    <div className={`text-xs mt-1 ${
                      selectedPaymentMethod === "shiriki" ? "text-white/90" : "text-muted-foreground"
                    }`}>
                      {balanceVisible ? `Ksh. ${formatBalance(0)}` : <div className="h-3 w-12 bg-muted rounded animate-pulse mx-auto" />}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground mt-1">Select</span>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mx-4 mt-2">
          <button
            onClick={handleContinue}
            disabled={
              activeTab === "buy-goods" ? (!merchantNumber || !amount) :
              activeTab === "pay-bill" ? (!merchantNumber || !accountNumber || !amount) :
              activeTab === "pochi-la-biashara" ? (!merchantNumber || !amount) :
              true
            }
            className={`w-full py-3 rounded-xl font-medium transition-colors border-2 ${
              (activeTab === "buy-goods" && merchantNumber && amount) ||
              (activeTab === "pay-bill" && merchantNumber && accountNumber && amount) ||
              (activeTab === "pochi-la-biashara" && merchantNumber && amount)
                ? "bg-mpesa-green text-white hover:bg-mpesa-green-dark border-mpesa-green"
                : "bg-secondary text-muted-foreground cursor-not-allowed border-border"
            }`}
          >
            Continue
          </button>
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
    </div>
  );
}
