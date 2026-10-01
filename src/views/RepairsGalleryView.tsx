import React, { useState, useEffect } from 'react';
import { Play, Camera, Video, X, ShieldCheck } from 'lucide-react';
import { INITIAL_REPAIRS_DATA, RepairMediaItem } from '../data/repairs';
import { getStoredRepairs, saveStoredRepairs } from '../services/mediaStorage';

interface RepairsGalleryViewProps {
  onBookInspection?: () => void;
  onBookService?: (serviceId: string) => void;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export const RepairsGalleryView: React.FC<RepairsGalleryViewProps> = () => {
  const [repairs, setRepairs] = useState<RepairMediaItem[]>(INITIAL_REPAIRS_DATA);

  // Load the gallery (refreshes automatically when the built-in media changes)
  useEffect(() => {
    async function loadData() {
      try {
        const stored = await getStoredRepairs();
        if (stored && Array.isArray(stored) && stored.length > 0) {
          setRepairs(stored);
          return;
        }
      } catch (e) {
        console.warn('Error fetching stored repairs:', e);
      }
      setRepairs(INITIAL_REPAIRS_DATA);
      await saveStoredRepairs(INITIAL_REPAIRS_DATA);
    }
    loadData();
  }, []);


  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [selectedRepair, setSelectedRepair] = useState<RepairMediaItem | null>(null);

  // Filtered items
  const filteredRepairs = repairs.filter(item => {
    if (activeMediaFilter === 'all') return true;
    return item.mediaType === activeMediaFilter;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-24">
      
      {/* Top Header */}
      <section className="bg-gradient-to-b from-[#064E3B] to-[#043326] text-white py-10 sm:py-14 border-b border-emerald-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider text-lime-300">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span>Automotive Engineering & Repairs</span>
                <span className="text-emerald-500">|</span>
                <span>New Road Bus Stop, Lekki, Lagos</span>
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

    </div>
  );
};

