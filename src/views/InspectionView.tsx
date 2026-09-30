import React, { useState } from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, AlertTriangle, Eye, Car, Cpu, Gauge, MapPin, MessageCircle } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../data/cars';
import { Naira } from '../components/NairaSign';
import { TiltCard } from '../components/TiltCard';

interface InspectionViewProps {
  onBookInspection: () => void;
  currency: 'NGN' | 'USD';
}

export const InspectionView: React.FC<InspectionViewProps> = ({ onBookInspection, currency }) => {
  const [activeReportTab, setActiveReportTab] = useState<'engine' | 'frame' | 'flood' | 'customs'>('engine');

  const inspectionFee = currency === 'NGN' ? 'NGN 45,000' : '$30';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 bg-slate-50 text-slate-800">
      
      {/* Header Hero: Deep forest green with lemon highlights */}
      <div className="bg-gradient-to-b from-[#064E3B] to-[#043326] border border-emerald-800 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-md">
        <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-lime-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-lime-300">
          <ShieldCheck className="w-4 h-4 text-lime-400" />
          <span>Independent Pre-Purchase Diagnostic Service</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Never Buy a Car in Nigeria Blindly.
        </h1>

        <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
          Over 65% of Tokunbo cars sold in Nigeria conceal previous collision frame damage, flood immersion from salvage yards, or cleared diagnostic trouble codes. Our 200-point inspection protects your hard-earned money.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBookInspection}
            className="w-full sm:w-auto py-3.5 px-8 btn-3d-lime text-sm inline-flex items-center justify-center gap-1.5"
          >
            <span>Book Inspection for </span>
            {currency === 'NGN' ? (
              <span className="inline-flex items-center gap-0.5">
                <Naira />
                <span>45,000</span>
              </span>
            ) : (
              <span>$30</span>
            )}
          </button>
          <a
            href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Naiahautos, I need an urgent pre-purchase inspection in Lagos today.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3.5 px-6 bg-[#022c22]/80 hover:bg-[#033c2e] text-emerald-100 hover:text-white font-bold text-xs rounded-xl border border-emerald-500/40 shadow-[0_3px_0_#011a14] active:translate-y-[2px] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current text-lime-300" />
            <span>Request Instant Inspector Dispatch</span>
          </a>
        </div>
      </div>

      {/* 5-Stage Protocol: 3D Depth Cards */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            The 200-Point Inspection Protocol
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Carried out by certified automotive engineers with professional diagnostic tablets and paint depth meters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard maxTilt={7} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-3d hover:shadow-3d-hover">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">OBD-II Computer Diagnostic Scan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We interrogate all vehicle microcomputers (ECU, TCU, ABS, Airbag SRS, Steering Angle Sensors) looking for hidden DTC codes and live cylinder misfire counts.
            </p>
          </TiltCard>

          <TiltCard maxTilt={7} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-3d hover:shadow-3d-hover">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">Chassis & Digital Paint Depth Scan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We measure paint thickness across all panels in micrometers/mils to reveal repainted panels, body filler (bondo), cut-and-joined unibodies, and crumpled front aprons.
            </p>
          </TiltCard>

          <TiltCard maxTilt={7} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-3d hover:shadow-3d-hover">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Flood & Saltwater Immersion Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspection under dashboards, seat rail bolts, seatbelt tags, and fuse boxes for silt deposits, corrosion, and waterlines common with hurricane/salvage import vehicles.
            </p>
          </TiltCard>

          <TiltCard maxTilt={7} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-3d hover:shadow-3d-hover">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">Engine Load & Road Test</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cold start check, transmission gear engagement under torque load, brake rotor runout, steering alignment, and radiator cooling fan cycle evaluation.
            </p>
          </TiltCard>

          <TiltCard maxTilt={7} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-3d hover:shadow-3d-hover">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
              05
            </div>
            <h3 className="text-base font-bold text-slate-900">Nigeria Customs Paper Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Audit of the Single Goods Declaration (SGD), Customs Reference Number (C-Number), and VIN cross-check to guarantee the vehicle isn't flagged for illegal entry.
            </p>
          </TiltCard>

          <TiltCard maxTilt={7} className="bg-gradient-to-br from-[#064E3B] to-[#043326] text-white border border-emerald-700 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-lime-300">Rapid Delivery</span>
              <h3 className="text-base font-bold text-white">18-Page PDF Inspection Report</h3>
              <p className="text-xs text-emerald-100/90">
                Delivered straight to your WhatsApp and email within 2 hours of completion with high-resolution photos and a definitive BUY or WALK verdict.
              </p>
            </div>
            <button
              onClick={onBookInspection}
              className="w-full py-2.5 btn-3d-lime text-xs font-bold rounded-xl"
            >
              Book Now
            </button>
          </TiltCard>
        </div>
      </div>

      {/* Interactive Sample Report Simulator */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Interactive Report Preview
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Sample Naiahautos Inspection Dossier
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            See exactly how our technical reports empower you when negotiating with car dealers.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveReportTab('engine')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeReportTab === 'engine' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Engine & Transmission Scan
          </button>
          <button
            onClick={() => setActiveReportTab('frame')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeReportTab === 'frame' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Paint Depth & Chassis
          </button>
          <button
            onClick={() => setActiveReportTab('flood')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeReportTab === 'flood' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Flood Telemetry
          </button>
          <button
            onClick={() => setActiveReportTab('customs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeReportTab === 'customs' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Customs SGD Verification
          </button>
        </div>

        {/* Active Tab Card */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs space-y-4">
          {activeReportTab === 'engine' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Computer Diagnostic Readout</span>
                <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-mono font-bold">0 ACTIVE FAULTS</span>
              </div>
              <p className="text-slate-600">
                OBD-II handshake successful. Long-term fuel trim at +1.4% (factory nominal). O2 sensors cycling actively between 0.1V - 0.9V. Transmission slip test recorded zero shift delay across all 8 forward gear ratios.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600 font-mono text-[11px]">
                <div><span>RPM Idle:</span> <strong className="text-slate-900">680 RPM</strong></div>
                <div><span>Coolant Temp:</span> <strong className="text-slate-900">91°C</strong></div>
                <div><span>Oil Pressure:</span> <strong className="text-emerald-700">Normal</strong></div>
                <div><span>Timing Variance:</span> <strong className="text-emerald-700">0.0°</strong></div>
              </div>
            </div>
          )}

          {activeReportTab === 'frame' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Digital Paint Thickness Meter</span>
                <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-mono font-bold">ALL PANELS FACTORY ORIGINAL</span>
              </div>
              <p className="text-slate-600">
                Hood: 4.8 mils · Driver Door: 4.9 mils · Quarter Panels: 5.1 mils · Roof: 4.7 mils. No readings above 7.0 mils indicating zero bondo/filler repairs. Front crash bar spot welds factory original.
              </p>
            </div>
          )}

          {activeReportTab === 'flood' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Waterline & Salt Corrosion Checks</span>
                <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-mono font-bold">PASSED: NO FLOOD HISTORY</span>
              </div>
              <p className="text-slate-600">
                Inspected under carpet floor mats, fuse module pins, and seat anchor bolts. Zero oxidation, zero water silt line, fresh factory interior aroma without masking perfumes.
              </p>
            </div>
          )}

          {activeReportTab === 'customs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Nigeria Customs Service Paper Audit</span>
                <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-mono font-bold">100% AUTHENTIC DUTY PAID</span>
              </div>
              <p className="text-slate-600">
                Single Goods Declaration (SGD) verified on Nigeria Customs Portal. Correct valuation band applied, clearing agent duty stamp legitimate, port of entry: Tin Can Island Port, Lagos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
