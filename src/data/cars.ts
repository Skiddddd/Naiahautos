import rx350Front from '@/src/assets/images/rx350_front.jpg';
import rx350Dashboard from '@/src/assets/images/rx350_dashboard.jpg';
import rx350FrontInterior from '@/src/assets/images/rx350_front_interior.jpg';
import rx350RearCabin from '@/src/assets/images/rx350_rear_cabin.jpg';
import rx350RearSeats from '@/src/assets/images/rx350_rear_seats.jpg';
import rx350Rear from '@/src/assets/images/rx350_rear.jpg';
import rx350Engine from '@/src/assets/images/rx350_engine.jpg';
import rx350VinLabel from '@/src/assets/images/rx350_vin_label.jpg';
import avalonXleFront from '@/src/assets/images/avalonxle_front.jpg';
import avalonXleFrontAngle from '@/src/assets/images/avalonxle_front_angle.jpg';
import avalonXleHoodOpen from '@/src/assets/images/avalonxle_hood_open.jpg';
import avalonXleEngine from '@/src/assets/images/avalonxle_engine.jpg';
import avalonXleConsole from '@/src/assets/images/avalonxle_console.jpg';
import avalonXleRearSide from '@/src/assets/images/avalonxle_rear_side.jpg';
import avalonXleRearBadge from '@/src/assets/images/avalonxle_rear_badge.jpg';
import avalonXleTrunk from '@/src/assets/images/avalonxle_trunk.jpg';
import sequoiaFront from '@/src/assets/images/sequoia_front.jpg';
import sequoiaSide from '@/src/assets/images/sequoia_side.jpg';
import sequoiaRearSide from '@/src/assets/images/sequoia_rear_side.jpg';
import sequoiaRear from '@/src/assets/images/sequoia_rear.jpg';
import sequoiaInterior from '@/src/assets/images/sequoia_interior.jpg';
import sequoiaRearSeats from '@/src/assets/images/sequoia_rear_seats.jpg';
import sequoiaEngine from '@/src/assets/images/sequoia_engine.jpg';
import sequoiaEngineBay from '@/src/assets/images/sequoia_engine_bay.jpg';
import avalonFrontAngle from '@/src/assets/images/avalon_front_angle.jpg';
import avalonFront from '@/src/assets/images/avalon_front.jpg';
import avalonTaillight from '@/src/assets/images/avalon_taillight.jpg';
import avalonRearSide from '@/src/assets/images/avalon_rear_side.jpg';
import avalonRearSeats from '@/src/assets/images/avalon_rear_seats.jpg';
import avalonRearVents from '@/src/assets/images/avalon_rear_vents.jpg';
import avalonEngine from '@/src/assets/images/avalon_engine.jpg';
import avalonVinLabel from '@/src/assets/images/avalon_vin_label.jpg';
import corollaFront from '@/src/assets/images/corolla_front.jpg';
import corollaDashboard from '@/src/assets/images/corolla_dashboard.jpg';
import corollaFrontSeats from '@/src/assets/images/corolla_front_seats.jpg';
import corollaRearSeats from '@/src/assets/images/corolla_rear_seats.jpg';
import corollaRearSide from '@/src/assets/images/corolla_rear_side.jpg';
import corollaRear from '@/src/assets/images/corolla_rear.jpg';
import corollaVinLabel from '@/src/assets/images/corolla_vin_label.jpg';
import corollaEngine from '@/src/assets/images/corolla_engine.jpg';
import gle350Front from '@/src/assets/images/gle350_front.jpg';
import gle350Dashboard from '@/src/assets/images/gle350_dashboard.jpg';
import gle350FrontSeats from '@/src/assets/images/gle350_front_seats.jpg';
import gle350RearSeats from '@/src/assets/images/gle350_rear_seats.jpg';
import gle350VinPlate from '@/src/assets/images/gle350_vin_plate.jpg';
import gle350RearSide from '@/src/assets/images/gle350_rear_side.jpg';
import gle350Rear from '@/src/assets/images/gle350_rear.jpg';

