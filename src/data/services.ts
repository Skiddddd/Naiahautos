export interface AutoService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverable: string;
  turnaround: string;
  basePriceNgn: number;
  basePriceUsd: number;
  badge: string;
  features: string[];
  icon: 'inspection' | 'import' | 'diagnostics' | 'detailing' | 'parts';
}

export const AUTO_SERVICES_DATA: AutoService[] = [
  {
    id: 'pre-purchase-inspection',
    title: 'Comprehensive 200-Point Pre-Purchase Inspection',
    shortDesc: 'Rigorous bumper-to-bumper computerized diagnostic scan, engine compression test, and structural frame verification before you buy.',
    fullDesc: 'Never buy a Tokunbo or Nigerian-used car blindly. Our certified master inspectors travel to any location in Lagos or host the vehicle at our Lekki Hub. We hook up OEM diagnostic scanners, check live freeze-frame engine data, inspect suspension bushings, test paint depth for concealed collision repairs, verify VIN tampering, and evaluate flood immersion signs.',
    deliverable: 'Digital 18-page Comprehensive Inspection PDF with high-res photos and buy/walk recommendation within 2 hours.',
    turnaround: '2 - 3 Hours',
    basePriceNgn: 45000,
    basePriceUsd: 30,
    badge: 'Most Popular',
    features: [
      'Full ECU / TCU computerized system scan',
      'Structural unibody & chassis alignment check',
      'Electronic paint thickness meter test (accident detection)',
      'Flood / water immersion telemetry inspection',
      'Engine compression & transmission shift-load road test',
      'Customs duty & Nigerian VIN validation audit'
    ],
    icon: 'inspection'
  },
  {
    id: 'vehicle-importation',
    title: 'Turnkey Vehicle Sourcing & Customs Clearance',
    shortDesc: 'Direct vehicle procurement from Copart, Manheim, and IAAI (US/Canada/Europe) with guaranteed duty clearance at Lagos ports.',
    fullDesc: 'We source clean-title and verified pre-owned luxury vehicles directly from dealer-only auctions across North America and Europe. From bidding, physical US-side inspection, Roll-on/Roll-off (RoRo) or container ocean freight to Tin Can/Apapa Ports, through legitimate Nigeria Customs Service assessment and release.',
    deliverable: '100% Genuine Customs Single Goods Declaration (SGD) & Clean Title Delivered to your doorstep.',
    turnaround: '5 - 7 Weeks (Shipping to Handover)',
    basePriceNgn: 450000, // Service/Clearing handling retainer
    basePriceUsd: 300,
    badge: 'Turnkey Service',
    features: [
      'Direct auction access to Manheim, Copart, IAAI & European fleets',
      'On-the-ground North American physical inspection before bidding',
      'Containerized and RoRo marine shipping insurance coverage',
      '100% authentic Nigeria Customs Service (NCS) duty valuation',
      'Pre-delivery full detailing and fluid refresh in Lagos'
    ],
    icon: 'import'
  },
  {
    id: 'diagnostics-maintenance',
    title: 'Computerized Diagnostics & Mechanical Maintenance',
    shortDesc: 'Dealership-grade ECU programming, transmission service, suspension calibration, and synthetic oil changes.',
    fullDesc: 'Modern vehicles are rolling computers. Our service center utilizes manufacturer-specific diagnostic tools (Mercedes Xentry, Toyota Techstream, BMW ISTA, Land Rover Pathfinder) to diagnose tricky electrical gremlins, check-engine lights, transmission jerkiness, and air suspension failures.',
    deliverable: 'Line-item technical diagnostic log and certified repair guarantee.',
    turnaround: 'Same Day to 48 Hours',
    basePriceNgn: 35000,
    basePriceUsd: 25,
    badge: 'Certified Master Technicians',
    features: [
      'OEM diagnostic interface for German, Japanese, and American brands',
      'Air suspension recalibration and compressor rebuilding',
      'Transmission fluid flushing with manufacturer-spec synthetic fluids',
      'Catalytic converter and emission system diagnostics',
      'Air conditioning R134a/R1234yf leak testing and gas recharge'
    ],
    icon: 'diagnostics'
  },
  {
    id: 'ceramic-detailing',
    title: 'Paint Correction & 9H Ceramic Coating Protection',
    shortDesc: 'Restore deep showroom gloss and shield vehicle paint against tropical sun oxidation, acidic rain, and road grit.',
    fullDesc: "Nigeria's tropical sun and harsh road elements quickly oxidize clear coats and create unsightly swirl marks. Our detailing studio performs multi-stage rotary compounding and jewel polishing before locking in the finish with multi-year graphene/ceramic quartz coatings.",
    deliverable: 'Deep mirror reflection with 3-year hydrophobic warranty certificate.',
    turnaround: '24 - 48 Hours',
    basePriceNgn: 120000,
    basePriceUsd: 80,
    badge: '3-Year Warranty',
    features: [
      '3-stage dual-action rotary paint defect correction (eliminates 90%+ swirls)',
      '9H ultra-hydrophobic ceramic glass coating application',
      'Wheel rim ceramic heat shielding (prevents brake dust baking)',
      'Interior leather conditioning with UV blocking inhibitors',
      'Engine bay dry-ice detailing and plastic restoration'
    ],
    icon: 'detailing'
  },
  {
    id: 'parts-procurement',
    title: 'Genuine OEM Spare Parts Sourcing',
    shortDesc: 'Guaranteed authentic factory parts sourced directly from authorized brand distributors with warranty.',
    fullDesc: 'Counterfeit parts ruin engines. Naiahautos directly imports verified genuine OEM filters, sensors, brake pads, shock absorbers, and electrical modules directly from Germany, Japan, and the United States.',
    deliverable: 'Genuine packaged parts with verifiable serial numbers and manufacturer warranty.',
    turnaround: '24 Hours (In-Stock) / 5 Days (Air Express)',
    basePriceNgn: 45000,
    basePriceUsd: 30,
    badge: 'Zero Counterfeits',
    features: [
      '100% guaranteed genuine OEM parts with serial number verification',
      'Express air freight sourcing for rare or hard-to-find components',
      'Brake pads, suspension control arms, steering racks, sensors',
      'Factory warranty backing on all installed replacement components'
    ],
    icon: 'parts'
  }
];
