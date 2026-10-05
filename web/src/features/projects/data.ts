/**
 * Projects showcase. Each entry gets a card on /projects and its own page at
 * /projects/[slug]; `featured` ones also appear on the home page.
 */
export type ProjectCategory = "Full-stack" | "Data" | "AI";

/** A real screen capture stored at /public/projects/<slug>/<file>.webp, 1600 px wide. */
export type Screenshot = {
  file: string;
  caption: string;
  /** Pixel size, when it differs from the standard 1600 × 1000 capture. */
  width?: number;
  height?: number;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  year?: string;
  /** Where it was built, shown as "Built at …". Omit for personal projects. */
  company?: string;
  /** Letters drawn large on the card artwork; defaults to the title's first letter. */
  monogram?: string;
  stack: readonly string[];
  highlights: readonly string[];
  /** Tailwind gradient stops used for the card artwork. */
  accent: string;
  featured?: boolean;
  links?: { live?: string; source?: string };
  /** Real screenshots of the running app; the first one is the cover. */
  screenshots?: readonly Screenshot[];
};

export const SCREENSHOT_WIDTH = 1600;
export const SCREENSHOT_HEIGHT = 1000;

export function screenshotSize(shot: Screenshot) {
  return { width: shot.width ?? SCREENSHOT_WIDTH, height: shot.height ?? SCREENSHOT_HEIGHT };
}

export function screenshotSrc(slug: string, shot: Screenshot): string {
  return `/projects/${slug}/${shot.file}.webp`;
}

