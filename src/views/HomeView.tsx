import React, { useEffect, useState } from 'react';
import { VEHICLES_DATA, Vehicle, DEALERSHIP_CONFIG as C } from '../data/cars';
import { AUTO_SERVICES_DATA } from '../data/services';
import { NavTab } from '../components/Navbar';
import { clearLegacyPhotoSettings } from '../services/mediaStorage';
import founderImg from '@/src/assets/images/founder_portrait.jpg';

interface HomeViewProps {
  onSelectVehicle: (v: Vehicle) => void;
  onBookInspection: () => void;
  onBookService?: (serviceId: string) => void;
  onNavigateTab: (tab: NavTab) => void;
  currency: 'NGN' | 'USD';
}

// Brand marks, drawn inline in gold (Simple Icons paths; Mercedes-Benz and Lexus from the design file)
const BRANDS: { name: string; svg: string }[] = [
  { name: "Mercedes-Benz", svg: "<svg viewBox=\"0 0 100 100\" height=\"46\" fill=\"none\" stroke=\"#d4af6a\" stroke-width=\"5\"><circle cx=\"50\" cy=\"50\" r=\"45\"/><path fill=\"#d4af6a\" stroke=\"none\" d=\"M50 7 L55 47 L87 72 L50 55 L13 72 L45 47 Z\"/></svg>" },
  { name: "Toyota", svg: "<svg viewBox=\"0 0 24 24\" height=\"46\" fill=\"#d4af6a\"><path d=\"M12 3.848C5.223 3.848 0 7.298 0 12s5.224 8.152 12 8.152S24 16.702 24 12s-5.223-8.152-12-8.152m7.334 3.839c0 1.08-1.725 1.913-4.488 2.246-.26-2.58-1.005-4.279-1.963-4.913 2.948.184 6.45 1.227 6.45 2.667zM12 16.401c-.96 0-1.746-1.5-1.808-4.389q.866.071 1.808.072.942 0 1.807-.072c-.061 2.89-.847 4.389-1.807 4.389m0-6.308q-.886 0-1.69-.054c.261-1.728.92-3.15 1.69-3.15s1.428 1.422 1.689 3.15q-.803.053-1.689.054m-.882-5.075c-.956.633-1.706 2.333-1.964 4.915C6.391 9.6 4.665 8.767 4.665 7.687c0-1.44 3.504-2.49 6.453-2.669M2.037 11.68a5.27 5.27 0 0 1 1.048-3.164c.27 1.547 2.522 2.881 5.972 3.37V12c0 3.772.879 6.203 2.087 6.97-5.107-.321-9.107-3.48-9.107-7.29m10.823 7.29c1.207-.767 2.087-3.198 2.087-6.97v-.115c3.447-.488 5.704-1.826 5.972-3.37a5.26 5.26 0 0 1 1.049 3.165c-.004 3.81-4.008 6.969-9.109 7.29z\"/></svg>" },
  { name: "Lexus", svg: "<svg viewBox=\"0 0 140 100\" height=\"46\" fill=\"none\" stroke=\"#d4af6a\" stroke-width=\"5\"><ellipse cx=\"70\" cy=\"50\" rx=\"64\" ry=\"44\"/><path stroke-width=\"7\" stroke-linejoin=\"round\" d=\"M88 14 C62 36 50 58 44 76 L104 76\"/></svg>" },
  { name: "Acura", svg: "<svg viewBox=\"0 0 24 24\" height=\"46\" fill=\"#d4af6a\"><path d=\"M23.77 10.908c-.23-4.018-1.492-6.89-3.33-8.496C18.489.689 14.814 0 12.057 0c-2.87 0-6.43.689-8.382 2.412C1.839 4.019.46 7.004.23 10.908c-.23 3.675.574 7.81 2.641 10.106C4.823 23.31 8.843 24 11.943 24s7.12-.689 9.072-2.986c2.18-2.296 2.986-6.316 2.755-10.106m-12.4-9.761h1.377v8.73H11.37ZM1.839 14.585c-.116-1.493-.575-6.89 1.607-9.99.919-1.38 2.182-2.297 3.56-2.757 1.838-.689 4.134-.689 4.134-.689-.919 2.181-2.641 6.89-2.985 7.924-.46 1.263-.804 1.952-1.15 4.248-.229 1.838-.688 6.546-.688 8.612-2.641-1.262-4.133-3.56-4.478-7.35m15.847 7.466c-1.723.803-3.905.918-5.628.918-1.722 0-3.903-.23-5.626-.918.574-1.607 3.33-8.269 4.823-10.91h1.608c1.493 2.643 4.248 9.417 4.823 10.91m4.592-7.466c-.344 3.79-1.837 6.088-4.363 7.35-.115-2.066-.459-6.774-.689-8.612-.345-2.296-.688-2.985-1.148-4.248-.345-1.034-2.182-5.742-2.986-7.924 0 0 2.181 0 4.134.69 1.378.458 2.642 1.377 3.56 2.756 1.952 3.1 1.607 8.497 1.493 9.99\"/></svg>" },
  { name: "Jeep", svg: "<svg viewBox=\"0 0 24 24\" height=\"46\" fill=\"#d4af6a\"><path d=\"M4.165 7.169v5.2c0 .677-.444 1.079-1.163 1.079-.718 0-1.099-.529-1.099-1.1v-.93H0v.952c0 .972.296 2.707 3.024 2.707 2.727 0 3.108-1.862 3.108-2.75V7.17Zm4.918 2.156c-1.798 0-2.6 1.648-2.6 3.066 0 1.416.909 2.79 2.769 2.79 1.628.022 2.707-1.035 2.707-1.818h-1.798s-.211.508-.846.508c-.634 0-.993-.36-.993-1.227h3.658c0-2.727-1.353-3.32-2.897-3.32m5.847 0c-1.797 0-2.6 1.648-2.6 3.066 0 1.416.909 2.79 2.77 2.79 1.628.022 2.706-1.035 2.706-1.818H16.01s-.212.508-.846.508c-.635 0-.994-.36-.994-1.227h3.657c0-2.727-1.352-3.32-2.896-3.32m6.743.063c-.913 0-1.318.497-1.34.522-.128.154-.287.317-.287-.078v-.296h-1.82v7.295h1.84v-2.009c0-.148.148-.126.255 0 .106.128.57.444 1.375.444 1.459 0 2.304-1.268 2.304-3.002 0-2.241-1.416-2.876-2.327-2.876m-12.4 1.12c.676 0 .971.508.971 1.037h-1.86c0-.572.233-1.036.888-1.036m5.846 0c.677 0 .973.508.973 1.037H14.23c0-.572.233-1.036.888-1.036m5.92.297c.932 0 1.1.719 1.1 1.459s-.127 1.712-1.013 1.712c-.889 0-1.122-.57-1.102-1.648.022-1.079.444-1.523 1.016-1.523zm2.282 4.566a.586.586 0 0 0-.586.586.585.585 0 1 0 .586-.586m0 .062a.524.524 0 0 1 .524.524.525.525 0 0 1-.524.524.526.526 0 0 1-.525-.524c0-.29.235-.524.525-.524m-.21.202v.621h.072v-.269h.176l.116.27h.08l-.121-.288a.14.14 0 0 0 .072-.045.18.18 0 0 0 .043-.115c0-.103-.08-.174-.195-.174zm.07.068h.172c.072 0 .118.041.118.105 0 .072-.049.116-.128.116h-.162z\"/></svg>" },
  { name: "Hyundai", svg: "<svg viewBox=\"0 0 24 24\" height=\"46\" fill=\"#d4af6a\"><path d=\"M12 18.162c-6.627 0-12-2.758-12-6.163 0-3.403 5.373-6.161 12-6.161 6.628 0 12 2.758 12 6.161 0 3.405-5.372 6.163-12 6.163M7.602 7.17C3.701 7.978.973 9.83.973 11.984c0 1.193.838 2.294 2.248 3.176.117.072.194.086.251.083.102-.006.16-.07.201-.146.028-.049.063-.123.097-.197.46-1.084 2.078-4.833 4.203-7.376a1 1 0 0 0 .104-.146c.046-.084.036-.151 0-.192-.058-.065-.224-.065-.475-.016m2.14 1.73c-1.173 2.849 1.047 2.496 1.648 2.363 1.02-.226 1.994-.613 2.774-.925 2.222-.889 3.402-1.78 3.793-2.123a2 2 0 0 0 .108-.099c.055-.058.097-.119.097-.2q0-.14-.237-.223l-.064-.025c-1.698-.541-3.724-.856-5.902-.856-.017 0-.059-.002-.117 0-.26.008-.55.066-.787.189-.778.404-1.116 1.423-1.313 1.899m10.585.003a4 4 0 0 0-.096.198c-.46 1.082-2.077 4.83-4.202 7.373a1 1 0 0 0-.104.147c-.05.084-.039.153 0 .193.057.064.223.065.474.016 3.9-.81 6.628-2.66 6.628-4.815 0-1.193-.836-2.293-2.247-3.175-.116-.073-.194-.087-.25-.083-.103.007-.16.07-.203.146M14.258 15.1c1.173-2.849-1.048-2.494-1.647-2.362-1.022.225-1.996.613-2.775.924-2.223.888-3.402 1.782-3.795 2.123q-.071.063-.106.1c-.057.057-.097.118-.097.2 0 .093.08.17.236.223.012.005.051.022.066.026 1.696.54 3.722.856 5.9.856h.118c.26-.009.552-.068.787-.19.778-.404 1.117-1.423 1.313-1.9\"/></svg>" },
];

