# MKDOCS_SETUP.md — Migration from Static HTML to MkDocs Material

## Current State

The site is a single `index.html` file (15KB, handcrafted HTML/CSS) with:
- Dark navy aesthetic (#0a1628 background, #3b82f6 blue accent)
- DM Sans + DM Serif Display fonts
- Stats section, capabilities grid, standards engagement, founder bio
- CNAME file pointing to aitrustcommons.org
- Deployed via GitHub Pages from main branch

## Target State

MkDocs Material site with:
- Light/dark toggle
- Blog with series support
- Multi-page navigation
- Search
- Mobile responsive
- Same professional aesthetic adapted to Material theme
- GitHub Actions auto-deploy

## Step-by-Step Migration

### 1. Install Dependencies

```bash
pip install mkdocs-material
```

### 2. Create mkdocs.yml

```yaml
site_name: AI Trust Commons
site_url: https://aitrustcommons.org
site_description: Open-source governance for AI agents that works across providers
site_author: Nikhil Singhal

repo_url: https://github.com/aitrustcommons/governance-framework
repo_name: aitrustcommons/governance-framework

theme:
  name: material
  custom_dir: overrides
  palette:
    - scheme: slate
      primary: blue
      accent: blue
      toggle:
        icon: material/brightness-7
        name: Switch to light mode
    - scheme: default
      primary: blue
      accent: blue
      toggle:
        icon: material/brightness-4
        name: Switch to dark mode
  font:
    text: DM Sans
    code: JetBrains Mono
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.top
    - search.suggest
    - search.highlight
    - content.tabs.link
    - toc.integrate
  icon:
    repo: fontawesome/brands/github

plugins:
  - search
  - blog:
      blog_dir: blog
      post_date_format: long
      categories_allowed:
        - From Instinct to Intent Series
        - AI Governance
        - Standards

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
  - admonition
  - pymdownx.details
  - attr_list
  - md_in_html
  - toc:
      permalink: true

extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/aitrustcommons
    - icon: fontawesome/brands/linkedin
      link: https://linkedin.com/in/nikhilsinghal
    - icon: fontawesome/solid/envelope
      link: mailto:nikhil@aitrustcommons.org

copyright: "&copy; 2026 AI Trust Commons. Apache 2.0 License."

nav:
  - Home: index.md
  - Framework: framework.md
  - Standards: standards.md
  - About: about.md
  - Blog:
    - blog/index.md
```

### 3. Create Directory Structure

```bash
mkdir -p docs/blog/posts
mkdir -p overrides
```

### 4. Migrate Content from index.html

Convert each section of the current index.html into markdown pages:

**docs/index.md** — Landing/home page
- Hero section: tagline, description, CTA buttons
- Stats: 80%, 14.4%, 88%
- "What we're building" section (4 capabilities)
- Use Material's grid/card features or admonitions for layout

**docs/framework.md** — Detailed framework description
- Standards Mapping, Policy-as-Code, Cross-Provider Audit Trails, OWASP Validation

**docs/standards.md** — Standards engagement
- NIST, OWASP, EU AI Act sections with current status

**docs/about.md** — Founder bio
- Nikhil Singhal bio, links, contact

### 5. Create First Blog Post

**docs/blog/posts/2026-03-09-discovering-intent.md**

```markdown
---
date: 2026-03-09
categories:
  - From Instinct to Intent Series
authors:
  - nikhil
---

# Discovering Intent: The Journey That Starts Before You're Ready

*FROM INSTINCT TO INTENT™ SERIES*

[Full manifesto content goes here - copy from the private repo's
ideas/from-instinct-to-intent-manifesto-v4.md, but remove the
title/byline/references sections as MkDocs handles metadata]
```

### 6. Set Up GitHub Actions

**.github/workflows/ci.yml**

```yaml
name: ci
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-
      - run: pip install mkdocs-material
      - run: mkdocs gh-deploy --force
```

### 7. Update GitHub Pages Settings

After first deploy:
1. Go to repo Settings > Pages
2. Set source branch to `gh-pages`
3. Verify CNAME is preserved (should be automatic)

### 8. Verify

- https://aitrustcommons.org loads the new MkDocs site
- Light/dark toggle works
- Blog post is accessible at /blog/2026/03/09/discovering-intent/
- All navigation links work
- Mobile responsive

## Important Notes

- **CNAME file**: Must exist in `docs/` directory so MkDocs includes it in the build. Copy from root to `docs/CNAME`.
- **Old index.html**: Can be archived or deleted once migration is verified.
- **Blog post format**: The series branding "FROM INSTINCT TO INTENT™ SERIES" should appear as a category tag and/or as a subtitle within the post, not just in metadata.
- **Trademark**: First mention of "From Instinct to Intent" on each page should include ™ symbol.

## Useful References

- MkDocs Material docs: https://squidfunk.github.io/mkdocs-material/
- Blog plugin: https://squidfunk.github.io/mkdocs-material/plugins/blog/
- Color palette toggle: https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/#color-palette-toggle