export const projects: readonly Project[] = [
  {
    slug: "segue-hrms",
    title: "Segue HRMS",
    monogram: "H",
    tagline: "An enterprise human capital management platform, from hire to payroll.",
    description:
      "An enterprise HR platform whose feature scope and UX are modelled on the HCM leaders — Workday, SAP SuccessFactors, Oracle HCM and Darwinbox. A NestJS API and a Next.js App Router web app cover core HR, approvals, attendance, leave, expenses, payroll, recruiting, performance reviews and IT assets, with a public careers site and full OpenAPI docs.",
    category: "Full-stack",
    year: "2026",
    company: "SegueIT",
    stack: ["Next.js", "NestJS", "TypeScript", "TypeORM", "TanStack Query", "Zod", "Swagger"],
    highlights: [
      "Workday-style approval engine: configurable multi-step chains with conditions (e.g. expense > 2,000 → skip-level)",
      "End-to-end flows — recruiting kanban → offer → hire → onboarding, and monthly payroll runs → process → mark paid",
      "Eight role personas from CEO to IT admin, with privacy-aware profiles and an interactive org chart",
      "Public careers site and Swagger / OpenAPI docs for every endpoint",
    ],
    accent: "from-wine via-rose to-camel",
    screenshots: [
      { file: "dashboard", caption: "Home dashboard with leave balances and workforce KPIs" },
      { file: "analytics", caption: "People analytics: headcount, hires vs exits, workforce mix" },
      { file: "recruitment", caption: "Recruitment: hiring funnel and requisition pipeline" },
      { file: "inbox", caption: "Approvals inbox with a multi-step expense chain" },
      { file: "payroll", caption: "Monthly payroll runs and cost trend" },
      { file: "employees", caption: "Employee directory with filters and export" },
      { file: "performance", caption: "Goals and review cycles" },
      { file: "careers", caption: "Public careers site" },
      { file: "signin", caption: "Sign-in with role-based demo personas" },
    ],
    featured: true,
  },
  {
    slug: "segue-pharmacy",
    title: "Segue Pharmacy System",
    monogram: "Rx",
    tagline: "One connected platform for Australian community pharmacy, sold as four modules.",
    description:
      "A pharmacy management system for Australian community pharmacies, sold as four licensable modules: Dispense for pharmacists, POS for the counter, Office for store managers and HQ for head office. Built as a TypeScript monorepo with a Fastify and Prisma API and a Next.js web app — and licensing is enforced by the API on every request, not just hidden in the UI.",
    category: "Full-stack",
    year: "2026",
    company: "SegueIT",
    stack: ["Next.js", "Fastify", "Prisma", "TypeScript", "Zod", "Monorepo"],
    highlights: [
      "Dispense: eRx tokens, allergy / interaction / duplicate-therapy checks, PBS pricing and barcode final check",
      "POS: touch register, script pickup from Dispense, split tenders, returns, laybys and end-of-day balancing",
      "Office and HQ: real-time inventory ledger, purchase orders, multi-store pricing with publish → retry → rollback",
      "Per-module subscriptions enforced server-side: permissions = role permissions ∩ licensed modules",
    ],
    accent: "from-camel via-rose to-wine",
    screenshots: [
      { file: "hq", caption: "HQ group performance across five stores" },
      { file: "home", caption: "Licensed workspaces: Dispense, POS, Office and HQ" },
      { file: "dispense", caption: "Dispensary dashboard and script queue" },
      { file: "pos", caption: "Touch-first POS register" },
      { file: "inventory", caption: "Reorder suggestions by supplier" },
      { file: "pricing", caption: "HQ retail pricing with margin checks" },
      { file: "reports", caption: "Store reports: revenue and profitability" },
      { file: "signin", caption: "Sign-in" },
    ],
    featured: true,
  },
  {
    slug: "segue-marketing-studio",
    title: "Segue Marketing Studio",
    monogram: "M",
    tagline: "A free, open-source generative-AI creative studio for the marketing team.",
    description:
      "A generative-AI marketing and creative studio built for the SegueIT marketing team, running entirely on free, open models. It generates commercial product photoshoots, AI video ads with director-style camera controls, voiceovers and marketing copy — with a Next.js front end and a Python FastAPI backend.",
    category: "AI",
    year: "2026",
    company: "SegueIT",
    stack: ["Next.js", "FastAPI", "Python", "Hugging Face", "FLUX.1", "LTX-Video"],
    highlights: [
      "Product photoshoot studio with 10 commercial modes and reference-image upload, powered by FLUX.1",
      "Video studio with director camera controls (pan, orbit 360°, crane, FPV drone) and focal lengths",
      "Stitch clips into one cut, then narrate it with 47 free neural English voices",
      "Developer REST API and a pre-configured MCP server for AI-agent pairing",
    ],
    accent: "from-rose via-wine to-camel",
    screenshots: [
      { file: "explore", caption: "Studio home: every tool for a campaign in one place" },
      { file: "assets", caption: "Generation history: product shots, characters and videos" },
      { file: "photoshoot", caption: "Product photoshoot studio with 10 commercial modes" },
      { file: "video-studio", caption: "Video studio with director camera controls" },
      { file: "cinema", caption: "Cinema studio: virtual camera bodies and lenses" },
      { file: "image-studio", caption: "Image studio presets" },
      { file: "voiceover", caption: "Voiceover studio" },
      { file: "stitch", caption: "Stitch clips into one cut" },
      { file: "mcp", caption: "MCP server for AI-agent pairing" },
    ],
  },
  {
    slug: "segue-quiz",
    title: "SegueQuiz",
    monogram: "Q",
    tagline: "Create a quiz, share it as a QR code, run it against the clock.",
    description:
      "A live quiz app: build a quiz, open it, share a QR code or six-character join code, and watch a self-refreshing leaderboard where the highest score wins and ties go to the faster finisher. It runs on Node's standard library alone — no runtime dependencies, no build step and no database server.",
    category: "Full-stack",
    year: "2026",
    company: "SegueIT",
    stack: ["Node.js", "JavaScript", "Docker"],
    highlights: [
      "Server-side timer: answers autosave and a refresh resumes the same attempt and deadline",
      "Multiple-choice and typed answers, marked forgivingly (case, spacing, curly quotes, dashes)",
      "QR-code joining over the LAN, plus organiser accounts with two-factor and recovery codes",
      "Zero runtime dependencies — Node standard library only",
    ],
    accent: "from-ink-3 via-rose to-camel",
    screenshots: [
      { file: "results", caption: "Live leaderboard: score first, then time" },
      { file: "editor", caption: "Quiz editor with QR-code sharing" },
      { file: "join", caption: "Participant join screen" },
      { file: "dashboard", caption: "Organiser dashboard" },
      { file: "landing", caption: "Landing page" },
    ],
  },
  {
    slug: "transcriber",
    title: "Transcriber",
    monogram: "T",
    tagline: "Meeting recordings in, searchable minutes with decisions and action items out.",
    description:
      "Meeting transcription and documentation for SegueIT. Record in the browser or upload a file and get back a speaker-labelled, searchable transcript with an executive summary, the decisions reached and action items with owners — downloadable as a Word document. It runs fully local and offline by default: no API keys, no per-meeting cost, and no meeting content leaves the network, with a Google Gemini backend as a per-meeting switch for non-sensitive recordings.",
    category: "AI",
    year: "2026",
    company: "SegueIT",
    stack: ["Python", "FastAPI", "faster-whisper", "pyannote", "Ollama", "Gemini", "React"],
    highlights: [
      "Local transcription and speaker diarization with faster-whisper and pyannote",
      "Local summaries, decisions and action items via Ollama — with an optional Gemini backend",
      "Voice ID that recognises enrolled employees, plus speaker renaming and full-text archive search",
      "Editable transcripts that keep the model's original wording, and on-demand Word export with Hindi (Devanagari) support",
    ],
    accent: "from-camel via-wine to-rose",
    screenshots: [
      {
        file: "meetings",
        caption: "Recent meetings, transcribed and searchable",
        width: 1600,
        height: 700,
      },
      {
        file: "recording",
        caption: "In-browser recording with live translation to English",
        width: 1600,
        height: 692,
      },
      {
        file: "uploads",
        caption: "Upload recordings for transcription",
        width: 1600,
        height: 689,
      },
    ],
  },
  {
    slug: "qlik-to-fabric",
    title: "Qlik → Fabric Migration",
    monogram: "QF",
    tagline: "An autonomous engine that turns Qlik apps into Microsoft Fabric Power BI projects.",
    description:
      "A universal migration engine that converts arbitrary Qlik Sense and QlikView applications (.qvf) into enterprise-ready Microsoft Fabric Power BI projects (.pbip) and templates (.pbit) with no human intervention. Four AutoGen agents assess, parse, map and generate each report; schemas, DAX measures and dashboards are discovered dynamically, so nothing is hard-coded and it works across finance, HR, retail, supply-chain or helpdesk apps.",
    category: "Data",
    year: "2026",
    company: "SegueIT",
    stack: ["JavaScript", "Python", "Microsoft Fabric", "Power BI", "DAX", "AutoGen"],
    highlights: [
      "Four-phase multi-agent pipeline: assessment, parsing & DAX translation, visual mapping, artifact generation",
      "Zero hard-coding: 100% dynamic schema, metadata and DAX measure discovery",
      "Generates Fabric PBIR 4.0 projects for native Git integration, plus an audit report",
      "Multi-QVF batch upload, a DAX review queue and a full migration history",
    ],
    accent: "from-wine via-camel to-ink-3",
    screenshots: [
      { file: "migrating", caption: "A batch migration running through the AutoGen agents" },
      { file: "assessment", caption: "Assessment scorecard: fields, sheets, charts and PII risk" },
      { file: "dax", caption: "DAX review queue with LLM confidence scores" },
      { file: "artifacts", caption: "Generated Power BI artifacts and audit report" },
      { file: "history", caption: "Autonomous migration job history" },
      { file: "run", caption: "Upload QVFs or migrate live from Qlik Cloud" },
    ],
  },
  {
    slug: "qlik-to-power-bi",
    title: "Qlik → Power BI Migration",
    monogram: "QP",
    tagline: "Qlik apps rebuilt as native Power BI reports — model, DAX and visuals.",
    description:
      "A migration platform that reads Qlik apps and rebuilds them in Power BI in four transparent phases: extract the load script, data model, visuals and settings; build a native Power BI semantic model with AI-translated DAX and Power Query; map every Qlik chart to its closest Power BI visual; and package a ready-to-open template, a Fabric project and an audit report.",
    category: "Data",
    year: "2026",
    company: "SegueIT",
    stack: ["JavaScript", "Python", "Power BI", "DAX", "Power Query", "LLMs"],
    highlights: [
      "AI translation of Qlik expressions — set analysis, Aggr() and variables — into DAX",
      "Native semantic model (model.bim) with Power Query loads and preserved relationships",
      "Chart-by-chart visual mapping onto Power BI equivalents",
      "A no-guessing rule: anything that cannot be translated is flagged for review, never invented",
    ],
    accent: "from-camel via-wine to-rose",
    screenshots: [
      { file: "overview", caption: "Migration engine overview" },
      { file: "phases", caption: "The four phases: extract, model, report, package" },
      { file: "connect", caption: "Connect to Qlik Cloud" },
    ],
  },
  {
    slug: "tableau-to-fabric",
    title: "Tableau → Fabric Migration",
    tagline: "A full-stack platform for moving Tableau workloads onto Microsoft Fabric.",
    description:
      "Architected and deployed at AOSC Technologies: a full-stack migration platform that helps teams move from Tableau to Microsoft Fabric. The interface is split into modular React and Tailwind CSS components, backed by scalable Node.js services. The engine has since grown into a combined Qlik / Tableau → Fabric platform, with a toggle between the two sources.",
    category: "Full-stack",
    year: "2025",
    company: "AOSC Technologies",
    stack: ["React", "Tailwind CSS", "Node.js", "Microsoft Fabric", "Tableau"],
    highlights: [
      "Modular Mapping, Data Layer and Run History components",
      "Scalable Node.js services behind the UI",
      "Architected and deployed end-to-end",
    ],
    accent: "from-wine via-rose to-camel",
    screenshots: [
      {
        file: "connect",
        caption: "Connect Tableau Server / Cloud and a Microsoft Fabric workspace",
      },
      { file: "agents", caption: "Migration engine phases" },
      { file: "overview", caption: "Engine overview" },
      { file: "phases", caption: "Extract, model, report and package" },
    ],
  },
  {
    slug: "insight-executive",
    title: "Insight Executive",
    monogram: "I",
    tagline: "Skip the busywork, keep the judgement: data in, a defensible dashboard out.",
    description:
      "An analytics platform that cleans a file, drafts the dashboard and writes the first read of it — then leaves the analyst in charge of what matters. Parsing, cleaning, SQL and statistics all run in the browser, so rows never leave the device; every number on screen traces back to a query you can read, and a language model only ever rephrases findings that were already computed.",
    category: "Data",
    stack: ["Next.js", "JavaScript", "In-browser SQL", "Web Workers", "Supabase", "Gemini"],
    highlights: [
      "Automated cleaning with PII redaction, type coercion and outlier flagging, plus a full cleaning report",
      "A data-agnostic planner that picks only the charts the data can support, scored against the real rows",
      "Key findings, filters, Ask-a-question and a slideshow, each traceable to the SQL behind the claim",
      "CSV, Excel, JSON, Parquet and SQLite read in the browser, plus live sources and a Power BI export",
    ],
    accent: "from-camel via-rose to-wine",
    featured: true,
    screenshots: [
      { file: "dashboard", caption: "Dashboard with key findings, filters and KPIs" },
      { file: "charts", caption: "Trends by channel and over time" },
      { file: "charts-2", caption: "Audience split and spend by country" },
      { file: "summary", caption: "Executive summary" },
      { file: "cleaning", caption: "Cleaning report" },
      { file: "table", caption: "Data table with column profiles" },
      { file: "ask", caption: "Ask a question in plain English" },
      { file: "get-data", caption: "Get data: files, links, databases or a sample" },
      { file: "landing", caption: "Landing page" },
    ],
  },
  {
    slug: "enterprise-web-scraper",
    title: "Enterprise Web Scraper",
    tagline: "A full-stack data acquisition pipeline built for high throughput.",
    description:
      "A full-stack data acquisition system with a Next.js front end and a Node.js and Python backend. It automates deploying scraped datasets into structured, production-ready environments — including geospatial database integration — on a backend designed around proxy management for reliable, high-throughput extraction.",
    category: "Data",
    stack: ["Node.js", "Next.js", "Python", "PostgreSQL"],
    highlights: [
      "Automated delivery of scraped data into production-ready stores",
      "Geospatial database integration",
      "Proxy management for reliable, high-throughput extraction",
    ],
    accent: "from-rose via-wine to-ink-3",
  },
  {
    slug: "multi-agent-trading",
    title: "Multi-Agent Trading Framework",
    tagline: "Real-time market data, scenario simulation and backtesting.",
    description:
      "A Node.js backend that integrates real-time market data feeds from yahoo-finance2 and EODHD to power a full-stack financial analysis tool, with a scenario simulation and backtesting engine — validated through paper trading — to evaluate predictive accuracy and manage risk over time.",
    category: "AI",
    stack: ["Node.js", "Puppeteer", "Cheerio", "yahoo-finance2", "EODHD"],
    highlights: [
      "Real-time market data integration",
      "Scenario simulation and backtesting engine",
      "Validated through paper trading",
    ],
    accent: "from-wine via-camel to-rose",
  },
  {
    slug: "pharmacy-store",
    title: "Pharmacy E-Commerce Store",
    tagline: "An online pharmacy storefront, built end-to-end.",
    description:
      "A complete online e-commerce storefront on Shopify, from product catalog setup to storefront configuration and store data management, with Node.js-based connector workflows.",
    category: "Full-stack",
    stack: ["Shopify", "Node.js"],
    highlights: [
      "Product catalog setup and storefront configuration",
      "Node.js connector workflows for store data",
    ],
    accent: "from-ink-3 via-wine to-camel",
  },
];

export const projectCategories: readonly ProjectCategory[] = ["Full-stack", "Data", "AI"];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): readonly Project[] {
  return projects.filter((project) => project.featured);
}

/** The project after `slug`, wrapping around — used for "next project" navigation. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
