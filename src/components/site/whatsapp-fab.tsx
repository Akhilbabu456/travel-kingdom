"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const [message, setMessage] = useState("Hi Travel Kingdom, I'd like to know more about your services.");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.includes("/packages/")) {
        const last = path.split("/").filter(Boolean).pop();
        if (last) {
          // Replace hyphens with spaces and capitalize
          const formatted = last.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
          setMessage(`I'm enquiring about ${formatted}`);
        }
      }
    }
  }, []);

  const whatsappUrl = `https://wa.me/919860874848?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white shadow-luxe transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <span className="relative grid h-6 w-6 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <MessageCircle className="relative h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Chat with us</span>
    </motion.a>
  );
}
