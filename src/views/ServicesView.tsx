import React, { useEffect } from 'react';
import {
  Check,
  Clock,
  FileText,
  MessageCircle
} from 'lucide-react';
import { AUTO_SERVICES_DATA } from '../data/services';
import { DEALERSHIP_CONFIG } from '../data/cars';
import { Naira } from '../components/NairaSign';
import workshopBayDefaultImg from '@/src/assets/images/repair_dashboard_framework.jpg';
import { clearLegacyPhotoSettings } from '../services/mediaStorage';

interface ServicesViewProps {
  onBookService: (serviceId: string) => void;
  currency: 'NGN' | 'USD';
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onBookService, currency }) => {
  const workshopPhoto = workshopBayDefaultImg;

  // One-time cleanup of photos saved by the old picker, so the new picture shows
  useEffect(() => {
    clearLegacyPhotoSettings().catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 bg-slate-50 text-slate-800">
      
      {/* Header Banner: Deep emerald with lime accents */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-800 bg-gradient-to-r from-[#064E3B] to-[#043326] text-white shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-300">
              Technical Automotive Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Specialized Auto Diagnostics, Sourcing & Vehicle Engineering
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              Equipped with dealership-level diagnostic scanners (Mercedes Xentry, BMW ISTA, Toyota Techstream) across our Lekki, Ikeja, and Benin City facilities. We safeguard your automotive investments across Nigeria.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onBookService('pre-purchase-inspection')}
                className="py-3 px-5 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs rounded-xl shadow cursor-pointer transition-colors inline-flex items-center gap-1.5"
              >
                <span>Book 200-Pt Inspection (</span>
                <Naira />
                <span>45,000)</span>
              </button>
              <a
                href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Naiahautos, I would like to inquire about your workshop automotive services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current text-lime-300" />
                <span>WhatsApp Service Advisor</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[300px] group overflow-hidden">
            <img
              src={workshopPhoto}
              alt="Automotive Diagnostic Bay"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = workshopBayDefaultImg;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B] via-transparent to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#043326] via-transparent to-transparent lg:hidden pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Services List: Clean White Cards */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Our Certified Automotive Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Transparent pricing, certified engineers, and verifiable documentation on all repair and diagnostic orders.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {AUTO_SERVICES_DATA.map((service, index) => {
            const price = currency === 'NGN'
              ? `NGN ${service.basePriceNgn.toLocaleString()}`
              : `$${service.basePriceUsd}`;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 pt-1">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 stroke-[2.5]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Turnaround: {service.turnaround}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.deliverable}</span>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Service Fee</div>
                    <div className="text-lg sm:text-xl font-black text-emerald-900">{price}</div>
                  </div>

                  <button
                    onClick={() => onBookService(service.id)}
                    className="py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors shrink-0"
                  >
                    Schedule Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
