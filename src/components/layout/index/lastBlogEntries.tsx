import { LightButton } from '../../decoration/buttons';
import React from 'react';
import SquareField from '../../decoration/squares';
import type { IBlogEntry } from '../../../types/generated/contentful';
import BlogEntrySummary from '../blog/blogEntrySummary';

const BLOG_INNER_DECORATION_SQUARES = [
  { color: 'gray-lighter', size: 16, right: 0, bottom: 0 },
];

const LastBlogEntries: React.FC<{ entries: IBlogEntry[] }> = ({ entries }) => {
  return (
    <>
      <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pt-16">
        <p className="text-grey-dark pb-5">
          <span className="font-italic font-semibold text-3xl">On the </span>
          <b className="text-5xl font-mono">BLOG</b>
        </p>
        <p className="pb-16">
          We regularly post project updates, announcements, interviews, and
          other fun stuff here! Thanks for reading!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-4 md:space-y-0 space-y-4 lg:px-32 px-4">
        {entries.map((entry) => (
          <BlogEntrySummary key={entry.fields.slug} blog={entry} />
        ))}
      </div>
      <SquareField
        squares={BLOG_INNER_DECORATION_SQUARES}
        className="hidden lg:block bottom-32"
      />
      <div className="bg-grey pt-32 bottom-32 relative overflow-visible -z-10">
        <div className="relative mx-auto pt-10 md:w-1/3 pb-16 sm:px-24 px-20">
          <LightButton href="/blog" className="font-mono text-sm font-semibold">
            See All Posts
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default LastBlogEntries;
