/**
 * Hobbies, interests and achievements. `icon` must be a key of `hobbyIcons` in
 * HobbyGrid.tsx; `size` controls the tile's footprint in the bento grid
 * (the current order fills a 3 × 2 grid exactly: wide, then four normal tiles).
 */
export type HobbyIcon = "medal" | "trophy" | "crown" | "palette" | "cpu";

export type Hobby = {
  title: string;
  description: string;
  icon: HobbyIcon;
  size: "wide" | "tall" | "normal";
  tags: readonly string[];
  /** Background photo in /public/hobbies, with the credit the Unsplash licence asks for. */
  photo?: HobbyPhoto;
};

export type HobbyPhoto = {
  src: string;
  alt: string;
  photographer: string;
  /** Unsplash username, used to link the credit. */
  username: string;
};

export const sports = [
  "Cricket",
  "Football",
  "Basketball",
  "Badminton",
  "Pickleball",
  "Padel",
  "Squash",
  "Chess",
  "Swimming",
] as const;

export const hobbies: readonly Hobby[] = [
  {
    title: "Multi-sport athlete",
    description:
      "If there's a game on, I'm in. From the cricket pitch and football field to the padel and pickleball courts — and the pool — playing a wide range of sports keeps me competitive, adaptable and a good teammate.",
    icon: "medal",
    size: "wide",
    tags: sports,
    photo: {
      src: "/hobbies/sports.webp",
      alt: "Cricket stadium in front of snow-capped mountains",
      photographer: "Piyush Bansal",
      username: "thepiyushbansal",
    },
  },
  {
    title: "Chess",
    description:
      "A FIDE-rated player (1700) and a top-percentile competitor on Chess.com (2000 Elo). I've played in multiple national-level open tournaments — it's where I learned to think several moves ahead.",
    icon: "crown",
    size: "normal",
    tags: ["FIDE 1700", "Chess.com 2000", "National opens"],
    photo: {
      src: "/hobbies/chess.webp",
      alt: "A black and a white chess knight facing each other",
      photographer: "Hassan Pasha",
      username: "hpzworkz",
    },
  },
  {
    title: "Squash captain",
    description:
      "Captained Shiv Nadar University's squash team (2021 – 2024) and led us to the All India University Championship quarterfinals in 2024.",
    icon: "trophy",
    size: "normal",
    tags: ["Team captain", "AIU QF 2024"],
    photo: {
      src: "/hobbies/squash.webp",
      alt: "A squash player mid-swing against a court wall",
      photographer: "Dennis Schmidt",
      username: "dmrschmidt",
    },
  },
  {
    title: "Graphic design",
    description:
      "I design graphics, posts and visuals in Canva and with AI image tools — the creative half that makes the work land.",
    icon: "palette",
    size: "normal",
    tags: ["Canva", "AI design tools"],
    photo: {
      src: "/hobbies/design.webp",
      alt: "A designer working on a drawing tablet beside colour swatches",
      photographer: "Theme Photos",
      username: "themephotos",
    },
  },
  {
    title: "Living AI-native",
    description:
      "AI is part of my everyday toolkit. I've completed Anthropic Academy's full 17-course catalog and keep testing new tools as they launch.",
    icon: "cpu",
    size: "normal",
    tags: ["Claude Code", "Agentic tooling"],
    photo: {
      src: "/hobbies/ai.webp",
      alt: "An abstract network sphere of glowing dots and lines",
      photographer: "Growtika",
      username: "growtika",
    },
  },
];

export const currentlyInto = [
  { label: "Building", value: "Startup products at SegueIT" },
  { label: "Learning", value: "Agentic AI tooling" },
  { label: "Playing", value: "Squash, padel & chess" },
] as const;
