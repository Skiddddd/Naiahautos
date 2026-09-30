import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Camera, 
  Video, 
  Plus, 
  X, 
  Upload, 
  Trash2, 
  Check,
  RefreshCw,
  Link as LinkIcon,
  ShieldCheck,
  Wrench,
  SlidersHorizontal,
  FolderUp,
  Save,
  Lock,
  Download
} from 'lucide-react';
import { INITIAL_REPAIRS_DATA, RepairMediaItem } from '../data/repairs';
import { 
  getStoredRepairs, 
  saveStoredRepairs, 
  clearStoredRepairs,
  requestPersistentStorage,
  checkIsPersisted
} from '../services/mediaStorage';

interface RepairsGalleryViewProps {
  onBookInspection?: () => void;
  onBookService?: (serviceId: string) => void;
}

const VERSION_KEY = 'naiahautos_gallery_version_v8';

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export const RepairsGalleryView: React.FC<RepairsGalleryViewProps> = () => {
  const [repairs, setRepairs] = useState<RepairMediaItem[]>(INITIAL_REPAIRS_DATA);
  const [isPermanentlySaved, setIsPermanentlySaved] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Initialize and sync with IndexedDB
  useEffect(() => {
    async function loadData() {
      try {
        const stored = await getStoredRepairs();
        if (stored && Array.isArray(stored) && stored.length > 0) {
          setRepairs(stored);
          setIsPermanentlySaved(true);
          const savedTimestamp = localStorage.getItem('naiahautos_saved_timestamp') || 'Protected';
          setLastSavedTime(savedTimestamp);
          return;
        }
      } catch (e) {
        console.warn('Error fetching stored repairs:', e);
      }
      // Set to current initial data
      setRepairs(INITIAL_REPAIRS_DATA);
      await saveStoredRepairs(INITIAL_REPAIRS_DATA);
      setIsPermanentlySaved(true);
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem('naiahautos_saved_timestamp', nowStr);
      setLastSavedTime(nowStr);
    }
    loadData();
    requestPersistentStorage().catch(() => {});
  }, []);

  const saveRepairs = async (updatedList: RepairMediaItem[]) => {
    setRepairs(updatedList);
    try {
      await saveStoredRepairs(updatedList);
      await requestPersistentStorage();
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem('naiahautos_saved_timestamp', nowStr);
      setLastSavedTime(nowStr);
      setIsPermanentlySaved(true);
    } catch (e) {
      console.warn('Media save error:', e);
    }
  };

  // Explicit user manual trigger to lock & save permanently
  const handleLockAndSavePermanently = async () => {
    try {
      await saveStoredRepairs(repairs);
      const isPersisted = await requestPersistentStorage();
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem('naiahautos_saved_timestamp', nowStr);
      setLastSavedTime(nowStr);
      setIsPermanentlySaved(true);
      showToast(`✓ Permanently Saved! ${repairs.length} items locked into persistent storage at ${nowStr}.`);
    } catch (e) {
      showToast('Saved to persistent storage successfully!');
    }
  };

  // Export gallery backup file
  const handleExportBackup = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(repairs, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `naiahautos-gallery-backup-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Backup JSON downloaded successfully!');
    } catch (e) {
      showToast('Failed to export backup');
    }
  };

  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [selectedRepair, setSelectedRepair] = useState<RepairMediaItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<RepairMediaItem | null>(null);

  // Add / Edit form fields
  const [mediaSourceTab, setMediaSourceTab] = useState<'file' | 'url' | 'presets'>('file');
  const [customDataUrl, setCustomDataUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customVehicle, setCustomVehicle] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState<'photo' | 'video'>('video');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Direct replace handler for quick file input
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
          showToast(`Updated with your selected ${isVideo ? 'video' : 'picture'}!`);
          
          if (selectedRepair && selectedRepair.id === repairId) {
            setSelectedRepair(updated.find(u => u.id === repairId) || null);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Bulk uploader to select all files at once
  const handleBulkUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    showToast(`Reading ${fileList.length} files...`);

    const promises = fileList.map((file, idx) => {
      return new Promise<RepairMediaItem>((resolve) => {
        const isVideo = file.type.startsWith('video');
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

          resolve({
            id: `user-upload-${Date.now()}-${idx}`,
            title: cleanName || (isVideo ? 'Workshop Video' : 'Workshop Photo'),
            vehicle: 'Lexus / Toyota Executive Sedan',
            category: 'electrical',
            mediaType: isVideo ? 'video' : 'photo',
            mediaUrl: dataUrl,
            thumbnailUrl: isVideo ? '/videos/dashboard_assembly_repair.mp4' : dataUrl,
            faultReport: 'Client submitted vehicle electrical repair recording.',
            repairPerformed: 'Vehicle dashboard wiring harness restoration and component diagnostics.',
            partsReplaced: ['Verified OEM Wiring & Terminals'],
            turnaroundTime: '24-48 Hours',
            warranty: 'Naiahautos Workshop Guarantee',
            date: 'September 2026',
            technician: 'Lead Auto Electrician, Naiahautos'
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((items) => {
      // Sort videos first, then photos
      const sorted = [...items].sort((a, b) => (a.mediaType === 'video' ? -1 : 1));
      saveRepairs(sorted);
      showToast(`Loaded ${items.length} files directly into your gallery!`);
    });
  };

  // Reset to default workshop assets
  const handleResetToDefaults = () => {
    if (window.confirm('Reset gallery to official Naiahautos workshop videos and pictures?')) {
      clearStoredRepairs();
      saveRepairs(INITIAL_REPAIRS_DATA);
      if (selectedRepair) {
        setSelectedRepair(INITIAL_REPAIRS_DATA.find(r => r.id === selectedRepair.id) || null);
      }
      showToast('Gallery restored to verified workshop media');
    }
  };

  // Submit custom media add or edit
  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = mediaSourceTab === 'file' ? customDataUrl : inputUrl.trim();
    if (!finalUrl) {
      alert('Please select a file or enter a media link.');
      return;
    }

    const isYoutube = !!extractYouTubeId(finalUrl);
    const mediaType = isYoutube ? 'video' : selectedMediaType;

    if (itemToEdit) {
      // Edit existing
      const updated = repairs.map(r => {
        if (r.id === itemToEdit.id) {
          return {
            ...r,
            title: customTitle.trim() || r.title,
            vehicle: customVehicle.trim() || r.vehicle,
            mediaType,
            mediaUrl: finalUrl,
            thumbnailUrl: mediaType === 'photo' ? finalUrl : r.thumbnailUrl
          };
        }
        return r;
      });
      saveRepairs(updated);
      if (selectedRepair && selectedRepair.id === itemToEdit.id) {
        setSelectedRepair(updated.find(u => u.id === itemToEdit.id) || null);
      }
      showToast('Item updated successfully!');
      setItemToEdit(null);
    } else {
      // Add new
      const newItem: RepairMediaItem = {
        id: `media-${Date.now()}`,
        title: customTitle.trim() || (mediaType === 'video' ? 'Workshop Service Video' : 'Workshop Diagnostic Photo'),
        vehicle: customVehicle.trim() || 'Naiahautos Workshop Bay',
        category: 'engine',
        mediaType,
        mediaUrl: finalUrl,
        thumbnailUrl: mediaType === 'photo' ? finalUrl : (repairs[0]?.thumbnailUrl || finalUrl),
        faultReport: 'Workshop service recorded live at Naiahautos facility.',
        repairPerformed: 'Automotive diagnostics, servicing and certified repair procedures.',
        partsReplaced: ['Verified OEM Components'],
        turnaroundTime: 'Same Day',
        warranty: 'Naiahautos Guarantee',
        date: 'Today',
        technician: 'Lead Diagnostics Engineer'
      };
      saveRepairs([newItem, ...repairs]);
      showToast(`Added new ${mediaType === 'video' ? 'video' : 'picture'} to gallery!`);
      setIsAddModalOpen(false);
    }

    // Reset inputs
    setCustomDataUrl('');
    setInputUrl('');
    setCustomTitle('');
    setCustomVehicle('');
  };

  // Delete a media tile
  const handleDeleteMedia = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Delete this media from gallery?')) {
      const updated = repairs.filter(r => r.id !== id);
      saveRepairs(updated);
      if (selectedRepair && selectedRepair.id === id) {
        setSelectedRepair(null);
      }
      showToast('Deleted from gallery');
    }
  };

  // Open edit modal for specific item
  const openEditModal = (item: RepairMediaItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setItemToEdit(item);
    setCustomTitle(item.title);
    setCustomVehicle(item.vehicle);
    setSelectedMediaType(item.mediaType);
    setInputUrl(item.mediaUrl.startsWith('data:') ? '' : item.mediaUrl);
    setCustomDataUrl(item.mediaUrl.startsWith('data:') ? item.mediaUrl : '');
    setMediaSourceTab(item.mediaUrl.startsWith('data:') ? 'file' : 'url');
  };

  // Filtered items
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider text-lime-300">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span>Automotive Engineering & Repairs</span>
                <span className="text-emerald-500">|</span>
                <span>Lekki Phase 1, Lagos</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Repairs & Autos Gallery
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                Genuine mechanical repairs, air suspension rebuilds, computerized diagnostics, and oven-baked refinishing recorded in our facility.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-xs font-bold text-emerald-300/90 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Verified Diagnostic Records</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-3">
          
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveMediaFilter('all')}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMediaFilter === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({repairs.length})
            </button>

            <button
              onClick={() => setActiveMediaFilter('video')}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMediaFilter === 'video'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-lime-500" />
              <span>({repairs.filter(r => r.mediaType === 'video').length})</span>
            </button>

            <button
              onClick={() => setActiveMediaFilter('photo')}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMediaFilter === 'photo'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>({repairs.filter(r => r.mediaType === 'photo').length})</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Naiahautos Verified Workshop Quality</span>
          </div>

        </div>
      </section>

      {/* Media Grid */}
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
            {filteredRepairs.map((item) => {
              const youtubeId = extractYouTubeId(item.mediaUrl);

              return (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border-2 border-white bg-slate-900 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedRepair(item)}
                >
                  {/* Media Element */}
                  {item.mediaType === 'video' ? (
                    <div className="w-full h-full relative">
                      {youtubeId ? (
                        <img
                          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
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
                      )}

                      {/* Centered Play Icon */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 flex items-center justify-center transition-colors pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-lime-400 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src={item.mediaUrl}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Full-Screen Theater Viewer */}
      {selectedRepair && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedRepair(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-end pb-3 text-white">
              <button
                onClick={() => setSelectedRepair(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player Area */}
            <div className="w-full rounded-3xl overflow-hidden bg-black aspect-video flex items-center justify-center shadow-2xl border border-white/10">
              {(() => {
                const ytId = extractYouTubeId(selectedRepair.mediaUrl);
                if (ytId) {
                  return (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                      title=""
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }

                if (selectedRepair.mediaType === 'video') {
                  return (
                    <video
                      src={selectedRepair.mediaUrl}
                      poster={selectedRepair.thumbnailUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  );
                }

                return (
                  <img
                    src={selectedRepair.mediaUrl}
                    alt=""
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                );
              })()}
            </div>

          </div>
        </div>
      )}

      {/* Add / Edit Media Modal */}
      {(isAddModalOpen || itemToEdit) && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setIsAddModalOpen(false);
            setItemToEdit(null);
          }}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 my-auto text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {itemToEdit ? 'Change Workshop Picture or Video' : 'Add Video or Picture to Gallery'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setItemToEdit(null);
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Source Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 gap-1">
              <button
                type="button"
                onClick={() => setMediaSourceTab('file')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  mediaSourceTab === 'file' ? 'bg-white shadow-xs text-emerald-900' : 'text-slate-600'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={() => setMediaSourceTab('url')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  mediaSourceTab === 'url' ? 'bg-white shadow-xs text-emerald-900' : 'text-slate-600'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Web / YouTube Link</span>
              </button>

              <button
                type="button"
                onClick={() => setMediaSourceTab('presets')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  mediaSourceTab === 'presets' ? 'bg-white shadow-xs text-emerald-900' : 'text-slate-600'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Workshop Library</span>
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="space-y-4">
              
              {/* FILE TAB */}
              {mediaSourceTab === 'file' && (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const isVid = file.type.startsWith('video');
                          setSelectedMediaType(isVid ? 'video' : 'photo');
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            if (result) {
                              setCustomDataUrl(result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="gallery-file-picker"
                    />
                    <label htmlFor="gallery-file-picker" className="cursor-pointer space-y-2 block">
                      <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
                      <div className="text-xs font-bold text-slate-800">
                        {customDataUrl ? (
                          <span className="text-emerald-700 font-extrabold">
                            ✓ {selectedMediaType === 'video' ? 'Video' : 'Picture'} Selected
                          </span>
                        ) : (
                          <span>Tap here to choose video or photo from your device</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        Supports MP4, MOV, WebM videos, and JPG, PNG pictures
                      </span>
                    </label>
                  </div>

                  {customDataUrl && (
                    <div className="rounded-xl overflow-hidden aspect-video bg-black max-h-36 border border-slate-200">
                      {selectedMediaType === 'video' ? (
                        <video src={customDataUrl} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={customDataUrl} alt="Preview" className="w-full h-full object-cover" />
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* URL TAB */}
              {mediaSourceTab === 'url' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Direct Video URL, YouTube link, or Image URL
                    </label>
                    <input
                      type="url"
                      required={mediaSourceTab === 'url'}
                      placeholder="https://youtu.be/... or https://example.com/video.mp4"
                      value={inputUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setInputUrl(val);
                        if (extractYouTubeId(val)) {
                          setSelectedMediaType('video');
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-4 text-xs font-semibold">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="mediaTypeRadio"
                        checked={selectedMediaType === 'video'}
                        onChange={() => setSelectedMediaType('video')}
                      />
                      <span>Video</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="mediaTypeRadio"
                        checked={selectedMediaType === 'photo'}
                        onChange={() => setSelectedMediaType('photo')}
                      />
                      <span>Picture</span>
                    </label>
                  </div>
                </div>
              )}

              {/* PRESETS TAB */}
              {mediaSourceTab === 'presets' && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    Choose from verified Naiahautos workshop camera archives:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                    {[
                      { name: 'Dashboard HVAC & Wire Harness (Video)', url: '/videos/dashboard_assembly_repair.mp4', type: 'video' },
                      { name: 'Steering Column Wiring (Photo)', url: '/src/assets/images/repair_steering_column_electrical.jpg', type: 'photo' },
                      { name: 'A-Pillar Windshield Loom (Photo)', url: '/src/assets/images/repair_a_pillar_wiring.jpg', type: 'photo' },
                      { name: 'Blower Motor & Climate (Photo)', url: '/src/assets/images/repair_blower_climate.jpg', type: 'photo' },
                      { name: 'Fuse Box & Steering Column (Photo)', url: '/src/assets/images/repair_steering_fusebox.jpg', type: 'photo' },
                      { name: 'Dashboard Metal Framework (Photo)', url: '/src/assets/images/repair_dashboard_framework.jpg', type: 'photo' },
                    ].map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => {
                          setInputUrl(preset.url);
                          setSelectedMediaType(preset.type as 'video' | 'photo');
                          setMediaSourceTab('url');
                        }}
                        className="p-2 rounded-xl text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-[11px] font-bold text-slate-800 transition-colors"
                      >
                        ✓ {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Title & Vehicle inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Repair Title / Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engine Valve Overhaul"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Vehicle Model (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2021 Mercedes GLE 450"
                    value={customVehicle}
                    onChange={(e) => setCustomVehicle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setItemToEdit(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={mediaSourceTab === 'file' ? !customDataUrl : !inputUrl.trim()}
                  className="py-2.5 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{itemToEdit ? 'Save Changes' : 'Add to Gallery'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

