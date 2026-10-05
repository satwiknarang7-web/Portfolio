/**
 * Every skill, grouped into broad categories. `core` marks the daily drivers;
 * everything else is a skill used in real work, just less often. Built from the
 * CV, the stacks of the projects on this site and current market demand —
 * prune anything that no longer fits.
 */
export type SkillIcon =
  | "code"
  | "layout"
  | "server"
  | "database"
  | "chart"
  | "brain"
  | "cloud"
  | "shield"
  | "flask"
  | "palette"
  | "briefcase"
  | "sigma";

export type Skill = { name: string; core?: boolean };

export type SkillCategory = {
  title: string;
  blurb: string;
  icon: SkillIcon;
  skills: readonly Skill[];
};

const core = (name: string): Skill => ({ name, core: true });
const skill = (name: string): Skill => ({ name });

export const skillCategories: readonly SkillCategory[] = [
  {
    title: "Languages",
    blurb: "What the products are actually written in.",
    icon: "code",
    skills: [
      core("TypeScript"),
      core("JavaScript"),
      core("Python"),
      core("SQL"),
      skill("DAX"),
      skill("Power Query (M)"),
      skill("HTML & CSS"),
      skill("Bash"),
    ],
  },
  {
    title: "Frontend & UI",
    blurb: "Interfaces that are fast, accessible and a little delightful.",
    icon: "layout",
    skills: [
      core("React"),
      core("Next.js (App Router)"),
      core("Tailwind CSS"),
      skill("Vite"),
      skill("TanStack Query"),
      skill("React Hook Form"),
      skill("Zod"),
      skill("Radix UI"),
      skill("Motion / Framer Motion"),
      skill("Recharts"),
      skill("Responsive design"),
      skill("Accessibility (WCAG)"),
      skill("State management"),
      skill("Component architecture"),
    ],
  },
  {
    title: "Backend & APIs",
    blurb: "Services, auth and the plumbing that keeps it all honest.",
    icon: "server",
    skills: [
      core("Node.js"),
      core("REST API design"),
      core("FastAPI"),
      skill("Express"),
      skill("NestJS"),
      skill("Fastify"),
      skill("OpenAPI / Swagger"),
      skill("JWT & session auth"),
      skill("Two-factor (TOTP)"),
      skill("Role-based access control"),
      skill("Multi-tenancy"),
      skill("Webhooks"),
      skill("Server-Sent Events"),
      skill("Background jobs & queues"),
      skill("Web scraping (Puppeteer, Cheerio)"),
    ],
  },
  {
    title: "Databases & data engineering",
    blurb: "Modelling, moving and cleaning data at scale.",
    icon: "database",
    skills: [
      core("PostgreSQL"),
      core("ETL pipelines"),
      skill("SQLite"),
      skill("Supabase"),
      skill("Prisma"),
      skill("TypeORM"),
      skill("SQLAlchemy"),
      skill("Data modelling"),
      skill("Data cleansing"),
      skill("PII redaction"),
      skill("Geospatial data"),
      skill("Query optimisation"),
    ],
  },
  {
    title: "BI & analytics",
    blurb: "Turning raw data into decisions people trust.",
    icon: "chart",
    skills: [
      core("Power BI"),
      core("Microsoft Fabric"),
      core("DAX"),
      skill("Power Apps"),
      skill("Power Query"),
      skill("Tableau"),
      skill("Qlik Sense"),
      skill("BI migrations"),
      skill("Semantic models"),
      skill("KPI & dashboard design"),
      skill("Data storytelling"),
      skill("Microsoft Excel"),
    ],
  },
  {
    title: "AI & machine learning",
    blurb: "Building with models, not just talking about them.",
    icon: "brain",
    skills: [
      core("LLM application development"),
      core("Prompt engineering"),
      core("Agentic workflows"),
      skill("Multi-agent systems (AutoGen)"),
      skill("Model Context Protocol (MCP)"),
      skill("RAG"),
      skill("Function / tool calling"),
      skill("Speech-to-text (Whisper)"),
      skill("Speaker diarization"),
      skill("Text-to-speech"),
      skill("Image & video generation"),
      skill("Local LLMs (Ollama)"),
      skill("Hugging Face"),
      skill("LLM evaluation"),
    ],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Shipping it, and keeping it shipped.",
    icon: "cloud",
    skills: [
      core("Git & GitHub"),
      skill("Docker"),
      skill("Vercel"),
      skill("Render"),
      skill("Supabase"),
      skill("Microsoft Azure (Entra ID)"),
      skill("GitHub Actions (CI/CD)"),
      skill("Environment & secrets management"),
      skill("Monorepos (npm workspaces)"),
      skill("Linux & the command line"),
    ],
  },
  {
    title: "Security & quality",
    blurb: "Software that is safe to hand to real users.",
    icon: "shield",
    skills: [
      skill("OWASP basics"),
      skill("Input validation"),
      skill("Rate limiting"),
      skill("Secure headers (Helmet)"),
      skill("Password hashing"),
      skill("Code review"),
      skill("Vitest"),
      skill("Pytest"),
      skill("ESLint & Prettier"),
    ],
  },
  {
    title: "Product & business",
    blurb: "Standing on the bridge between engineering and the boardroom.",
    icon: "briefcase",
    skills: [
      core("Stakeholder reporting"),
      core("Requirements gathering"),
      skill("Product thinking"),
      skill("Data-driven decision making"),
      skill("Business intelligence strategy"),
      skill("Client communication"),
      skill("Agile & Scrum"),
      skill("Project planning"),
      skill("Technical documentation"),
      skill("Presentations & demos"),
    ],
  },
  {
    title: "Design & creative",
    blurb: "The half that makes the work land.",
    icon: "palette",
    skills: [
      core("Graphic design"),
      core("Canva"),
      skill("AI image generation"),
      skill("AI video generation"),
      skill("UI / UX design"),
      skill("Figma"),
      skill("Brand & marketing visuals"),
      skill("Presentation design"),
    ],
  },
  {
    title: "Foundations",
    blurb: "The first principles everything else sits on.",
    icon: "sigma",
    skills: [
      core("Mathematics"),
      core("Physics"),
      skill("Statistics"),
      skill("Data structures & algorithms"),
      skill("Object-oriented design"),
      skill("System design"),
      skill("Database systems"),
      skill("Operating systems"),
      skill("Computer networks"),
    ],
  },
  {
    title: "Ways of working",
    blurb: "How the work actually gets done.",
    icon: "flask",
    skills: [
      core("First-principles problem solving"),
      core("Ownership"),
      skill("Team leadership"),
      skill("Strategic thinking"),
      skill("Working under pressure"),
      skill("Fast learning"),
      skill("Cross-functional collaboration"),
    ],
  },
];

