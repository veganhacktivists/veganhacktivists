// import type { IBlogEntry } from '../../../types/generated/contentful';

import Link from 'next/link';
import type React from 'react';
import { FormattedMessage } from 'react-intl';

import { DarkButton } from '../../decoration/buttons';
import ContentfulImage from '../contentfulImage';

import type { IBlogEntry } from '../../../types/generated/contentful';

const BlogContentContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-x-10 mt-10 w-3/4 mx-auto">
      {children}
    </div>
  );
};

export const Body: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export const Sidebar: React.FC<{ blogs: IBlogEntry[] }> = ({ blogs }) => {
  return (
    <div className="bg-grey-background mb-10 h-full">
      {blogs.map((blog) => {
        const { title, slug, featuredImage } = blog.fields;

        return (
          <div
            key={blog.fields.slug}
            title={blog.fields.title}
            className="p-5 w-full lg:w-96"
          >
            <div className="mb-4">
              <Link href={`/blog/${slug}`}>
                <ContentfulImage image={featuredImage} alt="" />
                <div className="font-bold text-xl md:text-2xl text-left line-clamp-3 mt-5">
                  {title}
                </div>
              </Link>
            </div>

            <DarkButton href={`/blog/${slug}`} className="w-full">
              <FormattedMessage
                id="page.blog.section.blog-page.btn.read-more"
                defaultMessage="Read more"
              />
            </DarkButton>
          </div>
        );
      })}
    </div>
  );
};

export default BlogContentContainer;
