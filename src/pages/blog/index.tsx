import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type { IBlogEntry } from '../../types/generated/contentful';
import { usePagination } from 'react-use-pagination';
import classNames from 'classnames';
import Image from 'next/image';

import roundLogo from '../../../public/images/VH_Logo_Crest_Tagline.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faLongArrowAltLeft as leftArrow,
  faLongArrowAltRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useFuse from '../../hooks/useFuse';
import BlogEntrySummary from '../../components/layout/blog/blogEntrySummary';
import Head from 'next/head';
import { DarkButton } from '../../components/decoration/buttons';

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
    sort: true,
  });

  const {
    startIndex,
    endIndex,
    setPreviousPage,
    setNextPage,
    currentPage,
    previousEnabled,
    nextEnabled,
  } = usePagination({
    totalItems: filteredEntries.length,
    initialPageSize: 10,
  });

  // useEffect(() => {
  //   window.scrollTo({ top: 0 });
  // }, [currentPage]);

  return (
    <>
      <Head>
        <title>Blog | Vegan Hacktivists</title>
      </Head>
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
        <div className="grid md:grid-cols-3 md:gap-x-20 gap-y-10 px-72  auto-rows-min">
          {filteredEntries.slice(startIndex, endIndex + 1).map((blog, i) => {
            const first = i === 0 && currentPage === 0 && !query;

            return (
              <div
                key={blog.fields.slug}
                className={classNames({
                  'first:col-span-full': first,
                })}
              >
                <BlogEntrySummary blog={blog} heading={first} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-row mx-auto gap-10 justify-center p-16">
          <DarkButton
            onClick={() => {
              setPreviousPage();
            }}
            className="font-mono font-bold uppercase"
            disabled={!previousEnabled}
          >
            <FontAwesomeIcon icon={leftArrow} size="xs" />
            <span className="pl-3">Previous</span>
          </DarkButton>
          <DarkButton
            onClick={() => {
              setNextPage();
            }}
            className="font-mono font-bold uppercase"
            disabled={!nextEnabled}
          >
            <span className="pr-3">Next</span>
            <FontAwesomeIcon icon={rightArrow} size="xs" />
          </DarkButton>
        </div>
      </div>
    </>
  );
};

export default Blog;
