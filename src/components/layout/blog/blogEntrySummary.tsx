import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { IBlogEntry } from '../../../types/generated/contentful';
import ContentfulImage from '../contentfulImage';
import classNames from 'classnames';
import ImageContainer from '../../decoration/imageContainer';
import { DarkButton } from '../../../components/decoration/buttons';

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
        'md:grid-cols-3': heading,
      })}
    >
      <div
        className={classNames('w-full overflow-hidden relative h-full', {
          'md:col-span-2': heading,
        })}
      >
        <ImageContainer>
          <ContentfulImage
            image={blog.fields.featuredImage}
            alt=""
            layout="responsive"
          />
        </ImageContainer>
        {heading && (
          <div className="p-1 md:p-2 bottom-0 text-white uppercase md:text-xl absolute bg-black border-white border-[3px] border-l-0 border-b-0">
            Latest post
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-shrink">
        <div className="my-auto px-5 mb-5 mt-5">
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
          <b
            className="text-2xl font-mono font-semibold line-clamp-2"
            title={blog.fields.title}
          >
            {blog.fields.title}
          </b>
          {heading && (
            <div className="text-xl line-clamp-5 md:text-md xl:text-xl md:line-clamp-2 xl:line-clamp-3">
              {documentToReactComponents(
                blog.fields.excerpt.content.length === 0
                  ? blog.fields.content
                  : blog.fields.excerpt
              )}
            </div>
          )}
        </div>
        <DarkButton className="mb-0" href={`/blog/${blog.fields.slug}`}>
          Read More
        </DarkButton>
      </div>
    </div>
  );
};

export default BlogEntrySummary;
