import React from 'react';
import { 
  Shield, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Search, 
  Car, 
  Sparkles, 
  Box, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  Clock, 
  Check, 
  Calendar,
  PhoneCall,
  Camera,
  Video,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { VEHICLES_DATA, Vehicle, DEALERSHIP_CONFIG } from '../data/cars';
import { AUTO_SERVICES_DATA, AutoService } from '../data/services';
import { TiltCard } from '../components/TiltCard';
import { Naira } from '../components/NairaSign';
import { NavTab } from '../components/Navbar';
import showroomHeroImg from '@/src/assets/images/hero_naiahautos_showroom_1790618206795.jpg';
import workshopBayDefaultImg from '@/src/assets/images/repair_dashboard_framework.jpg';
import defaultLeadTechImg from '@/src/assets/images/repair_steering_column_electrical.jpg';
import { INITIAL_REPAIRS_DATA, RepairMediaItem } from '../data/repairs';
import { 
  getStoredRepairs, 
  saveCustomSetting, 
  getCustomSetting, 
  requestPersistentStorage 
} from '../services/mediaStorage';

interface HomeViewProps {
  onSelectVehicle: (v: Vehicle) => void;
  onBookInspection: () => void;
  onBookService?: (serviceId: string) => void;
  onNavigateTab: (tab: NavTab) => void;
  currency: 'NGN' | 'USD';
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectVehicle,
  onBookInspection,
  onBookService,
  onNavigateTab,
  currency
}) => {
  const featuredCars = VEHICLES_DATA.filter(c => c.featured);
  
  // Permanent state for founder / lead specialist photo
  const [founderPhoto, setFounderPhoto] = React.useState<string>(() => {
    const saved = localStorage.getItem('naiahautos_founder_photo_v2');
    if (saved) return saved;

    try {
      const repairsJson = localStorage.getItem('naiahautos_all_repairs');
      if (repairsJson) {
        const parsed = JSON.parse(repairsJson);
        if (Array.isArray(parsed)) {
          const firstPhoto = parsed.find((r: RepairMediaItem) => r.mediaType === 'photo' && r.mediaUrl);
          if (firstPhoto) return firstPhoto.mediaUrl;
        }
      }
    } catch (e) {
      // ignore
    }
    return defaultLeadTechImg;
  });

  const [availableGalleryPhotos, setAvailableGalleryPhotos] = React.useState<Array<{ id: string; title: string; url: string }>>([]);
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = React.useState(false);
  const [photoSavedToast, setPhotoSavedToast] = React.useState(false);

  // Sync available gallery photos and load permanent settings
  React.useEffect(() => {
    async function loadSettingsAndGallery() {
      requestPersistentStorage().catch(() => {});
      
      const customFounder = await getCustomSetting('naiahautos_founder_photo_v2');
      if (customFounder) {
        setFounderPhoto(customFounder);
      }

      const customWorkshop = await getCustomSetting('naiahautos_workshop_photo_v2');
      if (customWorkshop) {
        setWorkshopPhoto(customWorkshop);
      }

      try {
        const stored = await getStoredRepairs();
        const items = (stored && stored.length > 0) ? stored : INITIAL_REPAIRS_DATA;
        const photos = items
          .filter(item => item.mediaType === 'photo' && item.mediaUrl)
          .map(item => ({ id: item.id, title: item.title, url: item.mediaUrl }));
        setAvailableGalleryPhotos(photos);

        if (!customFounder && photos.length > 0) {
          setFounderPhoto(photos[0].url);
        }
        if (!customWorkshop && photos.length > 0) {
          const bayPhoto = photos.find(p => p.url.includes('repair_dashboard_framework')) || photos[0];
          setWorkshopPhoto(bayPhoto.url);
        }
      } catch (e) {
        console.warn('Failed to load gallery photos for home card:', e);
      }
    }
    loadSettingsAndGallery();
  }, []);

  const selectPhotoPermanently = async (url: string) => {
    setFounderPhoto(url);
    await saveCustomSetting('naiahautos_founder_photo_v2', url);
    setIsPhotoPickerOpen(false);
    setPhotoSavedToast(true);
    setTimeout(() => setPhotoSavedToast(false), 3500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          selectPhotoPermanently(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [workshopPhoto, setWorkshopPhoto] = React.useState<string>(() => {
    return localStorage.getItem('naiahautos_workshop_photo_v2') || workshopBayDefaultImg;
  });
  const [isWorkshopPickerOpen, setIsWorkshopPickerOpen] = React.useState(false);

  const selectWorkshopPhotoPermanently = async (url: string) => {
    setWorkshopPhoto(url);
    await saveCustomSetting('naiahautos_workshop_photo_v2', url);
    setIsWorkshopPickerOpen(false);
    setPhotoSavedToast(true);
    setTimeout(() => setPhotoSavedToast(false), 3500);
  };

  const handleWorkshopPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          selectWorkshopPhotoPermanently(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-24 bg-white text-slate-800">
      
      {/* 0. CARMEDIS-STYLE PERSONAL FOUNDER TRUST & OVERVIEW (Top of Main Page) */}
      <section className="bg-slate-100/70 border-b border-slate-200/90 pt-4 sm:pt-6 pb-12 sm:pb-16">
        
        {/* Top Chat Us Bar */}
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="bg-white rounded-full p-1.5 sm:p-2 border border-slate-200 shadow-xs flex items-center justify-between sm:justify-start gap-3">
            <a
              href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Naiahautos, I would like to chat with an Automotive Specialist.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat us</span>
            </a>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Instant response from our Lekki Phase 1 diagnostic engineering desk
            </span>
          </div>
        </div>

        {/* Main Curved Card with Founder Photo & Statistics */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            
            {/* Centered Founder / Lead Specialist Portrait */}
            <div className="flex flex-col items-center">
              <div className="relative group w-64 sm:w-72 aspect-[4/3.8] rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-200">
                <img
                  src={founderPhoto}
                  alt="Naiahautos Founder & Automotive Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultLeadTechImg;
                  }}
                />
              </div>

              {/* High-Contrast Stat Banner Directly Below Photo */}
              <div className="w-full max-w-sm sm:max-w-md bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-md -mt-4 relative z-10 grid grid-cols-2 divide-x divide-slate-200 text-center">
                <div className="px-2">
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">99%</span>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">Happy customer</span>
                </div>
                <div className="px-2">
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">502+</span>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">Vehicle Fixed</span>
                </div>
              </div>
            </div>

            {/* Authoritative Opening Copy (Exact Carmedis Tone) */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                At <span className="text-emerald-800">Naiahautos</span>, we provide reliable automotive repair and maintenance services for both individual car owners and corporate fleets.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you need a comprehensive 200-point pre-purchase vehicle inspection before paying a car dealer in Lagos, a computerized engine overhaul, electrical fault diagnosis, or direct turnkey vehicle importation from US & Canada auctions, our experienced team of master diagnostic engineers has you covered.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Naiahautos, I would like to consult with an Automotive Specialist.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Message on WhatsApp</span>
                </a>

                <a
                  href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`}
                  className="px-5 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  <span>Call Workshop</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1. HERO SECTION: 3D Depth Showroom with Floating Hero Vehicle Card */}
      <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#064E3B] via-[#043E2F] to-[#02281E] text-white border-b border-emerald-800 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
        {/* Background Image with Rich Emerald Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={showroomHeroImg}
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
                <a
                  href="#services"
                  className="py-3.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer btn-3d-lime text-sm text-emerald-950 font-bold"
                >
                  <Wrench className="w-4 h-4 text-emerald-950" />
                  <span>Our Services</span>
                </a>

                <button
                  onClick={() => onNavigateTab('inventory')}
                  className="py-3.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer btn-3d-emerald text-sm"
                >
                  <span>Featured Vehicles</span>
                  <ArrowRight className="w-4 h-4 text-lime-300" />
                </button>

                <button
                  onClick={onBookInspection}
                  className="py-3.5 px-6 bg-[#022c22]/80 hover:bg-[#033c2e] border border-emerald-500/40 text-emerald-100 hover:text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_0_#011a14,0_6px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[2px]"
                >
                  <ShieldCheck className="w-4 h-4 text-lime-300" />
                  <span>Book Inspection</span>
                </button>

                <button
                  onClick={() => onNavigateTab('vin-checker')}
                  className="py-3.5 px-6 bg-[#022c22]/80 hover:bg-[#033c2e] border border-emerald-500/40 text-emerald-100 hover:text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_0_#011a14,0_6px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[2px]"
                >
                  <Search className="w-4 h-4 text-lime-300" />
                  <span>VIN Decoder</span>
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = showroomHeroImg;
                      }}
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

      {/* 2. CORE SERVICES SECTION: Comprehensive Engineering Hub on Main Page */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-emerald-600" />
              <span>Specialized Engineering Hubs · Lekki · Ikeja · Benin City</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Automotive Engineering & Dealership Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Beyond automobile sales, Naiahautos is an authorized technical automotive engineering center. We protect car buyers and luxury vehicle owners across Nigeria with computerized OEM diagnostics, 200-point pre-purchase vehicle audits, direct US/Canada auction sourcing, and ceramic paint protection.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Naiahautos, I would like to consult with an Automotive Service Advisor.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current text-lime-300" />
              <span>WhatsApp Service Advisor</span>
            </a>
          </div>
        </div>

        {/* Diagnostic Bay Spotlight Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-800 bg-gradient-to-r from-[#064E3B] to-[#043326] text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-lime-400" />
                <span>Authorized Master Diagnostic Center</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                State-of-the-Art Diagnostic Bay & Technical Workshop
              </h3>
              <p className="text-emerald-100/90 text-sm leading-relaxed">
                Modern luxury vehicles are mobile supercomputers. Our lekki / ikeja and benin city facilities features manufacturer-level diagnostic workstations (Mercedes-Benz Xentry, BMW ISTA, Lexus Techstream, Land Rover Pathfinder), ultrasonic paint depth gauges, engine compression testers, and heavy-duty inspection lifts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>OEM Manufacturer Diagnostic Interfaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Digital Paint Depth & Chassis Alignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Nigeria Customs SGD Duty Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Air Suspension & Transmission Calibration</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onBookInspection}
                  className="px-6 py-3 bg-lime-400 hover:bg-lime-500 text-emerald-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Diagnostic / Inspection</span>
                </button>
                <div className="text-xs text-emerald-200/90 font-medium">
                  Plot 14, Block 7, Admiralty Way, Lekki Phase 1, Lagos
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[320px] group overflow-hidden">
              <img
                src={workshopPhoto}
                alt="Naiahautos Automotive Diagnostic Bay"
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

        {/* All 5 Engineering Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AUTO_SERVICES_DATA.map((service, idx) => {
            const isFlagship = service.id === 'pre-purchase-inspection';
            const priceFormatted = currency === 'NGN'
              ? (service.basePriceNgn >= 100000 
                  ? `${(service.basePriceNgn / 1000).toLocaleString()}k` 
                  : service.basePriceNgn.toLocaleString())
              : `$${service.basePriceUsd}`;

            return (
              <TiltCard
                key={service.id}
                maxTilt={6}
                scale={1.02}
                className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 shadow-3d hover:shadow-3d-hover ${
                  isFlagship 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 md:col-span-2 lg:col-span-2' 
                    : 'border-slate-200 hover:border-emerald-400'
                }`}
              >
                <div className="space-y-5" style={{ transform: 'translateZ(18px)' }}>
                  
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-800 shadow-xs">
                      {service.icon === 'inspection' && <Shield className="w-6 h-6 text-emerald-700" />}
                      {service.icon === 'import' && <Car className="w-6 h-6 text-emerald-700" />}
                      {service.icon === 'diagnostics' && <Cpu className="w-6 h-6 text-emerald-700" />}
                      {service.icon === 'detailing' && <Sparkles className="w-6 h-6 text-emerald-700" />}
                      {service.icon === 'parts' && <Wrench className="w-6 h-6 text-emerald-700" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                    {isFlagship && (
                      <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 leading-relaxed hidden sm:block">
                        {service.fullDesc}
                      </p>
                    )}
                  </div>

                  {/* Features Checklist */}
                  <div className={`space-y-2 pt-2 ${isFlagship ? 'sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0' : ''}`}>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverable Box */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Guaranteed Deliverable
                    </span>
                    <p className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{service.deliverable}</span>
                    </p>
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ transform: 'translateZ(24px)' }}>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] text-slate-500 font-medium">Turnaround: {service.turnaround}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-400 font-bold uppercase">Starting</span>
                      <span className="text-xl font-black text-emerald-800 font-mono inline-flex items-center gap-0.5">
                        {currency === 'NGN' ? (
                          <>
                            <Naira />
                            <span>{priceFormatted}</span>
                          </>
                        ) : (
                          <span>{priceFormatted}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Naiahautos, I want to inquire about: ${service.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="WhatsApp Advisor"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>

                    <button
                      onClick={() => {
                        if (onBookService) {
                          onBookService(service.id);
                        } else {
                          onBookInspection();
                        }
                      }}
                      className="px-5 py-2.5 btn-3d-emerald text-xs font-bold rounded-xl cursor-pointer whitespace-nowrap"
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Engineering Trust Pillars */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-slate-50 border border-emerald-100 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 mx-auto sm:mx-0">
                <FileCheck className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">Customs SGD Duty Guarantee</h4>
              <p className="text-xs text-slate-600">Zero impound risk. All duty documents independently verified with NCS.</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 mx-auto sm:mx-0">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">100% Genuine OEM Parts</h4>
              <p className="text-xs text-slate-600">Strictly authentic factory parts sourced directly from Germany, Japan & US.</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 mx-auto sm:mx-0">
                <Car className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">Lagos-Wide Mobile Dispatch</h4>
              <p className="text-xs text-slate-600">Our inspectors travel to any dealership, residence, or customs bonded terminal.</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 mx-auto sm:mx-0">
                <Cpu className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">Certified Diagnostic Engineers</h4>
              <p className="text-xs text-slate-600">Factory-trained technicians utilizing OEM computerized scanning equipment.</p>
            </div>
          </div>
        </div>

      </section>

      {/* 3. FEATURED SHOWROOM INVENTORY */}
      <section id="featured-vehicles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = showroomHeroImg;
                    }}
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

      {/* Photo Picker Modal */}
      {isPhotoPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Change Card Picture</h3>
                  <p className="text-xs text-slate-500">Pick from your workshop gallery or upload from device</p>
                </div>
              </div>
              <button
                onClick={() => setIsPhotoPickerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Selected Preview */}
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img src={founderPhoto} alt="Current selection" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Current Picture</span>
                <span className="text-[11px] text-emerald-700 font-semibold block flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Locked & Permanently Saved
                </span>
              </div>
            </div>

            {/* Option 1: Select from Gallery */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                <span>Select from Your Workshop Gallery:</span>
              </label>
              
              {availableGalleryPhotos.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No gallery pictures found.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {availableGalleryPhotos.map((photo, idx) => (
                    <button
                      key={photo.id || idx}
                      type="button"
                      onClick={() => selectPhotoPermanently(photo.url)}
                      className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        founderPhoto === photo.url
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 hover:border-emerald-400'
                      }`}
                      title={photo.title}
                    >
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      {founderPhoto === photo.url && (
                        <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-lime-400 text-emerald-950 flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Option 2: Upload New Photo from Device */}
            <div className="pt-2 border-t border-slate-100">
              <label className="w-full py-3 px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.02] active:scale-98 border border-lime-300">
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Upload New Picture from Device</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Workshop Bay Photo Picker Modal */}
      {isWorkshopPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Change Workshop Bay Picture</h3>
                  <p className="text-xs text-slate-500">Pick from your workshop gallery or upload from device</p>
                </div>
              </div>
              <button
                onClick={() => setIsWorkshopPickerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Selected Preview */}
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img src={workshopPhoto} alt="Current workshop selection" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Current Workshop Picture</span>
                <span className="text-[11px] text-emerald-700 font-semibold block flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Locked & Permanently Saved
                </span>
              </div>
            </div>

            {/* Option 1: Select from Gallery */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                <span>Select from Your Workshop Gallery:</span>
              </label>
              
              {availableGalleryPhotos.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No gallery pictures found.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {availableGalleryPhotos.map((photo, idx) => (
                    <button
                      key={photo.id || idx}
                      type="button"
                      onClick={() => selectWorkshopPhotoPermanently(photo.url)}
                      className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        workshopPhoto === photo.url
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 hover:border-emerald-400'
                      }`}
                      title={photo.title}
                    >
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      {workshopPhoto === photo.url && (
                        <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-lime-400 text-emerald-950 flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Option 2: Upload New Photo from Device */}
            <div className="pt-2 border-t border-slate-100">
              <label className="w-full py-3 px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.02] active:scale-98 border border-lime-300">
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Upload New Workshop Picture from Device</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleWorkshopPhotoUpload}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Photo Saved Toast Notification */}
      {photoSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white border border-lime-400/50 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-6 h-6 rounded-full bg-lime-400 text-emerald-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div className="text-xs font-bold text-white">
            Picture updated & permanently saved to device storage!
          </div>
        </div>
      )}
    </div>
  );
};
