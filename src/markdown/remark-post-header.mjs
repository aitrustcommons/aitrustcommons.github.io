// Build time only. The post files stay byte for byte as published.
// Takes each post's title from its first H1, then hides the H1, the bold
// series line and the hero image from the body. The post page header shows
// them instead (SitePost mockup).
function textOf(node) {
  if (!node) return '';
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  if (node.children) return node.children.map(textOf).join('');
  return '';
}

export default function remarkPostHeader() {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter;
    if (!fm) return;
    const kids = tree.children;
    const h1 = kids.findIndex((n) => n.type === 'heading' && n.depth === 1);
    if (h1 === -1 || h1 > 1) return; // only a leading H1
    fm.title = textOf(kids[h1]);
    const drop = new Set([h1]);
    let next = h1 + 1;

    const series = kids[next];
    if (
      series?.type === 'paragraph' &&
      series.children.length === 1 &&
      series.children[0].type === 'strong' &&
      /FROM INSTINCT TO INTENT/.test(textOf(series))
    ) {
      fm.seriesLine = textOf(series);
      drop.add(next);
      next += 1;
    }

    const hero = kids[next];
    if (hero?.type === 'paragraph' && hero.children.length === 1 && hero.children[0].type === 'image') {
      fm.heroAlt = hero.children[0].alt || '';
      fm.heroFile = hero.children[0].url.split('/').pop();
      drop.add(next);
    }

    tree.children = kids.filter((_, i) => !drop.has(i));
  };
}
