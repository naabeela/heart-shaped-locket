export type Chapter = {
  n: string;
  label: string;
  to: string;
  tint: "rose" | "green" | "blue" | "ink";
};

export const CHAPTERS: Chapter[] = [
  { n: "01", label: "Entry", to: "/", tint: "ink" },
  { n: "02", label: "Orientation", to: "/orientation", tint: "blue" },
  { n: "03", label: "The Way I See You", to: "/observation", tint: "rose" },
  { n: "04", label: "The Unseen Archive", to: "/archive", tint: "ink" },
  { n: "05", label: "Patterns", to: "/patterns", tint: "green" },
  { n: "06", label: "Contradictions", to: "/contradictions", tint: "rose" },
  { n: "07", label: "A Theory of You", to: "/theory", tint: "blue" },
  { n: "08", label: "The Variable Experiment", to: "/experiment", tint: "green" },
  { n: "09", label: "The Variables", to: "/variables", tint: "blue" },
  { n: "10", label: "From Where I Stand", to: "/unseen", tint: "rose" },
  { n: "11", label: "The Parts Still Becoming", to: "/becoming", tint: "green" },
  { n: "12", label: "Poetry Room", to: "/poetry", tint: "rose" },
  { n: "13", label: "Letters", to: "/letters", tint: "ink" },
  { n: "14", label: "The Thing About Being Seen", to: "/reciprocal", tint: "blue" },
  { n: "15", label: "Conclusion", to: "/conclusion", tint: "ink" },
  { n: "16", label: "Final Unlock", to: "/final", tint: "rose" },
];

const KEY = "caf.study.progress.v1";

export function readReached(): number {
  if (typeof window === "undefined") return 1;
  const raw = window.localStorage.getItem(KEY);
  const n = raw ? parseInt(raw, 10) : 1;
  return Number.isFinite(n) && n > 0 ? Math.min(n, CHAPTERS.length) : 1;
}

export function markReached(index: number) {
  if (typeof window === "undefined") return;
  const cur = readReached();
  if (index > cur) window.localStorage.setItem(KEY, String(Math.min(index, CHAPTERS.length)));
}

export function chapterIndexFor(path: string): number {
  const i = CHAPTERS.findIndex((c) => c.to === path);
  return i === -1 ? 1 : i + 1;
}
