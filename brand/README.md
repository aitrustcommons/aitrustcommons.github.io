# AI Trust Commons logo

Made Nov 13, 2026. Three linked rings around an amber dot. Each ring is a system an AI agent works in. The dot is the person's intent, held intact where the systems meet.

## Colors

The four HIP Charter pattern colors:

| Part | Color | HIP pattern |
|---|---|---|
| Top ring | #185FA5 blue | Tooling |
| Bottom-left ring | #0F6E56 green | Foundation |
| Bottom-right ring | #534AB7 purple | Integration |
| Center dot | #854F0B amber | Pipeline |

The gaps between rings and around the dot are cut-outs, not white paint. The mark works on light and dark backgrounds.

## Files

- `aitc-mark.svg` here is the master. Everything else is made from it.
- `make_logo.py` draws the master and every size from a few numbers (ring spacing, radius, thickness, dot size). Run it with Python, Pillow and `rsvg-convert` (Homebrew librsvg): `python make_logo.py <output folder>`.
- The site serves its copies from `docs/assets/brand/`:
  - `favicon-16.png`, `favicon-32.png`, `favicon-48.png`: browser-tab icons. `favicon-180.png`: the iPhone home-screen icon.
  - `aitc-avatar-white-400.png` (LinkedIn) and `aitc-avatar-white-500.png` (GitHub): the mark on white with room for round crops.
  - `aitc-card-2026-11.png`: the link-preview card since the Nov 2026 rebuild, made by `make_card.py` (served from `public/assets/brand/`).
  - `aitc-social-card-1200x630.png`: the old card's address. Since the rebuild it holds the same image as the new card, so links shared before never show the old wording.
  - `aitc-header-logo.svg`: the logo in the site's blue header bar. The mark sits on a white circle so the blue ring stands out.

## How it was made

Nikhil picked the design from rough sketches. `make_logo.py` redraws it as a vector, with the spacing and dot size tuned so it reads at 16 pixels.
