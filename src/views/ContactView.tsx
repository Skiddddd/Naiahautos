import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { DEALERSHIP_CONFIG } from '../data/cars';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('vehicle-purchase');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Save lead backup in local storage
    try {
      const newInquiry = {
        id: 'inquiry_' + Date.now(),
        name,
        phone,
        email,
        category: inquiryType,
        message,
        createdAt: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('naiahautos_contact_inquiries') || '[]');
      existing.unshift(newInquiry);
      localStorage.setItem('naiahautos_contact_inquiries', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // Ignore storage restrictions
    }

    // Immediately dispatch pre-filled inquiry directly to WhatsApp (08064160748)
    handleForwardWhatsApp();
  };

  const handleForwardWhatsApp = () => {
    const text = `*Website Contact Inquiry - Naiahautos*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Category:* ${inquiryType}\n` +
      `*Message:* ${message}`;

    window.open(`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleForwardEmail = () => {
    const subject = `Website Inquiry: ${inquiryType} from ${name}`;
    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nTopic: ${inquiryType}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${DEALERSHIP_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-slate-50 text-slate-800">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Showroom & Workshop Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Visit our Lekki showroom, reach us by telephone, or start a real-time WhatsApp conversation with our client services director.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card: Clean White Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Naiahautos Headquarters
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Showroom, customer vehicle collection hub, and certified computerized diagnostic bay at New Road Bus Stop, Before Chevron, Lekki, Lagos.
            </p>
          </div>

          <div className="space-y-4 text-xs pt-2">
            {/* Address */}
            <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-semibold">Physical Showroom Address</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">
                  {DEALERSHIP_CONFIG.address}
                </span>
                <span className="text-slate-500">{DEALERSHIP_CONFIG.city}, {DEALERSHIP_CONFIG.country}</span>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-semibold">Direct Telephone Line</span>
                <a href={`tel:${DEALERSHIP_CONFIG.phoneNumberRaw}`} className="text-slate-900 font-bold text-sm mt-0.5 block hover:text-emerald-700 font-mono">
                  {DEALERSHIP_CONFIG.phoneDisplay}
                </a>
                <span className="text-slate-500 text-[11px]">Showroom desk & voice switchboard</span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-semibold">Official WhatsApp Business</span>
                <a 
                  href={`https://wa.me/${DEALERSHIP_CONFIG.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-700 font-bold text-sm mt-0.5 block hover:underline font-mono"
                >
                  +{DEALERSHIP_CONFIG.whatsappNumber}
                </a>
                <span className="text-slate-500 text-[11px]">Instant text response & video walk-around tours</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-semibold">Official Email Address</span>
                <a 
                  href={`mailto:${DEALERSHIP_CONFIG.email}`} 
                  className="text-emerald-700 font-bold text-sm mt-0.5 block hover:underline"
                >
                  {DEALERSHIP_CONFIG.email}
                </a>
                <span className="text-slate-500 text-[11px]">Direct client support & quotes</span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block text-[11px] uppercase font-semibold">Showroom Opening Hours</span>
                <div className="text-slate-900 font-semibold">{DEALERSHIP_CONFIG.workingHoursWeekday}</div>
                <div className="text-slate-700">{DEALERSHIP_CONFIG.workingHoursSaturday}</div>
                <div className="text-slate-500 text-[11px]">{DEALERSHIP_CONFIG.workingHoursSunday}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form: Clean White Card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Send an Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Submit your message below. Our showroom team typically responds within 30 minutes during business hours.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Inquiry Dispatched Successfully</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, {name}. Our sales and technical advisors have received your communication and will respond promptly.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleForwardWhatsApp}
                  className="py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-lime-300" />
                  Open WhatsApp Chat (+234 806 416 0748)
                </button>
                <button
                  onClick={handleForwardEmail}
                  className="py-3 px-5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>Send via Email</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oladipo Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 803 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. oladipo@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Topic of Inquiry
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
                  >
                    <option value="vehicle-purchase">Vehicle Showroom Purchase</option>
                    <option value="inspection-booking">Book Pre-Purchase 200-Pt Inspection</option>
                    <option value="car-importation">US/Canada Car Sourcing & Clearing</option>
                    <option value="mechanical-service">Workshop Diagnostic / Maintenance</option>
                    <option value="spare-parts">Genuine OEM Spare Parts Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Your Message or Vehicle of Interest *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide details about the vehicle or service you require..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-lime-300" />
                  <span>Send Inquiry to WhatsApp (08064160748)</span>
                </button>
                <p className="text-[11px] text-center text-slate-500">
                  Transmits your message directly to the Naiahautos management desk on WhatsApp.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
