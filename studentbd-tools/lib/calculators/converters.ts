// --- Unit Converter -------------------------------------------------------

export type UnitCategory = "length" | "mass" | "temperature" | "storage";

export interface UnitDef {
  id: string;
  label: string;
}

// Factors are relative to the category's base unit (meters, grams, bytes).
// Temperature is handled separately since it isn't a simple multiplier.
const LENGTH_FACTORS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

const MASS_FACTORS: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  ton: 1_000_000,
  oz: 28.349523125,
  lb: 453.59237,
};

// Storage uses binary (1024-based) multiples, matching how most operating
// systems display file sizes.
const STORAGE_FACTORS: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

export const UNIT_OPTIONS: Record<UnitCategory, UnitDef[]> = {
  length: [
    { id: "mm", label: "Millimeters (mm)" },
    { id: "cm", label: "Centimeters (cm)" },
    { id: "m", label: "Meters (m)" },
    { id: "km", label: "Kilometers (km)" },
    { id: "in", label: "Inches (in)" },
    { id: "ft", label: "Feet (ft)" },
    { id: "yd", label: "Yards (yd)" },
    { id: "mi", label: "Miles (mi)" },
  ],
  mass: [
    { id: "mg", label: "Milligrams (mg)" },
    { id: "g", label: "Grams (g)" },
    { id: "kg", label: "Kilograms (kg)" },
    { id: "ton", label: "Metric tons (t)" },
    { id: "oz", label: "Ounces (oz)" },
    { id: "lb", label: "Pounds (lb)" },
  ],
  temperature: [
    { id: "c", label: "Celsius (°C)" },
    { id: "f", label: "Fahrenheit (°F)" },
    { id: "k", label: "Kelvin (K)" },
  ],
  storage: [
    { id: "B", label: "Bytes (B)" },
    { id: "KB", label: "Kilobytes (KB)" },
    { id: "MB", label: "Megabytes (MB)" },
    { id: "GB", label: "Gigabytes (GB)" },
    { id: "TB", label: "Terabytes (TB)" },
  ],
};

function celsiusFrom(value: number, unit: string): number {
  if (unit === "c") return value;
  if (unit === "f") return ((value - 32) * 5) / 9;
  return value - 273.15; // kelvin
}
function celsiusTo(value: number, unit: string): number {
  if (unit === "c") return value;
  if (unit === "f") return (value * 9) / 5 + 32;
  return value + 273.15; // kelvin
}

export function convertUnit(
  category: UnitCategory,
  fromUnit: string,
  toUnit: string,
  value: number
): { ok: true; data: number } | { ok: false; error: string } {
  if (Number.isNaN(value)) return { ok: false, error: "Please enter a valid number." };

  if (category === "temperature") {
    const celsius = celsiusFrom(value, fromUnit);
    if (celsius < -273.15) return { ok: false, error: "Temperature cannot be below absolute zero." };
    return { ok: true, data: Math.round(celsiusTo(celsius, toUnit) * 100) / 100 };
  }

  const factors = category === "length" ? LENGTH_FACTORS : category === "mass" ? MASS_FACTORS : STORAGE_FACTORS;
  const fromFactor = factors[fromUnit];
  const toFactor = factors[toUnit];
  if (!fromFactor || !toFactor) return { ok: false, error: "Please select valid units." };
  if (value < 0) return { ok: false, error: "Please enter a non-negative value." };

  const base = value * fromFactor;
  const result = base / toFactor;
  return { ok: true, data: Math.round(result * 1e6) / 1e6 };
}

// --- Aspect Ratio -----------------------------------------------------------

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export interface AspectRatioResult {
  simplified: { w: number; h: number };
  computedWidth?: number;
  computedHeight?: number;
}

export function calculateAspectRatio(
  width: number,
  height: number,
  targetWidth?: number,
  targetHeight?: number
): { ok: true; data: AspectRatioResult } | { ok: false; error: string } {
  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) {
    return { ok: false, error: "Width and height must be positive numbers." };
  }

  const divisor = gcd(Math.round(width), Math.round(height)) || 1;
  const simplified = { w: Math.round(width) / divisor, h: Math.round(height) / divisor };

  let computedWidth: number | undefined;
  let computedHeight: number | undefined;

  if (targetWidth !== undefined && !Number.isNaN(targetWidth) && targetWidth > 0) {
    computedHeight = Math.round((targetWidth * height) / width * 100) / 100;
  }
  if (targetHeight !== undefined && !Number.isNaN(targetHeight) && targetHeight > 0) {
    computedWidth = Math.round((targetHeight * width) / height * 100) / 100;
  }

  return { ok: true, data: { simplified, computedWidth, computedHeight } };
}

// --- Number Base Converter ---------------------------------------------------

const VALID_DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

export interface NumberBaseResult {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

export function convertNumberBase(
  value: string,
  fromBase: number
): { ok: true; data: NumberBaseResult } | { ok: false; error: string } {
  const trimmed = value.trim().toLowerCase();
  if (trimmed === "") return { ok: false, error: "Please enter a number." };
  if (fromBase < 2 || fromBase > 36) return { ok: false, error: "Base must be between 2 and 36." };

  const allowedDigits = VALID_DIGITS.slice(0, fromBase);
  for (const char of trimmed) {
    if (!allowedDigits.includes(char)) {
      return { ok: false, error: `"${value}" is not a valid base-${fromBase} number.` };
    }
  }

  const decimalValue = parseInt(trimmed, fromBase);
  if (Number.isNaN(decimalValue)) return { ok: false, error: "Could not parse that number." };

  return {
    ok: true,
    data: {
      binary: decimalValue.toString(2),
      octal: decimalValue.toString(8),
      decimal: decimalValue.toString(10),
      hexadecimal: decimalValue.toString(16).toUpperCase(),
    },
  };
}
