import React from 'react';
import { Shield, FileCheck, ArrowRight, CheckCircle2, MessageCircle, Search, Car, Sparkles, Box, ShieldCheck } from 'lucide-react';
import { VEHICLES_DATA, Vehicle, DEALERSHIP_CONFIG } from '../data/cars';
import { AUTO_SERVICES_DATA } from '../data/services';
import { TiltCard } from '../components/TiltCard';
import { Naira } from '../components/NairaSign';

interface HomeViewProps {
  onSelectVehicle: (v: Vehicle) => void;
  onBookInspection: () => void;
  onNavigateTab: (tab: 'home' | 'inventory' | 'services' | 'vin-checker' | 'inspection' | 'contact') => void;
  currency: 'NGN' | 'USD';
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectVehicle,
  onBookInspection,
  onNavigateTab,
  currency
}) => {
  const featuredCars = VEHICLES_DATA.filter(c => c.featured);

  return (
    <div className="space-y-24 bg-white text-slate-800">
      
      {/* 1. HERO SECTION: 3D Depth Showroom with Floating Hero Vehicle Card */}
      <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#064E3B] via-[#043E2F] to-[#02281E] text-white border-b border-emerald-800 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
        {/* Background Image with Rich Emerald Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_naiahautos_showroom_1790618206795.jpg"
            alt="Naiahautos Showroom"
            className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          {/* Spatial Depth Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B]/95 via-[#064E3B]/85 to-[#064E3B]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02281E] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & 3D Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 3D Floating Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#02281E]/90 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider text-lime-300 shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#a3e635]" />
                <span>Lekki Phase 1, Lagos</span>
                <span className="text-emerald-500">|</span>
                <span>100% NCS Customs Duty Verified</span>
              </div>

              {/* Main Headline with 3D text shadow */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] text-balance drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                Verified Luxury Automobiles & Precision Auto Engineering.
              </h1>

              {/* Sub-prose */}
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                Acquire pristine, accident-free Tokunbo vehicles with complete confidence. Every vehicle on our floor features authentic Nigeria Customs Service single goods declaration, computerized OBD-II diagnostics, and bumper-to-bumper inspection.
              </p>

              {/* Primary 3D Action Zone */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigateTab('inventory')}
                  className="py-3.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer btn-3d-lime text-sm"
                >
                  <span>Browse Inventory</span>
                  <ArrowRight className="w-4 h-4 text-emerald-950" />
                </button>

                <button
                  onClick={onBookInspection}
                  className="py-3.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer btn-3d-emerald text-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-lime-300" />
                  <span>Book 200-Pt Inspection</span>
                </button>

                <button
                  onClick={() => onNavigateTab('vin-checker')}
                  className="py-3.5 px-6 bg-[#022c22]/80 hover:bg-[#033c2e] border border-emerald-500/40 text-emerald-100 hover:text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_0_#011a14,0_6px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[2px]"
                >
                  <Search className="w-4 h-4 text-lime-300" />
                  <span>17-Digit VIN Decoder</span>
                </button>
              </div>

              {/* 3D Inset Quantitative Proof Console */}
              <div className="pt-2">
                <div className="bg-[#02281E]/85 border border-emerald-600/40 rounded-2xl p-4 shadow-[inset_0_2px_5px_rgba(0,0,0,0.6),0_8px_20px_rgba(0,0,0,0.25)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-[#04382a]/70 p-3 rounded-xl border border-emerald-700/50 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    <span className="block text-2xl font-black text-white font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">850+</span>
                    <span className="text-emerald-200/90 font-medium">Vehicles Delivered</span>
                  </div>
                  <div className="bg-[#04382a]/70 p-3 rounded-xl border border-emerald-700/50 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    <span className="block text-2xl font-black text-lime-300 font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">100%</span>
                    <span className="text-emerald-200/90 font-medium">Customs SGD Duty</span>
                  </div>
                  <div className="bg-[#04382a]/70 p-3 rounded-xl border border-emerald-700/50 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    <span className="block text-2xl font-black text-white font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">200-Pt</span>
                    <span className="text-emerald-200/90 font-medium">Electronic Diagnostic</span>
                  </div>
                  <div className="bg-[#04382a]/70 p-3 rounded-xl border border-emerald-700/50 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    <span className="block text-2xl font-black text-lime-300 font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">4.9 / 5</span>
                    <span className="text-emerald-200/90 font-medium">Client Rating</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Floating Hero Showcase Vehicle Card */}
            {featuredCars[0] && (
              <div className="lg:col-span-5 perspective-1000 hidden lg:block">
                <TiltCard
                  maxTilt={10}
                  scale={1.03}
                  onClick={() => onSelectVehicle(featuredCars[0])}
                  className="bg-white rounded-3xl p-3 border border-emerald-400/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_30px_rgba(163,230,53,0.15)] cursor-pointer group"
                >
                  {/* Floating vehicle image container */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 shadow-inner">
                    <img
                      src={featuredCars[0].imageUrl}
                      alt={featuredCars[0].name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    
                    {/* 3D Floating Badges (hover off the surface) */}
                    <div 
                      className="absolute top-3 left-3 bg-[#064e3b]/95 backdrop-blur-md border border-lime-400/50 px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-lime-300 flex items-center gap-1.5 shadow-[0_6px_14px_rgba(0,0,0,0.4)]"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                      <span>Featured Showroom Flagship</span>
                    </div>

                    <div 
                      className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] font-mono text-white shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                      style={{ transform: 'translateZ(26px)' }}
                    >
                      {featuredCars[0].mileageKm.toLocaleString()} km · Tokunbo
                    </div>

                    <div 
                      className="absolute bottom-3 right-3 bg-lime-400 text-emerald-950 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                      style={{ transform: 'translateZ(26px)' }}
                    >
                      Score: {featuredCars[0].inspectionScore}/100
                    </div>
                  </div>

                  {/* Card lower details with 3D depth */}
                  <div className="p-4 space-y-3" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        {featuredCars[0].year} {featuredCars[0].make}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {featuredCars[0].location}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {featuredCars[0].name}
                    </h3>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Showroom Price</span>
                        <span className="text-xl font-black text-emerald-800 font-mono inline-flex items-center gap-0.5">
                          {currency === 'NGN' ? (
                            <>
                              <Naira />
                              <span>{(featuredCars[0].priceNgn / 1000000).toFixed(1)}M</span>
                            </>
                          ) : (
                            `$${featuredCars[0].priceUsd.toLocaleString()}`
                          )}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVehicle(featuredCars[0]);
                        }}
                        className="py-2 px-4 rounded-xl text-xs font-bold btn-3d-lime flex items-center gap-1.5"
                      >
                        <span>Inspect Vehicle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. FEATURED SHOWROOM INVENTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Curated Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Available Vehicles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Inspected, fully cleared at Lagos ports, and ready for immediate showroom drive-out.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('inventory')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All {VEHICLES_DATA.length} Available Vehicles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vehicle Grid with 3D TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => {
            const displayPrice = currency === 'NGN'
              ? `NGN ${(car.priceNgn / 1000000).toFixed(1)} Million`
              : `$${car.priceUsd.toLocaleString()}`;

            return (
              <TiltCard
                key={car.id}
                maxTilt={8}
                scale={1.02}
                onClick={() => onSelectVehicle(car)}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl overflow-hidden shadow-3d hover:shadow-3d-hover transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Frame with 3D Inset Bevel */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating 3D Badges */}
                  <div 
                    className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_10px_rgba(0,0,0,0.2)] px-2.5 py-1 rounded-xl text-[11px] font-extrabold text-emerald-800 flex items-center gap-1.5"
                    style={{ transform: 'translateZ(26px)' }}
                  >
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>NCS Duty Paid</span>
                  </div>

                  <div 
                    className="absolute top-3 right-3 bg-[#064E3B] text-lime-300 shadow-[0_4px_10px_rgba(0,0,0,0.3)] px-2.5 py-1 rounded-xl text-[11px] font-mono font-black border border-emerald-700/60"
                    style={{ transform: 'translateZ(26px)' }}
                  >
                    Score: {car.inspectionScore}/100
                  </div>

                  <div 
                    className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-mono shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                    style={{ transform: 'translateZ(24px)' }}
                  >
                    {car.mileageKm.toLocaleString()} km
                  </div>
                </div>

                {/* 3D Elevated Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4" style={{ transform: 'translateZ(18px)' }}>
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                      {car.condition} · {car.bodyType}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                      {car.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                      {car.engine}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Showroom Price</span>
                      <span className="text-lg font-black text-emerald-800 font-mono inline-flex items-center gap-0.5">
                        {currency === 'NGN' ? (
                          <>
                            <Naira />
                            <span>{(car.priceNgn / 1000000).toFixed(1)} Million</span>
                          </>
                        ) : (
                          `$${car.priceUsd.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVehicle(car);
                      }}
                      className="px-4 py-2 btn-3d-white text-xs font-bold rounded-xl"
                      style={{ transform: 'translateZ(24px)' }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* 3. CORE SERVICES BENTO SECTION: Clean White / Mint Tint styling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50/60 to-white border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Specialized Engineering Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Automotive Services Designed for Nigerian Roads
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Beyond car sales, Naiahautos is an authorized technical automotive engineering center providing computerized diagnostics, vehicle sourcing from US/Canada auctions, and bumper-to-bumper inspections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1: Inspection with 3D Tilt */}
            <TiltCard maxTilt={6} className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-3d hover:shadow-3d-hover">
              <div className="space-y-4" style={{ transform: 'translateZ(18px)' }}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.1)]">
                    <Shield className="w-6 h-6 text-emerald-800" />
                  </div>
                  <span className="text-xs text-emerald-800 font-extrabold bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300 shadow-xs">
                    Flagship Service
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  200-Point Pre-Purchase Car Inspection
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Before paying any car dealer in Lagos, dispatch our certified master inspector. We test unibody alignment, flood lines, engine compression, transmission shift delay, and verify Nigeria Customs duty papers against the federal database.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700 font-semibold">
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live OBD-II Computer ECU Diagnostics</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Digital Paint Gauge (Crash/Swirl Scan)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Undercarriage & Suspension Inspection</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Comprehensive 18-Page PDF Report</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ transform: 'translateZ(24px)' }}>
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium mb-0.5">Inspection Fee</span>
                  <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <span className="text-xl font-black text-emerald-800 font-mono inline-flex items-center gap-0.5 leading-none">
                      {currency === 'NGN' ? (
                        <>
                          <Naira />
                          <span>45,000</span>
                        </>
                      ) : (
                        <span>$30</span>
                      )}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-sans leading-none">/ Vehicle</span>
                  </div>
                </div>
                <button
                  onClick={onBookInspection}
                  className="px-5 py-2.5 btn-3d-emerald text-xs font-bold rounded-xl cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  Book Mobile Inspection
                </button>
              </div>
            </TiltCard>

            {/* Service 2: Importation & Clearing with 3D Tilt */}
            <TiltCard maxTilt={6} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-3d hover:shadow-3d-hover">
              <div className="space-y-3" style={{ transform: 'translateZ(18px)' }}>
                <div className="w-12 h-12 rounded-2xl bg-lime-100 text-lime-900 flex items-center justify-center font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.1)]">
                  <Car className="w-6 h-6 text-emerald-800" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Direct US & Canada Vehicle Importation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Turnkey car sourcing from Copart, Manheim, and IAAI with sea freight to Tin Can Island / Apapa Port and genuine duty payment.
                </p>
                <div className="text-xs text-slate-600 space-y-2 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Bidding on verified dealer auctions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Physical US inspection before buying</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Legitimate customs clearance docs</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between" style={{ transform: 'translateZ(24px)' }}>
                <div className="text-xs">
                  <span className="text-slate-500 block font-medium">Turnaround</span>
                  <span className="text-slate-900 font-bold">5 - 7 Weeks</span>
                </div>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="px-4 py-2 btn-3d-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Learn More
                </button>
              </div>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* 4. WHY BUY FROM NAIAHAUTOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Automotive Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Discerning Nigerian Car Buyers Choose Naiahautos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We eliminate the risks, fake customs papers, and hidden accident repairs prevalent in the pre-owned auto market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard maxTilt={5} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-3d hover:shadow-3d-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Genuine Customs Duty Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every vehicle sold by Naiahautos has fully verified Single Goods Declaration (SGD) paperwork and valid valuation assessment with Nigeria Customs Service. Never worry about impoundment.
            </p>
          </TiltCard>

          <TiltCard maxTilt={5} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-3d hover:shadow-3d-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Flood & Clean Frame Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We reject vehicles with saltwater immersion, structural frame distortion, or deployed airbag rewiring. All cars pass electronic paint depth scans to ensure original factory body panels.
            </p>
          </TiltCard>

          <TiltCard maxTilt={5} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-3d hover:shadow-3d-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct WhatsApp Advising & Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect directly with our engineering and sales executives via WhatsApp. Request walk-around video tours, live diagnostic readouts, and delivery straight to your gate in Lagos or interstate.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP: Forest green with lemon button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#064E3B] to-[#043326] text-white border border-emerald-700/60 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Looking for a Specific Car or Need an Inspection Today?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90">
              Speak directly with our showroom team on WhatsApp or schedule an on-site mechanical diagnostic before you buy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Naiahautos, I am inquiring about car purchases and inspection services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-900" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={onBookInspection}
              className="w-full sm:w-auto py-3.5 px-6 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-emerald-600 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Shield className="w-4 h-4 text-lime-400" />
              <span>Book Car Inspection</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
