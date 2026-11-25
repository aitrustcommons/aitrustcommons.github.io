// Astro config for aitrustcommons.org. Build spec: ns-2026-the-big-push,
// ai-trust-commons/site-redesign/build-spec.md (task #624).
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkPostHeader from './src/markdown/remark-post-header.mjs';
import remarkPostLinks from './src/markdown/remark-post-links.mjs';
import rehypeMermaid from './src/markdown/rehype-mermaid.mjs';

export default defineConfig({
  site: 'https://aitrustcommons.org',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Keep HTML-aware whitespace, so inline elements keep their spaces.
  compressHTML: true,

  // Pages that are gone forward instantly. On a static build Astro writes a
  // small page with a meta refresh for each one.
  redirects: {
    '/framework': '/',
    '/standards': '/about/',
    '/blog/archive/2026': '/blog/',
    '/blog/category/standards': '/blog/',
  },

  markdown: {
    processor: unified({
      // Off, so quotes and dashes render exactly as on the old site.
      smartypants: false,
      remarkPlugins: [remarkPostHeader, remarkPostLinks],
      rehypePlugins: [rehypeMermaid],
    }),
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid', 'math'] },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Space Grotesk',
      cssVariable: '--font-grotesk',
      weights: [500, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
