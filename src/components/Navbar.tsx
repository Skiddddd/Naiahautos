import React, { useState } from 'react';
import { MessageCircle, Phone, Menu, X } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../data/cars';

interface NavbarProps {
  activeTab: 'home' | 'inventory' | 'services' | 'vin-checker' | 'inspection' | 'contact';
  setActiveTab: (tab: 'home' | 'inventory' | 'services' | 'vin-checker' | 'inspection' | 'contact') => void;
  currency?: 'NGN' | 'USD';
  setCurrency?: (c: 'NGN' | 'USD') => void;
  onOpenAudit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: 'home' | 'inventory' | 'services' | 'vin-checker' | 'inspection' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'inventory', label: 'Showroom' },
    { id: 'vin-checker', label: 'VIN Decoder' },
    { id: 'services', label: 'Services' },
    { id: 'inspection', label: '200-Pt Inspection' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#064E3B] text-white shadow-md border-b border-emerald-700/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="text-2xl font-extrabold tracking-tight text-white hover:text-lime-300 transition-colors cursor-pointer text-left flex items-center gap-1.5"
          >
            <span>Naiahautos</span><span className="text-lime-400">.</span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links with subtle underline/highlight */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-emerald-100">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-1.5 transition-colors hover:text-white cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-lime-300 font-bold' : 'text-emerald-100 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Direct WhatsApp Call/Chat */}
            <a
              href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Naiahautos, I am interested in your automobile inventory & services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-950 bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-900" />
              <span>WhatsApp Us</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-emerald-100 hover:text-white hover:bg-emerald-800/60 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-700/60 space-y-2 bg-[#064E3B]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === item.id ? 'bg-emerald-800 text-lime-300' : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-emerald-700/60 flex flex-col gap-2 px-4">
              <a
                href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`}
                className="w-full py-2.5 px-4 bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 border border-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-lime-400" />
                <span>Call Phone: {DEALERSHIP_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current text-emerald-900" />
                <span>Chat on WhatsApp ({DEALERSHIP_CONFIG.whatsappDisplay})</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
