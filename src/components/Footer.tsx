import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../data/cars';
import { OdometerCounter } from './OdometerCounter';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'inventory' | 'services' | 'vin-checker' | 'inspection' | 'contact') => void;
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAudit }) => {
  return (
    <footer className="bg-[#052E23] border-t border-emerald-800 text-emerald-100 text-xs">
      {/* Top Banner / Telemetry Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-emerald-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Naiahautos Dealership & Automotive Engineering
            </h3>
            <p className="text-emerald-200 max-w-xl text-xs leading-relaxed">
              Nigeria's premier verified automotive portal for Tokunbo vehicle acquisitions, computerized 200-point pre-purchase diagnostics, direct North American imports, and genuine OEM parts.
            </p>
          </div>
          <div className="lg:col-span-6">
            <OdometerCounter />
          </div>
        </div>
      </div>

      {/* Main 4-column footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Credentials */}
          <div className="space-y-4">
            <div className="text-xl font-extrabold text-white tracking-tight">
              Naiahautos<span className="text-lime-400">.</span>
            </div>
            <p className="text-emerald-200/90 text-xs leading-relaxed">
              Every vehicle on our floor comes with an authentic Nigeria Customs Service SGD assessment, clear VIN history, and verified multi-point mechanical inspection.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={onOpenAudit}
                className="text-[11px] text-lime-300 hover:text-white flex items-center gap-1 font-semibold underline underline-offset-4 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                View Professional Standards Audit
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-lime-300 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-100"
                >
                  <ChevronRight className="w-3 h-3 text-lime-400" />
                  <span>Home Showroom</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className="hover:text-lime-300 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-100"
                >
                  <ChevronRight className="w-3 h-3 text-lime-400" />
                  <span>Current Inventory & Pricing</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('vin-checker')}
                  className="hover:text-lime-300 transition-colors flex items-center gap-1.5 cursor-pointer text-lime-300 font-semibold"
                >
                  <ChevronRight className="w-3 h-3 text-lime-400" />
                  <span>Live VIN Decoder</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-lime-300 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-100"
                >
                  <ChevronRight className="w-3 h-3 text-lime-400" />
                  <span>Automotive Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('inspection')}
                  className="hover:text-lime-300 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-100"
                >
                  <ChevronRight className="w-3 h-3 text-lime-400" />
                  <span>200-Point Inspection Booking</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-lime-300 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-100"
                >
                  <ChevronRight className="w-3 h-3 text-lime-400" />
                  <span>Showroom Contact & Location</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Operations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-300">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Monday - Friday</span>
                  <span className="text-emerald-200">8:00 AM - 6:00 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Saturday</span>
                  <span className="text-emerald-200">9:00 AM - 4:00 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Sunday</span>
                  <span className="text-emerald-200">By Prior Appointment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Address & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-300">
              Showroom Location & Contact
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span className="text-emerald-100">
                  {DEALERSHIP_CONFIG.address}, {DEALERSHIP_CONFIG.city}, {DEALERSHIP_CONFIG.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-lime-400 shrink-0" />
                <a href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`} className="text-emerald-100 hover:text-white font-mono font-medium">
                  {DEALERSHIP_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-lime-400 shrink-0" />
                <a 
                  href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lime-300 hover:text-white font-mono font-semibold"
                >
                  +{DEALERSHIP_CONFIG.whatsappNumber} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime-400 shrink-0" />
                <a href={`mailto:${DEALERSHIP_CONFIG.email}`} className="text-emerald-100 hover:text-white">
                  {DEALERSHIP_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="bg-[#031f17] border-t border-emerald-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-300/80">
          <div>
            © {new Date().getFullYear()} Naiahautos Limited. All Rights Reserved. RC: 1849204.
          </div>
          <div className="flex items-center gap-4">
            <span>All vehicles inspected with OBD-II diagnostic protocol.</span>
            <span>·</span>
            <span>Cloudflare D1 Verified Telemetry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
