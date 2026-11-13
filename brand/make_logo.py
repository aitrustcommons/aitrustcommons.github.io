"""AI Trust Commons logo, final set (option e, Nov 13, 2026).
Three linked rings (blue top, green bottom-left, purple bottom-right) around an amber intent dot,
in the HIP Charter colors. The gaps are true cut-outs (SVG masks), so the mark works on any background."""
import math
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)

BLUE, GREEN, PURPLE, AMBER = '#185FA5', '#0F6E56', '#534AB7', '#854F0B'
D, R, W, DOT, HALO, GAP = 18.0, 16.0, 10.0, 8.5, 3.5, 3.5   # option e


def centers():
    c30, s30 = math.cos(math.radians(30)), math.sin(math.radians(30))
    return [(0.0, -D), (-D * c30, D * s30), (D * c30, D * s30)]


def mark_group(fill_box):
    """The mark as an SVG <g>, scaled so its larger side is fill_box units, centred on (0,0)."""
    cs = centers()
    ext = R + W / 2
    xs = [c[0] + s * ext for c in cs for s in (-1, 1)]
    ys = [c[1] + s * ext for c in cs for s in (-1, 1)]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    scale = fill_box / max(maxx - minx, maxy - miny)
    cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
    defs, body = [], []
    colors = [BLUE, GREEN, PURPLE]
    ring = lambda c, extra: f'<circle cx="{c[0]:.4f}" cy="{c[1]:.4f}" r="{R}" fill="none" {extra}/>'
    for i, (c, col) in enumerate(zip(cs, colors)):
        cut = ''.join(ring(cs[j], f'stroke="black" stroke-width="{W + GAP}"') for j in range(i + 1, 3))
        defs.append(f'<mask id="aitc-m{i}" maskUnits="userSpaceOnUse" x="-100" y="-100" width="200" height="200">'
                    f'<rect x="-100" y="-100" width="200" height="200" fill="white"/>{cut}'
                    f'<circle cx="0" cy="0" r="{DOT + HALO}" fill="black"/></mask>')
        body.append(ring(c, f'stroke="{col}" stroke-width="{W}" mask="url(#aitc-m{i})"'))
    body.append(f'<circle cx="0" cy="0" r="{DOT}" fill="{AMBER}"/>')
    g = (f'<g transform="scale({scale:.5f}) translate({-cx:.4f} {-cy:.4f})">'
         f'<defs>{"".join(defs)}</defs>{"".join(body)}</g>')
    return g


def square_svg(size_units=100, fill=92, bg=None):
    back = f'<rect width="{size_units}" height="{size_units}" fill="{bg}"/>' if bg else ''
    h = size_units / 2
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size_units} {size_units}">'
            f'<title>AI Trust Commons</title>{back}'
            f'<g transform="translate({h} {h})">{mark_group(fill)}</g></svg>')


def render(svg_text, name, w, h=None):
    p = OUT / (name + '.svg')
    p.write_text(svg_text)
    png = OUT / (name + f'-{w}.png' if h is None else name + '.png')
    subprocess.run(['rsvg-convert', '-w', str(w), '-h', str(h or w), str(p), '-o', str(png)], check=True)
    return png


# 1. Master: transparent background, mark fills 92% of the square
(OUT / 'aitc-mark.svg').write_text(square_svg(fill=92))
# 2. Avatars on white, with room for round crops: LinkedIn 400, GitHub 500
render(square_svg(fill=78, bg='#FFFFFF'), 'aitc-avatar-white', 400)
subprocess.run(['rsvg-convert', '-w', '500', '-h', '500', str(OUT / 'aitc-avatar-white.svg'),
                '-o', str(OUT / 'aitc-avatar-white-500.png')], check=True)
# 3. Browser-tab icons: transparent, mark nearly edge to edge. The 180 px home-screen icon sits on
#    white, because iPhones fill a clear background with black.
for s in (16, 32, 48):
    subprocess.run(['rsvg-convert', '-w', str(s), '-h', str(s), str(OUT / 'aitc-mark.svg'),
                    '-o', str(OUT / f'favicon-{s}.png')], check=True)
subprocess.run(['rsvg-convert', '-w', '180', '-h', '180', str(OUT / 'aitc-avatar-white.svg'),
                '-o', str(OUT / 'favicon-180.png')], check=True)
# 4. Link-preview card, 1200 x 630
card = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">'
        f'<rect width="1200" height="630" fill="#FFFFFF"/>'
        f'<rect x="0" y="0" width="1200" height="12" fill="{BLUE}"/>'
        f'<g transform="translate(260 315)">{mark_group(330)}</g>'
        f'<text x="490" y="290" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#1F2933">AI Trust Commons</text>'
        f'<text x="492" y="350" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" fill="#52606D">Open-source governance for AI agents</text>'
        f'<text x="492" y="390" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" fill="#52606D">in the enterprise.</text>'
        f'<text x="492" y="460" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="{BLUE}">aitrustcommons.org</text>'
        f'</svg>')
(OUT / 'aitc-social-card.svg').write_text(card)
subprocess.run(['rsvg-convert', '-w', '1200', '-h', '630', str(OUT / 'aitc-social-card.svg'),
                '-o', str(OUT / 'aitc-social-card-1200x630.png')], check=True)

# 4b. Site header logo: the mark on a white circle, so the blue ring stands out on the blue header bar
badge = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><title>AI Trust Commons</title>'
         '<circle cx="50" cy="50" r="50" fill="#FFFFFF"/>'
         f'<g transform="translate(50 50)">{mark_group(76)}</g></svg>')
(OUT / 'aitc-header-logo.svg').write_text(badge)

# 5. Check sheet: icons on light and dark tab bars, the avatars in a circle, and the card
sheet = Image.new('RGB', (1240, 1150), '#FFFFFF')
d = ImageDraw.Draw(sheet)
d.text((20, 10), 'Browser-tab icons (16, 32, 48) on a light and a dark tab bar', fill='black')
for row, bar in enumerate(('#E8EAED', '#202124')):
    y = 30 + row * 70
    d.rectangle((20, y, 400, y + 60), fill=bar)
    x = 40
    for s in (16, 32, 48):
        ic = Image.open(OUT / f'favicon-{s}.png').convert('RGBA')
        sheet.paste(ic, (x, y + 30 - s // 2), ic)
        x += s + 40
d.text((440, 10), 'LinkedIn 400 (square) and as a circle', fill='black')
av = Image.open(OUT / 'aitc-avatar-white-400.png').convert('RGB').resize((200, 200), Image.LANCZOS)
sheet.paste(av, (440, 30))
mask = Image.new('L', (200, 200), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 199, 199), fill=255)
sheet.paste(av, (660, 30), mask)
d.rectangle((438, 28, 641, 231), outline='#CCCCCC')
d.text((20, 250), 'Link-preview card, 1200 x 630', fill='black')
cardimg = Image.open(OUT / 'aitc-social-card-1200x630.png').convert('RGB')
sheet.paste(cardimg, (20, 270))
d.rectangle((19, 269, 1221, 901), outline='#CCCCCC')
sheet.save(OUT / 'check-sheet.png')
print('ok', sorted(p.name for p in OUT.iterdir()))
