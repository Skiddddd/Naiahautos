import React, { useState, useEffect } from 'react';
import { Shield, Check, Clock, FileText, MessageCircle, Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { AUTO_SERVICES_DATA } from '../data/services';
import { DEALERSHIP_CONFIG } from '../data/cars';
import { Naira } from '../components/NairaSign';
import workshopBayDefaultImg from '@/src/assets/images/repair_dashboard_framework.jpg';
import { INITIAL_REPAIRS_DATA, RepairMediaItem } from '../data/repairs';
import { 
  getStoredRepairs, 
  saveCustomSetting, 
  getCustomSetting, 
  requestPersistentStorage 
} from '../services/mediaStorage';

interface ServicesViewProps {
  onBookService: (serviceId: string) => void;
  currency: 'NGN' | 'USD';
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onBookService, currency }) => {
  const [workshopPhoto, setWorkshopPhoto] = useState<string>(() => {
    return localStorage.getItem('naiahautos_workshop_photo_v2') || workshopBayDefaultImg;
  });

  const [availableGalleryPhotos, setAvailableGalleryPhotos] = useState<Array<{ id: string; title: string; url: string }>>([]);
  const [isWorkshopPickerOpen, setIsWorkshopPickerOpen] = useState(false);
  const [photoSavedToast, setPhotoSavedToast] = useState(false);

  useEffect(() => {
    async function loadGalleryPhotos() {
      requestPersistentStorage().catch(() => {});
      
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

        if (!customWorkshop && photos.length > 0) {
          const bayPhoto = photos.find(p => p.url.includes('repair_dashboard_framework')) || photos[0];
          setWorkshopPhoto(bayPhoto.url);
        }
      } catch (e) {
        console.warn('Failed to load gallery photos in ServicesView:', e);
      }
    }
    loadGalleryPhotos();
  }, []);

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
            Workshop bay picture updated & permanently saved!
          </div>
        </div>
      )}

    </div>
  );
};
