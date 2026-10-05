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

## Deploying to Vercel

The repo deploys as **one Vercel project with two services**, defined in `vercel.json`:

| Service | Root   | Framework | Public?                                   |
| ------- | ------ | --------- | ----------------------------------------- |
| `web`   | `web/` | Next.js   | Yes — serves every path (`/(.*)`)         |
| `api`   | `api/` | FastAPI   | No — internal, reachable only from `web` |

`web` has a service binding to `api`, so Vercel injects the API's internal URL as
`CONTACT_API_URL` at runtime. Don't set that variable yourself on Vercel.

When importing the repo on Vercel, leave **Root Directory** as the repository root.

### Storing messages: Neon Postgres

Vercel's `/tmp` storage doesn't survive between instances, so on Vercel contact
messages are stored in **Neon Postgres**. When `DATABASE_URL` (or `POSTGRES_URL`) is
set, the API uses Postgres and creates its `contact_messages` table on first use;
without it, it falls back to local SQLite.

1. In the Vercel project, open **Storage → Create Database → Neon** (free plan) and
   connect it to the project for all environments. Vercel adds `DATABASE_URL` for you.
2. Redeploy so the new variable is picked up.
3. Read messages in the Neon console's SQL editor:

```sql
SELECT received_at, name, email, subject, message
FROM contact_messages
ORDER BY received_at DESC;
```

Optional email forwarding: set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`,
`SMTP_PASSWORD` (for Gmail, an App Password), `SMTP_FROM` and `CONTACT_INBOX`.

Optional: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` once you add a custom domain
(otherwise Vercel's production URL is used automatically).

Run both services together locally, with bindings injected, using `vercel dev`.
