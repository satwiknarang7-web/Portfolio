/**
 * Professional experience, newest first. Optional fields (`location`, `stack`)
 * are hidden when empty — fill in the SegueIT details as they firm up.
 */
export type Role = {
  company: string;
  title: string;
  location?: string;
  period: string;
  current?: boolean;
  /** Company logo in /public/logos, sized for a dark background. */
  logo?: { src: string; width: number; height: number };
  /** Letters for the badge shown when there is no logo. */
  monogram?: string;
  /** Early-stage company — gets a "Startup" badge in the log. */
  startup?: boolean;
  achievements: readonly string[];
  stack?: readonly string[];
};

/** Why the career path looks the way it does — shown above the log. */
export const careerNote =
  "Two startups, both high-pressure, both by choice. Startups hand you real ownership early and make you learn faster than anywhere else — so that's where I've chosen to build my career.";

export const roles: readonly Role[] = [
  {
    company: "SegueIT",
    logo: { src: "/logos/segueit.png", width: 460, height: 120 },
    title: "Full Stack Developer",
    period: "2026 — Present",
    current: true,
    startup: true,
    achievements: [
      "Joined my second startup by choice, for the steep learning curve that comes with high ownership and a high-pressure pace.",
      "Built Segue HRMS — an enterprise HR platform (NestJS + Next.js) with a Workday-style multi-step approval engine, payroll runs and recruiting-to-onboarding flows.",
      "Built the Segue Pharmacy System — Dispense, POS, Office and HQ modules for Australian community pharmacies, with per-module licensing enforced in a Fastify + Prisma API.",
      "Built Segue Marketing Studio — a generative-AI creative studio for product photoshoots, AI video, voiceovers and an MCP server, running entirely on free, open models.",
      "Built Transcriber — offline meeting transcription with speaker diarization, voice ID and AI-generated summaries, decisions and action items, exported to Word.",
      "Built two Qlik migration platforms — Qlik → Fabric, a four-agent engine that turns Qlik apps into Fabric Power BI projects, and Qlik → Power BI, which rebuilds Qlik apps as native Power BI reports with AI-translated DAX.",
      "Built SegueQuiz — a zero-dependency live quiz app with QR-code joining, a server-side timer and a speed-tiebreak leaderboard.",
    ],
    stack: [
      "Next.js",
      "NestJS",
      "Fastify",
      "Prisma",
      "FastAPI",
      "TypeScript",
      "Python",
      "Generative AI",
      "Power BI",
      "Microsoft Fabric",
    ],
  },
  {
    company: "AOSC Technologies",
    monogram: "AO",
    title: "Software Engineer",
    location: "Amritsar, India",
    period: "Jul 2025 — 2026",
    startup: true,
    achievements: [
      "Developed and maintained secure, production-grade backend and frontend features for a high-traffic e-commerce storefront — optimising React rendering, global state management and Node.js service performance.",
      "Architected and deployed a full-stack Tableau-to-Microsoft Fabric migration platform, with modular Mapping, Data Layer and Run History components in React and Tailwind CSS backed by scalable Node.js services.",
      "Designed Power BI dashboards and custom Power Apps solutions, running complex data cleansing and DAX transformations for stakeholder reporting.",
      "Integrated AI-assisted coding tools and LLM workflows to prototype REST APIs and refactor complex logic — accelerating developer velocity by 60% while keeping rigorous manual code review.",
    ],
    stack: [
      "React",
      "Node.js",
      "Tailwind CSS",
      "Power BI",
      "Power Apps",
      "DAX",
      "Microsoft Fabric",
    ],
  },
  {
    company: "Cadence Design Systems",
    monogram: "CD",
    title: "Software Intern",
    location: "Noida, India",
    period: "May 2022 — Jul 2022",
    achievements: [
      "Gained early exposure to the full software development life cycle inside a global EDA company — Agile ceremonies, cross-functional project management and internal data documentation practices.",
    ],
    stack: ["SDLC", "Agile"],
  },
];
