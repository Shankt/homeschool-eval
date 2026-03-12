# Homeschool Evaluation Tracker

A Cloudflare Workers app with D1 database for tracking student evaluations across all subjects.

## Stack

- **Cloudflare Workers** — serverless backend + frontend serving
- **Cloudflare D1** — SQLite-based database
- **GitHub Actions** — auto-deploy on push to `main`
- No framework, no build step — plain JS

## Database

- **Name:** `homeschool-eval-db`
- **ID:** `81894612-1003-4c82-bf9e-16a1328c93f5`

Already created and seeded in your Cloudflare account.

## Local Development

```bash
npm install
npm run dev
```

## Deploy

Push to `main` — GitHub Actions handles the rest automatically.

## GitHub Secrets Required

Add in repo Settings → Secrets → Actions:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | API token from dash.cloudflare.com |
| `CLOUDFLARE_ACCOUNT_ID` | `38ec8cfabde029037085911fd49cf05e` |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/students` | List all students |
| POST | `/api/students` | Create student |
| GET | `/api/subjects` | List all subjects |
| GET | `/api/evaluations` | List evaluations |
| POST | `/api/evaluations` | Create evaluation |
| GET | `/api/dashboard?student_id=X` | Dashboard stats |
