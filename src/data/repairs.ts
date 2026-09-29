import engineRepairImg from '@/src/assets/images/repair_engine_overhaul_1790684403036.jpg';
import suspensionRepairImg from '@/src/assets/images/repair_suspension_strut_1790684415175.jpg';
import diagnosticRepairImg from '@/src/assets/images/repair_computer_diagnostic_1790684428198.jpg';
import paintRepairImg from '@/src/assets/images/repair_paint_booth_1790684444233.jpg';
import bayRepairImg from '@/src/assets/images/car_inspection_bay_1790618239039.jpg';

export interface RepairMediaItem {
  id: string;
  title: string;
  vehicle: string;
  category: 'engine' | 'diagnostics' | 'suspension' | 'transmission' | 'paint' | 'electrical';
  mediaType: 'photo' | 'video';
  mediaUrl: string;
  thumbnailUrl: string;
  videoDuration?: string;
  faultReport: string;
  dtcCodes?: string[];
  repairPerformed: string;
  partsReplaced: string[];
  turnaroundTime: string;
  warranty: string;
  date: string;
  isBeforeAfter?: boolean;
  beforeImgUrl?: string;
  technician: string;
}

export const INITIAL_REPAIRS_DATA: RepairMediaItem[] = [
  {
    id: 'rep-001',
    title: 'Mercedes-Benz M276 Biturbo Timing Chain & Camshaft Sprocket Overhaul',
    vehicle: '2020 Mercedes-Benz GLE 450 4MATIC',
    category: 'engine',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: engineRepairImg,
    videoDuration: '0:15',
    faultReport: 'Rattling metallic noise on cold startup and persistent check engine lamp with P0016 / P0017 timing correlation faults.',
    dtcCodes: ['P0016 (Crank-Cam Correlation Bank 1)', 'P0017 (Exhaust Camshaft Out of Phase)'],
    repairPerformed: 'Disassembled front timing cover, replaced stretched double roller timing chain, fitted genuine OEM Mercedes hydraulic tensioners, and calibrated variable camshaft adjusters using Xentry diagnostic software.',
    partsReplaced: ['Genuine Mercedes Timing Chain Kit', 'Left & Right Camshaft Adjusters', 'Hydraulic Tensioner', 'Front Crankshaft Seal'],
    turnaroundTime: '48 Hours',
    warranty: '6 Months / 10,000 km Workshop Guarantee',
    date: 'September 2026',
    technician: 'Lead Diagnostics Engineer, Naiahautos'
  },
  {
    id: 'rep-002',
    title: 'Range Rover Sport Air Suspension Compressor & Strut Leak Repair',
    vehicle: '2019 Range Rover Sport HSE Dynamic',
    category: 'suspension',
    mediaType: 'photo',
    mediaUrl: suspensionRepairImg,
    thumbnailUrl: suspensionRepairImg,
    faultReport: 'Vehicle sagging on front-left overnight with "Suspension Fault: Normal Height Only" message on instrument cluster.',
    dtcCodes: ['C1A20-64 (Pressure Increases Too Slow)', 'C1A03-1C (Front Left Height Sensor Signal)'],
    repairPerformed: 'Identified ruptured air bladder on front-left air strut and internal valve block leak. Installed new OEM Bilstein air strut assembly, replaced desiccant dryer in AMK compressor, and conducted full 4-corner electronic height calibration.',
    partsReplaced: ['OEM Bilstein Front Left Air Strut', 'Brass Air Line Voss Fittings', 'Compressor Air Filter & Desiccant'],
    turnaroundTime: '24 Hours',
    warranty: '12 Months Warranty on Air Struts',
    date: 'September 2026',
    isBeforeAfter: true,
    technician: 'Master Suspension Specialist'
  },
  {
    id: 'rep-003',
    title: 'Computerized Module Programming & CAN-Bus Electrical Restoration',
    vehicle: '2021 BMW 530i xDrive (G30)',
    category: 'diagnostics',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: diagnosticRepairImg,
    videoDuration: '0:15',
    faultReport: 'Multiple dashboard warning lights (ABS, DSC, Airbag) and complete loss of iDrive multimedia communication after water intrusion.',
    dtcCodes: ['U0100 (Lost Comm with ECM)', 'U0121 (Lost Comm with ABS)', 'CD9402 (FlexRay Bus Communication Failure)'],
    repairPerformed: 'Conducted oscilloscope pin-by-pin harness test, repaired corroded wiring underneath passenger footwell, re-flashed Body Domain Controller (BDC) firmware, and recoded modules with BMW ISTA/P engineering tool.',
    partsReplaced: ['Repinned Water-Tight Harness Connectors', 'OEM Relays & Micro-Fuses'],
    turnaroundTime: '36 Hours',
    warranty: '6 Months Workshop Warranty',
    date: 'August 2026',
    technician: 'Senior Automotive Electronics Engineer'
  },
  {
    id: 'rep-004',
    title: 'Lexus RX350 8-Speed Automatic Transmission Mechatronic Servicing',
    vehicle: '2020 Lexus RX350 F-Sport',
    category: 'transmission',
    mediaType: 'photo',
    mediaUrl: bayRepairImg,
    thumbnailUrl: bayRepairImg,
    faultReport: 'Harsh jerk when shifting from 2nd to 3rd gear under acceleration, delayed engagement when selecting Reverse.',
    dtcCodes: ['P0761 (Shift Solenoid "C" Performance / Stuck Off)', 'P0746 (Pressure Control Solenoid "A")'],
    repairPerformed: 'Dropped transmission oil pan, inspected for metal shavings, bench-tested solenoid resistance, replaced faulty PWM solenoid valve, fitted new OEM transmission filter, and carried out computerized adaptive relearn.',
    partsReplaced: ['Genuine Toyota/Lexus WS Transmission Fluid (8L)', 'OEM Solenoid Pack', 'Pan Gasket & Internal Strainer'],
    turnaroundTime: '24 Hours',
    warranty: '6 Months Guarantee',
    date: 'August 2026',
    technician: 'Transmission Specialist'
  },
  {
    id: 'rep-005',
    title: 'Glasurit Oven Baked Painting & Ceramic Clear Coat Restoration',
    vehicle: '2022 Audi Q8 55 TFSI S-Line',
    category: 'paint',
    mediaType: 'photo',
    mediaUrl: paintRepairImg,
    thumbnailUrl: paintRepairImg,
    faultReport: 'Extensive front bumper & passenger fender scuff damage from tight parking incident in Victoria Island.',
    repairPerformed: 'Plastic-welded cracked bumper mounting tabs, computer color-matched Mythos Black Metallic paint using Glasurit 90-Line waterborne system, oven-baked at 65°C for 45 minutes, and finished with 9H ceramic coating.',
    partsReplaced: ['OEM Audi Bumper Retainer Clips', 'Glasurit Clear Coat System'],
    turnaroundTime: '3 Days',
    warranty: '2-Year Paint Warranty (No peeling/fading)',
    date: 'July 2026',
    isBeforeAfter: true,
    technician: 'Master Spray Painter & Refinisher'
  },
  {
    id: 'rep-006',
    title: 'Toyota Land Cruiser V8 Prado Fuel Injection & Common Rail Overhaul',
    vehicle: '2018 Toyota Land Cruiser Prado TXL V6',
    category: 'engine',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: engineRepairImg,
    videoDuration: '0:15',
    faultReport: 'Black exhaust smoke, rough idling, and significant sluggish acceleration when climbing Third Mainland Bridge.',
    dtcCodes: ['P0087 (Fuel Rail Pressure Too Low)', 'P0171 (System Too Lean Bank 1)'],
    repairPerformed: 'Ultrasonic cleaning of 6 fuel injectors, replaced in-tank high pressure fuel pump assembly, replaced fuel filters, and reset fuel trim adaptations with Toyota Techstream.',
    partsReplaced: ['OEM Denso High Pressure Fuel Pump', 'Primary & Secondary Fuel Filters', 'Injector O-Ring Kit'],
    turnaroundTime: '24 Hours',
    warranty: '6 Months Warranty',
    date: 'July 2026',
    technician: 'Lead Diagnostics Engineer'
  }
];
