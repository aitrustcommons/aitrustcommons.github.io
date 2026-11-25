// Build time only. Links between posts use file names (2026-03-13-...md),
// which MkDocs used to rewrite. This maps each one to that post's address.
// Dates are read as plain text from the front matter, so no time zone can
// shift them.
import fs from 'node:fs';
import path from 'node:path';

const POSTS = path.resolve('src/content/posts');

function addressMap() {
  const map = {};
  for (const name of fs.readdirSync(POSTS)) {
    if (!name.endsWith('.md')) continue;
    const head = fs.readFileSync(path.join(POSTS, name), 'utf8').match(/^---\n([\s\S]*?)\n---/);
    const date = head?.[1].match(/^date:\s*(\d{4})-(\d{2})-(\d{2})/m);
    const slug = head?.[1].match(/^slug:\s*(\S+)/m);
    if (date && slug) map[name] = `/blog/${date[1]}/${date[2]}/${date[3]}/${slug[1]}/`;
  }
  return map;
}

function walk(node, fn) {
  fn(node);
  if (node.children) node.children.forEach((child) => walk(child, fn));
}

export default function remarkPostLinks() {
  const map = addressMap();
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'link' && node.type !== 'definition') return;
      const m = node.url.match(/^(?:\.\/)?(\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md)(#.*)?$/);
      if (m && map[m[1]]) node.url = map[m[1]] + (m[2] || '');
    });
  };
}
