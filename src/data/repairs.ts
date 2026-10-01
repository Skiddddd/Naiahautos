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
