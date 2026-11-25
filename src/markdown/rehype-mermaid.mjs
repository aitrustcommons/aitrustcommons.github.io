// Build time only. Turns each ```mermaid block into <pre class="mermaid">
// holding the diagram source as plain text. The pinned Mermaid script draws
// it in the browser, as on the old site, and the text stays readable without
// JavaScript.
function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

function isMermaid(pre) {
  const lang = pre.properties?.dataLanguage;
  if (lang === 'mermaid') return true;
  const code = (pre.children || []).find((c) => c.tagName === 'code');
  const cls = code?.properties?.className || [];
  return cls.includes('language-mermaid');
}

function walk(node, fn) {
  if (!node.children) return;
  node.children = node.children.map((child) => fn(child) || child);
  node.children.forEach((child) => walk(child, fn));
}

export default function rehypeMermaid() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'pre' || !isMermaid(node)) return null;
      return {
        type: 'element',
        tagName: 'pre',
        properties: { className: ['mermaid'] },
        children: [{ type: 'text', value: textOf(node).replace(/\n$/, '') }],
      };
    });
  };
}
