import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, FileCheck, Wrench, Globe2, Clock } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { VEHICLES_DATA, Vehicle, DEALERSHIP_CONFIG } from '../data/cars';
import { AUTO_SERVICES_DATA } from '../data/services';
import { NavTab } from '../components/Navbar';
import founderPortraitImg from '@/src/assets/images/founder_portrait.jpg';
import repairA from '@/src/assets/images/repair_poster_rebuild-to-red-santafe.jpg';
import repairB from '@/src/assets/images/repair_poster_suv-spray-booth-finish.jpg';
import repairC from '@/src/assets/images/repair_poster_jeep-liberty-full-respray.jpg';
import { clearLegacyPhotoSettings } from '../services/mediaStorage';

interface HomeViewProps {
  onSelectVehicle: (v: Vehicle) => void;
  onBookInspection: () => void;
  onBookService?: (serviceId: string) => void;
  onNavigateTab: (tab: NavTab) => void;
  currency: 'NGN' | 'USD';
}

const money = (v: { priceNgn: number; priceUsd: number } | { basePriceNgn: number; basePriceUsd: number }, c: 'NGN' | 'USD') => {
  const ngn = 'priceNgn' in v ? v.priceNgn : v.basePriceNgn;
  const usd = 'priceUsd' in v ? v.priceUsd : v.basePriceUsd;
  return c === 'NGN' ? `₦${ngn.toLocaleString('en-NG')}` : `$${usd.toLocaleString('en-US')}`;
};

export const HomeView: React.FC<HomeViewProps> = ({ onSelectVehicle, onBookInspection, onBookService, onNavigateTab, currency }) => {
  const featured = VEHICLES_DATA.filter((c) => c.featured);
  const lead = featured[0] ?? VEHICLES_DATA[0];

  React.useEffect(() => { clearLegacyPhotoSettings().catch(() => {}); }, []);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero: one large photograph, one big headline */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden border-b border-gold-400/20">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]">
          <img src={lead.imageUrl} alt={lead.name} className="w-full h-full object-cover object-[center_35%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 lg:via-black/20" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black via-black/70 via-45% to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative max-w-7xl mx-auto w-full px-5 lg:px-8 pb-16 sm:pb-24 pt-40"
        >
          <h1 className="max-w-4xl text-slate-900 !text-[clamp(3rem,9vw,7.5rem)] !leading-[0.95]">
            Drive something worth the wait.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-700 leading-relaxed">
            Customs-cleared, hand-inspected vehicles from our Lekki showroom, with a 200-point report before you pay a naira.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => onNavigateTab('inventory')} className="btn-3d-lime px-7 py-3.5 rounded-lg text-sm cursor-pointer inline-flex items-center gap-2">
              View vehicles <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onBookInspection} className="btn-3d-emerald px-7 py-3.5 rounded-lg text-sm cursor-pointer">
              Book an inspection
            </button>
          </div>
        </motion.div>
      </section>

      {/* Assurances */}
      <section className="border-b border-slate-200 bg-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {[
            [ShieldCheck, '200-point inspection', 'Engine, frame, flood and electrics'],
            [FileCheck, 'Customs cleared', 'Papers checked before listing'],
            [Globe2, 'Direct imports', 'Sourced and shipped for you'],
            [Wrench, 'In-house workshop', 'Bodywork, paint and diagnostics'],
          ].map(([Icon, t, d]: any) => (
            <div key={t} className="flex gap-3">
              <Icon className="w-5 h-5 mt-0.5 text-gold-400 shrink-0" />
              <div><div className="font-semibold text-slate-900">{t}</div><div className="text-slate-500">{d}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured vehicles */}
      <section id="featured-vehicles" className="max-w-7xl mx-auto px-5 lg:px-8 py-24 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <h2 className="text-slate-900">On the showroom floor</h2>
          <button onClick={() => onNavigateTab('inventory')} className="text-gold-300 hover:text-gold-400 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer">
            See all vehicles <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => (
            <button key={v.id} onClick={() => onSelectVehicle(v)} className="group text-left cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black ring-1 ring-gold-400/15 group-hover:ring-gold-400/60 transition">
                <img src={v.imageUrl} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-50" />
                <img src={v.imageUrl} alt={v.name} className="relative w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                {v.customsCleared && (
                  <span className="absolute top-4 left-4 bg-black/70 backdrop-blur text-gold-300 text-[11px] font-semibold px-3 py-1 rounded-full border border-gold-400/30">Customs cleared</span>
                )}
              </div>
              <div className="pt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl text-slate-900">{v.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{v.fuelType} · {v.drivetrain} · {v.transmission}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-gold-300">{money(v, currency)}</div>
                  <div className="text-xs text-slate-500">Score {v.inspectionScore}/100</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Services: an editorial list, not cards */}
      <section id="services" className="bg-slate-100 border-y border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
          <h2 className="text-slate-900 mb-12 max-w-2xl">Everything between the port and your driveway</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {AUTO_SERVICES_DATA.map((s) => (
              <div key={s.id} className="py-7 grid gap-4 md:grid-cols-[1.4fr_1.6fr_auto] md:items-center">
                <h3 className="text-2xl text-slate-900">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.shortDesc}</p>
                <div className="flex items-center gap-5 md:justify-end">
                  <div className="text-sm text-slate-500"><div className="font-semibold text-gold-300">From {money(s, currency)}</div><div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.turnaround}</div></div>
                  <button onClick={() => onBookService?.(s.id)} className="btn-3d-emerald px-5 py-2.5 rounded-lg text-xs cursor-pointer">Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-center">
          <div>
            <h2 className="text-slate-900">Our workshop, up close</h2>
            <p className="mt-5 text-slate-500 leading-relaxed max-w-md">From collision rebuilds to full resprays, watch the work happen in our paint booth and bodyshop.</p>
            <button onClick={() => onNavigateTab('repairs')} className="mt-8 btn-3d-lime px-7 py-3.5 rounded-lg text-sm cursor-pointer inline-flex items-center gap-2">Watch the repairs <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <img src={repairA} alt="Collision rebuild to red finish" className="col-span-2 row-span-2 w-full h-full object-cover rounded-xl ring-1 ring-gold-400/15" />
            <img src={repairB} alt="SUV spray booth finish" className="w-full aspect-square object-cover rounded-xl ring-1 ring-gold-400/15" />
            <img src={repairC} alt="Jeep Liberty full respray" className="w-full aspect-square object-cover rounded-xl ring-1 ring-gold-400/15" />
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-24 grid gap-10 md:grid-cols-[320px_1fr] items-center">
          <img src={founderPortraitImg} alt="Naiahautos founder" className="w-full aspect-[4/5] object-cover rounded-xl ring-1 ring-gold-400/30" />
          <div>
            <h2 className="text-slate-900">Meet the person behind every inspection</h2>
            <p className="mt-5 text-slate-500 leading-relaxed">Every vehicle is checked by our own engineers before it is listed, and you can speak to the founder directly before you buy.</p>
            <a href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="mt-8 btn-3d-lime px-7 py-3.5 rounded-lg text-sm inline-flex items-center gap-2">
              <WhatsAppIcon className="w-4 h-4 fill-current" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
