// RSS feed of the posts, newest first. New with the rebuild: the old site had none.
import rss from '@astrojs/rss';
import { allPosts, postPath } from '../lib/posts';

export async function GET(context) {
  const posts = await allPosts();
  return rss({
    title: 'From Instinct to Intent™',
    description: "Nikhil Singhal's articles on the structural gap between human intent and machine execution. Published by AI Trust Commons.",
    site: context.site,
    items: posts.map(({ post, title }) => ({
      title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.categories,
      customData: '<dc:creator>Nikhil Singhal</dc:creator>',
    })),
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/', atom: 'http://www.w3.org/2005/Atom' },
    customData: '<language>en</language><atom:link href="https://aitrustcommons.org/rss.xml" rel="self" type="application/rss+xml"/>',
  });
}
