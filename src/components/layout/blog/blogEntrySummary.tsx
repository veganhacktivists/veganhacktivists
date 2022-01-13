import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { IBlogEntry } from '../../../types/generated/contentful';
import ContentfulImage from '../contentfulImage';
import classNames from 'classnames';

import { DarkButton } from '../../../components/decoration/buttons';
import Link from 'next/link';

interface BlogEntrySummaryProps {
  blog: IBlogEntry;
  heading?: boolean;
  className?: string;
}

const currentYear = new Date().getFullYear();

const BlogEntrySummary: React.FC<BlogEntrySummaryProps> = ({
  blog,
  heading,
}) => {
  const date = new Date(blog.fields.publishDate || blog.sys.createdAt);

  const LinkToBlog: React.FC = ({ children }) => (
    <Link href={`/blog/${blog.fields.slug}`}>
      <a aria-label={blog.fields.title}>{children}</a>
    </Link>
  );

  const { slug, title, featuredImage, excerpt } = blog.fields;

  return (
    <div
      className={classNames('h-full grid overflow-hidden grid-cols-1', {
        'md:grid-cols-2': heading,
      })}
    >
      <div
        className={classNames('w-full overflow-hidden relative h-full', {
          'md:max-h-20 lg:max-h-44 4xl:max-h-64': !heading,
        })}
      >
        <LinkToBlog>
          <ContentfulImage image={featuredImage} alt="" layout="responsive" />
        </LinkToBlog>
        {heading && (
          <div className="p-1 md:p-2 bottom-0 text-white uppercase md:text-xl absolute bg-black border-white border-[3px] border-l-0 border-b-0">
            Latest post
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="my-auto p-5">
          <div
            className={classNames('text-xl font-mono font-bold', {
              'mb-3': !heading,
            })}
          >
            {new Intl.DateTimeFormat('en', {
              month: 'long',
              year: date.getFullYear() !== currentYear ? 'numeric' : undefined,
              day: 'numeric',
            }).format(date)}
          </div>
          <LinkToBlog>
            <b
              className="text-2xl font-mono font-semibold md:line-clamp-2"
              title={title}
            >
              {title}
            </b>
          </LinkToBlog>
          <div className="text-xl line-clamp-5 md:line-clamp-1 lg:line-clamp-2 2xl:line-clamp-4 2xl:pt-5">
            {documentToReactComponents(excerpt)}
          </div>
        </div>
        {heading || (
          <DarkButton className="mb-0" href={`/blog/${slug}`}>
            Read More
          </DarkButton>
        )}
      </div>
    </div>
  );
};

export default BlogEntrySummary;
