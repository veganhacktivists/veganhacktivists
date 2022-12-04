import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LightButton } from '../../decoration/buttons';
import BlogEntrySummary from '../blog/blogEntrySummary';
import SubtleBorder from '../../decoration/subtleBorder';

import type { IBlogEntry } from '../../../types/generated/contentful';

const LastBlogEntries: React.FC<{ entries: IBlogEntry[] }> = ({ entries }) => {
  return (
    <>
      <div className="content-center mx-auto md:w-1/2 text-2xl pt-16">
        <p className="text-grey-dark pb-5">
          <FormattedMessage
            id="section.blog-teaser.headline"
            defaultMessage="<left>On the</left><right>BLOG</right>"
            values={{
              left: (chunks) => (
                <span className="font-serif italic font-semibold text-3xl">
                  {chunks}{' '}
                </span>
              ),
              right: (chunks) => <b className="text-5xl font-mono">{chunks}</b>,
            }}
          />
        </p>
        <p className="pb-16">
          <FormattedMessage
            id="section.blog-teaser.paragraph"
            defaultMessage="Read our blog post for project updates, announcements, interviews, guest editorials, and much more."
          />
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 md:gap-y-2 gap-y-4 lg:px-32 px-4">
        {entries.map((entry) => (
          <SubtleBorder border={false} key={entry.fields.slug}>
            <BlogEntrySummary blog={entry} />
          </SubtleBorder>
        ))}
      </div>
      <div className="bg-grey w-full relative h-32 bottom-32 -z-10" />
      <div className="bg-grey relative bottom-32 -pb-32 -mb-32">
        <div className="relative mx-auto pt-10 md:w-1/3 pb-16 sm:px-24 px-20">
          <LightButton href="/blog" className="font-mono font-semibold">
            <FormattedMessage
              id="section.blog-teaser.cta"
              defaultMessage="See All Posts"
            />
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default LastBlogEntries;
