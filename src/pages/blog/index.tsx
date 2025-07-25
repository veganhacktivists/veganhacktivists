import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltLeft as leftArrow,
  faLongArrowAltRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FormattedMessage, useIntl } from 'react-intl';

import useFuse from '../../hooks/useFuse';
import BlogEntrySummary from '../../components/layout/blog/blogEntrySummary';
import { DarkButton } from '../../components/decoration/buttons';
import { getBlogEntries } from '../../lib/cms/helpers';
import SquareField from '../../components/decoration/squares';
import BlogsHeader from '../../components/layout/blog/blogsHeader';
import Newsletter from '../../components/layout/newsletter';
import { getContents } from '../../lib/cms';
import SubtleBorder from '../../components/decoration/subtleBorder';
import { useHash } from '../../hooks/useHash';
import useOnce from '../../hooks/useOnce';
import { useExtendedPagination } from '../../hooks/useExtendedPagination';

import type {
  IBlogEntry,
  ITag,
  ITagFields,
} from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';

interface BlogProps {
  blogs: IBlogEntry[];
  tags: ITag[];
}

const BLOG_FILTER_OPTIONS = { keys: ['fields.title'] };

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getBlogEntries();
  const tags = await getContents<ITagFields>({ contentType: 'tag' });

  return {
    props: {
      blogs,
      tags,
    },
    revalidate: 480,
  };
};

const filterByTag: (entry: IBlogEntry, tagQuery?: string | null) => boolean = (
  entry,
  tagQuery,
) => {
  if (tagQuery === undefined) return true;

  if (tagQuery !== null && tagQuery !== 'other') {
    return !!entry.fields.tags?.find((tag) => tag.fields.slug === tagQuery);
  }

  return !entry.fields.tags;
};

const Blog: React.FC<BlogProps> = ({ blogs, tags }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hash, setHash] = useHash({ shallow: false });
  const router = useRouter();
  const { page, search } = router.query;

  const handleTagQuery = (tag?: string | null) => {
    setTagQuery(tag);
    setHash(tag);
  };

  useEffect(() => {
    setTagQuery(hash || undefined);
  }, [hash]);

  const [firstBlog, ...otherBlogs] = blogs;
  const [tagQuery, setTagQuery] = useState<string | null | undefined>(
    hash || undefined,
  );
  const filteredFirstBlog = useFuse({
    data: [firstBlog],
    options: BLOG_FILTER_OPTIONS,
    term: searchQuery,
  }).filter((entry) => filterByTag(entry, tagQuery));

  const filteredEntries = useFuse({
    data: otherBlogs,
    options: BLOG_FILTER_OPTIONS,
    term: searchQuery,
    sort: true,
  }).filter((entry) => filterByTag(entry, tagQuery));

  const {
    startIndex,
    endIndex,
    setPreviousPage,
    setNextPage,
    setPage,
    currentPage,
    previousEnabled,
    nextEnabled,
    increasePageParam,
    decreasePageParam,
  } = useExtendedPagination({
    totalItems: filteredEntries.length,
    initialPageSize: 9,
  });

  useOnce(
    () => {
      if (page !== undefined) {
        let newPage = Number(page);
        newPage -= 1;
        newPage = newPage >= 0 ? newPage : 0;
        if (newPage !== currentPage) {
          setPage(newPage);
        }
      }
      if (search !== undefined && typeof search === 'string') {
        if (search !== searchQuery) {
          setSearchQuery(search);
        }
      }
    },
    { enabled: router.isReady },
  );

  const updateSearchParam = useCallback(() => {
    void router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          search: searchQuery,
        },
      },
      undefined,
      { shallow: true },
    );
  }, [router, searchQuery]);

  const blogContainer = useRef<HTMLDivElement>(null);

  const scrollUp = useCallback(() => {
    if (!blogContainer.current) return;

    blogContainer.current.scrollIntoView({ behavior: 'auto' });
  }, []);

  const [animatedRef] = useAutoAnimate<HTMLDivElement>();
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.blog.next-seo.title',
          defaultMessage: 'Blog',
        })}
      />
      <SquareField
        squares={[
          { color: 'grey', size: 32, top: 0, left: 0 },
          { color: 'grey-dark', size: 16, top: 0, left: 32 },
          { color: 'grey-dark', size: 16, top: 0, right: 0 },
        ]}
        className="z-10 hidden md:block"
      />
      <BlogsHeader
        tags={tags}
        currentTag={tagQuery}
        onLeaveInput={updateSearchParam}
        onSearchChange={setSearchQuery}
        onTagChange={handleTagQuery}
        query={searchQuery}
      />
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
      <div className="pt-20 pb-20" ref={blogContainer}>
        {!filteredFirstBlog.length && !filteredEntries.length ? (
          <div className="mx-auto text-xl">
            <FormattedMessage
              id="page.blog.section.container.no-match"
              defaultMessage="No entries match your query"
            />
          </div>
        ) : (
          <div
            ref={animatedRef}
            className="grid px-10 md:grid-cols-3 md:gap-x-12 gap-y-10 xl:px-48 auto-rows-min"
          >
            {filteredFirstBlog.length !== 0 && currentPage <= 0 && (
              <SubtleBorder
                key={filteredFirstBlog[0].fields.slug}
                className="col-span-full"
              >
                <BlogEntrySummary blog={filteredFirstBlog[0]} heading />
              </SubtleBorder>
            )}
            {filteredEntries.slice(startIndex, endIndex + 1).map((blog) => (
              <SubtleBorder
                key={blog.fields.slug}
                className="col-span-full md:col-span-1"
              >
                <BlogEntrySummary blog={blog} />
              </SubtleBorder>
            ))}
          </div>
        )}

        <div className="flex flex-row justify-center gap-10 p-16 mx-auto">
          <DarkButton
            onClick={useCallback(() => {
              decreasePageParam();
              setPreviousPage();
              scrollUp();
            }, [decreasePageParam, scrollUp, setPreviousPage])}
            className="flex font-mono font-bold uppercase"
            disabled={!previousEnabled}
          >
            <div>
              <FontAwesomeIcon icon={leftArrow} size="xs" />
            </div>
            <span className="hidden pl-3 md:block">
              <FormattedMessage
                id="page.blog.section.navigation.btn.previous"
                defaultMessage="Previous"
              />
            </span>
          </DarkButton>
          <DarkButton
            onClick={useCallback(() => {
              increasePageParam();
              setNextPage();
              scrollUp();
            }, [increasePageParam, scrollUp, setNextPage])}
            className="font-mono font-bold uppercase"
            disabled={!nextEnabled}
          >
            <div className="flex">
              <span className="hidden pr-3 md:block">
                <FormattedMessage
                  id="page.blog.section.navigation.btn.next"
                  defaultMessage="Next"
                />
              </span>
              <div>
                <FontAwesomeIcon icon={rightArrow} size="xs" />
              </div>
            </div>
          </DarkButton>
        </div>
      </div>
      <SquareField
        squares={[
          { color: 'grey-background', size: 16, bottom: 0 },
          { color: 'grey-light', size: 16, top: 0, right: 0 },
          { color: 'grey-background', size: 16, bottom: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <div className="bg-grey-background">
        <Newsletter />
      </div>
    </>
  );
};

export default Blog;
