import React, { useState } from 'react';
import { 
  Play, 
  Camera, 
  Video, 
  Plus, 
  X, 
  Upload, 
  Trash2, 
  Check 
} from 'lucide-react';
import { INITIAL_REPAIRS_DATA, RepairMediaItem } from '../data/repairs';

interface RepairsGalleryViewProps {
  onBookInspection?: () => void;
  onBookService?: (serviceId: string) => void;
}

export const RepairsGalleryView: React.FC<RepairsGalleryViewProps> = () => {
  // Load repairs from localStorage or INITIAL_REPAIRS_DATA
  const [repairs, setRepairs] = useState<RepairMediaItem[]>(() => {
    const saved = localStorage.getItem('naiahautos_all_repairs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse all repairs', e);
      }
    }
    return INITIAL_REPAIRS_DATA;
  });

  const saveRepairs = (updatedList: RepairMediaItem[]) => {
    setRepairs(updatedList);
    localStorage.setItem('naiahautos_all_repairs', JSON.stringify(updatedList));
  };

  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [selectedRepair, setSelectedRepair] = useState<RepairMediaItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMediaDataUrl, setNewMediaDataUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'photo' | 'video'>('photo');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Direct 1-tap media replace from gallery
  const handleQuickMediaReplace = (repairId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const updated = repairs.map(item => {
            if (item.id === repairId) {
              return {
                ...item,
                mediaType: (isVideo ? 'video' : 'photo') as 'video' | 'photo',
                mediaUrl: dataUrl,
                thumbnailUrl: isVideo ? item.thumbnailUrl : dataUrl
              };
            }
            return item;
          });
          saveRepairs(updated);
          showToast(`Updated with your ${isVideo ? 'video' : 'picture'}!`);
          
          if (selectedRepair && selectedRepair.id === repairId) {
            setSelectedRepair(updated.find(u => u.id === repairId) || null);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new video or picture from device
  const handleAddNewMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaDataUrl) {
      alert('Please select a video or picture from your device.');
      return;
    }

    const newItem: RepairMediaItem = {
      id: `custom-${Date.now()}`,
      title: 'Workshop Media',
      vehicle: 'Workshop',
      category: 'engine',
      mediaType: newMediaType,
      mediaUrl: newMediaDataUrl,
      thumbnailUrl: newMediaDataUrl,
      faultReport: '',
      repairPerformed: '',
      partsReplaced: [],
      turnaroundTime: '',
      warranty: '',
      date: '',
      technician: ''
    };

    const updated = [newItem, ...repairs];
    saveRepairs(updated);
    setIsAddModalOpen(false);
    setNewMediaDataUrl('');
    showToast(`Added new ${newMediaType === 'video' ? 'video' : 'picture'} to gallery!`);
  };

  // Delete a media tile
  const handleDeleteMedia = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Delete this from gallery?')) {
      const updated = repairs.filter(r => r.id !== id);
      saveRepairs(updated);
      if (selectedRepair && selectedRepair.id === id) {
        setSelectedRepair(null);
      }
      showToast('Deleted from gallery');
    }
  };

  // Filtered items (without numbers)
  const filteredRepairs = repairs.filter(item => {
    if (activeMediaFilter === 'all') return true;
    return item.mediaType === activeMediaFilter;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-24">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-lime-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-lime-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <section className="bg-gradient-to-b from-[#064E3B] to-[#043326] text-white py-10 sm:py-14 border-b border-emerald-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider text-lime-300">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span>Workshop Media</span>
                <span className="text-emerald-500">|</span>
                <span>Lekki Phase 1, Lagos</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Repairs & Workshop Gallery
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
                Videos and photographs from our automotive engineering workshop. Tap any video to play or replace with your own gallery media.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Filter Bar (Clean: All | Videos | Pictures - No Numbers) */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveMediaFilter('all')}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMediaFilter === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveMediaFilter('video')}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMediaFilter === 'video'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-lime-400" />
              <span>Videos</span>
            </button>

            <button
              onClick={() => setActiveMediaFilter('photo')}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMediaFilter === 'photo'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pictures</span>
            </button>
          </div>

        </div>
      </section>

      {/* Pure Media Grid (No titles, no car names, no numbers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {filteredRepairs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-sm mx-auto my-12 space-y-3">
            <Camera className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No media in this view</div>
            <button
              onClick={() => setActiveMediaFilter('all')}
              className="py-2 px-4 rounded-xl bg-emerald-800 text-white text-xs font-bold cursor-pointer"
            >
              Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredRepairs.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border-2 border-white bg-slate-900 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedRepair(item)}
              >
                {/* Media Element (Video or Photo) */}
                {item.mediaType === 'video' ? (
                  <div className="w-full h-full relative">
                    <video
                      src={item.mediaUrl}
                      poster={item.thumbnailUrl}
                      preload="metadata"
                      muted
                      playsInline
                      loop
                      onMouseOver={(e) => {
                        const v = e.currentTarget;
                        v.play().catch(() => {});
                      }}
                      onMouseOut={(e) => {
                        const v = e.currentTarget;
                        v.pause();
                        v.currentTime = 0;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Centered Play Icon */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 flex items-center justify-center transition-colors pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-lime-400 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Discreet Video Badge in Corner */}
                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/70 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Video className="w-3 h-3 text-lime-400" />
                      <span>Video</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={item.mediaUrl}
                      alt="Workshop Repair"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Discreet Picture Badge in Corner */}
                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/70 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Camera className="w-3 h-3 text-emerald-400" />
                      <span>Picture</span>
                    </div>
                  </div>
                )}

                {/* Top-Right Action Controls */}
                <div 
                  className="absolute top-3 right-3 flex items-center gap-1.5 opacity-95 transition-opacity z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Change video button */}
                  <label 
                    className="py-1.5 px-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95 border border-lime-300"
                    title="Change this video to your own video from gallery"
                  >
                    <Video className="w-3.5 h-3.5 fill-current" />
                    <span>Change Video</span>
                    <input
                      type="file"
                      accept="video/*,image/*"
                      className="hidden"
                      onChange={(e) => handleQuickMediaReplace(item.id, e)}
                    />
                  </label>

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDeleteMedia(item.id, e)}
                    className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md backdrop-blur-xs border border-white/20 cursor-pointer"
                    title="Delete this item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* Full-Screen Theater Viewer (Pure Video / Picture, No Text Clutter) */}
      {selectedRepair && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedRepair(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs font-bold text-emerald-300">
                {selectedRepair.mediaType === 'video' ? 'Workshop Video' : 'Workshop Picture'}
              </span>

              <div className="flex items-center gap-2">
                <label 
                  className="py-1.5 px-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <Video className="w-3.5 h-3.5 fill-current" />
                  <span>Change to My Video</span>
                  <input
                    type="file"
                    accept="video/*,image/*"
                    className="hidden"
                    onChange={(e) => handleQuickMediaReplace(selectedRepair.id, e)}
                  />
                </label>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedRepair(null)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Media Player Area */}
            <div className="w-full rounded-3xl overflow-hidden bg-black aspect-video flex items-center justify-center shadow-2xl border border-white/10">
              {selectedRepair.mediaType === 'video' ? (
                <video
                  src={selectedRepair.mediaUrl}
                  poster={selectedRepair.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedRepair.mediaUrl}
                  alt="Workshop Photo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Bottom Floating Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 w-full">
              <label 
                className="py-2.5 px-5 rounded-2xl bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Video className="w-4 h-4 fill-current" />
                <span>Select Video From Your Phone Gallery</span>
                <input
                  type="file"
                  accept="video/*,image/*"
                  className="hidden"
                  onChange={(e) => handleQuickMediaReplace(selectedRepair.id, e)}
                />
              </label>

              <button
                onClick={() => handleDeleteMedia(selectedRepair.id)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold cursor-pointer ml-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add New Video / Picture Modal (Simple Device Picker) */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 my-auto text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Add Video or Picture from Gallery
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewMedia} className="space-y-4">
              
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const isVid = file.type.startsWith('video');
                      setNewMediaType(isVid ? 'video' : 'photo');
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        if (result) {
                          setNewMediaDataUrl(result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="media-uploader-input"
                />
                <label htmlFor="media-uploader-input" className="cursor-pointer space-y-2 block">
                  <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-slate-800">
                    {newMediaDataUrl ? (
                      <span className="text-emerald-700 font-extrabold">
                        ✓ {newMediaType === 'video' ? 'Video' : 'Picture'} Selected
                      </span>
                    ) : (
                      <span>Tap to select video or picture from your device gallery</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    Supports videos (.mp4, .mov) and photos (.jpg, .png)
                  </span>
                </label>
              </div>

              {/* Preview if chosen */}
              {newMediaDataUrl && (
                <div className="rounded-xl overflow-hidden aspect-video bg-black max-h-40 border border-slate-200">
                  {newMediaType === 'video' ? (
                    <video src={newMediaDataUrl} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={newMediaDataUrl} alt="Preview" className="w-full h-full object-cover" />
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setNewMediaDataUrl('');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newMediaDataUrl}
                  className="py-2.5 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Gallery</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
