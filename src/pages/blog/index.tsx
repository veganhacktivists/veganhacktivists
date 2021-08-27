import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type { IBlogEntry } from '../../types/generated/contentful';
import { usePagination } from 'react-use-pagination';
import classNames from 'classnames';
import Image from 'next/image';

import roundLogo from '../../../public/images/VH_Logo_Crest_Tagline.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  const {
    currentPage,
    setNextPage,
    setPreviousPage,
    nextEnabled,
    previousEnabled,
    startIndex,
    endIndex,
  } = usePagination({ totalItems: blogs.length, initialPageSize: 13 });

  const contentClasses = classNames(
    'flex',
    'flex-col',
    'justify-center',
    'w-1/2',
    'z-10'
  );

  return (
    <>
      <div className="flex relative bg-black justify-around text-white p-10">
        <div className={contentClasses}>
          <div className="w-48 mx-auto my-10">
            <Image src={roundLogo} alt="" />
          </div>
          <div className="text-3xl px-16">
            This is the official blog for the Vegan Hacktivists. We regularly
            post project updates, announcements, interviews, and other fun stuff
            here! Thanks for reading!
          </div>
        </div>
        <div className="bg-grey mt-10 p-5">
          <label className="border-3 border-grey-lighter p-2 text-xl">
            <input
              className="bg-invisible outline-none pr-2"
              type="text"
              name="query"
              id="blogQuery"
            />
            <FontAwesomeIcon icon={faSearch} />
          </label>
        </div>
      </div>
      <div>
        <div>Number of entries: {blogs.length}</div>
        <div>First: {blogs[0].fields.title}</div>
        <div className="grid md:grid-cols-3 md:gap-14 px-10">
          {blogs.slice(startIndex + 1, endIndex + 1).map((blog) => (
            <div className="ring" key={blog.fields.slug}>
              {/* Sys publish date: {blog.sys.createdAt}, fields data:{' '}
            {blog.fields.publishDate} */}
              <b>{blog.fields.title}</b>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
