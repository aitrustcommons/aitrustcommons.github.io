// The sitemap stays at /sitemap.xml, the address robots.txt and Search
// Console already know. Forwarding pages and the 404 page are left out.
import { allPosts, postPath } from '../lib/posts';

const SITE = 'https://aitrustcommons.org';
const FIXED = ['/', '/blog/', '/blog/category/from-instinct-to-intent-series/', '/about/', '/picture/'];

export async function GET() {
  const posts = await allPosts();
  const urls = [...FIXED, ...posts.map(({ post }) => postPath(post))];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
