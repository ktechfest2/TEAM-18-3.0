// The five languages EYENEC supports (feature document, section 2).
export const LANGUAGES = [
  { id: "en", code: "EN", name: "English", greeting: "Welcome" },
  { id: "pcm", code: "PG", name: "Naijá (Pidgin)", greeting: "How far, you don land" },
  { id: "yo", code: "YO", name: "Yorùbá", greeting: "Ẹ káàbọ̀" },
  { id: "ha", code: "HA", name: "Hausa", greeting: "Barka da zuwa" },
  { id: "ig", code: "IG", name: "Igbo", greeting: "Nnọọ" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];
