// A plain-text copy of the home page's words, built from the same data, for
// people and AI tools that want the text without the design.
import picture from '../data/picture.json';
import pieces from '../data/pieces.json';
import home from '../data/home.json';
import site from '../data/site.json';

function part(p) {
  if (p.kind === 'gate') {
    const word = { PASS: 'Pass', 'NEEDS APPROVAL': 'Needs approval', BLOCKED: 'Blocked', 'FEEDS BACK': 'Feeds back' }[p.word] ?? p.word;
    return [`- Gate, ${word.toLowerCase()} (${p.crossing}): ${p.text.join(' ')}`,
      ...p.fields.map((f) => `  - ${f.label}: ${f.value}`),
      `  - Recorded: ${p.recorded}`].join('\n');
  }
  if (p.kind === 'note') return `- ${p.text}`;
  return `- ${p.head}: ${p.body}`;
}

export function GET() {
  const lines = [
    `# ${picture.title}`, '', site.description, '',
    `Version ${home.version.number}, ${home.version.label}. ${site.url}/`, '',
    '## Overview', '', ...home.overview.flatMap((p) => [p, '']),
  ];
  for (const s of picture.steps) {
    const lead = s.parts.find((p) => p.lead);
    lines.push(`## Step ${s.number}. ${lead.head}`, '', lead.body, '');
    for (const p of s.parts.filter((x) => !x.lead)) lines.push(part(p));
    lines.push('');
  }
  lines.push('## The five pieces', '', home.govern_line, '');
  for (const p of pieces.pieces) {
    const line = picture.pieces.find((x) => x.name === `${p.name} · ${p.product}`)?.line ?? '';
    lines.push(`### ${p.name} · ${p.product}`, '', line, '', ...p.text.flatMap((t) => [t, '']));
  }
  lines.push('## Every gate', '', ...picture.gate_lines.map((g) => `- ${g}`),
    ...picture.outcomes.map((o) => `- ${o.word}: ${o.line}`), '',
    `## ${picture.record.head}`, '', picture.record.body, '',
    `## ${picture.loop.head}`, '', picture.loop.body, '',
    'Writing licensed CC BY 4.0. AI Trust Commons.', '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