const BrandMark: React.FC<{ b: (typeof BRANDS)[number] }> = ({ b }) => (
  <span className="brand" title={b.name}>
    <span dangerouslySetInnerHTML={{ __html: b.svg }} style={{ display: 'inline-flex' }} />
    <em>{b.name}</em>
  </span>
);

const ICONS: Record<string, string> = {
  inspection: 'M9 12l2 2 4-4M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  import: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  diagnostics: 'M13 2 4 14h7l-1 8 9-12h-7z',
  detailing: 'M3 21l4-1 11-11-3-3L4 17zM14 6l3 3M18 3l3 3',
  parts: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5z',
  workshop: 'M3 17h18M5 17l1-5h12l1 5M8 12l1.5-4h5L16 12',
};

export const HomeView: React.FC<HomeViewProps> = ({ onSelectVehicle, onBookInspection, onBookService, onNavigateTab, currency }) => {
  const [filter, setFilter] = useState('all');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', interest: 'Purchasing a vehicle', message: '' });

  const heroCar = VEHICLES_DATA.find((v) => v.id === 'car-sequoia') ?? VEHICLES_DATA[0];
  const types = Array.from(new Set(VEHICLES_DATA.map((v) => v.bodyType)));
  const inspection = AUTO_SERVICES_DATA.find((s) => s.id === 'pre-purchase-inspection');

  const money = (ngn: number, usd: number) => (currency === 'NGN' ? `₦${ngn.toLocaleString('en-NG')}` : `$${usd.toLocaleString('en-US')}`);

  useEffect(() => { clearLegacyPhotoSettings().catch(() => {}); }, []);

  // Scroll reveal + number counters (same behaviour as the reference design)
  useEffect(() => {
    const count = (el: HTMLElement) => {
      const t = Number(el.dataset.count);
      let s: number | null = null;
      const f = (ts: number) => {
        if (s === null) s = ts;
        const p = Math.min((ts - s) / 2000, 1);
        el.textContent = Math.floor(t * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      el.classList.add('in');
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(count);
      if (el.dataset.count) count(el);
      io.unobserve(el);
    }), { threshold: 0.15 });
    document.querySelectorAll('.px .rv, .px #insp, .px .hero-stats').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const spotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Naiahautos, my name is ${form.name} (${form.phone}). I'm interested in: ${form.interest}. ${form.message}`;
    window.open(`https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };

  const modelName = (v: Vehicle) => v.name.replace(new RegExp(`^${v.year}\\s+${v.make}\\s*`, 'i'), '') || v.name;

  return (
    <div className="px">
      {/* HERO */}
      <section className="hero" style={{ padding: 0 }}>
        <div className="hero-bg" style={{ ['--hero' as any]: `url(${heroCar.imageUrl})` }} />
        <div className="wrap" style={{ width: '100%' }}>
          <div className="hero-content">
            <div className="eyebrow rv">Verified Sales · Master Repairs · 200-Point Inspection</div>
            <h1 className="rv d1">Driven by <em className="gold">perfection.</em></h1>
            <p className="rv d2">Customs-cleared premium vehicles, a skilled in-house workshop and our signature 200-point inspection, so you know the full truth before you pay.</p>
            <div className="ctas rv d3">
              <a className="btn btn-gold" onClick={() => onNavigateTab('inventory')}>Explore Collection <span>→</span></a>
              <a className="btn btn-line" onClick={onBookInspection}>Book Inspection</a>
            </div>
          </div>
          <div className="hero-stats rv d3">
            <div><b className="gold" data-count="200">0</b><span>Point Checks</span></div>
            <div><b className="gold" data-count={VEHICLES_DATA.length}>0</b><span>Cars On The Floor</span></div>
            <div><b className="gold" data-count="3">0</b><span>Branches</span></div>
          </div>
        </div>
        <div className="scroll-cue">SCROLL</div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="track">
          {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
            <React.Fragment key={i}>
              <BrandMark b={b} />
              <span className="dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* COLLECTION */}
      <section id="cars">
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow rv">The Collection</div>
              <h2 className="rv d1">Curated for the<br /><em className="gold">discerning</em> driver.</h2>
            </div>
            <div className="filters rv d2">
              <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All</button>
              {types.map((t) => (
                <button key={t} className={filter === t ? 'on' : ''} onClick={() => setFilter(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="cars">
            {VEHICLES_DATA.map((v, i) => (
              <div
                key={v.id}
                role="button"
                tabIndex={0}
                className={`car rv d${i % 3}`}
                style={{ display: filter === 'all' || filter === v.bodyType ? '' : 'none' }}
                onClick={() => onSelectVehicle(v)}
                onKeyDown={(e) => e.key === 'Enter' && onSelectVehicle(v)}
              >
                <div className="car-img">
                  <img className="bgimg" src={v.imageUrl} alt="" aria-hidden="true" />
                  <img className="fgimg" src={v.imageUrl} alt={v.name} />
                  <span className="badge">{v.customsCleared ? '✦ Customs Cleared' : `✦ ${v.status}`}</span>
                </div>
                <div className="car-body">
                  <small>{v.year} · {v.make}</small>
                  <h3>{modelName(v)}</h3>
                  <div className="specs">
                    <div>Mileage<b>{v.mileageKm > 0 ? `${v.mileageKm.toLocaleString()} km` : 'On request'}</b></div>
                    <div>Engine<b>{v.engine}</b></div>
                    <div>Gearbox<b>{v.transmission}</b></div>
                  </div>
                  <div className="car-foot">
                    <span className="price gold">{money(v.priceNgn, v.priceUsd)}</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow rv">Services & Repairs</div>
              <h2 className="rv d1">Engineering,<br /><em className="gold">mastered.</em></h2>
            </div>
            <p className="lead rv d2">From the port to your driveway: inspections, imports, diagnostics, detailing and genuine parts, all handled in one place.</p>
          </div>
          <div className="svc-grid">
            {AUTO_SERVICES_DATA.map((s, i) => (
              <div key={s.id} className={`svc rv d${i % 3}`} onMouseMove={spotlight} onClick={() => onBookService?.(s.id)}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.shortDesc}</p>
                <div className="meta">From {money(s.basePriceNgn, s.basePriceUsd)} · {s.turnaround}</div>
                <svg viewBox="0 0 24 24"><path d={ICONS[s.icon] ?? ICONS.parts} /></svg>
              </div>
            ))}
            <div className="svc rv d2" onMouseMove={spotlight} onClick={() => onNavigateTab('repairs')}>
              <span className="num">{String(AUTO_SERVICES_DATA.length + 1).padStart(2, '0')}</span>
              <h3>Body & Paint Workshop</h3>
              <p>Collision rebuilds and full resprays, filmed in our own paint booth. Watch the work before you book.</p>
              <div className="meta">See the repairs</div>
              <svg viewBox="0 0 24 24"><path d={ICONS.workshop} /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* INSPECTION */}
      <section id="inspection">
        <div className="wrap inspect" id="insp">
          <div className="ring-wrap rv">
            <div className="orbit" />
            <svg viewBox="0 0 420 420">
              <defs><linearGradient id="g"><stop offset="0" stopColor="#f3dca4" /><stop offset="1" stopColor="#8a6a2f" /></linearGradient></defs>
              <circle className="ring-bg" cx="210" cy="210" r="200" />
              <circle className="ring" cx="210" cy="210" r="200" />
            </svg>
            <div className="ring-center"><div><b className="gold" data-count="200">0</b><span>Point Inspection</span></div></div>
          </div>
          <div>
            <div className="eyebrow rv">Our Signature Service</div>
            <h2 className="rv d1">Nothing hidden.<br /><em className="gold">Nothing missed.</em></h2>
            <p className="lead rv d2">Buying from us or anywhere else, know the full truth about the car. You get a detailed digital report with photos, a rating for every item and a cost estimate for any repairs.</p>
            <div className="bars rv d2">
              {[
                ['Engine & Fluids', 40, 1],
                ['Electrical, AC & Interior', 40, 1],
                ['Body, Paint & Accident History', 35, 0.875],
                ['Brakes, Tyres & Suspension', 30, 0.75],
                ['Road Test & Computer Scan', 30, 0.75],
                ['Transmission & Drivetrain', 25, 0.625],
              ].map(([l, p, w]) => (
                <div className="bar" key={l as string}><label>{l} <b>{p} pts</b></label><i style={{ ['--w' as any]: w }} /></div>
              ))}
            </div>
            <div className="perks rv"><span>Photo report</span><span>Same-day results</span><span>Any make or model</span></div>
            <a className="btn btn-gold rv" onClick={onBookInspection}>
              Book Inspection{inspection ? ` · From ${money(inspection.basePriceNgn, inspection.basePriceUsd)}` : ''} <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section>
        <div className="wrap founder">
          <div className="founder-pic rv"><img src={founderImg} alt="Naiahautos founder and automotive engineer" /></div>
          <div>
            <div className="eyebrow rv">Meet the Founder</div>
            <h2 className="rv d1">The engineer behind <em className="gold">every inspection.</em></h2>
            <p className="lead rv d2">Reliable repair and maintenance for individual car owners and corporate fleets, plus a 200-point inspection before you pay any dealer in Lagos.</p>
            <div className="founder-stats rv d2">
              <div><b className="gold">99%</b><span>Happy Customers</span></div>
              <div><b className="gold">502+</b><span>Vehicles Fixed</span></div>
            </div>
            <div className="ctas rv d3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a className="btn btn-gold" href={`https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent('Hello Naiahautos, I would like to consult with an Automotive Specialist.')}`} target="_blank" rel="noopener noreferrer">Message on WhatsApp <span>→</span></a>
              <a className="btn btn-line" href={`tel:${C.phoneNumberRaw}`}>Call us</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ paddingTop: 40 }}>
        <div className="wrap contact">
          <div>
            <div className="eyebrow rv">Visit Us</div>
            <h2 className="rv d1">Your next drive<br /><em className="gold">starts here.</em></h2>
            <div className="info rv d2">
              <div><small>Showroom & Workshop</small><p>{C.address}, {C.city}</p></div>
              <div><small>Call</small><p>{C.phoneDisplay}</p></div>
              <div><small>Hours</small><p>{C.workingHoursWeekday}</p></div>
            </div>
          </div>
          <form className="contact-card rv d1" onSubmit={submit}>
            {sent ? (
              <>
                <h3 className="serif" style={{ fontSize: '2rem', fontWeight: 500 }}>Thank you.</h3>
                <p className="lead" style={{ marginTop: 12 }}>Your message is ready in WhatsApp. Send it and our team will reply shortly.</p>
              </>
            ) : (
              <>
                <div className="field"><label>Full Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="field"><label>Phone</label><input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                <div className="field"><label>I'm interested in</label>
                  <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                    <option>Purchasing a vehicle</option><option>Repair or service</option><option>200-point inspection</option><option>Selling my car</option>
                  </select>
                </div>
                <div className="field"><label>Message</label><textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
                <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Request Appointment <span>→</span></button>
              </>
            )}
          </form>
        </div>
      </section>

    </div>
  );
};
