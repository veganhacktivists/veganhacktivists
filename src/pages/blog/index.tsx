import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type {
  IBlogEntry,
  IBlogEntryFields,
} from '../../types/generated/contentful';

interface BlogProps {
  blogs: IBlogEntry[];
}

export const getStaticProps: GetStaticProps = async () => {
  const newBlogs = await getContents<IBlogEntry>({
    contentType: 'blogEntry',
    query: {
      filters: {
        exists: { publishDate: false },
      },
    },
    other: {
      order: '-sys.createdAt',
    },
  });

  const oldBlogs = await getContents<IBlogEntry>({
    contentType: 'blogEntry',
    query: {
      filters: {
        exists: { publishDate: true },
      },
    },
    other: {
      order: '-fields.publishDate',
    },
  });

  return {
    props: {
      blogs: [...newBlogs, ...oldBlogs],
    },
  };
};

const Blog: React.FC<BlogProps> = ({ blogs }) => {
  return (
    <div>
      Number of entries: {blogs.length}
      <div>
        {blogs.map((blog) => (
          <div className="ring" key={blog.fields.slug}>
            Sys publish date: {blog.sys.createdAt}, fields data:{' '}
            {blog.fields.publishDate}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
