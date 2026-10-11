import siennaCollisionImg from '@/src/assets/images/repair_sienna_front_collision.jpg';
import paintBoothImg from '@/src/assets/images/repair_poster_paint-booth-masking-spray.jpg';
import acuraMdxImg from '@/src/assets/images/repair_poster_acura-mdx-exterior-refinish.jpg';
import doorPanelImg from '@/src/assets/images/repair_poster_door-panel-bodywork-respray.jpg';
import siennaPaintImg from '@/src/assets/images/repair_poster_sienna-body-repair-paint.jpg';
import rearCollisionImg from '@/src/assets/images/repair_poster_rear-collision-repair-respray.jpg';
import jeepImg from '@/src/assets/images/repair_poster_jeep-liberty-full-respray.jpg';
import suvBoothImg from '@/src/assets/images/repair_poster_suv-spray-booth-finish.jpg';
import santaFeImg from '@/src/assets/images/repair_poster_rebuild-to-red-santafe.jpg';
import steeringColumnImg from '@/src/assets/images/repair_steering_column_electrical.jpg';
import blowerClimateImg from '@/src/assets/images/repair_blower_climate.jpg';
import steeringFuseboxImg from '@/src/assets/images/repair_steering_fusebox.jpg';
import dashFrameworkImg from '@/src/assets/images/repair_dashboard_framework.jpg';

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
    id: 'rep-body-sienna-photo',
    title: 'Toyota Sienna Front-End Collision Repair (Before & After)',
    vehicle: 'Toyota Sienna',
    category: 'paint',
    mediaType: 'photo',
    mediaUrl: siennaCollisionImg,
    thumbnailUrl: siennaCollisionImg,
    faultReport: 'Front bumper, fender and headlamp collision damage repaired and refinished.',
    repairPerformed: 'Front bumper, fender and headlamp collision damage repaired and refinished.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-01',
    title: 'Paint Booth Masking & Spray Application',
    vehicle: 'Dark Sedan',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/paint-booth-masking-spray.mp4',
    thumbnailUrl: paintBoothImg,
    videoDuration: '0:15',
    faultReport: 'Vehicle prepped, masked and sprayed inside our ventilated spray booth.',
    repairPerformed: 'Vehicle prepped, masked and sprayed inside our ventilated spray booth.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-02',
    title: 'Acura MDX Exterior Refinish & Finish Check',
    vehicle: 'Acura MDX',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/acura-mdx-exterior-refinish.mp4',
    thumbnailUrl: acuraMdxImg,
    videoDuration: '0:31',
    faultReport: 'Exterior refinish completed and the finished vehicle presented outdoors for inspection.',
    repairPerformed: 'Exterior refinish completed and the finished vehicle presented outdoors for inspection.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-03',
    title: 'Door Panel Bodywork, Masking & Respray',
    vehicle: 'SUV',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/door-panel-bodywork-respray.mp4',
    thumbnailUrl: doorPanelImg,
    videoDuration: '2:00',
    faultReport: 'Door and body panel repair, masking and respray, followed by finishing.',
    repairPerformed: 'Door and body panel repair, masking and respray, followed by finishing.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-04',
    title: 'Toyota Sienna Body Repair & Repaint',
    vehicle: 'Toyota Sienna',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/sienna-body-repair-paint.mp4',
    thumbnailUrl: siennaPaintImg,
    videoDuration: '0:35',
    faultReport: 'Body repair and repaint of a Toyota Sienna, finished and delivered looking factory-fresh.',
    repairPerformed: 'Body repair and repaint of a Toyota Sienna, finished and delivered looking factory-fresh.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-05',
    title: 'Rear Collision Repair & Full Respray',
    vehicle: 'Executive Sedan',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/rear-collision-repair-respray.mp4',
    thumbnailUrl: rearCollisionImg,
    videoDuration: '1:51',
    faultReport: 'Rear-end collision repair, panel work and spray booth respray.',
    repairPerformed: 'Rear-end collision repair, panel work and spray booth respray.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-06',
    title: 'Jeep Liberty Panel Repair & Full Respray',
    vehicle: 'Jeep Liberty',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/jeep-liberty-full-respray.mp4',
    thumbnailUrl: jeepImg,
    videoDuration: '0:27',
    faultReport: 'Roof and body panel work with a complete respray.',
    repairPerformed: 'Roof and body panel work with a complete respray.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-07',
    title: 'SUV Spray Booth Finishing',
    vehicle: 'SUV',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/suv-spray-booth-finish.mp4',
    thumbnailUrl: suvBoothImg,
    videoDuration: '0:23',
    faultReport: 'Masked SUV inside the spray booth for a clean, even finish.',
    repairPerformed: 'Masked SUV inside the spray booth for a clean, even finish.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-body-vid-08',
    title: 'Collision Rebuild to Showroom Red Finish',
    vehicle: 'Hyundai Santa Fe',
    category: 'paint',
    mediaType: 'video',
    mediaUrl: '/videos/rebuild-to-red-santafe.mp4',
    thumbnailUrl: santaFeImg,
    videoDuration: '0:36',
    faultReport: 'Vehicle rebuilt from bare, primed panels to a glossy red finish.',
    repairPerformed: 'Vehicle rebuilt from bare, primed panels to a glossy red finish.',
    partsReplaced: [],
    turnaroundTime: 'Per job',
    warranty: 'Workshop warranty',
    date: 'October 2026',
    technician: 'Naiahautos Body & Paint Team'
  },
  {
    id: 'rep-dash-vid',
    title: 'Complete Dashboard Assembly & HVAC Re-installation',
    vehicle: 'Toyota / Lexus Executive Sedan',
    category: 'electrical',
    mediaType: 'video',
    mediaUrl: '/videos/dashboard_assembly_repair.mp4',
    thumbnailUrl: dashFrameworkImg,
    videoDuration: '0:36',
    faultReport: 'Complete vehicle cabin electronic failure, air conditioning evaporator core leak, and dashboard harness short circuit.',
    dtcCodes: ['B1421 (Solar Sensor Circuit)', 'U0155 (Lost Comm with Instrument Panel Cluster)'],
    repairPerformed: 'Dismantled full dashboard assembly, repaired pinched CAN-bus wiring harness, replaced heater/evaporator core, re-pinned factory terminal connectors, and re-aligned dashboard frame with two technicians.',
    partsReplaced: ['New OEM Evaporator Core', 'Factory Wire Harness Connectors', 'Dash Retainer Brackets'],
    turnaroundTime: '48 Hours',
    warranty: '12 Months Workshop Warranty',
    date: 'September 2026',
    technician: 'Lead Auto Electrician & Master Tech, Naiahautos'
  },
  {
    id: 'rep-dash-01',
    title: 'Dashboard Wire Harness & Steering Column Electrical Overhaul',
    vehicle: 'Lexus RX350 / Toyota Avalon',
    category: 'electrical',
    mediaType: 'photo',
    mediaUrl: steeringColumnImg,
    thumbnailUrl: steeringColumnImg,
    faultReport: 'Intermittent power cut to speedometer, steering wheel controls, and climate control display.',
    dtcCodes: ['B1000 (ECU Malfunction)', 'U0100 (Lost Comm with Engine Control Module)'],
    repairPerformed: 'Stripped vehicle interior to the firewall, traced short circuit in primary cross-car harness, soldered and heat-shrink insulated damaged conductors, and tested continuity with digital multimeter.',
    partsReplaced: ['Automotive Grade Cross-Linked Wiring', 'OEM Relay Module'],
    turnaroundTime: '24 Hours',
    warranty: '6 Months Electrical Guarantee',
    date: 'September 2026',
    technician: 'Lead Auto Electrician'
  },
  {
    id: 'rep-dash-03',
    title: 'Blower Motor & Cabin Climate Control Evaporator Testing',
    vehicle: 'Toyota / Lexus Executive Sedan',
    category: 'electrical',
    mediaType: 'photo',
    mediaUrl: blowerClimateImg,
    thumbnailUrl: blowerClimateImg,
    faultReport: 'No AC airflow from dash vents, burning smell when AC turned on, and blower motor fuse blowing immediately.',
    dtcCodes: ['B1411 (Cabin Temperature Sensor Circuit)', 'B1424 (Solar Sensor Circuit Passenger)'],
    repairPerformed: 'Bench-tested AC blower fan motor, replaced shorted blower motor resistor pack, cleaned evaporator housing, and verified wire harness load.',
    partsReplaced: ['Denso AC Blower Fan Assembly', 'Blower Motor Resistor Pack', 'Cabin Air Filter'],
    turnaroundTime: '12 Hours',
    warranty: '6 Months Warranty',
    date: 'September 2026',
    technician: 'Auto Electrical & AC Specialist'
  },
  {
    id: 'rep-dash-04',
    title: 'Steering Column & Central Fuse Box Terminal Overhaul',
    vehicle: 'Toyota / Lexus Executive Sedan',
    category: 'electrical',
    mediaType: 'photo',
    mediaUrl: steeringFuseboxImg,
    thumbnailUrl: steeringFuseboxImg,
    faultReport: 'Burned wiring behind fuse box causing no-start condition and keyless entry ignition failure.',
    dtcCodes: ['B2799 (Engine Immobilizer System Malfunction)'],
    repairPerformed: 'Rebuilt fuse junction box backplate, replaced high-amperage fusible links, re-crimped terminals, and re-insulated main harness trunk.',
    partsReplaced: ['Main Fusible Link Block', 'Heat-Resistant Wire Sleeving'],
    turnaroundTime: '16 Hours',
    warranty: '6 Months Warranty',
    date: 'September 2026',
    technician: 'Auto Electrical Specialist'
  },
  {
    id: 'rep-dash-05',
    title: 'Full Dashboard Metal Support Framework Realignment',
    vehicle: 'Toyota / Lexus Executive Sedan',
    category: 'electrical',
    mediaType: 'photo',
    mediaUrl: dashFrameworkImg,
    thumbnailUrl: dashFrameworkImg,
    faultReport: 'Rattling dashboard crossmember structure and misaligned air vent distribution channels.',
    dtcCodes: [],
    repairPerformed: 'Re-torqued tubular steel dash reinforcement beam, aligned air distribution ducting, secured anti-vibration felt dampening, and locked steering bracket.',
    partsReplaced: ['Anti-Vibration Dash Mounting Bushings', 'OEM Retaining Fasteners'],
    turnaroundTime: '8 Hours',
    warranty: '12 Months Workshop Guarantee',
    date: 'September 2026',
    technician: 'Master Interior & Electronics Technician'
  }
];
