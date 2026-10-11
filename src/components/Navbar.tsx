import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DEALERSHIP_CONFIG } from '../data/cars';

export type NavTab = 'home' | 'inventory' | 'services' | 'repairs' | 'vin-checker' | 'inspection' | 'contact';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currency?: 'NGN' | 'USD';
  setCurrency?: (c: 'NGN' | 'USD') => void;
  onOpenAudit?: () => void;
}

const navItems: { id: NavTab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'inventory', label: 'Vehicles' },
  { id: 'services', label: 'Services' },
  { id: 'repairs', label: 'Workshop' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'vin-checker', label: 'VIN check' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false);

  const go = (id: NavTab) => {
    setOpen(false);
    if (id === 'services') {
      setActiveTab('home');
      setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      return;
    }
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wa = `https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Naiahautos, I am interested in your vehicles and services.')}`;

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between gap-6">
        <button onClick={() => go('home')} className="cursor-pointer text-left leading-none" aria-label="Naiahautos home">
          <span className="font-display text-3xl font-bold text-slate-900 tracking-tight">Naiahautos</span>
          <span className="text-gold-400 text-3xl font-display">.</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold tracking-wide">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`relative py-2 cursor-pointer transition-colors ${activeTab === n.id ? 'text-gold-300' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {n.label}
              {activeTab === n.id && <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-gold-400" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden sm:flex btn-3d-lime items-center gap-2 px-5 py-2.5 rounded-lg text-xs">
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            WhatsApp us
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-slate-900 cursor-pointer" aria-label="Toggle navigation">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gold-400/20 bg-black/95 px-5 py-4 space-y-1">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`w-full text-left px-3 py-3 text-base font-display ${activeTab === n.id ? 'text-gold-300' : 'text-slate-800'}`}
            >
              {n.label}
            </button>
          ))}
          <div className="pt-3 grid gap-2">
            <a href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`} className="btn-3d-emerald flex items-center justify-center gap-2 py-3 rounded-lg text-xs">
              <Phone className="w-4 h-4" /> {DEALERSHIP_CONFIG.phoneDisplay}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-3d-lime flex items-center justify-center gap-2 py-3 rounded-lg text-xs">
              <WhatsAppIcon className="w-4 h-4 fill-current" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
