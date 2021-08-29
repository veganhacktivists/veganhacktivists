import type { GetStaticProps } from 'next';
import type { IBlogEntry, ITag } from '../../types/generated/contentful';
import { usePagination } from 'react-use-pagination';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltLeft as leftArrow,
  faLongArrowAltRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useFuse from '../../hooks/useFuse';
import BlogEntrySummary from '../../components/layout/blog/blogEntrySummary';
import Head from 'next/head';
import { DarkButton } from '../../components/decoration/buttons';
import { getBlogEntries } from '../../lib/cms/helpers';
import SquareField from '../../components/decoration/squares';
import BlogsHeader from '../../components/layout/blog/blogsHeader';

interface BlogProps {
  blogs: IBlogEntry[];
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getBlogEntries();

  return {
    props: {
      blogs,
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

  return (
    <>
      <Head>
        <title>Blog | Vegan Hacktivists</title>
      </Head>
      <SquareField
        squares={[
          { color: 'grey', size: 32, top: 0, left: 0 },
          { color: 'grey-dark', size: 16, top: 0, left: 32 },
          { color: 'grey-dark', size: 16, top: 0, right: 0 },
        ]}
        className="z-10"
      />
      <BlogsHeader onQueryChange={setQuery} query={query} />
      <SquareField
        squares={[
          { color: 'green-light', size: 32, top: -16, left: 0 },
          { color: 'yellow', size: 16, bottom: 16, left: 32 },
          { color: 'white', size: 16, bottom: 0, left: 32 },
          { color: 'pink', size: 32, bottom: 0, right: 16 },
          { color: 'orange', size: 16, top: 0, right: 0 },
          { color: 'white', size: 16, bottom: 0, right: 0 },
        ]}
      />
      <div className="pt-20 pb-20">
        <div className="grid md:grid-cols-3 md:gap-x-8 gap-y-10 px-10 xl:px-72  auto-rows-min">
          {filteredEntries.slice(startIndex, endIndex + 1).map((blog, i) => {
            const first = i === 0 && currentPage === 0 && !query;

            return (
              <div
                key={blog.fields.slug}
                className={classNames('col-span-full md:col-span-1', {
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
