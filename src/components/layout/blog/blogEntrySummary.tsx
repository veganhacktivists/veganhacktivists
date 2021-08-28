import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { IBlogEntry } from '../../../types/generated/contentful';
import Link from 'next/link';
import ContentfulImage from '../contentfulImage';
import classNames from 'classnames';
import ImageContainer from '../../decoration/imageContainer';
import { GreenButton } from '../../decoration/buttons';

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

  return (
    <Link href={`/blog/${blog.fields.slug}`}>
      <a>
        <div
          className={classNames('shadow-xl h-full grid overflow-hidden', {
            'grid-cols-1 h-96': !heading,
            'grid-cols-2 h-96': heading,
          })}
        >
          <div
            className={classNames('w-full overflow-hidden relative z-0', {
              // 'h-48': !heading,
            })}
          >
            <ImageContainer>
              <ContentfulImage
                image={blog.fields.featuredImage}
                alt=""
                layout="responsive"
                objectFit="cover"
              />
            </ImageContainer>
            {heading && (
              <div className="p-2 bottom-0 text-white uppercase text-xl absolute bg-black border-white border-3 border-l-0 border-b-0">
                Latest post
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between flex-shrink">
            <div className="my-auto px-5">
              <div className="text-xl">
                {new Intl.DateTimeFormat('en', {
                  month: 'long',
                  year:
                    date.getFullYear() !== currentYear ? 'numeric' : undefined,
                  day: 'numeric',
                }).format(date)}
              </div>
              <b className="text-3xl line-clamp-2" title={blog.fields.title}>
                {blog.fields.title}
              </b>
              {heading && (
                <div className="text-xl line-clamp-3">
                  {documentToReactComponents(blog.fields.excerpt)}
                </div>
              )}
            </div>
            <GreenButton
              className="uppercase mb-0"
              href={`/blog/${blog.fields.slug}`}
            >
              Read More
            </GreenButton>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogEntrySummary;
