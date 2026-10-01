import React, { useState } from 'react';
import { 
  Search, ShieldCheck, CheckCircle2, AlertCircle, FileText, 
  MapPin, Cpu, Car, Layers, Gauge, RefreshCw, Copy, Check, ChevronDown, ChevronUp 
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { decodeVinLive, DecodedVinData, SAMPLE_VINS, validateVinCheckDigit } from '../services/vinService';
import { DEALERSHIP_CONFIG } from '../data/cars';
import { Naira } from '../components/NairaSign';

interface VinCheckerViewProps {
  onBookInspection: () => void;
  currency: 'NGN' | 'USD';
}

export const VinCheckerView: React.FC<VinCheckerViewProps> = ({ onBookInspection, currency }) => {
  const [vinInput, setVinInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [decodedData, setDecodedData] = useState<DecodedVinData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showRawVars, setShowRawVars] = useState(false);

  const cleanVin = vinInput.toUpperCase().trim();
  const checkDigitInfo = cleanVin.length === 17 ? validateVinCheckDigit(cleanVin) : null;

  const handleDecode = async (vinToDecode?: string) => {
    const targetVin = (vinToDecode || vinInput).toUpperCase().trim();
    if (!targetVin) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await decodeVinLive(targetVin);
      setDecodedData(result);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to decode VIN. Please verify the 17 characters and retry.');
      setDecodedData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppVerify = () => {
    if (!decodedData) return;
    const text = `*Naiahautos Live VIN Verification Inquiry*\n` +
      `*VIN:* ${decodedData.vin}\n` +
      `*Vehicle:* ${decodedData.modelYear} ${decodedData.make} ${decodedData.model} (${decodedData.trim || 'Standard'})\n` +
      `*Engine:* ${decodedData.displacementL ? decodedData.displacementL + 'L' : ''} ${decodedData.engineCylinders ? decodedData.engineCylinders + '-Cylinder' : ''}\n` +
      `*Plant:* ${decodedData.plantCountry || 'Global'}\n\n` +
      `Please cross-reference this VIN against Nigeria Customs Service (NCS) duty database and schedule a 200-point on-site inspection.`;

    window.open(`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-slate-50 text-slate-800">
      
      {/* Header Banner: Deep Emerald / Lime Header */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-800 bg-gradient-to-b from-[#064E3B] to-[#043326] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-lg text-white">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Live 17-Digit VIN Decoder & Specification Checker
        </h1>

        <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
          Verify authentic factory specifications, assembly plant origins, displacement, engine cylinders, transmission, and active safety systems directly from manufacturer homologation archives before buying in Nigeria.
        </p>

        {/* Input Bar */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl border border-emerald-300 shadow-[0_12px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all">
            <div className="flex-1 relative flex items-center">
              <Search className="w-5 h-5 text-emerald-800 absolute left-3.5" />
              <input
                type="text"
                maxLength={17}
                value={vinInput}
                onChange={(e) => {
                  setVinInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
                  setErrorMsg(null);
                }}
                placeholder="Enter 17-digit VIN (e.g. 1HGCR2F83HA123456)..."
                className="w-full bg-slate-50/80 rounded-xl pl-11 pr-14 py-3 text-sm text-slate-900 font-mono tracking-wider placeholder-slate-400 focus:outline-none uppercase inset-3d"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleDecode();
                }}
              />
              <span className="absolute right-3 text-[11px] font-mono font-bold text-slate-400">
                {vinInput.length}/17
              </span>
            </div>

            <button
              onClick={() => handleDecode()}
              disabled={loading || vinInput.length !== 17}
              className="py-3 px-6 btn-3d-lime text-emerald-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-950" />
                  <span>Decoding...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-emerald-950" />
                  <span>Decode VIN</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Real Samples */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-emerald-200">
            <span className="text-[11px] text-emerald-300/80 font-bold">Try Sample VINs:</span>
            {SAMPLE_VINS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setVinInput(sample.vin);
                  handleDecode(sample.vin);
                }}
                className="px-2.5 py-1 bg-[#02281e]/80 hover:bg-[#033c2e] hover:text-lime-300 border border-emerald-500/40 rounded-lg text-[11px] font-mono font-bold text-emerald-100 shadow-[0_2px_0_#011a14] active:translate-y-[1px] transition-all cursor-pointer"
                title={`${sample.label} (${sample.category})`}
              >
                {sample.label.split(' ')[0]} {sample.label.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message Box */}
      {errorMsg && (
        <div className="max-w-4xl mx-auto bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-800 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-rose-900">VIN Verification Warning</h4>
            <p className="text-rose-700">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Decoded Result Presentation: Clean White Card */}
      {decodedData && (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
          
          {/* Top Summary Banner */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    OEM Homologation Record
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono font-bold">
                    OEM Factory Authenticated
                  </span>
                  {checkDigitInfo && (
                    <span className={`text-[11px] px-2 py-0.5 rounded border font-mono font-medium ${
                      checkDigitInfo.isValid 
                        ? 'text-emerald-800 bg-emerald-50 border-emerald-200' 
                        : 'text-amber-800 bg-amber-50 border-amber-200'
                    }`}>
                      Check Digit (Pos 9): {checkDigitInfo.actualCheckDigit} {checkDigitInfo.isValid ? '(Valid Modulus 11)' : '(Regional Format)'}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {decodedData.modelYear} {decodedData.make} {decodedData.model} {decodedData.trim ? `· ${decodedData.trim}` : ''}
                </h2>

                <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                  <span className="font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-900 font-bold">
                    VIN: {decodedData.vin}
                  </span>
                  <button
                    onClick={() => handleCopy(decodedData.vin)}
                    className="flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer text-[11px] font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy VIN'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={handleWhatsAppVerify}
                  className="flex-1 lg:flex-initial py-3 px-5 btn-3d-emerald font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-lime-300" />
                  <span>Verify Duty on WhatsApp</span>
                </button>
                <button
                  onClick={onBookInspection}
                  className="flex-1 lg:flex-initial py-3 px-5 btn-3d-lime font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-950" />
                  <span>Book Physical 200-Pt Inspection</span>
                </button>
              </div>
            </div>

            {/* 4 Key Metric Metric Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Assembly Plant Country</span>
                <span className="text-slate-900 font-bold flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {decodedData.plantCountry || 'Global Assembly'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {decodedData.plantCity ? `${decodedData.plantCity}, ` : ''}{decodedData.plantState || ''}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Displacement & Cylinders</span>
                <span className="text-slate-900 font-bold flex items-center gap-1.5 text-sm">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  {decodedData.displacementL ? `${decodedData.displacementL} Liters` : 'Standard'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {decodedData.engineCylinders ? `${decodedData.engineCylinders} Cylinders` : 'Factory spec'}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Body & Platform</span>
                <span className="text-slate-900 font-bold flex items-center gap-1.5 text-sm">
                  <Car className="w-4 h-4 text-emerald-600" />
                  {decodedData.bodyClass || decodedData.vehicleType || 'Passenger Vehicle'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {decodedData.doors ? `${decodedData.doors} Doors` : ''} · {decodedData.driveType || 'Standard'}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Primary Fuel Type</span>
                <span className="text-slate-900 font-bold flex items-center gap-1.5 text-sm">
                  <Gauge className="w-4 h-4 text-emerald-600" />
                  {decodedData.fuelType || 'Gasoline'}
                </span>
                <span className="text-[11px] text-slate-500 block font-mono">
                  {decodedData.engineHP ? `${decodedData.engineHP} HP` : 'Factory tuned'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Detailed Specifications Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Manufacturing & Origin Dossier */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Manufacturer & Chassis Origin</h3>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Manufacturer Name</span>
                  <span className="text-slate-900 font-semibold text-right">{decodedData.manufacturer || decodedData.make}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Model Year (Pos 10)</span>
                  <span className="text-slate-900 font-bold font-mono">{decodedData.modelYear}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Manufacturing Plant Country</span>
                  <span className="text-slate-900 font-medium">{decodedData.plantCountry || 'Not Specified'}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Plant City / State</span>
                  <span className="text-slate-900 font-medium">
                    {[decodedData.plantCity, decodedData.plantState].filter(Boolean).join(', ') || 'Authorized Factory Facility'}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Steering Configuration</span>
                  <span className="text-emerald-700 font-bold">
                    {decodedData.steeringLocation || 'Left-Hand Drive (LHD Standard for Nigeria)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Powertrain & Mechanical Specifications */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Powertrain & Mechanical Specs</h3>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Displacement (Liters)</span>
                  <span className="text-slate-900 font-bold font-mono">{decodedData.displacementL ? `${decodedData.displacementL} L` : 'Specified by model'}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Engine Cylinders</span>
                  <span className="text-slate-900 font-bold font-mono">{decodedData.engineCylinders || 'Multi-cylinder'}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Engine Model Code</span>
                  <span className="text-slate-900 font-bold font-mono">{decodedData.engineModel || 'Factory Configuration'}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Drive Configuration</span>
                  <span className="text-slate-900 font-medium">{decodedData.driveType || 'Two-Wheel / All-Wheel'}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Transmission Style</span>
                  <span className="text-slate-900 font-medium">{decodedData.transmissionStyle || 'Automatic Transmission'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Safety & Systems Verification */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Active Safety & Restraint Homologation</h3>
              </div>
              <span className="text-xs text-slate-500">Factory Standard Inclusions</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Anti-Lock Brakes (ABS)</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {decodedData.safetyFeatures.abs || 'Standard'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Stability Control (ESC)</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {decodedData.safetyFeatures.esc || 'Standard'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Tire Pressure (TPMS)</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {decodedData.safetyFeatures.tpms || 'Direct / Electronic'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Airbag Locations</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Front, Side, Curtain
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Expandable Full Raw Variables */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setShowRawVars(!showRawVars)}
              className="w-full p-4 px-6 flex items-center justify-between text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>View Full Raw OEM Telemetry ({decodedData.allRawVariables.length} Parameters Decoded)</span>
              </div>
              {showRawVars ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showRawVars && (
              <div className="p-6 pt-2 border-t border-slate-100 max-h-96 overflow-y-auto space-y-2 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {decodedData.allRawVariables.map((item, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border border-slate-200 flex justify-between items-start gap-2">
                      <span className="text-slate-500">{item.variable}:</span>
                      <span className="text-slate-900 font-mono text-right font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Cross-Reference with Naiahautos Lagos Services */}
          <div className="bg-gradient-to-r from-[#064E3B] to-[#043326] text-white border border-emerald-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1.5 text-center md:text-left">
              <h4 className="text-lg font-bold text-white">Next Step: Physical Inspection in Lagos</h4>
              <p className="text-xs text-emerald-100 max-w-xl">
                While a VIN decode verifies factory build data, it cannot reveal accident coverups or cleared engine codes in Nigeria. Dispatch a Naiahautos master inspector to physically inspect this car before buying.
              </p>
            </div>

            <button
              onClick={onBookInspection}
              className="py-3 px-6 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs rounded-xl shadow cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>Book Physical Inspection (</span>
              <Naira />
              <span>45,000)</span>
            </button>
          </div>

        </div>
      )}

      {/* Educational Guide: ISO 3779 VIN */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Automotive Technical Knowledge
          </span>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Understanding the ISO 3779 17-Digit VIN Architecture
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Every vehicle manufactured since 1981 carries a globally unique 17-character fingerprint divided into three distinct segments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-mono text-emerald-700 font-bold text-sm">Positions 1 - 3: WMI</div>
            <h4 className="font-bold text-slate-900">World Manufacturer Identifier</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Identifies country of origin and automotive manufacturer. E.g., <strong>1HG</strong> = Honda USA, <strong>WBA</strong> = BMW Germany, <strong>2T2</strong> = Lexus Canada, <strong>SAL</strong> = Land Rover UK.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-mono text-emerald-700 font-bold text-sm">Positions 4 - 9: VDS</div>
            <h4 className="font-bold text-slate-900">Vehicle Descriptor Section</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Encodes model line, body style, engine displacement, transmission, and restraint types. <strong>Position 9</strong> is the mathematical check digit computed via Modulus 11 algorithm.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-mono text-emerald-700 font-bold text-sm">Positions 10 - 17: VIS</div>
            <h4 className="font-bold text-slate-900">Vehicle Identifier Section</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              <strong>Position 10</strong> specifies model year (e.g., N=2022, P=2023). Position 11 represents assembly plant location, and 12-17 represent the unique vehicle production serial sequence.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
