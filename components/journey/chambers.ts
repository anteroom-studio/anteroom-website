export type Chamber = {
  id: number;
  numeral: "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";
  label: string;
  coord: string;
  poster: string;
  video: string;
  copy: string[];
};

export const chambers: Chamber[] = [
  {
    id: 1,
    numeral: "I",
    label: "ANT.001 — Threshold",
    coord: "00°00′ · ZAI · MMXIX",
    poster: "/images/hero-main.png",
    video: "/images/hero-loop.mp4",
    copy: [],
  },
  {
    id: 2,
    numeral: "II",
    label: "ANT.002 — Manifesto",
    coord: "LAT 37°47′ · ARMILLARY",
    poster: "/images/manifesto-chamber.png",
    video: "/images/manifesto-loop.mp4",
    copy: [
      "Anteroom is the threshold.",
      "Before every chamber, a smaller chamber.",
      "What is built here is built to last.",
      "If you are here, you are early.",
    ],
  },
  {
    id: 3,
    numeral: "III",
    label: "ANT.003 — Research",
    coord: "ANT-R · CYCLE 47",
    poster: "/images/practice-research.png",
    video: "/images/research-loop.mp4",
    copy: ["Insight at the core.", "Strategy in motion."],
  },
  {
    id: 4,
    numeral: "IV",
    label: "ANT.004 — Engineering",
    coord: "ANT-E · BLD 003 · v2.7",
    poster: "/images/practice-engineering.png",
    video: "/images/engineering-loop.mp4",
    copy: ["Complex systems,", "engineered elegantly."],
  },
  {
    id: 5,
    numeral: "V",
    label: "ANT.005 — Archive",
    coord: "ANT-A · VOL XII",
    poster: "/images/practice-archive.png",
    video: "/images/archive-loop.mp4",
    copy: ["Fragments, in time.", "Notes, unhurried."],
  },
  {
    id: 6,
    numeral: "VI",
    label: "ANT.006 — Operations",
    coord: "ANT-O · NODE 14 · UTC",
    poster: "/images/practice-operations.png",
    video: "/images/operations-loop.mp4",
    copy: ["Spaces, experiences,", "and interfaces."],
  },
  {
    id: 7,
    numeral: "VII",
    label: "ANT.007 — Return",
    coord: "RETURN · 23°27′",
    poster: "/images/hero-main.png",
    video: "/images/hero-loop.mp4",
    copy: ["Until next time, human."],
  },
];
