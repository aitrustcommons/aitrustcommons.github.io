# CLAUDE.md — AI Trust Commons Website

## What This Repo Is

This is the public website for **AI Trust Commons** (aitrustcommons.org), served via GitHub Pages with a custom CNAME. It is being migrated from a single-page HTML site to **MkDocs Material** to support a blog, light/dark themes, and multi-page navigation.

## Owner

Nikhil Singhal (nikhil@aitrustcommons.org). Founder of AI Trust Commons. 25 years engineering leadership (Microsoft, T-Mobile, AT&T, Expedia). Currently building AI-powered products and publishing on AI governance.

## What We're Building

A professional, institutional website that serves three purposes:
1. **Landing page** — what AI Trust Commons is, what we're building, credibility
2. **Blog** — publishing series of articles under the "From Instinct to Intent™" brand
3. **Standards engagement** — NIST, OWASP, EU AI Act, NCCoE references

## Tech Stack

- **MkDocs Material** (mkdocs-material) with blog plugin
- **GitHub Pages** deployment via GitHub Actions
- **Custom domain**: aitrustcommons.org (CNAME already configured)
- **Fonts**: DM Sans (body), DM Serif Display (headlines) — matching current site
- **Color scheme**: Dark navy (#0a1628) primary, blue (#3b82f6) accent — with light/dark toggle

## Key Design Requirements

- Light AND dark theme toggle (Material palette switching)
- Blog with series/category support ("From Instinct to Intent™ Series")
- Clean, professional, institutional feel — not a personal blog
- Mobile responsive
- Search enabled
- Social links: GitHub, LinkedIn, Email

## Content Guidelines

- All blog posts are markdown files in `docs/blog/posts/`
- Series branding appears as category, not in the title
- The first blog post is the manifesto: "Discovering Intent: The Journey That Starts Before You're Ready"
- No em dashes in any content. Ever.
- Trademark symbol (™) on first use of "From Instinct to Intent" per page

## Repository Structure (target)

```
aitrustcommons.github.io/
├── .github/workflows/ci.yml    # GitHub Actions deploy
├── docs/
│   ├── index.md                 # Landing page
│   ├── about.md                 # About / Founder
│   ├── standards.md             # Standards engagement
│   ├── framework.md             # What we're building
│   └── blog/
│       ├── index.md             # Blog listing
│       └── posts/
│           └── 2026-03-09-discovering-intent.md
├── mkdocs.yml                   # Site configuration
├── CNAME                        # Custom domain (keep existing)
├── overrides/                   # Custom theme overrides if needed
└── CLAUDE.md                    # This file
```

## What NOT To Do

- Do not delete the CNAME file (it maps to aitrustcommons.org)
- Do not use Jekyll or any other static site generator
- Do not hardcode HTML for blog posts — use markdown
- Do not use em dashes anywhere in content
- Do not change the GitHub Pages source branch without confirming

## Useful Commands

```bash
pip install mkdocs-material
mkdocs serve          # Local preview at localhost:8000
mkdocs build          # Build static site to /site
mkdocs gh-deploy      # Deploy to gh-pages branch
```

## Related Resources

- See `CONTEXT.md` for what AI Trust Commons is and why it exists
- See `MKDOCS_SETUP.md` for detailed migration instructions
- See `WORKSTREAM_PLAN.md` for the full timeline and publishing sequence
