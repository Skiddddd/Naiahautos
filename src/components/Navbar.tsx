import React, { useEffect, useState } from 'react';
import { DEALERSHIP_CONFIG } from '../data/cars';

export type NavTab = 'home' | 'inventory' | 'services' | 'repairs' | 'vin-checker' | 'inspection' | 'contact';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currency?: 'NGN' | 'USD';
  setCurrency?: (c: 'NGN' | 'USD') => void;
  onOpenAudit?: () => void;
}

const navItems: { id: NavTab; label: string }[] = [
  { id: 'inventory', label: 'Collection' },
  { id: 'services', label: 'Services' },
  { id: 'repairs', label: 'Workshop' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'vin-checker', label: 'VIN Check' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent, id: NavTab) => {
    e.preventDefault();
    setOpen(false);
    if (id === 'services') {
      setActiveTab('home');
      setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      return;
    }
    setActiveTab(id);
  };

  const solid = scrolled || activeTab !== 'home';

  return (
    <div className="px">
      <header className={solid ? 'scrolled' : ''}>
        <div className="wrap">
          <nav>
            <a href="#" className="logo" onClick={(e) => go(e, 'home')}>
              Naiahautos<small>LEKKI · {DEALERSHIP_CONFIG.city.toUpperCase()}</small>
            </a>
            <ul className={`links${open ? ' open' : ''}`}>
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href="#" className={activeTab === n.id ? 'on' : ''} onClick={(e) => go(e, n.id)}>{n.label}</a>
                </li>
              ))}
            </ul>
            <a href="#" className="btn btn-gold nav-cta" onClick={(e) => go(e, 'contact')}>Book a Visit</a>
            <button className="burger" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
          </nav>
        </div>
      </header>
    </div>
  );
};
