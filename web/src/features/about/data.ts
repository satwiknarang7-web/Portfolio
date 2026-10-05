/**
 * About content. Everything on the About page and the home page marquee is
 * driven from here.
 */
export const bio = [
  "I'm an engineer by profession, but I like to think of myself as sitting right at the bridge between engineering and business — someone who can build the product, understand the numbers behind it and speak to the people who depend on both.",
  "It all rests on a strong foundation in mathematics and physics — the same grounding that took me to the 96th percentile in JEE Main, and that still shapes how I break down problems from first principles.",
  "I've deliberately built my career at startups — first AOSC Technologies, now SegueIT. Both are high-pressure environments, and I chose them on purpose: startups hand you real ownership early, and nothing teaches you faster.",
  "On the engineering side I own features end-to-end, from database schema and API design to a polished, high-traffic interface. At AOSC I shipped production features for a high-traffic e-commerce storefront and architected a Tableau-to-Microsoft Fabric migration platform. Before that, I interned at Cadence Design Systems.",
  "On the business side I build the Power BI dashboards and reporting that stakeholders run on, and I design the visuals too — graphics in Canva and AI tools. Underneath all of it, I'm extremely AI-native: AI is part of how I research, build, design and ship, every day.",
] as const;

export const stats = [
  { value: "96", label: "Percentile, JEE Main" },
  { value: "2", label: "Startups, by choice" },
  { value: "60%", label: "Faster delivery with AI workflows" },
  { value: "9", label: "Sports played" },
] as const;

export const principles = [
  {
    title: "Stand on the bridge",
    description:
      "Engineering and business shouldn't need a translator. I build with the commercial goal in view and explain technical trade-offs in business terms.",
  },
  {
    title: "Think from first principles",
    description:
      "A maths and physics grounding taught me to strip a problem down to fundamentals before reaching for a framework.",
  },
  {
    title: "Choose the steep curve",
    description:
      "I pick high-pressure startup environments on purpose — that's where ownership comes early and learning compounds fastest.",
  },
  {
    title: "AI-native by default",
    description:
      "AI is woven into how I research, code, design and decide — paired with rigorous human review so speed never costs quality.",
  },
] as const;

export const marqueeItems = [
  "Engineering × Business",
  "AI-Native",
  "Maths & Physics",
  "Full-Stack",
  "Next.js",
  "Node.js",
  "Power BI",
  "Graphic Design",
  "Claude Code",
] as const;
