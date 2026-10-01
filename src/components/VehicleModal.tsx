import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, FileCheck, MessageCircle, MapPin, Calculator } from 'lucide-react';
import { Vehicle, DEALERSHIP_CONFIG, showroomHeroImg } from '../data/cars';
import { Naira } from './NairaSign';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  currency: 'NGN' | 'USD';
  onBookTestDrive: (vehicle: Vehicle) => void;
  onOpenVinDecoder?: (vin: string) => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  onClose,
  currency,
  onBookTestDrive,
  onOpenVinDecoder
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inspection' | 'finance'>('overview');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanMonths, setLoanMonths] = useState<number>(36);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [lastVehicleId, setLastVehicleId] = useState<string | null>(null);

  if (!vehicle) return null;

  if (vehicle.id !== lastVehicleId) {
    setLastVehicleId(vehicle.id);
    setActiveImage(null);
  }
  const galleryImages = [vehicle.imageUrl, ...(vehicle.additionalImages ?? [])];
  const shownImage = activeImage ?? vehicle.imageUrl;

  const priceExact = currency === 'NGN'
    ? `NGN ${vehicle.priceNgn.toLocaleString()}`
    : `$${vehicle.priceUsd.toLocaleString()}`;

  // Loan calculation
  const totalAmount = currency === 'NGN' ? vehicle.priceNgn : vehicle.priceUsd;
  const downPayment = totalAmount * (downPaymentPercent / 100);
  const principal = totalAmount - downPayment;
  const annualInterestRate = 0.18; // 18% standard auto loan rate in Nigeria
  const monthlyRate = annualInterestRate / 12;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) / (Math.pow(1 + monthlyRate, loanMonths) - 1);

  const handleWhatsAppInquiry = () => {
    const priceText = currency === 'NGN' ? `NGN ${vehicle.priceNgn.toLocaleString()}` : `$${vehicle.priceUsd.toLocaleString()}`;
    const text = `Hello Naiahautos, I am interested in purchasing the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.vin ? `VIN: ${vehicle.vin}, ` : ''}Listed at ${priceText}). Is it available for showroom inspection?`;
    window.open(`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar: Forest Green */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-800 bg-[#064E3B] text-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-lime-300">
              {vehicle.condition} · {vehicle.location}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {vehicle.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-2 rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Visual & Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                <img
                  src={shownImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = showroomHeroImg;
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-md text-xs font-bold text-emerald-800 flex items-center gap-1.5 shadow-sm">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Customs Duty 100% Cleared
                </div>
                {vehicle.vin && (
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 px-2.5 py-1 rounded text-xs font-mono text-white">
                    VIN: {vehicle.vin}
                  </div>
                )}
              </div>
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        shownImage === img ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-emerald-400'
                      }`}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <img src={img} alt={`${vehicle.name} photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Summary Box */}
            <div className="md:col-span-5 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Showroom Price</span>
                <div className="text-3xl font-extrabold text-emerald-800 tracking-tight mt-0.5 font-mono inline-flex items-center gap-0.5">
                  {currency === 'NGN' ? (
                    <>
                      <Naira />
                      <span>{vehicle.priceNgn.toLocaleString()}</span>
                    </>
                  ) : (
                    `$${vehicle.priceUsd.toLocaleString()}`
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Includes Nigeria Customs Service Single Goods Declaration & inspection certificate.
                </div>
              </div>

              {/* Quick Spec Matrix */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-slate-400 block text-[11px] font-medium">Transmission</span>
                  <span className="font-bold text-slate-900">{vehicle.transmission}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-slate-400 block text-[11px] font-medium">Fuel / Engine</span>
                  <span className="font-bold text-slate-900">{vehicle.fuelType}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-slate-400 block text-[11px] font-medium">Drivetrain</span>
                  <span className="font-bold text-slate-900">{vehicle.drivetrain}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-lime-300" />
                  Inquire on WhatsApp
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onBookTestDrive(vehicle);
                  }}
                  className="w-full py-2.5 px-4 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Schedule Showroom Test Drive
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Vehicle Overview & Specs
            </button>
            <button
              onClick={() => setActiveTab('inspection')}
              className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'inspection' ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>200-Point Inspection Score</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {vehicle.inspectionScore}/100
              </span>
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'finance' ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Financing Estimator</span>
            </button>
          </div>

          {/* Tab 1: Overview & Specs */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Installed Factory Features & Packages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Spec Table */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Full Technical Specifications
                </h3>
                <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs shadow-sm">
                  <div className="grid grid-cols-2 p-3">
                    <span className="text-slate-500">Powertrain & Engine</span>
                    <span className="text-slate-900 font-semibold">{vehicle.engine}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="text-slate-500">Exterior Finish</span>
                    <span className="text-slate-900 font-semibold">{vehicle.color}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="text-slate-500">Interior Upholstery</span>
                    <span className="text-slate-900 font-semibold">{vehicle.interiorColor}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="text-slate-500">Import Status</span>
                    <span className="text-emerald-700 font-bold">Lagos Port Fully Cleared (SGD verified)</span>
                  </div>
                  {vehicle.vin && (
                  <div className="grid grid-cols-2 p-3 items-center">
                    <span className="text-slate-500">Chassis / VIN</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-900 font-mono font-medium">{vehicle.vin}</span>
                      {onOpenVinDecoder && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenVinDecoder(vehicle.vin.replace(/\*/g, '1'));
                          }}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Decode OEM VIN
                        </button>
                      )}
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: 200-Point Inspection */}
          {activeTab === 'inspection' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg font-mono">
                    {vehicle.inspectionScore}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Naiahautos Verified Grade A+</h4>
                    <p className="text-xs text-slate-600">
                      Zero flood damage, verified chassis rails, computerized engine ECU diagnostic passed.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow cursor-pointer whitespace-nowrap"
                >
                  Request Full 18-Page PDF Report
                </button>
              </div>

              {/* Sub-system Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Engine & Compression</span>
                    <span className="text-emerald-700 font-mono">100% Passed</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full w-full"></div>
                  </div>
                  <p className="text-[11px] text-slate-500">No oil leakage, normal operating temperature, smooth idle and timing calibration.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Transmission & Differential</span>
                    <span className="text-emerald-700 font-mono">100% Passed</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full w-full"></div>
                  </div>
                  <p className="text-[11px] text-slate-500">Seamless gear shifts under load, healthy fluid coloration, zero shift hesitation.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Chassis & Body Structural Integrity</span>
                    <span className="text-emerald-700 font-mono">98% Passed</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full w-[98%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-500">Factory apron spot welds intact, uniform paint depth between 4.2 - 5.1 mils.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Computerized On-Board Diagnostics</span>
                    <span className="text-emerald-700 font-mono">96% Passed</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full w-[96%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-500">Zero active DTC fault codes in ECU, ABS, SRS airbags, or steering sensors.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Finance Estimator */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Commercial Auto Finance Calculator</h3>
                    <p className="text-xs text-slate-500">Estimate your monthly payment with tier-1 auto financing partners.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Estimated Monthly</span>
                    <div className="text-2xl font-extrabold text-emerald-800 font-mono inline-flex items-center justify-end gap-0.5">
                      {currency === 'NGN' ? (
                        <>
                          <Naira />
                          <span>{Math.round(monthlyPayment).toLocaleString()}</span>
                        </>
                      ) : (
                        `$${Math.round(monthlyPayment).toLocaleString()}`
                      )}
                      <span className="text-xs text-slate-500 font-normal"> /mo</span>
                    </div>
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1 font-semibold">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span className="font-mono text-emerald-700 font-bold inline-flex items-center gap-0.5">
                        {currency === 'NGN' ? (
                          <>
                            <Naira />
                            <span>{Math.round(downPayment).toLocaleString()}</span>
                          </>
                        ) : (
                          `$${Math.round(downPayment).toLocaleString()}`
                        )}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="70"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1 font-semibold">
                      <span>Loan Tenor ({loanMonths} Months / {loanMonths / 12} Years)</span>
                      <span className="font-mono text-slate-900">{loanMonths} Months</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[12, 24, 36, 48].map((m) => (
                        <button
                          key={m}
                          onClick={() => setLoanMonths(m)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                            loanMonths === m ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {m} Mos
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  *Indicative interest calculation based on standard commercial lending rates. Actual bank approval subject to KYC and underwriting.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-4 px-6 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Showroom: {DEALERSHIP_CONFIG.address}, {DEALERSHIP_CONFIG.city}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Showroom Support:</span>
            <a href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`} className="text-slate-900 hover:text-emerald-700 font-mono font-bold">
              {DEALERSHIP_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
