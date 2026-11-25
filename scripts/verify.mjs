#!/usr/bin/env node
// Checks the built site before launch, and the live site after it.
// usage: node scripts/verify.mjs [base-url]     (default http://localhost:4321)
//        add --screens to save phone-width screenshots to .preview/screens/
// Exits 1 if any check fails. Build spec section 10.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const BASE = (args.find((a) => a.startsWith('http')) || 'http://localhost:4321').replace(/\/$/, '');
const SCREENS = args.includes('--screens');
const picture = JSON.parse(fs.readFileSync('src/data/picture.json', 'utf8'));
const pieces = JSON.parse(fs.readFileSync('src/data/pieces.json', 'utf8')).pieces;

let failures = 0;
const ok = (msg) => console.log(`  ok    ${msg}`);
const bad = (msg) => { failures++; console.log(`  FAIL  ${msg}`); };
const check = (cond, msg) => (cond ? ok(msg) : bad(msg));
const decode = (s) => s.replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const cache = new Map();
async function get(p) {
  if (cache.has(p)) return cache.get(p);
  const res = await fetch(BASE + p, { redirect: 'manual' });
  const page = { status: res.status, html: await res.text(), type: res.headers.get('content-type') || '' };
  cache.set(p, page);
  return page;
}
const forwardTarget = (html) => html.match(/http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];

// 1. The 14 addresses in the old site's sitemap.
const POSTS = [
  '/blog/2026/03/08/discovering-intent/',
  '/blog/2026/03/13/languages-designed-for-humans/',
  '/blog/2026/03/14/engine-vs-steering-wheel/',
  '/blog/2026/03/17/stop-calling-it-artificial/',
  '/blog/2026/03/23/discovering-humanity-through-ai/',
  '/blog/2026/03/23/nccoe-ai-agent-identity-authorization-response/',
];
const SERIES = '/blog/category/from-instinct-to-intent-series/';
const FORWARDS = { '/framework/': '/', '/standards/': '/', '/blog/archive/2026/': '/blog/', '/blog/category/standards/': '/blog/' };
const PAGES = ['/', '/about/', '/blog/', SERIES, '/picture/', ...POSTS];

console.log(`Checking ${BASE}\n\nOld addresses`);
for (const p of PAGES) check((await get(p)).status === 200, `${p} answers 200`);
for (const [from, to] of Object.entries(FORWARDS)) {
  const page = await get(from);
  check(page.status === 200 && forwardTarget(page.html) === to, `${from} forwards to ${to}`);
}
const missing = await get('/no-such-page-' + Date.now() + '/');
check(missing.status === 404 && /Page not found/.test(missing.html), 'an unknown address gets the 404 page with status 404');

// 2. Head tags and structured data on every page.
console.log('\nHead tags and structured data');
const golden = (p) => {
  const name = p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_');
  const file = path.join('golden', `${name}.html`);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
};
const meta = (html, attr, key) => decode(html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1] ?? '');
for (const p of PAGES) {
  const { html } = await get(p);
  const need = [
    ['<html lang="en"', /<html lang="en"/.test(html)],
    ['<title>', /<title>[^<]+ - AI Trust Commons<\/title>/.test(html)],
    ['meta description', !!meta(html, 'name', 'description')],
    ['canonical', html.includes(`<link rel="canonical" href="https://aitrustcommons.org${p}"`)],
    ['og:title', !!meta(html, 'property', 'og:title')],
    ['og:description', !!meta(html, 'property', 'og:description')],
    ['og:image', !!meta(html, 'property', 'og:image')],
    ['og:url', meta(html, 'property', 'og:url') === `https://aitrustcommons.org${p}`],
    ['twitter:card', meta(html, 'name', 'twitter:card') === 'summary_large_image'],
    ['one H1', (html.match(/<h1[\s>]/g) || []).length === 1],
    ['alt on every image', !/<img(?![^>]*\balt=)[^>]*>/.test(html)],
  ];
  const lds = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
  const types = lds.flatMap((d) => (d['@graph'] ? d['@graph'].map((n) => n['@type']) : [d['@type']]));
  need.push(['Person, Organization and WebSite in JSON-LD', ['Person', 'Organization', 'WebSite'].every((t) => types.includes(t))]);
  if (POSTS.includes(p)) {
    const post = lds.find((d) => d['@type'] === 'BlogPosting');
    const day = p.split('/').slice(2, 5).join('-');
    need.push(['BlogPosting with the right date', post?.datePublished === day]);
    const old = meta(golden(p), 'property', 'og:title');
    need.push([`og:title and headline as on the old site`, !!old && meta(html, 'property', 'og:title') === old && post?.headline === old]);
  }
  const failed = need.filter(([, pass]) => !pass).map(([name]) => name);
  check(failed.length === 0, `${p}${failed.length ? ` missing: ${failed.join(', ')}` : ''}`);
}
const claims = [];
for (const p of [...PAGES.filter((x) => !POSTS.includes(x)), '/ai-governance-in-practice.md']) if (/open[- ]source/i.test((await get(p)).html)) claims.push(p);
check(claims.length === 0, `no open-source claim on any page outside the unchanged posts${claims.length ? ' (found on ' + claims.join(', ') + ')' : ''}`);
check(!/rel="canonical"/.test(missing.html) && /name="robots" content="noindex"/.test(missing.html), 'the 404 page is noindex with no canonical');

