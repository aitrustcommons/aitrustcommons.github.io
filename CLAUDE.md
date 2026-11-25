# AI Trust Commons website

The public site at aitrustcommons.org. Rebuilt in Nov 2026 under task #624. The build spec and the review behind it live in the private repo ns-2026-the-big-push, under ai-trust-commons/site-redesign/.

## Stack

- Astro 7, static output, every version pinned exactly in package.json, lockfile committed.
- Hosted on GitHub Pages. `.github/workflows/deploy.yml` (Astro's official action) builds and publishes on every push to main. A push to any other branch publishes nothing.
- No CSS library. `src/styles/global.css` holds the colors as tokens taken from the governance picture.
- Fonts (Inter, Space Grotesk) are self-hosted through Astro's Fonts API.

## Where things are

- `src/content/posts/`: the six posts, byte for byte as first published. Never edit them. Anything the design needs from them happens at build time in `src/markdown/`:
  - `remark-post-header.mjs` lifts each post's H1, series line and hero image into the page header.
  - `remark-post-links.mjs` maps links to `.md` post files onto post addresses.
  - `rehype-mermaid.mjs` keeps diagram source as text for the browser to draw.
- `src/data/picture.json`: the poster's text. It is generated, so never edit it by hand. Run `ai-trust-commons/site-redesign/make_web_assets.sh` in the private repo, which also cuts the close-ups into `src/assets/picture/` and makes the poster PNG and PDF in `public/`.
- `src/data/pieces.json`: the five pieces. The text is Nikhil's writing. The production build refuses to run while any text is empty.
- `src/data/home.json`: the overview paragraphs, the contents labels and the version line.
- `src/data/identity-graph.json`: the Person, Organization and WebSite structured data, the same @id graph as nikhilsinghal.com.
- `src/lib/posts.ts`: post addresses and dates. Dates are always read in UTC.
- `golden/`: the old site's pages, saved Nov 24, 2026. `scripts/verify.mjs` compares post titles against them.
- `brand/`: `make_logo.py` made the mark and icons. `make_card.py` makes the link-preview card.

## Rules

- Post addresses never change: /blog/YYYY/MM/DD/slug/.
- Trademark: `/blog/` keeps the title "From Instinct to Intent™", and `/blog/category/from-instinct-to-intent-series/` stays a real page. USPTO application 99690685 cites both. Never redirect or retitle them.
- No em dashes and no double hyphens in new text. Use ™ on the first "From Instinct to Intent" per page.
- No open-source claim anywhere. The writing is licensed CC BY 4.0.
- No folded or collapsed sections on the home page.
- Every fact in visible HTML text. No content written by JavaScript.

## Commands

```bash
npm ci                              # install the pinned versions
npm run build                       # build into dist/
scripts/preview-server.sh start     # serve dist/ at http://localhost:4321/ (stop with "stop")
node scripts/verify.mjs             # check the local build; add a URL to check the live site
node scripts/verify.mjs --screens   # also save 390-wide phone screenshots to .preview/screens/
```

## Going live

Nikhil gives the go. Then:
1. Merge into main.
2. Switch the repo's Pages source to "GitHub Actions" (it was the gh-pages branch).
3. Run verify against https://aitrustcommons.org.

Rollback: point the Pages source back at the gh-pages branch, which still holds the old MkDocs site.
