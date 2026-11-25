// The sitemap stays at /sitemap.xml, the address robots.txt and Search
// Console already know. Forwarding pages and the 404 page are left out.
// lastmod is the date a page's words last changed. Design changes don't count.
import { allPosts, postPath, isoDay } from '../lib/posts';
import home from '../data/home.json';

const SITE = 'https://aitrustcommons.org';
const ABOUT_UPDATED = '2026-11-25';

export async function GET() {
  const posts = await allPosts();
  const newest = isoDay(posts[0].post);
  const urls = [
    ['/', home.updated],
    ['/blog/', newest],
    ['/blog/category/from-instinct-to-intent-series/', newest],
    ['/about/', ABOUT_UPDATED],
    ['/picture/', home.updated],
    ...posts.map(({ post }) => [postPath(post), isoDay(post)]),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d]) => `  <url><loc>${SITE}${u}</loc><lastmod>${d}</lastmod></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