/** The AI toolkit: tools used day to day, grouped by job. */
export type AiTool = { name: string; maker: string; use: string; core?: boolean };
export type AiToolGroup = { title: string; tools: readonly AiTool[] };

export const aiToolkit: readonly AiToolGroup[] = [
  {
    title: "Coding agents",
    tools: [
      {
        name: "Claude Code",
        maker: "Anthropic",
        use: "My main pair-programmer for building, refactoring and reviewing whole features.",
        core: true,
      },
      {
        name: "Codex",
        maker: "OpenAI",
        use: "Parallel agent tasks and second opinions on tricky changes.",
        core: true,
      },
      {
        name: "Antigravity",
        maker: "Google",
        use: "Agent-first IDE for planning and running multi-step builds.",
        core: true,
      },
      { name: "Cursor", maker: "Anysphere", use: "AI-native editor for fast in-file iteration." },
      { name: "GitHub Copilot", maker: "GitHub", use: "Inline completions while typing." },
    ],
  },
  {
    title: "Creative AI",
    tools: [
      {
        name: "Higgsfield",
        maker: "Higgsfield AI",
        use: "Cinematic AI video and image generation for campaigns and content.",
        core: true,
      },
      {
        name: "Google Flow",
        maker: "Google",
        use: "AI filmmaking with Veo: scenes, shots and story from prompts.",
        core: true,
      },
      { name: "Canva AI", maker: "Canva", use: "Fast on-brand graphics, posts and decks." },
      { name: "Midjourney", maker: "Midjourney", use: "Concept art and visual exploration." },
      { name: "ElevenLabs", maker: "ElevenLabs", use: "Natural voiceovers for videos and demos." },
    ],
  },
  {
    title: "Automation & agents",
    tools: [
      {
        name: "n8n",
        maker: "n8n",
        use: "Workflow automation wiring apps, APIs and LLMs together.",
        core: true,
      },
      { name: "MCP servers", maker: "Open standard", use: "Giving AI agents tools and data." },
      { name: "AutoGen", maker: "Microsoft", use: "Orchestrating multi-agent pipelines." },
      { name: "Zapier", maker: "Zapier", use: "Quick no-code glue between SaaS tools." },
    ],
  },
  {
    title: "Models & APIs",
    tools: [
      {
        name: "Claude API",
        maker: "Anthropic",
        use: "Reasoning-heavy product features.",
        core: true,
      },
      { name: "OpenAI API", maker: "OpenAI", use: "GPT models in apps and pipelines." },
      { name: "Gemini API", maker: "Google", use: "Fast multimodal and long-context work." },
      {
        name: "Hugging Face",
        maker: "Hugging Face",
        use: "Open models for image, video and speech.",
      },
      { name: "Ollama", maker: "Ollama", use: "Running LLMs locally and privately." },
      { name: "Groq", maker: "Groq", use: "Ultra-low-latency inference." },
    ],
  },
  {
    title: "Research & thinking",
    tools: [
      { name: "ChatGPT", maker: "OpenAI", use: "Brainstorming and quick drafts.", core: true },
      {
        name: "Claude",
        maker: "Anthropic",
        use: "Long-form thinking, writing and analysis.",
        core: true,
      },
      { name: "Gemini", maker: "Google", use: "Research grounded in Google's ecosystem." },
      { name: "Perplexity", maker: "Perplexity", use: "Cited answers and fast research." },
      { name: "NotebookLM", maker: "Google", use: "Learning from my own documents and sources." },
    ],
  },
];
