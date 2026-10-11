import React, { useEffect, useState } from 'react';
import { INITIAL_REPAIRS_DATA, RepairMediaItem } from '../data/repairs';
import { getStoredRepairs, saveStoredRepairs } from '../services/mediaStorage';

interface RepairsGalleryViewProps {
  onBookInspection?: () => void;
  onBookService?: (serviceId: string) => void;
}

function youTubeId(url: string): string | null {
  const m = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}

export const RepairsGalleryView: React.FC<RepairsGalleryViewProps> = ({ onBookInspection }) => {
  const [repairs, setRepairs] = useState<RepairMediaItem[]>(INITIAL_REPAIRS_DATA);
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [open, setOpen] = useState<number | null>(null);

  // Same loading behaviour as before: stored gallery first, built-in media as the fallback
  useEffect(() => {
    (async () => {
      try {
        const stored = await getStoredRepairs();
        if (stored && Array.isArray(stored) && stored.length > 0) { setRepairs(stored); return; }
      } catch (e) { console.warn('Error fetching stored repairs:', e); }
      setRepairs(INITIAL_REPAIRS_DATA);
      await saveStoredRepairs(INITIAL_REPAIRS_DATA);
    })();
  }, []);

  const shown = repairs.filter((r) => filter === 'all' || r.mediaType === filter);
  const videos = repairs.filter((r) => r.mediaType === 'video').length;
  const photos = repairs.length - videos;
  const item = open !== null ? shown[open] : null;

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    document.querySelectorAll('.px .rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter, repairs]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => ((i ?? 0) + 1) % shown.length);
      if (e.key === 'ArrowLeft') setOpen((i) => ((i ?? 0) - 1 + shown.length) % shown.length);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, shown.length]);

  const yt = item ? youTubeId(item.mediaUrl) : null;

  return (
    <div className="px">
      <section className="gallery-sec" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow rv">Inside the Workshop</div>
              <h2 className="rv d1">Where precision<br /><em className="gold">lives.</em></h2>
            </div>
            <p className="lead rv d2">Real jobs from our own bodyshop and electrical bench: {videos} videos and {photos} photos. Click any tile to open it.</p>
          </div>

          <div className="filters rv" style={{ marginBottom: 34 }}>
            <button className={filter === 'all' ? 'on' : ''} onClick={() => { setFilter('all'); setOpen(null); }}>All ({repairs.length})</button>
            <button className={filter === 'video' ? 'on' : ''} onClick={() => { setFilter('video'); setOpen(null); }}>Videos ({videos})</button>
            <button className={filter === 'photo' ? 'on' : ''} onClick={() => { setFilter('photo'); setOpen(null); }}>Photos ({photos})</button>
          </div>

          <div className="gallery">
            {shown.map((r, i) => (
              <div key={r.id} className={`g rv d${i % 3}`} style={{ backgroundImage: `url(${r.thumbnailUrl})` }} onClick={() => setOpen(i)}>
                <span className="play">{r.mediaType === 'video' ? '▶ Watch' : 'Photo'}</span>
                <div><small>{r.vehicle}</small><h4>{r.title}</h4></div>
              </div>
            ))}
          </div>

          {onBookInspection && (
            <div style={{ textAlign: 'center', marginTop: 70 }}>
              <a className="btn btn-gold" onClick={onBookInspection}>Book Inspection <span>→</span></a>
            </div>
          )}
        </div>
      </section>

      {item && (
        <div id="lb" className="on" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <button className="x" onClick={() => setOpen(null)} aria-label="Close">✕</button>
          <button className="prev" onClick={() => setOpen((open! - 1 + shown.length) % shown.length)} aria-label="Previous">←</button>
          <div className="pic">
            {item.mediaType === 'video' ? (
              yt ? (
                <iframe title={item.title} src={`https://www.youtube.com/embed/${yt}?autoplay=1`} allow="autoplay; encrypted-media; fullscreen" allowFullScreen style={{ width: '100%', height: '100%', border: 0, borderRadius: 12 }} />
              ) : (
                <video key={item.id} src={item.mediaUrl} poster={item.thumbnailUrl} controls autoPlay playsInline />
              )
            ) : (
              <img src={item.mediaUrl} alt={item.title} />
            )}
          </div>
          <p>{item.title}</p>
          <div className="meta">{item.vehicle} · {item.turnaroundTime} · {item.warranty}<br />{item.repairPerformed}</div>
          <button className="next" onClick={() => setOpen((open! + 1) % shown.length)} aria-label="Next">→</button>
        </div>
      )}
    </div>
  );
};
