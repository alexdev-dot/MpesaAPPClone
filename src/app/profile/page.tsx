"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Eye, EyeOff, Smartphone, Wallet, CreditCard, Shield, Bell, Copy, User, Phone, Mail, MapPin, Calendar, Check, Camera, Sun, Fingerprint, Info } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [phoneNumberVisible, setPhoneNumberVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const maskPhoneNumber = (phoneNumber: string) => {
    if (phoneNumberVisible) return phoneNumber;
    if (phoneNumber.length >= 10) {
      return phoneNumber.substring(0, 4) + " " + "*".repeat(6) + " " + phoneNumber.substring(phoneNumber.length - 2);
    }
    return phoneNumber;
  };

  const menuItems = [
    {
      section: "Account",
      items: [
        {
          icon: Smartphone,
          label: "Security center",
          description: "Manage your M-PESA account details",
          action: () => {},
        },
        {
          icon: Wallet,
          label: "Get puk",
          description: "View your transaction history",
          action: () => {},
        },
        {
          icon: CreditCard,
          label: "Report Fraud",
          description: "Manage your registered cards",
          action: () => {},
        },
      ],
    },
    {
      section: "Account and Settings",
      items: [
        {
          icon: Info,
          label: "About App",
          description: "PIN, security questions, and more",
          action: () => {},
        },
        {
          icon: Bell,
          label: "Recommend A Friend",
          description: "Manage your notification preferences",
          action: () => {},
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Back Arrow and Title - Fixed Header */}
      <div className="sticky top-0 z-20 bg-slate-100">
        <div className="px-4 py-2 flex items-center justify-center relative">
          <button
            onClick={() => router.push("/dashboard")}
            className="absolute left-4 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" strokeWidth={2} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Profile Header Card */}
        <div className="bg-white ml-3 mr-4 mt-2 rounded-xl p-3 shadow-sm">
          <div className="flex items-start gap-4">
            {/* Profile Picture */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="/assets/profile image.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Camera Icon */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white">
                <Camera className="w-4 h-4 text-green-600 transform -scale-x-100" strokeWidth={1.5} />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{user?.name || "User"}</h2>
            </div>
          </div>

          {/* Phone Number, Status and Tariff - Bottom */}
          <div className="mt-3 flex items-center justify-between">
            <div className="ml-4">
              <div className="text-xs text-gray-500 mb-1">Phone number</div>
              <span className="text-xs text-gray-900">
                {user?.phoneNumber || "0722 123 456"}
              </span>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Status</div>
              <span className="text-xs text-gray-700">Active</span>
            </div>
            <div className="text-center mr-4">
              <div className="text-xs text-gray-500 mb-1">Tariff</div>
              <span className="text-xs text-gray-700">Prepaid</span>
            </div>
          </div>
        </div>

        {/* Quick Action Header */}
        <div className="mx-4 mt-4">
          <h3 className="font-semibold text-gray-900">Quick action</h3>
        </div>

        {/* M-PESA Account Details Cards */}
        <div className="flex gap-3 mx-4 mt-2">
          {/* Card 1 */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm flex flex-col items-start justify-start">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                {/* Sun body - green outline circle */}
                <circle cx="12" cy="12" r="5" stroke="#16a34a" fill="none" />
                {/* Sun rays - red */}
                <line x1="12" y1="1" x2="12" y2="3" stroke="#dc2626" />
                <line x1="12" y1="21" x2="12" y2="23" stroke="#dc2626" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#dc2626" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#dc2626" />
                <line x1="1" y1="12" x2="3" y2="12" stroke="#dc2626" />
                <line x1="21" y1="12" x2="23" y2="12" stroke="#dc2626" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#dc2626" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#dc2626" />
              </svg>
            </div>
            <span className="text-xs text-gray-600 whitespace-nowrap">Appearance</span>
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm flex flex-col items-start justify-start">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2 relative">
              <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center">
                <Fingerprint className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <span className="text-xs text-gray-600 whitespace-nowrap">Biometric</span>
          </div>
        </div>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {sectionIndex === 0 && (
              <div className="mx-4 mt-4">
                <h3 className="font-semibold text-gray-900">Quick care</h3>
              </div>
            )}
            {sectionIndex === 1 && (
              <div className="mx-4 mt-4">
                <h3 className="font-semibold text-gray-900">Account and Settings</h3>
              </div>
            )}
            {sectionIndex === 0 ? (
              <>
                <div className="flex gap-3 mx-4 mt-2">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={itemIndex}
                        onClick={item.action}
                        className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start"
                      >
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                          {itemIndex === 0 ? (
                            <img src="/assets/icons/shield.png" alt="Shield" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)' }} />
                          ) : itemIndex === 1 ? (
                            <img src="/assets/icons/lock.png" alt="Lock" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)' }} />
                          ) : itemIndex === 2 ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="12" y1="9" x2="12" y2="13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                              <line x1="12" y1="17" x2="12.01" y2="17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          ) : (
                            <Icon className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                          )}
                        </div>
                        <span className="text-xs text-gray-600 whitespace-nowrap">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-3 mx-4 mt-3">
                  <button className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="2" fill="none"/>
                        <path d="M12 3L12 12L20.5 16" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">Check My usage</span>
                  </button>
                  <button className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                      <img src="/assets/icons/e-sim.png" alt="e-SIM" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)' }} />
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">Request e-SIM</span>
                  </button>
                  <button className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                      <img src="/assets/icons/subscription.png" alt="Subscription" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)' }} />
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">My subscription</span>
                  </button>
                </div>
                <div className="flex gap-3 mx-4 mt-3">
                  <button className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2 relative">
                      <img src="/assets/icons/chat.png" alt="Chat" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)' }} />
                      <span className="absolute text-red-500 text-[8px] font-bold inset-0 flex items-center justify-center">24</span>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">Get help</span>
                  </button>
                  <button className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                      <img src="/assets/icons/sim-card.png" alt="SIM card" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)' }} />
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">Manage My Line</span>
                  </button>
                  <button className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                      <img src="/assets/icons/store.png" alt="Store" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(34%) sepia(68%) saturate(585%) hue-rotate(76deg) brightness(102%) contrast(92%)' }} />
                    </div>
                    <div className="text-xs text-gray-600">Find a<br />Safaricom Shop</div>
                  </button>
                </div>
                <div className="flex gap-3 mx-4 mt-3">
                  <button className="w-1/3 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="16" width="3" height="6" rx="1" fill="#16a34a" />
                        <rect x="8" y="12" width="3" height="10" rx="1" fill="#16a34a" />
                        <rect x="14" y="8" width="3" height="14" rx="1" fill="#dc2626" />
                        <rect x="20" y="4" width="3" height="18" rx="1" fill="#dc2626" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-600">Help Improve<br />Your Network</div>
                  </button>
                </div>
              </>
            ) : sectionIndex === 1 ? (
              <div className="flex gap-3 mx-4 mt-2">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className="w-1/3 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                        {itemIndex === 0 ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="2" fill="none"/>
                            <circle cx="12" cy="7" r="1" fill="#dc2626"/>
                            <line x1="12" y1="10" x2="12" y2="17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        ) : itemIndex === 1 ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="5" r="3" stroke="#16a34a" strokeWidth="2" fill="none"/>
                            <circle cx="6" cy="12" r="3" stroke="#dc2626" strokeWidth="2" fill="none"/>
                            <circle cx="18" cy="19" r="3" stroke="#16a34a" strokeWidth="2" fill="none"/>
                            <line x1="15.5" y1="7" x2="8.5" y2="10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="15.5" y1="17" x2="8.5" y2="14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <Icon className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                        )}
                      </div>
                      {item.label === "Recommend A Friend" ? (
                        <div className="text-xs text-gray-600">Recommend A<br />Friend</div>
                      ) : (
                        <span className="text-xs text-gray-600 whitespace-nowrap">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : sectionIndex === 1 ? (
              <div className="flex gap-3 mx-4 mt-2">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className="w-1/3 bg-white rounded-xl p-3 shadow-sm flex flex-col items-start justify-start"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                        {itemIndex === 0 ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="2" fill="none"/>
                            <circle cx="12" cy="7" r="1" fill="#dc2626"/>
                            <line x1="12" y1="10" x2="12" y2="17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        ) : itemIndex === 1 ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="5" r="3" stroke="#16a34a" strokeWidth="2" fill="none"/>
                            <circle cx="6" cy="12" r="3" stroke="#dc2626" strokeWidth="2" fill="none"/>
                            <circle cx="18" cy="19" r="3" stroke="#16a34a" strokeWidth="2" fill="none"/>
                            <line x1="15.5" y1="7" x2="8.5" y2="10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="15.5" y1="17" x2="8.5" y2="14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <Icon className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                        )}
                      </div>
                      {item.label === "Recommend A Friend" ? (
                        <div className="text-xs text-gray-600">Recommend A<br />Friend</div>
                      ) : (
                        <span className="text-xs text-gray-600 whitespace-nowrap">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}

        {/* Logout Link */}
        <div className="mx-4 mt-4">
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="text-sm text-red-600 hover:text-red-700 underline"
          >
            Logout
          </button>
        </div>

        {/* App Version */}
        <div className="mx-4 mt-4">
          <p className="text-xs text-gray-400">App Version 5.3.0</p>
        </div>
      </div>
    </div>
  );
}
