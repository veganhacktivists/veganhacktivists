import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type { IBlogEntry } from '../../types/generated/contentful';
import { usePagination } from 'react-use-pagination';
import classNames from 'classnames';
import Image from 'next/image';

import roundLogo from '../../../public/images/VH_Logo_Crest_Tagline.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useFuse from '../../hooks/useFuse';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
  const [query, setQuery] = useState<string>('');

  const filteredEntries = useFuse({
    data: blogs,
    options: { keys: ['fields.title', 'fields.excerpt'] },
    term: query,
  });

  const { startIndex, endIndex } = usePagination({
    totalItems: filteredEntries.length,
    initialPageSize: 13,
  });

  return (
    <>
      <div className="flex relative bg-black justify-around text-white p-10">
        <div className="flex flex-col justify-center w-1/2 z-10">
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
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <FontAwesomeIcon icon={faSearch} />
          </label>
        </div>
      </div>
      <div className="pt-10 pb-20">
        <div>Number of entries: {filteredEntries.length}</div>
        <div className="grid md:grid-cols-3 md:gap-14 px-10">
          {filteredEntries.slice(startIndex, endIndex + 1).map((blog) => (
            <div
              className={classNames('ring', { 'first:col-span-full': !query })}
              key={blog.fields.slug}
            >
              <b>{blog.fields.title || '<empty>'}</b>
              {documentToReactComponents(blog.fields.excerpt)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