// 3. The words are in the raw HTML, with no JavaScript run.
console.log('\nText readable without JavaScript');
const home = decode((await get('/')).html);
const steps = picture.steps.map((s) => s.parts.find((p) => p.lead));
check(steps.every((l) => home.includes(l.head) && home.includes(l.body)), "each step's label and first sentence is on the home page");
check(picture.pieces.every((p) => home.includes(p.line)), "each piece's one-liner is on the home page");
const homeData = JSON.parse(fs.readFileSync('src/data/home.json', 'utf8'));
check(homeData.intro.sections.every((x) => home.includes(x.heading) && x.paragraphs.every((p) => home.includes(p))), 'the "Why AI governance" introduction is on the home page');
check(home.indexOf('id="why"') > 0 && home.indexOf('id="why"') < home.indexOf('class="overview"'), 'the introduction sits above the picture');
check([...picture.gate_lines, ...picture.outcomes.map((o) => o.line), picture.record.body, picture.loop.body].every((t) => home.includes(t)),
  "the poster's key (gate lines, outcomes, the record, on the loop) is on the home page");
// Each step's parts appear in the poster's order.
const firstText = (part) => part.lead ? part.body : part.kind === 'gate' ? part.crossing : part.kind === 'note' ? part.text : part.body;
const outOfOrder = picture.steps.filter((s) => {
  const from = home.indexOf(`id="step${s.number}"`);
  const at = s.parts.map((part) => home.indexOf(firstText(part), from));
  return at.some((v, i) => v < 0 || (i > 0 && v < at[i - 1]));
}).map((s) => s.number);
check(outOfOrder.length === 0, `every step keeps the poster's order${outOfOrder.length ? ' (not: ' + outOfOrder.join(', ') + ')' : ''}`);
const empty = pieces.filter((p) => p.text.length === 0).map((p) => p.name);
if (empty.length) console.log(`  note  no text yet for ${empty.join(', ')} (the production build refuses to run until it's in)`);
for (const p of POSTS) {
  const t = meta(golden(p), 'property', 'og:title');
  check(!!t && decode((await get(p)).html).includes(`<h1>${t}</h1>`), `${p} shows its title`);
}
const blog = decode((await get('/blog/')).html);
check(blog.includes('From Instinct to Intent™</h1>'), 'the blog keeps its "From Instinct to Intent™" title');
check(decode((await get(SERIES)).html).includes('FROM INSTINCT TO INTENT™ SERIES'), 'the series page shows the mark');

// 4. Feed and sitemap.
console.log('\nFeed and sitemap');
const rss = await get('/rss.xml');
check(rss.status === 200 && (rss.html.match(/<item>/g) || []).length === 6, 'RSS lists six posts');
const sitemap = await get('/sitemap.xml');
const locs = [...sitemap.html.matchAll(/<loc>https:\/\/aitrustcommons\.org([^<]+)<\/loc>/g)].map((m) => m[1]);
check(PAGES.every((p) => locs.includes(p)), 'the sitemap lists every page');
check(!Object.keys(FORWARDS).some((p) => locs.includes(p)), 'the sitemap lists no forwarded address');
const robots = await get('/robots.txt');
check(robots.html.includes('Sitemap: https://aitrustcommons.org/sitemap.xml'), 'robots.txt points to the sitemap');
for (const f of ['/ai-governance-in-practice.pdf', '/ai-governance-in-practice.md', '/picture/ai-governance-in-practice.png', '/assets/brand/aitc-social-card-1200x630.png', '/assets/images/hero-image.png']) {
  check((await get(f)).status === 200, `${f} answers 200`);
}

// 5. No broken links inside the site.
console.log('\nLinks');
const seen = new Set();
for (const p of PAGES) {
  for (const m of (await get(p)).html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) seen.add(m[1]);
}
const broken = [];
for (const link of seen) {
  if (link.startsWith('//')) continue;
  const { status } = await get(link);
  if (status !== 200) broken.push(`${link} (${status})`);
}
check(broken.length === 0, `${seen.size} internal links and images, ${broken.length ? 'broken: ' + broken.join(', ') : 'none broken'}`);
check(!/\.md"/.test((await get(POSTS[0])).html.replace('/ai-governance-in-practice.md"', '')), 'no links to .md post files left in the posts');

// 6. Phone-width screenshots, for a person to look at.
if (SCREENS) {
  const out = '.preview/screens';
  fs.mkdirSync(out, { recursive: true });
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  for (const [name, p] of [['home', '/'], ['blog', '/blog/'], ['post', POSTS[0]], ['about', '/about/']]) {
    // Headless Chrome lays pages out at 500 wide at least, so a 390-wide frame gives the true phone layout.
    const frame = path.resolve(out, `${name}.html`);
    fs.writeFileSync(frame, `<body style="margin:0"><iframe src="${BASE}${p}" width="390" height="4000" style="border:0"></iframe></body>`);
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--user-data-dir=${path.resolve(out, 'profile')}`,
      '--window-size=500,4000', '--virtual-time-budget=8000', `--screenshot=${path.resolve(out, name + '.png')}`, `file://${frame}`], { stdio: 'ignore' });
  }
  fs.rmSync(path.resolve(out, 'profile'), { recursive: true, force: true });
  console.log(`\n  saved phone screenshots in ${out}/ (the left 390 pixels of each)`);
}

console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
