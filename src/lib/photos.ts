import p1 from "@/assets/Screenshot_20260822-191449.jpg.asset.json";
import p2 from "@/assets/Screenshot_20260822-190043.jpg.asset.json";
import p3 from "@/assets/Screenshot_20260823-234526.jpg.asset.json";
import p4 from "@/assets/IMG-20260823-WA0087.jpg.asset.json";
import p5 from "@/assets/IMG-20260823-WA0089.jpg.asset.json";

/**
 * Photo assignment table. Each photograph is used exactly once,
 * in exactly one narrative moment. No duplicates anywhere in the app.
 */
export const PHOTOS = {
  observation: {
    src: p1.url,
    alt: "Chalika Azka Feirazy in a mint hoodie and dark hijab, looking straight into the camera",
    caption: "PLATE I — the face you make when you are deciding whether to say the thing",
  },
  archive: {
    src: p2.url,
    alt: "Chalika Azka Feirazy smiling in a warmly lit cafe",
    caption: "PLATE II — recorded in a room with too much light and not enough quiet",
  },
  patterns: {
    src: p3.url,
    alt: "Chalika Azka Feirazy in a deep red hijab, unimpressed expression",
    caption: "PLATE III — the specific frown that means you are fine and also not fine",
  },
  theory: {
    src: p4.url,
    alt: "Chalika Azka Feirazy in a deep red hijab, looking slightly away from the lens",
    caption: "PLATE IV — subject observed mid-thought, model incomplete",
  },
  final: {
    src: p5.url,
    alt: "Chalika Azka Feirazy smiling closely at the camera in a deep red hijab",
    caption: "PLATE V — the last image in the file, and the reason the file stays open",
  },
} as const;
