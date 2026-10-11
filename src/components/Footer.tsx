import React from 'react';
import { DEALERSHIP_CONFIG as C } from '../data/cars';
import { NavTab } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenAudit?: () => void;
}

export const Footer: React.FC<FooterProps> = () => (
  <div className="px">
    <footer>
      <div className="wrap">
        <span className="logo" style={{ fontSize: '1.1rem' }}>{C.name}</span>
        <span>{C.address}, {C.city} · {C.phoneDisplay}</span>
        <span>© {new Date().getFullYear()} {C.name}. All rights reserved.</span>
      </div>
    </footer>
  </div>
);
