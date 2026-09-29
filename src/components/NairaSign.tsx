import React from 'react';

interface NairaProps {
  className?: string;
}

/**
 * Universal Vector Nigerian Naira Symbol (₦)
 * Renders as pure vector SVG lines, completely eliminating the missing-glyph
 * tofu box (□) that occurs on operating systems and browsers lacking U+20A6.
 */
export const Naira: React.FC<NairaProps> = ({ className = "inline-block w-[0.82em] h-[0.82em] -mt-0.5 align-middle" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="img"
    >
      {/* Left vertical stem */}
      <line x1="5.5" y1="3.5" x2="5.5" y2="20.5" />
      {/* Right vertical stem */}
      <line x1="18.5" y1="3.5" x2="18.5" y2="20.5" />
      {/* Diagonal stroke */}
      <line x1="5.5" y1="3.5" x2="18.5" y2="20.5" />
      {/* Top horizontal crossbar */}
      <line x1="2.5" y1="9.5" x2="21.5" y2="9.5" />
      {/* Bottom horizontal crossbar */}
      <line x1="2.5" y1="14.5" x2="21.5" y2="14.5" />
    </svg>
  );
};
