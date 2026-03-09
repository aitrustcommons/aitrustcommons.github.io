# WORKSTREAM_PLAN.md — aitrustcommons.org Publishing & Site Migration

## Overview

This workstream has one goal: transform aitrustcommons.org from a static landing page into a publishing platform that supports the "From Instinct to Intent™" series and institutional credibility for standards body engagement.

## Why This Matters

1. **Trademark filing** requires proof of use in commerce. The blog post on aitrustcommons.org is one of three specimens (alongside Zenodo and Medium) for the USPTO application.
2. **Standards bodies** (NIST, NCCoE, OWASP) need to see an institutional web presence, not just a GitHub repo.
3. **SEO and discoverability** require published content on the open web.
4. **The 30-day publishing plan** has 4 articles scheduled, each needing a blog home on this site.

## Timeline

### Phase 1: Site Migration (THIS SESSION)
**Goal:** MkDocs Material site live at aitrustcommons.org with light/dark toggle

Tasks:
- [ ] Scaffold MkDocs project (mkdocs.yml, docs/ structure)
- [ ] Migrate landing page content from index.html to docs/index.md
- [ ] Create docs/framework.md, docs/standards.md, docs/about.md
- [ ] Configure light/dark palette toggle
- [ ] Set up blog plugin with category support
- [ ] Copy CNAME to docs/ directory
- [ ] Set up GitHub Actions for auto-deploy
- [ ] Test locally with `mkdocs serve`
- [ ] Push and verify live at aitrustcommons.org

### Phase 2: First Blog Post (IMMEDIATELY AFTER Phase 1)
**Goal:** Manifesto live on the blog with proper series branding

Tasks:
- [ ] Create docs/blog/posts/2026-03-09-discovering-intent.md
- [ ] Content: full manifesto text (will be provided by Nikhil)
- [ ] Front matter: date, category "From Instinct to Intent Series"
- [ ] Series branding visible on the page (not just metadata)
- [ ] Verify URL: aitrustcommons.org/blog/2026/03/09/discovering-intent/
- [ ] Take screenshot for trademark specimen

### Phase 3: Supporting Pages (THIS WEEK)
**Goal:** Complete the multi-page site

Tasks:
- [ ] Framework page with technical details
- [ ] Standards page with NIST, OWASP, EU AI Act status
- [ ] About page with founder bio, links, contact
- [ ] Verify all navigation works

### Phase 4: Future Blog Posts (ONGOING per schedule)
**Goal:** Support the 30-day publishing plan

Scheduled posts:
- Week 1 (Mar 8-14): "Discovering Intent: The Journey That Starts Before You're Ready" (the manifesto)
- Week 2 (Mar 15-21): "I Built the First Intent Layer by Accident"
- Week 3 (Mar 22-28): "The Job Title That Doesn't Exist Yet"
- Week 4 (Mar 29-Apr 4): "Governance That Runs"

Each post follows the same pattern:
- Published simultaneously on Medium, Zenodo, and aitrustcommons.org
- Category: "From Instinct to Intent Series"
- Series branding in header/subtitle

## Publishing Channels (for context)

| Channel | URL | Purpose |
|---------|-----|---------|
| aitrustcommons.org | This site | Institutional credibility, trademark specimen |
| Medium | nikhilsinghal-ai-trust-commons.medium.com | SEO, discoverability |
| Zenodo | zenodo.org (DOI per article) | Citability, prior art, timestamps |
| LinkedIn | linkedin.com/in/nikhilsinghal | Network reach, engagement |

## Design Priorities

1. **Professional and institutional** — this is not a personal blog. It's an organization's website.
2. **Dark mode default** (matching current aesthetic) with light mode toggle
3. **Clean reading experience** for long-form articles (the manifesto is 5,500 words)
4. **Mobile responsive** — many readers will come from LinkedIn/X links on phones
5. **Fast** — MkDocs Material is static, so this should be trivial

## What Success Looks Like

After this workstream:
- aitrustcommons.org has a professional multi-page site with blog
- The manifesto is live and shareable at a clean URL
- A screenshot can be taken showing the series branding for USPTO
- Future articles can be added by dropping a .md file in docs/blog/posts/
- Light/dark toggle works
- The site builds and deploys automatically on push
