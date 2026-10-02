// Fixed standard-time UTC offsets (in hours) for a curated set of cities.
// This intentionally does not account for daylight saving time — see the
// disclaimer shown next to the result in the UI.

export interface CityZone {
  id: string;
  label: string;
  offset: number; // hours from UTC, standard time
}

export const CITY_ZONES: CityZone[] = [
  { id: "dhaka", label: "Dhaka (Bangladesh)", offset: 6 },
  { id: "newyork", label: "New York (USA, Eastern)", offset: -5 },
  { id: "losangeles", label: "Los Angeles (USA, Pacific)", offset: -8 },
  { id: "chicago", label: "Chicago (USA, Central)", offset: -6 },
  { id: "toronto", label: "Toronto (Canada)", offset: -5 },
  { id: "london", label: "London (UK)", offset: 0 },
  { id: "berlin", label: "Berlin (Germany)", offset: 1 },
  { id: "paris", label: "Paris (France)", offset: 1 },
  { id: "delhi", label: "Delhi / Kolkata (India)", offset: 5.5 },
  { id: "dubai", label: "Dubai (UAE)", offset: 4 },
  { id: "singapore", label: "Singapore", offset: 8 },
  { id: "tokyo", label: "Tokyo (Japan)", offset: 9 },
  { id: "shanghai", label: "Shanghai (China)", offset: 8 },
  { id: "sydney", label: "Sydney (Australia)", offset: 10 },
  { id: "auckland", label: "Auckland (New Zealand)", offset: 12 },
];

export interface TimeZoneResult {
  convertedTime: string; // formatted 12-hour time, e.g. "3:30 PM"
  dayOffset: number; // -1, 0, or +1 relative to the source day
  differenceHours: number;
}

function formatMinutes(totalMinutes: number): string {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function convertTimeZone(
  fromId: string,
  toId: string,
  time: string // "HH:mm"
): { ok: true; data: TimeZoneResult } | { ok: false; error: string } {
  const from = CITY_ZONES.find((z) => z.id === fromId);
  const to = CITY_ZONES.find((z) => z.id === toId);
  if (!from || !to) return { ok: false, error: "Please select valid cities." };

  const [hh, mm] = time.split(":").map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) {
    return { ok: false, error: "Please enter a valid time." };
  }

  const sourceMinutes = hh * 60 + mm;
  const diffHours = to.offset - from.offset;
  const targetMinutesRaw = sourceMinutes + diffHours * 60;

  const dayOffset = Math.floor(targetMinutesRaw / 1440);
  const normalizedMinutes = ((targetMinutesRaw % 1440) + 1440) % 1440;

  return {
    ok: true,
    data: {
      convertedTime: formatMinutes(Math.round(normalizedMinutes)),
      dayOffset,
      differenceHours: Math.round(diffHours * 100) / 100,
    },
  };
}
