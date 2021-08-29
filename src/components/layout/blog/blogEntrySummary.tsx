import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { IBlogEntry } from '../../../types/generated/contentful';
import Link from 'next/link';
import ContentfulImage from '../contentfulImage';
import classNames from 'classnames';
import ImageContainer from '../../decoration/imageContainer';
import { GreenButton } from '../../decoration/buttons';
import { DarkButton, LightButton } from '../../../components/decoration/buttons';

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
    <div
      className={classNames('shadow-xl h-full grid overflow-hidden bg-white', {
        'grid-cols-1': !heading,
        'md:grid-cols-2': heading,
      })}
    >
      <div
        className={classNames('w-full overflow-hidden relative', {
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
          <div className="p-1 md:p-2 bottom-0 text-white uppercase md:text-xl absolute bg-black border-white border-3 border-l-0 border-b-0">
            Latest post
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-shrink">
        <div className="my-auto px-5 mb-5 mt-5">
          <div className="text-xl mb-3 font-mono font-bold">
            {new Intl.DateTimeFormat('en', {
              month: 'long',
              year: date.getFullYear() !== currentYear ? 'numeric' : undefined,
              day: 'numeric',
            }).format(date)}
          </div>
          <b className="text-2xl font-mono font-semibold line-clamp-2" title={blog.fields.title}>
            {blog.fields.title}
          </b>
          {heading && (
            <div className="text-xl line-clamp-3">
              {documentToReactComponents(blog.fields.excerpt)}
            </div>
          )}
        </div>
        <DarkButton
          className="mb-0"
          href={`/blog/${blog.fields.slug}`}
        >
          Read More
        </DarkButton>
      </div>
    </div>
  );
};

export default BlogEntrySummary;
