# Satwik Narang — Portfolio

A multi-page portfolio built with a **Next.js 16 App Router** frontend and a **Python FastAPI** backend that powers the contact form.

```
Portfolio/
├── web/                     Next.js (TypeScript, Tailwind v4, Motion)
│   ├── public/images/       ← put profile.jpg here
│   └── src/
│       ├── app/             Routes only — thin pages that compose features
│       │   ├── about/  education/  projects/[slug]/  hobbies/  contact/
│       │   ├── layout.tsx  template.tsx  not-found.tsx  error.tsx
│       │   └── sitemap.ts  robots.ts
│       ├── features/        One folder per feature: data + components + index.ts
│       │   ├── home/  about/  education/  projects/  hobbies/
│       │   └── contact/     schema.ts (zod) · actions.ts (server action) · components/
│       └── shared/          Cross-feature UI, layout chrome, config and utils
│           └── config/site.ts   ← your name, tagline, socials, nav
└── api/                     FastAPI service
    ├── app/
    │   ├── core/            Settings, rate limiter
    │   └── features/
    │       ├── contact/     router · schemas · service · repository (SQLite) · notifier (SMTP)
    │       └── health/
    └── tests/
```

## Making it yours

| What                     | Where                                       |
| ------------------------ | ------------------------------------------- |
| Profile photo            | `web/public/images/profile.jpg`             |
| Name, tagline, socials   | `web/src/shared/config/site.ts`             |
| Bio, skills, principles  | `web/src/features/about/data.ts`            |
| Education, certificates  | `web/src/features/education/data.ts`        |
| Projects                 | `web/src/features/projects/data.ts`         |
| Hobbies, "right now"     | `web/src/features/hobbies/data.ts`          |

Until `profile.jpg` exists, the site shows a monogram in its place.

## Running locally

**API** (Python 3.12+):

```bash
cd api
python -m venv .venv
.venv\Scripts\activate        # macOS/Linux: source .venv/bin/activate
pip install -r requirements-dev.txt
copy .env.example .env        # macOS/Linux: cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

**Web** (Node 20+):

```bash
cd web
npm install
copy .env.example .env.local  # macOS/Linux: cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. API docs live at http://localhost:8000/docs.

## How the contact form works

1. The browser posts the form to a Next.js **server action** (`features/contact/actions.ts`).
2. The action validates with zod and forwards the message to `POST /api/contact` on the FastAPI server. The API URL never reaches the browser.
3. FastAPI validates again with Pydantic, rate-limits by IP, drops honeypot spam, stores the message in SQLite (`api/data/messages.db`) and, if SMTP is set up in `api/.env`, emails it to you in the background.

To get messages in your inbox, fill in the `SMTP_*` and `CONTACT_INBOX` values in `api/.env` (for Gmail, use an App Password).

## Quality checks

```bash
cd web && npm run typecheck && npm run lint && npm run format:check && npm run build
cd api && pytest && ruff check .
```
