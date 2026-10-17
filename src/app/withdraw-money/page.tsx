"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronLeft, Building2, CreditCard, MapPin } from "lucide-react";

export default function WithdrawMoneyPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("agent");
  const [agentNumber, setAgentNumber] = useState("");
  const [amount, setAmount] = useState("0");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [agentInputActive, setAgentInputActive] = useState(false);
  const [amountInputActive, setAmountInputActive] = useState(false);
  const [storeNumber, setStoreNumber] = useState("");
  const [storeNumberInputActive, setStoreNumberInputActive] = useState(false);

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
    if (activeTab === "agent" && agentNumber && amount) {
      console.log("Processing withdrawal:", { agentNumber, amount });
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
          <h1 className="text-base font-semibold text-foreground">Withdraw Money</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-2 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="mx-4 mt-4">
          <div className="bg-muted rounded-3xl flex p-0.5 border border-border">
            <button
              onClick={() => setActiveTab("agent")}
              className={`flex-1 px-2 py-2 text-[9px] font-medium rounded-3xl transition-colors ${
                activeTab === "agent"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              At Agent
            </button>
            <button
              onClick={() => setActiveTab("atm")}
              className={`flex-1 px-2 py-2 text-[9px] font-medium rounded-3xl transition-colors ${
                activeTab === "atm"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              At ATM
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex-1 px-2 py-2 text-[9px] font-medium rounded-3xl transition-colors ${
                activeTab === "bank"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              From Ziidi
            </button>
          </div>
        </div>

        {activeTab === "agent" ? (
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
              {/* Agent Number Input */}
              <h3 className="text-sm text-foreground">Enter agent number</h3>
              <div className={`bg-background rounded-xl p-2.5 border-2 transition-colors shadow-sm ${agentInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="tel"
                    placeholder="Enter Agent Number"
                    value={agentNumber}
                    onChange={(e) => {
                      setAgentNumber(e.target.value);
                      setAgentInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAgentInputActive(true)}
                    onBlur={() => setAgentInputActive(agentNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground placeholder:text-sm min-w-0"
                  />
                  <div className="flex items-center gap-3 shrink-0">
                    <Building2 className="w-6 h-6 text-mpesa-green" strokeWidth={1.5} />
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

              {/* Store Number Input */}
              <h3 className="text-sm text-foreground">Enter store number</h3>
              <div className={`bg-background rounded-xl p-2.5 border-2 transition-colors shadow-sm ${storeNumberInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="number"
                    placeholder="Enter Store Number"
                    value={storeNumber}
                    onChange={(e) => {
                      setStoreNumber(e.target.value);
                      setStoreNumberInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setStoreNumberInputActive(true)}
                    onBlur={() => setStoreNumberInputActive(storeNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground placeholder:text-sm min-w-0"
                  />
                  <div className="flex items-center gap-3 shrink-0">
                    <MapPin className="w-6 h-6 text-mpesa-green" strokeWidth={1.5} />
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
        ) : activeTab === "atm" ? (
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

            {/* ATM Content */}
            <div className="mx-4 mt-2 space-y-1.5">
              {/* ATM Number Input */}
              <h3 className="text-sm text-foreground">Enter ATM number</h3>
              <div className={`bg-background rounded-xl p-2.5 border-2 transition-colors shadow-sm ${agentInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="tel"
                    placeholder="Enter ATM Number"
                    value={agentNumber}
                    onChange={(e) => {
                      setAgentNumber(e.target.value);
                      setAgentInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAgentInputActive(true)}
                    onBlur={() => setAgentInputActive(agentNumber.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground placeholder:text-sm min-w-0"
                  />
                  <div className="flex items-center gap-3 shrink-0">
                    <CreditCard className="w-6 h-6 text-mpesa-green" strokeWidth={1.5} />
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
        ) : activeTab === "bank" ? (
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

            {/* Bank Withdrawal Content */}
            <div className="mx-4 mt-2 space-y-1.5">
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
        ) : null}

        {/* Continue Button */}
        <div className="mx-4 mt-2">
          <button
            onClick={handleContinue}
            disabled={
              activeTab === "agent" ? (!agentNumber || !amount) :
              activeTab === "atm" ? !agentNumber :
              activeTab === "bank" ? !amount :
              true
            }
            className={`w-full py-2.5 rounded-xl font-medium transition-colors border-2 text-sm ${
              (activeTab === "agent" && agentNumber && amount) ||
              (activeTab === "atm" && agentNumber) ||
              (activeTab === "bank" && amount)
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
