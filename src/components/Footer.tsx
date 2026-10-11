import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DEALERSHIP_CONFIG as C } from '../data/cars';
import { NavTab } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenAudit?: () => void;
}

const links: { id: NavTab; label: string }[] = [
  { id: 'inventory', label: 'Vehicles' },
  { id: 'repairs', label: 'Workshop' },
  { id: 'inspection', label: '200-point inspection' },
  { id: 'vin-checker', label: 'VIN check' },
  { id: 'contact', label: 'Contact' },
];

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => (
  <footer className="bg-black border-t border-gold-400/20 text-slate-500 text-sm">
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
      <div className="space-y-4">
        <div className="font-display text-4xl font-bold text-slate-900">Naiahautos<span className="text-gold-400">.</span></div>
        <p className="max-w-sm leading-relaxed">{C.tagline}. Verified vehicles, honest inspections and careful workshop work in Lagos.</p>
        <a href={`https://wa.me/${C.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn-3d-lime inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs">
          <WhatsAppIcon className="w-4 h-4 fill-current" /> Chat on WhatsApp
        </a>
      </div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.id}>
            <button onClick={() => { setActiveTab(l.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition-colors cursor-pointer">
              {l.label}
            </button>
          </li>
        ))}
      </ul>
      <ul className="space-y-3">
        <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" /><span>{C.address}, {C.city}, {C.country}</span></li>
        <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" /><a href={`tel:${C.phoneNumberRaw}`}>{C.phoneDisplay}</a></li>
        <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" /><a href={`mailto:${C.email}`}>{C.email}</a></li>
        <li className="flex gap-3"><Clock className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" /><span>{C.workingHoursWeekday}<br />{C.workingHoursSaturday}<br />{C.workingHoursSunday}</span></li>
      </ul>
    </div>
    <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">© {new Date().getFullYear()} {C.name}. All rights reserved.</div>
  </footer>
);
