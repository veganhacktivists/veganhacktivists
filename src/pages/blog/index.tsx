import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type { IBlogEntry } from '../../types/generated/contentful';

interface BlogProps {
  blogs: IBlogEntry[];
}

export const getStaticProps: GetStaticProps = async () => {
  const [newBlogs, oldBlogs] = await Promise.all([
    getContents<IBlogEntry>({
      contentType: 'blogEntry',
      query: {
        filters: {
          exists: { publishDate: false },
        },
      },
      other: {
        order: '-sys.createdAt',
        select:
          'sys.createdAt,fields.publishDate,fields.featuredImage,fields.title,fields.slug',
      },
    }),
    getContents<IBlogEntry>({
      contentType: 'blogEntry',
      query: {
        filters: {
          exists: { publishDate: true },
        },
      },
      other: {
        order: '-fields.publishDate',
        select:
          'sys.createdAt,fields.publishDate,fields.featuredImage,fields.title,fields.slug',
      },
    }),
  ]);

  return {
    props: {
      blogs: [...newBlogs, ...oldBlogs],
    },
    revalidate: 240,
  };
};

const Blog: React.FC<BlogProps> = ({ blogs }) => {
  return (
    <div>
      Number of entries: {blogs.length}
      <div>
        {blogs.map((blog) => (
          <div className="ring" key={blog.fields.slug}>
            {/* Sys publish date: {blog.sys.createdAt}, fields data:{' '}
            {blog.fields.publishDate} */}
            {JSON.stringify(blog)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
