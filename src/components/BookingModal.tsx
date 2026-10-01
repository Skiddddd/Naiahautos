import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Car } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DEALERSHIP_CONFIG, Vehicle } from '../data/cars';
import { AUTO_SERVICES_DATA } from '../data/services';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTypeDefault?: string;
  selectedVehicle?: Vehicle | null;
  currency: 'NGN' | 'USD';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceTypeDefault = 'pre-purchase-inspection',
  selectedVehicle = null,
  currency
}) => {
  const [serviceId, setServiceId] = useState(serviceTypeDefault);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [carDetails, setCarDetails] = useState(selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.name}` : '');
  const [inspectionLocation, setInspectionLocation] = useState<'hub' | 'mobile'>('mobile');
  const [mobileAddress, setMobileAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentService = AUTO_SERVICES_DATA.find(s => s.id === serviceId) || AUTO_SERVICES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Save lead backup in local storage
    try {
      const locText = inspectionLocation === 'hub' ? 'Naiahautos Lekki Hub' : `Mobile Location: ${mobileAddress}`;
      const newLead = {
        id: 'booking_' + Date.now(),
        client: fullName,
        phone: phoneNumber,
        service: currentService.title,
        vehicle: carDetails || 'Not specified',
        location: locText,
        dateTime: `${preferredDate} at ${preferredTime}`,
        notes: notes || '',
        createdAt: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('naiahautos_booking_leads') || '[]');
      existing.unshift(newLead);
      localStorage.setItem('naiahautos_booking_leads', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // Ignore storage restrictions
    }

    // Immediately dispatch pre-filled details straight to WhatsApp (08064160748)
    handleSendToWhatsApp();
  };

  const handleSendToWhatsApp = () => {
    const locText = inspectionLocation === 'hub' ? 'Naiahautos Lekki Hub' : `Mobile Location: ${mobileAddress}`;
    const text = `*New Booking Request - Naiahautos*\n\n` +
      `*Client:* ${fullName}\n` +
      `*Phone:* ${phoneNumber}\n` +
      `*Service:* ${currentService.title}\n` +
      `*Vehicle:* ${carDetails || 'Not specified'}\n` +
      `*Location:* ${locText}\n` +
      `*Date/Time:* ${preferredDate} at ${preferredTime}\n` +
      (notes ? `*Notes:* ${notes}` : '');

    window.open(`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Forest Green with Lemon Accent */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-800 bg-[#064E3B] text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-lime-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              {selectedVehicle ? `Book Inspection: ${selectedVehicle.name}` : 'Schedule Automotive Service & Inspection'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1.5 rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Clean White with Crisp Slate & Emerald */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Booking Request Registered!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Our lead automotive engineer will confirm your slot within 15 minutes.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="text-slate-900 font-semibold">{currentService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vehicle:</span>
                  <span className="text-slate-900 font-semibold">{carDetails || 'To be determined'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="text-emerald-800 font-mono font-bold">{preferredDate || 'Earliest Available'} ({preferredTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Venue:</span>
                  <span className="text-slate-900 font-semibold">
                    {inspectionLocation === 'hub' ? 'Naiahautos Lekki Hub' : (mobileAddress || 'Mobile in Lagos')}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  onClick={handleSendToWhatsApp}
                  className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow cursor-pointer transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-lime-300" />
                  Open WhatsApp Chat (+234 806 416 0748)
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Service Selection */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Select Automotive Service
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
                >
                  {AUTO_SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} - {currency === 'NGN' ? `NGN ${srv.basePriceNgn.toLocaleString()}` : `$${srv.basePriceUsd}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Description */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Vehicle Brand, Model & Year
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2021 Lexus RX350 or Mercedes C300"
                  value={carDetails}
                  onChange={(e) => setCarDetails(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
                />
              </div>

              {/* Location choice */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Inspection / Service Venue
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInspectionLocation('mobile')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      inspectionLocation === 'mobile'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold block text-slate-900">Mobile Inspection</span>
                    <span className="text-[11px] text-slate-500">Our engineer visits seller anywhere in Lagos</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectionLocation('hub')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      inspectionLocation === 'hub'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold block text-slate-900">Naiahautos Hubs (Lekki / Ikeja / Benin City)</span>
                    <span className="text-[11px] text-slate-500">Drive vehicle to our diagnostic hydraulic lift bays</span>
                  </button>
                </div>
              </div>

              {inspectionLocation === 'mobile' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Seller / Car Location Address in Lagos
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ikeja GRA, Victoria Island, or Festac Town, Lagos"
                    value={mobileAddress}
                    onChange={(e) => setMobileAddress(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
                  />
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
                  >
                    <option value="09:00 AM">09:00 AM (Morning Slot)</option>
                    <option value="11:30 AM">11:30 AM (Midday Slot)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Slot)</option>
                    <option value="04:30 PM">04:30 PM (Evening Slot)</option>
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 803 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Additional Notes or Specific Concerns (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Seller mentioned previous fender bender, please inspect front apron welds."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm resize-none"
                />
              </div>

              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-lime-400 hover:bg-lime-300 active:bg-lime-500 text-emerald-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-950" />
                  <span>Confirm & Send to WhatsApp (08064160748)</span>
                </button>
                <p className="text-[11px] text-center text-slate-500">
                  Your booking request will immediately open WhatsApp to notify the Naiahautos engineering team.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
