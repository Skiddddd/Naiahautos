export interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  priceNgn: number;
  priceUsd: number;
  mileageKm: number;
  bodyType: 'SUV' | 'Sedan' | 'Truck' | 'Coupe';
  fuelType: 'Petrol' | 'Hybrid' | 'Diesel';
  transmission: 'Automatic' | 'Dual-Clutch' | 'Manual';
  engine: string;
  drivetrain: 'AWD' | '4WD' | 'FWD' | 'RWD';
  color: string;
  interiorColor: string;
  vin: string;
  status: 'Available' | 'Reserved' | 'In Transit';
  condition: 'Foreign Used (Tokunbo)' | 'Brand New' | 'Certified Pre-Owned';
  location: 'Showroom (Lekki, Lagos)' | 'Customs Bond (Lagos)' | 'In Transit';
  inspectionScore: number;
  imageUrl: string;
  additionalImages?: string[];
  keyFeatures: string[];
  customsCleared: boolean;
  featured?: boolean;
}

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'car-gle450',
    name: '2023 Mercedes-Benz GLE 450 4MATIC',
    make: 'Mercedes-Benz',
    model: 'GLE 450',
    year: 2023,
    priceNgn: 78000000,
    priceUsd: 52000,
    mileageKm: 18400,
    bodyType: 'SUV',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '3.0L Turbocharged Inline-6 with EQ Boost',
    drivetrain: 'AWD',
    color: 'Obsidian Black Metallic',
    interiorColor: 'Macchiato Beige / Espresso Brown Nappa',
    vin: '4JGFF5KE7PA****92',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 98,
    imageUrl: '/src/assets/images/hero_naiahautos_showroom_1790618206795.jpg',
    keyFeatures: [
      'AMG Line Exterior Styling & 21-inch Multispoke Wheels',
      'Panoramic Sliding Glass Sunroof',
      'Burmester High-End 3D Surround Sound',
      'Dual 12.3-inch Widescreen Digital Displays',
      '360-Degree Surround View Camera System',
      'Airmatic Air Suspension with Adaptive Damping'
    ],
    customsCleared: true,
    featured: true
  },
  {
    id: 'car-rx350',
    name: '2022 Lexus RX 350 F-Sport AWD',
    make: 'Lexus',
    model: 'RX 350',
    year: 2022,
    priceNgn: 48500000,
    priceUsd: 32300,
    mileageKm: 28900,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.5L V6 DOHC 24-Valve Dual VVT-i',
    drivetrain: 'AWD',
    color: 'Eminent White Pearl',
    interiorColor: 'Circuit Red F-Sport Leather',
    vin: '2T2BZMCA5NC****41',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 97,
    imageUrl: '/src/assets/images/car_lexus_suv_1790618216897.jpg',
    keyFeatures: [
      'F-Sport Tuned Adaptive Variable Suspension',
      'Lexus Safety System+ 2.0 with Pre-Collision Assist',
      'Mark Levinson 15-Speaker Audio Package',
      'Triple-Beam LED Headlamps with Washers',
      'Heated and Ventilated Front Seats',
      'Power Hands-Free Tailgate with Kick Sensor'
    ],
    customsCleared: true,
    featured: true
  },
  {
    id: 'car-bmw530i',
    name: '2023 BMW 530i M-Sport Package',
    make: 'BMW',
    model: '530i',
    year: 2023,
    priceNgn: 56000000,
    priceUsd: 37300,
    mileageKm: 14200,
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '2.0L BMW TwinPower Turbo Inline-4',
    drivetrain: 'RWD',
    color: 'Black Sapphire Metallic',
    interiorColor: 'Cognac Dakota Perforated Leather',
    vin: 'WBA53EJ07PC****18',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 99,
    imageUrl: '/src/assets/images/car_mercedes_sedan_1790618228039.jpg',
    keyFeatures: [
      'M-Aerodynamics Package & Shadowline Trim',
      'Live Cockpit Professional with 12.3" Navigation',
      'Harman Kardon Surround Sound System',
      'Wireless Apple CarPlay and Android Auto',
      'Ambient Interior Mood Lighting (64 Colors)',
      'Park Assist Plus with Automated Reversing'
    ],
    customsCleared: true,
    featured: true
  },
  {
    id: 'car-prado',
    name: '2022 Toyota Land Cruiser Prado TX-L',
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2022,
    priceNgn: 69000000,
    priceUsd: 46000,
    mileageKm: 31000,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '2.7L Dual VVT-i 4-Cylinder',
    drivetrain: '4WD',
    color: 'Attitude Black Mica',
    interiorColor: 'Beige Leather with Wood Grain Accents',
    vin: 'JTEBX3FJ5NK****04',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 96,
    imageUrl: '/src/assets/images/hero_naiahautos_showroom_1790618206795.jpg',
    keyFeatures: [
      'Full-Time 4WD with Torsen Limited-Slip Differential',
      '7-Passenger Seating with Power Folding Third Row',
      'Cool Box Center Console Refrigerator',
      'Heavy-Duty Tropical Suspension Package',
      'Push Button Start & Smart Keyless Entry',
      'Side Steps and Roof Rails Included'
    ],
    customsCleared: true,
    featured: false
  },
  {
    id: 'car-accord',
    name: '2021 Honda Accord Touring 2.0T',
    make: 'Honda',
    model: 'Accord',
    year: 2021,
    priceNgn: 26500000,
    priceUsd: 17600,
    mileageKm: 38500,
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '2.0L VTEC Turbocharged 4-Cylinder (252 hp)',
    drivetrain: 'FWD',
    color: 'Platinum White Pearl',
    interiorColor: 'Black Leather Trimmed',
    vin: '1HGCR2F84MA****77',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 95,
    imageUrl: '/src/assets/images/car_lexus_suv_1790618216897.jpg',
    keyFeatures: [
      '10-Speed Shiftable Automatic Transmission',
      'Head-Up Display (HUD) with Speed & Nav',
      'Adaptive Cruise Control with Low-Speed Follow',
      'Ventilated Front Seats & Heated Rear Seats',
      'Blind Spot Information System with Cross Traffic Monitor',
      'Wireless Phone Charging Pad'
    ],
    customsCleared: true,
    featured: false
  },
  {
    id: 'car-rangerover',
    name: '2022 Range Rover Sport HSE Dynamic',
    make: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2022,
    priceNgn: 86000000,
    priceUsd: 57300,
    mileageKm: 21500,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L i6 Turbocharged MHEV (395 hp)',
    drivetrain: 'AWD',
    color: 'Santorini Black Metallic',
    interiorColor: 'Ebony / Ivory Windsor Leather',
    vin: 'SALWR2V42NA****63',
    status: 'Reserved',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 98,
    imageUrl: '/src/assets/images/car_mercedes_sedan_1790618228039.jpg',
    keyFeatures: [
      'Electronic Air Suspension with Dynamic Response',
      'Touch Pro Duo Dual 10-Inch Touchscreens',
      'Matrix LED Headlights with Signature DRL',
      'Meridian 825W Surround Sound System',
      'Soft-Close Doors and Keyless Entry',
      'Terrain Response 2 with Dynamic Program'
    ],
    customsCleared: true,
    featured: false
  }
];

export interface DealershipConfig {
  name: string;
  tagline: string;
  phoneDisplay: string;
  phoneNumberRaw: string; // for tel:
  whatsappNumber: string; // no +, no spaces e.g. 2348031234567
  whatsappDisplay: string;
  email: string;
  address: string;
  city: string;
  country: string;
  workingHoursWeekday: string;
  workingHoursSaturday: string;
  workingHoursSunday: string;
}

export const DEALERSHIP_CONFIG: DealershipConfig = {
  name: 'Naiahautos',
  tagline: 'Premium Verified Automobiles & Specialized Auto Engineering',
  phoneDisplay: '+234 812 132 5126',
  phoneNumberRaw: '+2348121325126',
  whatsappNumber: '2348064160748',
  whatsappDisplay: '+234 806 416 0748',
  email: 'benaiahudoh347@gmail.com',
  address: 'Plot 14, Block 7, Admiralty Way, Lekki Phase 1',
  city: 'Lagos',
  country: 'Nigeria',
  workingHoursWeekday: 'Mon - Fri: 8:00 AM - 6:00 PM',
  workingHoursSaturday: 'Sat: 9:00 AM - 4:00 PM',
  workingHoursSunday: 'Sunday: By Prior Appointment'
};
