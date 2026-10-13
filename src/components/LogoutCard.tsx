"use client";

import { ChevronLeft } from "lucide-react";

interface LogoutCardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutCard({
  isOpen,
  onClose,
  onLogout,
}: LogoutCardProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-none transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Logout Card */}
      <div className="relative rounded-t-2xl p-6 w-full mx-0 mb-0 shadow-2xl animate-slide-up bg-card">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 w-10 h-10 flex items-center justify-center bg-card border border-border rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" strokeWidth={2} />
        </button>

        {/* Card Title */}
        <h3 className="text-lg font-semibold mb-6 text-center text-foreground">Log Out</h3>

        {/* Description */}
        <div className="text-sm text-muted-foreground text-left mb-8">
          <p>You are about to logout from this device clearing all transaction frequents. To use this device you will have to sign in again</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg border-2 border-mpesa-green bg-card text-mpesa-green font-semibold hover:bg-muted transition-colors"
          >
            Cancel
          </button>

          {/* Log Out Button */}
          <button
            onClick={onLogout}
            className="flex-1 py-3 px-4 rounded-lg bg-mpesa-red text-white font-semibold hover:bg-mpesa-red-dark transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
