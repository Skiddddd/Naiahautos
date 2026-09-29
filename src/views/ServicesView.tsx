import React from 'react';
import { Shield, Check, Clock, FileText, MessageCircle } from 'lucide-react';
import { AUTO_SERVICES_DATA } from '../data/services';
import { DEALERSHIP_CONFIG } from '../data/cars';
import { Naira } from '../components/NairaSign';

interface ServicesViewProps {
  onBookService: (serviceId: string) => void;
  currency: 'NGN' | 'USD';
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onBookService, currency }) => {
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
              Equipped with dealership-level diagnostic scanners (Mercedes Xentry, BMW ISTA, Toyota Techstream) and factory certified technicians. We safeguard your automotive investments across Nigeria.
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

          <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[300px]">
            <img
              src="/src/assets/images/car_inspection_bay_1790618239039.jpg"
              alt="Automotive Diagnostic Bay"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B] via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#043326] via-transparent to-transparent lg:hidden" />
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
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between gap-6 hover:border-emerald-500 transition-all shadow-sm"
              >
                {/* Left Col: Info */}
                <div className="lg:max-w-3xl space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      0{index + 1}.
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {service.title}
                    </h3>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {service.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverable info */}
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span><strong>Deliverable:</strong> {service.deliverable}</span>
                  </div>
                </div>

                {/* Right Col: Pricing & Action Box */}
                <div className="lg:w-72 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-5 shrink-0">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Standard Rate</span>
                      <div className="text-2xl font-extrabold text-emerald-800 font-mono inline-flex items-center gap-0.5">
                        {currency === 'NGN' ? (
                          <>
                            <Naira />
                            <span>{service.basePriceNgn.toLocaleString()}</span>
                          </>
                        ) : (
                          `$${service.basePriceUsd}`
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{service.turnaround}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onBookService(service.id)}
                      className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Book Service
                    </button>
                    <a
                      href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Naiahautos, I want to book: ${service.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-4 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Inquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
