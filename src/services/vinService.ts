export interface DecodedVinData {
  vin: string;
  make: string;
  model: string;
  modelYear: string;
  trim?: string;
  bodyClass?: string;
  vehicleType?: string;
  doors?: string;
  driveType?: string;
  transmissionStyle?: string;
  engineCylinders?: string;
  displacementL?: string;
  engineModel?: string;
  engineHP?: string;
  fuelType?: string;
  manufacturer?: string;
  plantCountry?: string;
  plantState?: string;
  plantCity?: string;
  steeringLocation?: string;
  safetyFeatures: {
    abs?: string;
    esc?: string;
    tpms?: string;
    tractionControl?: string;
    curtainAirbags?: string;
    frontAirbags?: string;
    kneeAirbags?: string;
    sideAirbags?: string;
  };
  checkDigitValid: boolean;
  errorCode: string;
  errorText: string;
  allRawVariables: { variable: string; value: string }[];
  timestamp: string;
}

// Compute official ISO 3779 VIN Check Digit (Modulus 11)
export function validateVinCheckDigit(vin: string): { isValid: boolean; expectedCheckDigit: string; actualCheckDigit: string } {
  const cleanVin = vin.toUpperCase().trim();
  if (cleanVin.length !== 17) {
    return { isValid: false, expectedCheckDigit: '', actualCheckDigit: '' };
  }

  const transliterationTable: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
    J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
    S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
    '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
  };

  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const char = cleanVin[i];
    const val = transliterationTable[char];
    if (val === undefined) {
      return { isValid: false, expectedCheckDigit: '', actualCheckDigit: cleanVin[8] };
    }
    sum += val * weights[i];
  }

  const remainder = sum % 11;
  const expected = remainder === 10 ? 'X' : remainder.toString();
  const actual = cleanVin[8];

  return {
    isValid: expected === actual,
    expectedCheckDigit: expected,
    actualCheckDigit: actual
  };
}

export async function decodeVinLive(vin: string): Promise<DecodedVinData> {
  const cleanVin = vin.toUpperCase().trim().replace(/[^A-Z0-9]/g, '');

  if (cleanVin.length !== 17) {
    throw new Error('A standard VIN must be exactly 17 alphanumeric characters (letters I, O, and Q are never used).');
  }

  if (/[IOQ]/.test(cleanVin)) {
    throw new Error('Standard VINs do not contain the letters "I", "O", or "Q" to avoid confusion with 1 and 0.');
  }

  const checkDigitResult = validateVinCheckDigit(cleanVin);

  const endpoint = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${encodeURIComponent(cleanVin)}?format=json`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`NHTSA VPIC server returned HTTP ${response.status}. Please check your connection and retry.`);
  }

  const json = await response.json();
  const rawResults: Array<{ Variable: string; Value: string | null; ValueId: string | null }> = json.Results || [];

  const varMap: Record<string, string> = {};
  const allRawVariables: { variable: string; value: string }[] = [];

  for (const item of rawResults) {
    if (item.Variable && item.Value && item.Value !== 'Not Applicable' && item.Value.trim() !== '') {
      varMap[item.Variable] = item.Value.trim();
      allRawVariables.push({
        variable: item.Variable,
        value: item.Value.trim()
      });
    }
  }

  const make = varMap['Make'] || '';
  const model = varMap['Model'] || '';
  const modelYear = varMap['Model Year'] || '';

  if (!make && !model && !modelYear) {
    throw new Error(`No manufacturer specification records found for VIN: ${cleanVin}. Check if the VIN was entered accurately.`);
  }

  return {
    vin: cleanVin,
    make,
    model,
    modelYear,
    trim: varMap['Trim'] || varMap['Series'],
    bodyClass: varMap['Body Class'],
    vehicleType: varMap['Vehicle Type'],
    doors: varMap['Doors'],
    driveType: varMap['Drive Type'],
    transmissionStyle: varMap['Transmission Style'],
    engineCylinders: varMap['Engine Number of Cylinders'],
    displacementL: varMap['Displacement (L)'],
    engineModel: varMap['Engine Model'],
    engineHP: varMap['Engine Brake (hp) From'] || varMap['Engine Brake (hp) To'],
    fuelType: varMap['Fuel Type - Primary'],
    manufacturer: varMap['Manufacturer Name'],
    plantCountry: varMap['Plant Country'],
    plantState: varMap['Plant State'],
    plantCity: varMap['Plant City'],
    steeringLocation: varMap['Steering Location'],
    safetyFeatures: {
      abs: varMap['Antilock Braking System (ABS)'],
      esc: varMap['Electronic Stability Control (ESC)'],
      tpms: varMap['Tire Pressure Monitoring System (TPMS) Type'],
      tractionControl: varMap['Traction Control'],
      curtainAirbags: varMap['Air Bag Loc Curtain'],
      frontAirbags: varMap['Air Bag Loc Front'],
      kneeAirbags: varMap['Air Bag Loc Knee'],
      sideAirbags: varMap['Air Bag Loc Side']
    },
    checkDigitValid: checkDigitResult.isValid,
    errorCode: varMap['Error Code'] || '0',
    errorText: varMap['Error Text'] || '0 - VIN decoded clean',
    allRawVariables,
    timestamp: new Date().toISOString()
  };
}

export const SAMPLE_VINS = [
  {
    vin: '1HGCR2F83HA123456',
    label: 'Honda Accord EX-L 2.4L',
    category: 'Sedan (US-Manufactured)'
  },
  {
    vin: '4JGFF5KE7PA123456',
    label: 'Mercedes-Benz GLS / GLE Luxury',
    category: 'German Luxury SUV'
  },
  {
    vin: '2T2BZMCA5NC123456',
    label: 'Lexus RX 350 AWD',
    category: 'Japanese Luxury SUV'
  },
  {
    vin: 'WBA53EJ07PC123456',
    label: 'BMW 5-Series Executive',
    category: 'German Sport Sedan'
  },
  {
    vin: 'SALWR2V42NA123456',
    label: 'Land Rover Range Rover Sport',
    category: 'British Luxury AWD'
  }
];
