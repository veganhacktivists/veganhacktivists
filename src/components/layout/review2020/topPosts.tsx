import Link from 'next/link';
import type { IBlogEntryFields } from '../../../types/generated/contentful';

interface TopPostsProps {
  topPosts: Pick<IBlogEntryFields, 'title' | 'slug'>[];
}

const TopPosts: React.FC<TopPostsProps> = ({ topPosts }) => {
  return (
    <>
      <h2 className="text-3xl font-mono font-bold text-white mb-8">
        TOP POSTS
      </h2>
      <div className="flex flex-col normal-case">
        {topPosts.map(({ title, slug }) => (
          <Link key={slug} href={`/blog/${slug}`}>
            <a className="text-white text-2xl underline active:opacity-50 cursor-pointer truncate">
              {title}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};
export default TopPosts;
