# The Investing Canon — website

An Astro site that renders the Canon's markdown into an Apple-like gallery.
Content is read from the repo at **build time** (`../INDEX.md` and `../investors/**`),
so pushing new investors or documents and letting Vercel rebuild is all that's
needed — no code changes.

## Develop

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # static output -> dist/
```

## Deploy (Vercel)

- Framework preset: **Astro**
- **Root Directory: `site`** (the app lives in this subfolder)
- Build command: `npm run build` · Output: `dist`
- Vercel auto-redeploys on every push to the configured branch.

## How content maps to the site

- **Home grid** — one flip card per folder in `../investors/`. Front: duotone
  portrait + name; back (on hover/tap): the one-line edge + style tags from `INDEX.md`.
- **Investor page** (`/investors/<slug>`) — tabs over the nine standard documents;
  only the documents that exist are shown, so partial investors render cleanly.
- **Portraits** — see `public/portraits/README.md`.
