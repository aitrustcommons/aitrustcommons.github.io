// RSS feed of the posts, newest first. New with the rebuild: the old site had none.
import rss from '@astrojs/rss';
import { allPosts, postPath } from '../lib/posts';

export async function GET(context) {
  const posts = await allPosts();
  return rss({
    title: 'From Instinct to Intent™',
    description: 'Articles on the structural gap between human intent and machine execution, by Nikhil Singhal. AI Trust Commons.',
    site: context.site,
    items: posts.map(({ post, title }) => ({
      title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.categories,
    })),
    customData: '<language>en</language>',
  });
}
