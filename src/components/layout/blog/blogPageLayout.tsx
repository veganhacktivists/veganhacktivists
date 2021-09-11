// import type { IBlogEntry } from '../../../types/generated/contentful';

import Link from 'next/link';
import type { IBlogEntry } from '../../../types/generated/contentful';
import ImageContainer from '../../decoration/imageContainer';
import ContentfulImage from '../contentfulImage';

const BlogContentContainer: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-x-10 mt-10 w-3/4 mx-auto">
      {children}
    </div>
  );
};

export const Body: React.FC = ({ children }) => {
  return <>{children}</>;
};

export const Sidebar: React.FC<{ blogs: IBlogEntry[] }> = ({ blogs }) => {
  return (
    <div className="bg-grey-background mb-10 h-full">
      {blogs.map((blog) => {
        return (
          <div
            key={blog.fields.slug}
            title={blog.fields.title}
            className="p-5 w-full lg:w-96"
          >
            <Link href={`/blog/${blog.fields.slug}`}>
              <a>
                <ImageContainer>
                  <ContentfulImage
                    image={blog.fields.featuredImage}
                    alt=""
                    layout="responsive"
                  />
                </ImageContainer>
                <div className="font-bold text-3xl text-left line-clamp-3 mt-5">
                  {blog.fields.title}
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BlogContentContainer;
