"""Draw the link-preview card for the rebuilt site (Nov 24, 2026, #624).

Usage: python3 make_card.py
Writes aitc-card-2026-11.svg here and ../public/assets/brand/aitc-card-2026-11.png.
Needs rsvg-convert (Homebrew librsvg). The mark comes from aitc-mark.svg.
The card carries the site's one-line summary. The old card
(aitc-social-card-1200x630.png) stays at its address for links shared before.
"""
import pathlib
import re
import subprocess

HERE = pathlib.Path(__file__).parent
mark = (HERE / 'aitc-mark.svg').read_text()
inner = re.sub(r'^<svg[^>]*>|</svg>\s*$', '', mark).replace('<title>AI Trust Commons</title>', '')

FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"
card = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">'
    '<rect width="1200" height="630" fill="#FAF8F3"/>'
    f'<svg x="80" y="185" width="260" height="260" viewBox="0 0 100 100">{inner}</svg>'
    f'<text x="400" y="255" font-family="{FONT}" font-size="54" font-weight="700" fill="#0F172A">AI governance in practice</text>'
    f'<text x="402" y="318" font-family="{FONT}" font-size="32" fill="#334155">Humans and AI agents working as partners</text>'
    f'<text x="402" y="360" font-family="{FONT}" font-size="32" fill="#334155">under rules set by experts.</text>'
    f'<text x="402" y="440" font-family="{FONT}" font-size="28" font-weight="700" fill="#0F172A">AI Trust Commons</text>'
    f'<text x="402" y="478" font-family="{FONT}" font-size="26" fill="#1D4ED8">aitrustcommons.org</text>'
    '</svg>'
)
svg = HERE / 'aitc-card-2026-11.svg'
svg.write_text(card)
png = HERE.parent / 'public' / 'assets' / 'brand' / 'aitc-card-2026-11.png'
subprocess.run(['rsvg-convert', '-w', '1200', '-h', '630', str(svg), '-o', str(png)], check=True)
print('wrote', svg.name, 'and', png)
