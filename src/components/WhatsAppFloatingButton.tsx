import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, CheckCircle2, Clock, Shield, PhoneCall } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../data/cars';

interface WhatsAppFloatingButtonProps {
  currentVehicleName?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  currentVehicleName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [whatsappNumber] = useState(DEALERSHIP_CONFIG.whatsappNumber);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      // Delay listener slightly to prevent instant dismissal on trigger click
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const quickPrompts = [
    currentVehicleName 
      ? `Hi Naiahautos, I'm interested in the ${currentVehicleName}. Is it still available for inspection?`
      : "Hi Naiahautos, I'd like to check current car availability in your showroom.",
    "Hi Naiahautos, I want to book a 200-point pre-purchase vehicle inspection in Lagos.",
    "Hi Naiahautos, I need a quotation to import a car from USA/Canada to Lagos port."
  ];

  const handleSendWhatsApp = (textToSend: string) => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(textToSend || "Hello Naiahautos, I would like to make an inquiry.");
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Background backdrop on mobile/small viewports when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-none transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Container: pointer-events-none so wrapper doesn't block underlying page clicks */}
      <div 
        ref={drawerRef}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none"
      >
        {/* Expanded Chat Drawer: constrained to viewport height so header is ALWAYS visible */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 16, originX: 1, originY: 1 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="pointer-events-auto mb-2.5 sm:mb-3 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] max-h-[calc(100dvh-5.5rem)] sm:max-h-[calc(100dvh-6.5rem)] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800"
              role="dialog"
              aria-label="Naiahautos Support Chat"
            >
            {/* Header: Forest Green - Pinned & Never Shrinks (shrink-0) */}
            <div className="shrink-0 bg-[#064E3B] px-4 py-3 sm:py-3.5 border-b border-emerald-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-lime-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center shadow-inner">
                    NA
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-lime-400 rounded-full ring-2 ring-[#064E3B]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 leading-tight">
                    Naiahautos Support
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-300 inline shrink-0" />
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-200 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-lime-400 shrink-0" />
                      Online · Replies under 5 mins
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-200 hover:text-white p-1.5 rounded-lg hover:bg-emerald-800/80 transition-colors cursor-pointer"
                aria-label="Close Naiahautos Support"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Scrollable Body: dynamically scrolls internally so all content is reachable without overflowing viewport */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-3 text-xs overscroll-contain">
              {/* Trust Badge */}
              <div className="bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-900 space-y-0.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <Shield className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  Direct Verified Showroom Channel
                </div>
                <p className="text-emerald-800/80 leading-relaxed">
                  Chat directly with our showroom sales & inspection directors on WhatsApp. Custom duty papers & walk-around videos available.
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Inquiries
                </label>
                <div className="space-y-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendWhatsApp(prompt)}
                      className="w-full text-left text-xs bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-700 p-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                    >
                      <span className="line-clamp-2 pr-2 leading-relaxed">{prompt}</span>
                      <Send className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message Input */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Or Type Custom Inquiry
                </label>
                <div className="relative">
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Type car model, VIN, or question..."
                    rows={2}
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors resize-none shadow-xs"
                  />
                </div>
                <button
                  onClick={() => handleSendWhatsApp(customMessage)}
                  className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-lime-300 shrink-0" />
                  <span>Start Chat on WhatsApp</span>
                </button>
              </div>

              {/* Active Phone Display */}
              <div className="text-[11px] text-center text-slate-500 pt-0.5 space-y-0.5">
                <div>Active WhatsApp: <span className="font-mono text-emerald-700 font-semibold">{DEALERSHIP_CONFIG.whatsappDisplay}</span></div>
                <div>Direct Telephone Line: <a href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`} className="font-mono text-slate-700 hover:text-emerald-700 font-semibold underline">{DEALERSHIP_CONFIG.phoneDisplay}</a></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Quick Contact Controls: Phone Call + Message on Whatsapp Pill */}
      <div className="pointer-events-auto flex items-center gap-2.5">
        {/* Green Phone Call Button */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`}
          className="w-12 h-12 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(34,197,94,0.4)] cursor-pointer shrink-0"
          title={`Call ${DEALERSHIP_CONFIG.phoneDisplay}`}
          aria-label="Direct Phone Call"
        >
          <PhoneCall className="w-5 h-5" />
        </motion.a>

        {/* Rounded Message on Whatsapp Pill */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold py-2 px-3.5 sm:px-4 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer group"
          aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chat"}
          aria-expanded={isOpen}
        >
          <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-800 whitespace-nowrap">
            Message on Whatsapp
          </span>
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageCircle className="w-4 h-4 fill-current" />
          </div>
        </motion.button>
      </div>
      </div>
    </>
  );
};
