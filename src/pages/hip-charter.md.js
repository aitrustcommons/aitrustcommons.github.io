// A plain-text copy of the HIP Charter, for people and AI tools that want the words without the design.
import raw from '../content/hip/charter.md?raw';

const SITE = 'https://aitrustcommons.org';

export function GET() {
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const field = (k) => fm[1].match(new RegExp(`^${k}: "(.*)"$`, 'm'))[1];
  const body = raw.slice(fm[0].length)
    .replace(/^<span id="[^"]+"><\/span>\n\n/gm, '')
    .replace(/\]\(\//g, `](${SITE}/`);
  const text = [`# ${field('title')}`, '', field('subtitle'), '',
    `By Nikhil Singhal · March 2026 · ${SITE}/hip-charter/`, '', body.trim(), ''].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
