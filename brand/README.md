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
  - `aitc-social-card-1200x630.png`: the default link-preview card.
  - `aitc-header-logo.svg`: the logo in the site's blue header bar. The mark sits on a white circle so the blue ring stands out.

## How it was made

ChatGPT drew the first rough versions from a short brief. Nikhil picked one. Claude redrew it as a vector and tuned the spacing and dot size so it reads at 16 pixels.
