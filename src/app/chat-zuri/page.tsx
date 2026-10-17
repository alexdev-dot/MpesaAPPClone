"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send, X } from "lucide-react";

export default function ChatZuriPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Zuri, your M-PESA assistant. How can I help you today?",
      sender: "zuri",
      timestamp: null as Date | null,
    },
  ]);


  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) => ({ ...msg, timestamp: new Date() }))
    );
  }, []);



  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate Zuri's response
      setTimeout(() => {
        const zuriResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. I'm here to help you with any M-PESA related questions. What would you like to know?",
          sender: "zuri",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, zuriResponse]);
      }, 1000);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="h-dvh bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-card px-4 py-3 flex items-center justify-center border-b border-border shrink-0">
        <button
          onClick={() => router.push("/dashboard")}
          className="absolute left-4 w-10 h-10 flex items-center justify-center bg-muted rounded-full hover:bg-muted-foreground/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" strokeWidth={2} />
        </button>
        <h1 className="text-base font-semibold text-foreground">Chat with Zuri</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "zuri" && (
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <img
                  src="/assets/avatars/zuri-avatar.png"
                  alt="Zuri"
                  className="w-6 h-6 rounded-full object-cover"
                />
              </div>
            )}
            <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-mpesa-green text-white rounded-br-sm"
                    : "bg-muted text-foreground border border-border rounded-bl-2xl"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className="text-[10px] mt-1 opacity-70">
                {msg.timestamp ? msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-card px-4 py-2 border-t border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full bg-muted text-foreground rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none caret-foreground"
              style={{ '::placeholder': { color: 'rgba(102, 102, 102, 0.7)' } } as any}
            />
            {message && (
              <button
                onClick={() => setMessage("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            )}
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              message.trim()
                ? "bg-mpesa-green text-white hover:bg-mpesa-green-dark"
                : "bg-muted text-foreground hover:bg-muted-foreground/20"
            }`}
          >
            <Send className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
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
    </>
  );
}
