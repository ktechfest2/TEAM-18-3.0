// Nigerian electoral locations: State → LGA / Area Council → Ward → Polling unit.
//
// The 36 states + FCT list is complete. Everything below state level is a
// PARTIAL SAMPLE taken from the EYENEC design canvas (FCT → Bwari → Kubwa) and
// must be checked against INEC's official polling-unit directory, then replaced
// by data loaded from the backend.

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

export type Place = { code: string; name: string };

/** LGAs / Area Councils per state. Only FCT is filled in so far. */
const LGAS_BY_STATE: Record<string, Place[]> = {
  FCT: [
    { code: "01", name: "Abaji" },
    { code: "02", name: "Bwari" },
    { code: "03", name: "Gwagwalada" },
    { code: "04", name: "Kuje" },
    { code: "05", name: "Kwali" },
    { code: "06", name: "Abuja Municipal (AMAC)" },
  ],
};

/** Wards per LGA, keyed "State/LGA name". Only Bwari is filled in so far. */
const WARDS_BY_LGA: Record<string, Place[]> = {
  "FCT/Bwari": [
    { code: "01", name: "Bwari Central" },
    { code: "02", name: "Kuduru" },
    { code: "03", name: "Ushafa" },
    { code: "04", name: "Dutse Alhaji" },
    { code: "09", name: "Kubwa" },
  ],
};

/** Polling units per ward, keyed "State/LGA/Ward name". Only Kubwa is filled in so far. */
const UNITS_BY_WARD: Record<string, Place[]> = {
  "FCT/Bwari/Kubwa": [
    { code: "003", name: "Kukwaba I / Kukwaba Market" },
    { code: "004", name: "Kukwaba II / Security Post, NYSC Camp" },
    { code: "005", name: "Kukwaba III / Behind Saque Pharmacy" },
    { code: "006", name: "Maitama I & II / Kubwa Primary School" },
  ],
};

export function lgasFor(state: string): Place[] {
  return LGAS_BY_STATE[state] ?? [];
}

export function wardsFor(state: string, lga: string): Place[] {
  return WARDS_BY_LGA[`${state}/${lga}`] ?? [];
}

export function unitsFor(state: string, lga: string, ward: string): Place[] {
  return UNITS_BY_WARD[`${state}/${lga}/${ward}`] ?? [];
}

// ---------- Validation (formats from the updated designs) ----------

/** Polling unit code as printed on the PVC: SS/LL/WW/PPP, e.g. 00/00/00/000. */
export const PU_CODE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{2})\/(\d{3})$/;

export function checkPollingUnitCode(raw: string) {
  const code = raw.replace(/[^0-9/]/g, "");
  const match = code.match(PU_CODE_PATTERN);
  if (!code) return { code, status: "empty" as const };
  if (match) {
    return { code, status: "ok" as const, parts: { state: match[1], lga: match[2], ward: match[3], unit: match[4] } };
  }
  return { code, status: code.length >= 12 ? ("error" as const) : ("incomplete" as const) };
}

/** VIN: letters and numbers only — the full 19 characters, or the last 10. */
export function checkVin(raw: string) {
  const vin = raw.replace(/\s+/g, "").toUpperCase();
  if (!vin) return { vin, status: "empty" as const };
  if (/[^A-Z0-9]/.test(vin)) return { vin, status: "invalidCharacters" as const };
  if (vin.length === 19) return { vin, status: "full" as const };
  if (vin.length === 10) return { vin, status: "lastTen" as const };
  return { vin, status: "wrongLength" as const };
}
