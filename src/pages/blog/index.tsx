import type { GetStaticProps } from 'next';
import type { IBlogEntry } from '../../types/generated/contentful';
import { usePagination } from 'react-use-pagination';

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
    revalidate: 480,
  };
};

const Blog: React.FC<BlogProps> = ({ blogs }) => {
  const [query, setQuery] = useState<string>('');

  const [firstBlog, ...otherBlogs] = blogs;

  const filterKeys = ['fields.title']; //['fields.title', 'fields.excerpt']

  const filteredFirstBlog = useFuse({
    data: [firstBlog],
    options: { keys: filterKeys },
    term: query,
  });

  const filteredEntries = useFuse({
    data: otherBlogs,
    options: { keys: filterKeys },
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
    initialPageSize: 9,
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
        className="z-10 hidden md:block"
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
        className="hidden lg:block"
      />
      <div className="pt-20 pb-20">
        <div className="grid md:grid-cols-3 md:gap-x-12 gap-y-10 px-10 xl:px-48 auto-rows-min">
          {filteredFirstBlog.length !== 0 && currentPage === 0 && (
            <div
              key={filteredFirstBlog[0].fields.slug}
              className={'col-span-full'}
            >
              <BlogEntrySummary blog={filteredFirstBlog[0]} heading />
            </div>
          )}
          {filteredEntries.slice(startIndex, endIndex + 1).map((blog) => (
            <div key={blog.fields.slug} className="col-span-full md:col-span-1">
              <BlogEntrySummary blog={blog} />
            </div>
          ))}
        </div>
        <div className="flex flex-row mx-auto gap-10 justify-center p-16">
          <DarkButton
            onClick={() => {
              setPreviousPage();
            }}
            className="font-mono font-bold uppercase flex"
            disabled={!previousEnabled}
          >
            <div>
              <FontAwesomeIcon icon={leftArrow} size="xs" />
            </div>
            <span className="pl-3">Previous</span>
          </DarkButton>
          <DarkButton
            onClick={() => {
              setNextPage();
            }}
            className="font-mono font-bold uppercase"
            disabled={!nextEnabled}
          >
            <div className="flex">
              <span className="pr-3">Next</span>
              <div>
                <FontAwesomeIcon icon={rightArrow} size="xs" />
              </div>
            </div>
          </DarkButton>
        </div>
      </div>
    </>
  );
};

export default Blog;
