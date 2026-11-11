// Splits an event name into a big script line + a small spaced-caps caption.
//   "Rayaan & Qudsiyyah Wedding" -> { script: "Rayaan & Qudsiyyah", caption: "Wedding" }
// Names that don't end in a known event word fall back to "first word big, rest small".
const EVENT_WORDS = /^(.+?)\s+((?:wedding|nikah|nikkah|walima|reception|bridal shower|celebration)(?:\s.*)?)$/i;

export function splitEventName(name: string): { script: string; caption: string } {
  const clean = name.trim();
  const m = clean.match(EVENT_WORDS);
  if (m) return { script: m[1], caption: m[2] };
  const [first, ...rest] = clean.split(/\s+/);
  return { script: first, caption: rest.join(' ') };
}
