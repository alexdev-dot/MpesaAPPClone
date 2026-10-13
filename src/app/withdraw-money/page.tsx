"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronLeft, Building2, CreditCard, MapPin, Smartphone, Check, Search } from "lucide-react";

export default function WithdrawMoneyPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("agent");
  const [agentNumber, setAgentNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mpesa");
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
      console.log("Processing withdrawal:", { agentNumber, amount, paymentMethod: selectedPaymentMethod });
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
          <h1 className="text-lg font-semibold text-foreground">Withdraw Money</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-2">
        {/* Navigation Tabs */}
        <div className="mx-4 mt-2">
          <div className="bg-muted rounded-2xl flex p-1 border border-border">
            <button
              onClick={() => setActiveTab("agent")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-2xl transition-colors ${
                activeTab === "agent"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              At Agent
            </button>
            <button
              onClick={() => setActiveTab("atm")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-2xl transition-colors ${
                activeTab === "atm"
                  ? "bg-mpesa-green text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              At ATM
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-2xl transition-colors ${
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

            {/* Input Fields */}
            <div className="mx-4 mt-2 space-y-1.5">
              {/* Agent Number Input */}
              <h3 className="text-foreground">Enter agent number</h3>
              <div className={`bg-background rounded-lg py-3 px-2 border-2 transition-colors ${agentInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
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
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                  />
                  <div className="flex items-center gap-2">
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

              {/* Store Number Input */}
              <h3 className="text-foreground">Enter store number</h3>
              <div className={`bg-background rounded-lg py-3 px-2 border-2 transition-colors ${storeNumberInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
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
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Amount Input */}
              <h3 className="text-foreground">Enter amount</h3>
              <div className={`bg-background rounded-lg py-3 px-2 border-2 transition-colors ${amountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground font-medium">0</span>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAmountInputActive(true)}
                    onBlur={() => setAmountInputActive(amount.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
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
        ) : activeTab === "atm" ? (
          <>
            {/* ATM Content */}
            <div className="mx-4 mt-2 space-y-1.5">
              {/* ATM Number Input */}
              <h3 className="text-foreground">Enter ATM number</h3>
              <div className={`bg-background rounded-lg py-3 px-2 border-2 transition-colors ${agentInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
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
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                  />
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

            {/* Spacer to push continue button down */}
            <div className="h-48"></div>
          </>
        ) : activeTab === "bank" ? (
          <>
            {/* Bank Withdrawal Content */}
            <div className="mx-4 mt-2 space-y-1.5">
              {/* Amount Input */}
              <h3 className="text-foreground">Enter amount</h3>
              <div className={`bg-background rounded-lg py-3 px-2 border-2 transition-colors ${amountInputActive ? 'border-mpesa-green' : 'border-foreground/20'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground font-medium">0</span>
                  <input
                    type="number"
                    placeholder=""
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountInputActive(e.target.value.length > 0);
                    }}
                    onFocus={() => setAmountInputActive(true)}
                    onBlur={() => setAmountInputActive(amount.length > 0)}
                    className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
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

            {/* Spacer to push continue button down */}
            <div className="h-48"></div>
          </>
        ) : null}

        {/* Continue Button */}
        <div className="mx-4 mt-72 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={
              activeTab === "agent" ? (!agentNumber || !amount) :
              activeTab === "atm" ? !agentNumber :
              activeTab === "bank" ? (!agentNumber || !amount) :
              true
            }
            className={`w-full max-w-sm py-3 rounded-xl font-medium transition-colors border-2 ${
              (activeTab === "agent" && agentNumber && amount) ||
              (activeTab === "atm" && agentNumber) ||
              (activeTab === "bank" && agentNumber && amount)
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
