// Shared helpers for the posts. Dates are always read in UTC: the front
// matter says 2026-03-08, and a Pacific clock would turn that into Mar 7.
import { getCollection, render, type CollectionEntry } from 'astro:content';
import extras from '../data/post-extras.json';

export type Post = CollectionEntry<'posts'>;

const pad = (n: number) => String(n).padStart(2, '0');

export function postPath(p: Post) {
  const d = p.data.date;
  return `/blog/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${p.data.slug}/`;
}

export function isoDay(p: Post) {
  const d = p.data.date;
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export function displayDate(p: Post) {
  return p.data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

// Words divided by 230, rounded up. The same rule is used on the home page.
export function readMinutes(text: string) {
  const visible = text.replace(/```[\s\S]*?```/g, ' ').replace(/\]\([^)]*\)/g, ']').replace(/https?:\/\/\S+/g, ' ');
  const words = visible.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}

export function extrasFor(p: Post) {
  return (extras as Record<string, { part: number | null; medium: string | null; next: string | null; heroAlt?: string }>)[p.data.slug];
}

export function isSeries(p: Post) {
  return p.data.categories.includes('From Instinct to Intent Series');
}

// Newest first. Same-day posts sort by title, which keeps Discovering
// Humanity above the NCCoE response, as on the old site.
export async function allPosts() {
  const posts = await getCollection('posts');
  const withTitles = await Promise.all(
    posts.map(async (p) => {
      const rendered = await render(p);
      const fm = rendered.remarkPluginFrontmatter as { title?: string; heroAlt?: string; heroFile?: string };
      return { post: p, title: fm.title ?? p.data.slug, heroAlt: fm.heroAlt ?? '', heroFile: fm.heroFile, rendered };
    }),
  );
  return withTitles.sort((a, b) => {
    const t = b.post.data.date.getTime() - a.post.data.date.getTime();
    return t !== 0 ? t : a.title.localeCompare(b.title);
  });
}
