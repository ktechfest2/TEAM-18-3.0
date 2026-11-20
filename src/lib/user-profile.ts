"use client";

// The user's details, saved in this browser (localStorage).
// TEMPORARY: until the backend exists, this is the only place details are kept.
// Later, replace the body of these functions with calls to the API — the
// screens use only `useUserProfile()` and `saveUserProfile()`, so they won't need to change.

import { useSyncExternalStore } from "react";
import type { LanguageId } from "@/lib/languages";

export type ThemePreference = "auto" | "light" | "dark";

export type UserProfile = {
  fullName: string;
  phone: string;
  email: string;
  language: LanguageId;
  theme: ThemePreference;
  pollingUnit: {
    state: string;
    lga: string;
    ward: string;
    unitName: string;
    unitCode: string;
  };
};

const STORAGE_KEY = "eyenec.profile";
const CHANGE_EVENT = "eyenec:profile-change";

export const EMPTY_PROFILE: UserProfile = {
  fullName: "",
  phone: "",
  email: "",
  language: "en",
  theme: "auto",
  pollingUnit: { state: "", lga: "", ward: "", unitName: "", unitCode: "" },
};

// ---------- Reading & writing ----------

// Cached so React gets the same object until something changes.
let cachedRaw: string | null = null;
let cachedProfile: UserProfile = EMPTY_PROFILE;

function readProfile(): UserProfile {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY_PROFILE; // storage blocked (private mode etc.)
  }
  if (raw === cachedRaw) return cachedProfile;

  cachedRaw = raw;
  try {
    const saved = raw ? (JSON.parse(raw) as Partial<UserProfile>) : {};
    cachedProfile = {
      ...EMPTY_PROFILE,
      ...saved,
      pollingUnit: { ...EMPTY_PROFILE.pollingUnit, ...saved.pollingUnit },
    };
  } catch {
    cachedProfile = EMPTY_PROFILE;
  }
  return cachedProfile;
}

/** Save some fields; the rest stay as they were. */
export function saveUserProfile(changes: Partial<UserProfile>) {
  const current = readProfile();
  const next: UserProfile = {
    ...current,
    ...changes,
    pollingUnit: { ...current.pollingUnit, ...changes.pollingUnit },
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked — the change only lasts until the page reloads.
    cachedRaw = null;
    cachedProfile = next;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Forget everything (used by "Log out"). */
export function clearUserProfile() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// ---------- React hook ----------

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange); // changes from other tabs
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The saved profile. On the server (and the first render) it is EMPTY_PROFILE. */
export function useUserProfile(): UserProfile {
  return useSyncExternalStore(subscribe, readProfile, () => EMPTY_PROFILE);
}

// ---------- Helpers for display ----------

export function firstName(profile: UserProfile) {
  return profile.fullName.trim().split(/\s+/)[0] ?? "";
}

export function initials(profile: UserProfile) {
  const parts = profile.fullName.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}

/** "+234 801 *** 5678" — never show the full number on screen. */
export function maskedPhone(profile: UserProfile) {
  const digits = profile.phone.replace(/\D/g, "").replace(/^0/, "");
  if (digits.length < 7) return profile.phone ? `+234 ${digits}` : "";
  return `+234 ${digits.slice(0, 3)} *** ${digits.slice(-4)}`;
}
