"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, QrCode, UserPlus, Smartphone, CreditCard, Send, Wallet, ArrowUpRight, Check, Store } from "lucide-react";

function SendMoneyPageContent() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("mobile");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("0");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mpesa");
  const [pochiMerchant, setPochiMerchant] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [phoneInputActive, setPhoneInputActive] = useState(false);
  const [amountInputActive, setAmountInputActive] = useState(false);
  const [pochiInputActive, setPochiInputActive] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "pochi") {
      setActiveTab("pochi");
    }
  }, [searchParams]);

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
    if (activeTab === "mobile" && phoneNumber && amount) {
      // Navigate to confirmation page or process the transaction
      console.log("Processing transaction:", { phoneNumber, amount, paymentMethod: selectedPaymentMethod });
    } else if (activeTab === "pochi" && pochiMerchant && amount) {
      // Navigate to confirmation page or process the transaction
      console.log("Processing Pochi transaction:", { pochiMerchant, amount, paymentMethod: selectedPaymentMethod });
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-background shrink-0">
        <div className="px-4 py-5 flex items-center justify-center relative">
          <button
            onClick={() => router.push("/dashboard")}
            className="absolute left-4 w-9 h-9 flex items-center justify-center bg-card border border-border rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" strokeWidth={2} />
          </button>
          <h1 className="text-base font-semibold text-foreground">Send Money</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-2 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="mx-4 mt-4">
          <div className="bg-muted rounded-3xl flex p-0.5 border border-border">
            <button
              onClick={() => setActiveTab("mobile")}
              className={`flex-1 px-2 py-2 text-[9px] font-medium rounded-3xl transition-colors ${
                activeTab === "mobile"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mobile number
            </button>
            <button
              onClick={() => setActiveTab("pochi")}
              className={`flex-1 px-2 py-2 text-[9px] font-medium rounded-3xl transition-colors ${
                activeTab === "pochi"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pochi la Biashara
            </button>
          </div>
        </div>

        {activeTab === "mobile" ? (
          <>
            {/* Favourites Section */}
            <div className="mx-4 mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">Favourites</h3>
                <button className="text-[10px] text-muted-foreground font-medium">View All</button>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <button className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border hover:border-mpesa-green transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" stroke="var(--mpesa-green)" />
                      <line x1="5" y1="12" x2="19" y2="12" stroke="#dc2626" />
                    </svg>
                  </button>
                  <span className="text-[11px] text-foreground">Add</span>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="mx-4 mt-2 space-y-1.5">
              {/* Phone Number Input */}
              <h3 className="text-sm text-foreground">Enter your phone number</h3>
              <div className={`bg-background rounded-xl p-2.5 border-2 transition-colors shadow-sm ${phoneInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setPhoneInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setPhoneInputActive(true)}
                    onBlur={() => setPhoneInputActive(phoneNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground placeholder:text-sm min-w-0"
                  />
                  <div className="flex items-center gap-3 shrink-0">
                    <img src="/assets/icons/common/user.png" alt="User" className="w-6 h-6" style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)'}} />
                    <div className="h-6 w-px bg-border"></div>
                    <button className="w-7 h-7 bg-muted rounded-full flex items-center justify-center relative shrink-0">
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

              {/* Amount Input */}
              <h3 className="text-sm text-foreground">Enter amount</h3>
              <div className={`bg-background rounded-xl p-2.5 border-2 transition-colors shadow-sm ${amountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAmountInputActive(true)}
                    onBlur={() => setAmountInputActive(amount.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none text-muted-foreground placeholder:text-sm min-w-0"
                  />
                  <span className="text-muted-foreground font-medium shrink-0">Ksh</span>
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
        ) : (
          <>
            {/* Pochi la Biashara Content */}
            <div className="mx-4 mt-2">
              {/* Favourites Section */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">Favourites</h3>
                <button className="text-[10px] text-muted-foreground font-medium">View All</button>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <button className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border hover:border-mpesa-green transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" stroke="var(--mpesa-green)" />
                      <line x1="5" y1="12" x2="19" y2="12" stroke="#dc2626" />
                    </svg>
                  </button>
                  <span className="text-[11px] text-foreground">Add</span>
                </div>
              </div>
            </div>

            <div className="mx-4 mt-2 space-y-1.5">
              {/* Merchant Input */}
              <h3 className="text-sm text-foreground">Enter your phone number</h3>
              <div className={`bg-background rounded-xl p-2.5 border-2 transition-colors shadow-sm ${pochiInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={pochiMerchant}
                    onChange={(e) => {
                      setPochiMerchant(e.target.value);
                      setPochiInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setPochiInputActive(true)}
                    onBlur={() => setPochiInputActive(pochiMerchant.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground placeholder:text-sm min-w-0"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <img src="/assets/icons/common/user.png" alt="User" className="w-6 h-6" style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)'}} />
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <h3 className="text-sm text-foreground">Enter amount</h3>
              <div className={`bg-background rounded-xl p-2.5 border-2 transition-colors shadow-sm ${amountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAmountInputActive(true)}
                    onBlur={() => setAmountInputActive(amount.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none text-muted-foreground placeholder:text-sm min-w-0"
                  />
                  <span className="text-muted-foreground font-medium shrink-0">Ksh</span>
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
        )}

        {/* Select Payment Method */}
        <div className="mx-4 mt-2">
          <h3 className="text-sm font-semibold text-foreground mb-2">Select Payment Method</h3>
          <div className="flex gap-3">
            {/* M-PESA Card */}
            <button
              onClick={() => setSelectedPaymentMethod("mpesa")}
              className={`flex-1 rounded-xl px-4 py-2.5 border-2 transition-colors relative overflow-hidden shadow-sm ${
                selectedPaymentMethod === "mpesa"
                  ? "bg-mpesa-green/10 border-mpesa-green"
                  : "bg-card border-border hover:border-muted-foreground/50"
              }`}
            >
              {selectedPaymentMethod === "mpesa" && (
                <div className="absolute top-0 right-0 w-7 h-7 bg-mpesa-green flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}>
                  <Check className="w-2.5 h-2.5 text-white absolute top-1 right-1" strokeWidth={2.5} />
                </div>
              )}
              <div className="flex flex-row items-center gap-2">
                <div className="w-9 h-9 flex items-center justify-center">
                  <img src="/assets/brands/shiriki-pay.png" alt="M-PESA" className="w-6 h-6 rotate-20" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs text-foreground">M-PESA</div>
                  <div className="text-[10px] text-muted-foreground">
                    {balanceVisible ? `Bal. ${formatBalance(0)}` : <div className="h-2.5 w-14 bg-muted rounded animate-pulse" />}
                  </div>
                </div>
              </div>
            </button>

            {/* Shiriki Pay Card */}
            <button
              onClick={() => setSelectedPaymentMethod("shiriki")}
              className={`flex-1 rounded-xl px-4 py-2.5 border-2 transition-colors relative shadow-sm ${
                selectedPaymentMethod === "shiriki"
                  ? "bg-mpesa-green border-mpesa-green"
                  : "bg-card border-border hover:border-muted-foreground/50"
              }`}
            >
              {selectedPaymentMethod === "shiriki" && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-card rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-mpesa-green" strokeWidth={2.5} />
                </div>
              )}
              <div className="flex flex-row items-center gap-2">
                <div className="w-9 h-9 bg-card rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="rgba(34, 197, 94, 0.2)" />
                    <text
                      x="12"
                      y="16"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="bold"
                      fill="#22c55e"
                      fontFamily="Arial, sans-serif"
                    >
                      S
                    </text>
                  </svg>
                </div>
                <div className="text-left">
                  <div className={`font-medium text-xs ${
                    selectedPaymentMethod === "shiriki" ? "text-white" : "text-foreground"
                  }`}>Shiriki Pay</div>
                  {selectedPaymentMethod === "shiriki" ? (
                    <div className={`text-[10px] ${
                      selectedPaymentMethod === "shiriki" ? "text-white/90" : "text-muted-foreground"
                    }`}>
                      {balanceVisible ? `Bal. ${formatBalance(0)}` : <div className="h-2.5 w-14 bg-muted rounded animate-pulse" />}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Select</span>
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
            disabled={activeTab === "mobile" ? (!phoneNumber || !amount) : (!pochiMerchant || !amount)}
            className={`w-full py-2.5 rounded-xl font-medium transition-colors border-2 text-sm ${
              (activeTab === "mobile" && phoneNumber && amount) || (activeTab === "pochi" && pochiMerchant && amount)
                ? "bg-mpesa-green text-white hover:bg-mpesa-green-dark border-mpesa-green"
                : "bg-secondary text-muted-foreground cursor-not-allowed border-border"
            }`}
          >
            Continue
          </button>
        </div>

        {/* Do More Section - Only show on Mobile tab */}
        {activeTab === "mobile" && (
          <div className="mx-4 mt-3 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">Do More</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-card rounded-xl p-3 flex flex-col items-center gap-1.5 hover:bg-muted transition-colors shadow-sm">
                <img src="/assets/services/group.png" alt="Group" className="w-5 h-5" style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)'}} />
                <span className="text-[11px] text-foreground text-center">Send to<br />Many</span>
              </button>
              <button className="bg-card rounded-xl p-3 flex flex-col items-center gap-1.5 hover:bg-muted transition-colors shadow-sm">
                <Wallet className="w-5 h-5 text-mpesa-green" strokeWidth={1.5} />
                <span className="text-[11px] text-foreground text-center">Request Money</span>
              </button>
              <button className="bg-card rounded-xl p-3 flex flex-col items-center gap-1.5 hover:bg-muted transition-colors shadow-sm">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                  <img
                    src="/assets/services/ziidi.png"
                    alt="Ziiidi"
                    className="w-7 h-7 object-contain"
                    style={{filter: 'brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1000%) hue-rotate(110deg) brightness(90%) contrast(90%)'}}
                  />
                </div>
                <span className="text-[11px] text-foreground text-center">Invest to<br />ZiiDi</span>
              </button>
            </div>
          </div>
        )}

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

export default function SendMoneyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <SendMoneyPageContent />
    </Suspense>
  );
}