export const showroomHeroImg = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85';
export const lexusSuvImg = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85';
export const mercedesSedanImg = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85';

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
    id: 'car-gle350',
    name: '2014 Mercedes-Benz GLE 350 4MATIC',
    make: 'Mercedes-Benz',
    model: 'GLE 350',
    year: 2014,
    priceNgn: 16000000,
    priceUsd: 10700,
    mileageKm: 0, // TODO: set real mileage (0 shows as "On request")
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.5L V6 Petrol',
    drivetrain: 'AWD',
    color: 'Polar White',
    interiorColor: 'Beige Leather',
    vin: '4JGDA5HB5DA123094',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 98,
    imageUrl: gle350Front,
    additionalImages: [
      gle350Dashboard,
      gle350FrontSeats,
      gle350RearSeats,
      gle350VinPlate,
      gle350RearSide,
      gle350Rear
    ],
    keyFeatures: [
      'AMG Styling Package & Multispoke Alloy Wheels',
      'Panoramic Sliding Glass Sunroof',
      'Beige Leather Interior',
      '4MATIC All-Wheel Drive',
      'AMG Dual Twin-Tip Exhaust',
      'Side Steps and Roof Rails'
    ],
    customsCleared: true,
    featured: true
  },
  {
    id: 'car-corolla',
    name: '2009 Toyota Corolla LE',
    make: 'Toyota',
    model: 'Corolla',
    year: 2009,
    priceNgn: 10000000,
    priceUsd: 6700,
    mileageKm: 0,
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '1.8L 4-Cylinder Dual VVT-i',
    drivetrain: 'FWD',
    color: 'Red',
    interiorColor: 'Grey Cloth',
    vin: '1NXBU40E39Z133014',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 95,
    imageUrl: corollaFront,
    additionalImages: [
      corollaDashboard,
      corollaFrontSeats,
      corollaRearSeats,
      corollaRearSide,
      corollaRear,
      corollaVinLabel,
      corollaEngine
    ],
    keyFeatures: [
      '1.8L Dual VVT-i Engine',
      'Automatic Transmission',
      'Front-Wheel Drive',
      'Cloth Interior',
      'Power Windows & Central Locking',
      'Foreign Used (Tokunbo)'
    ],
    customsCleared: true,
    featured: true
  },
  {
    id: 'car-avalon',
    name: '2021 Toyota Avalon XSE',
    make: 'Toyota',
    model: 'Avalon',
    year: 2021,
    priceNgn: 40000000,
    priceUsd: 26700,
    mileageKm: 0,
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.5L V6',
    drivetrain: 'FWD',
    color: 'Silver',
    interiorColor: 'Black Leather',
    vin: '4T1EZ1FB2MU057918',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 95,
    imageUrl: avalonFrontAngle,
    additionalImages: [
      avalonFront,
      avalonTaillight,
      avalonRearSide,
      avalonRearSeats,
      avalonRearVents,
      avalonEngine,
      avalonVinLabel
    ],
    keyFeatures: [
      '3.5L V6 Engine',
      'XSE Sport Styling with Black Alloy Wheels',
      'Black Leather Interior',
      'Rear Air Vents with USB Charging Ports',
      'Rear Spoiler & Dual Exhaust',
      'Automatic Transmission'
    ],
    customsCleared: true,
    featured: true
  },
  {
    id: 'car-sequoia',
    name: '2018 Toyota Sequoia Platinum Edition',
    make: 'Toyota',
    model: 'Sequoia',
    year: 2018,
    priceNgn: 30000000,
    priceUsd: 20000,
    mileageKm: 0,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '5.7L i-FORCE V8',
    drivetrain: '4WD',
    color: 'Black',
    interiorColor: 'Beige Leather',
    vin: '', // add VIN here when available
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 95,
    imageUrl: sequoiaFront,
    additionalImages: [
      sequoiaSide,
      sequoiaRearSide,
      sequoiaRear,
      sequoiaInterior,
      sequoiaRearSeats,
      sequoiaEngine,
      sequoiaEngineBay
    ],
    keyFeatures: [
      '5.7L i-FORCE V8 Engine',
      'Platinum Edition Beige Leather Interior',
      'Overhead Rear-Seat Entertainment Screen',
      'Touchscreen Infotainment System',
      'Side Steps, Roof Rails & Rear Spoiler',
      'Alloy Wheels with Tow Hitch'
    ],
    customsCleared: true,
    featured: false
  },
  {
    id: 'car-avalon-xle',
    name: '2019 Toyota Avalon XLE',
    make: 'Toyota',
    model: 'Avalon',
    year: 2019,
    priceNgn: 40000000,
    priceUsd: 26700,
    mileageKm: 0,
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.5L V6 D-4S',
    drivetrain: 'FWD',
    color: 'Black',
    interiorColor: 'Black Leather',
    vin: '4T1BZ1FB2KU008346',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 95,
    imageUrl: avalonXleFront,
    additionalImages: [
      avalonXleFrontAngle,
      avalonXleHoodOpen,
      avalonXleEngine,
      avalonXleConsole,
      avalonXleRearSide,
      avalonXleRearBadge,
      avalonXleTrunk
    ],
    keyFeatures: [
      '3.5L V6 D-4S Engine',
      'Black Leather Interior',
      'Touchscreen Infotainment System',
      'Push-Button Start',
      'Dual-Zone Climate Control with Heated Seats',
      'LED Headlamps & Alloy Wheels'
    ],
    customsCleared: true,
    featured: false
  },
  {
    id: 'car-rx350-2013',
    name: '2013 Lexus RX 350',
    make: 'Lexus',
    model: 'RX 350',
    year: 2013,
    priceNgn: 25000000,
    priceUsd: 16700,
    mileageKm: 0,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.5L V6',
    drivetrain: 'AWD',
    color: 'Burgundy',
    interiorColor: 'Beige Leather',
    vin: '2T2ZK1BA2DC127403',
    status: 'Available',
    condition: 'Foreign Used (Tokunbo)',
    location: 'Showroom (Lekki, Lagos)',
    inspectionScore: 95,
    imageUrl: rx350Front,
    additionalImages: [
      rx350Dashboard,
      rx350FrontInterior,
      rx350RearCabin,
      rx350RearSeats,
      rx350Rear,
      rx350Engine,
      rx350VinLabel
    ],
    keyFeatures: [
      '3.5L V6 Engine',
      'Beige Leather Interior',
      'Wood-Grain Trim & Leather-Wrapped Steering Wheel',
      'Sunroof',
      'Rear Air Vents & Rear Spoiler',
      'Alloy Wheels with Roof Rails'
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
  address: 'New Road Bus Stop, Before Chevron, Lekki',
  city: 'Lagos',
  country: 'Nigeria',
  workingHoursWeekday: 'Mon - Fri: 8:00 AM - 6:00 PM',
  workingHoursSaturday: 'Sat: 9:00 AM - 4:00 PM',
  workingHoursSunday: 'Sunday: By Prior Appointment'
};
