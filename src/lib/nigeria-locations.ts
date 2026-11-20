// Nigerian electoral locations: State → LGA / Area Council → Ward → Polling unit.
//
// States (36 + FCT) and all 774 LGAs are complete (see nigeria-lgas.ts).
// Wards and polling units are a PARTIAL SAMPLE from the EYENEC design canvas
// (FCT → Bwari → Kubwa only). Real ward and polling-unit lists must come from
// INEC's official directory, loaded from the backend.

import { LGAS_BY_STATE } from "./nigeria-lgas";

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

export type Place = { code: string; name: string };

/** INEC 2-digit codes we already know (from the design canvas). Others are blank until the backend provides them. */
const KNOWN_LGA_CODES: Record<string, string> = {
  "FCT/Abaji": "01",
  "FCT/Bwari": "02",
  "FCT/Gwagwalada": "03",
  "FCT/Kuje": "04",
  "FCT/Kwali": "05",
  "FCT/Abuja Municipal (AMAC)": "06",
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
  return (LGAS_BY_STATE[state] ?? []).map((name) => ({ name, code: KNOWN_LGA_CODES[`${state}/${name}`] ?? "" }));
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
