import { NextSeo } from 'next-seo';

import React, { useEffect, useMemo, useState } from 'react';

import {
  faLongArrowAltLeft as leftArrow,
  faLongArrowAltRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';

import { usePagination } from 'react-use-pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DarkButton } from '../../components/decoration/buttons';

import { useExtendedPagination } from '../../hooks/useExtendedPagination';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';

import { SectionHeader } from 'components/decoration/textBlocks';

import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';

import { trpc } from 'lib/client/trpc';

import RequestFilters from 'components/layout/playground/requests/filters';

import type { inferQueryInput } from 'lib/client/trpc';

import type PageWithLayout from 'types/persistentLayout';

const Playground: PageWithLayout = ({}) => {
  const [filters, setFilters] = useState<
    inferQueryInput<'playground.requests'>
  >(() => ({
    sort: {
      createdAt: 'desc',
      priority: 'desc',
    },
    filter: {},
  }));

  const params = useMemo(() => {
    const { sort, ...otherFilters } = filters;
    return { sort, ...otherFilters };
  }, [filters]);

  const { data: requests } = trpc.proxy.playground.requests.useQuery(params, {
    keepPreviousData: true,
  });
  // const {
  //   increase,
  //   decrease,
  //   startIndex,
  //   endIndex,
  //   setNextPage,
  //   setPreviousPage,
  // } = useExtendedPagination({
  //   length: requests?.length,
  //   pageSize: 6,
  //   currentPage: 0,
  // });
  const { startIndex, endIndex, setPreviousPage, setNextPage } = usePagination({
    totalItems: requests?.length,
    initialPageSize: 6,
  });

  return (
    <>
      <NextSeo title="Requests" />
      <div>
        <SectionHeader header={['Open requests', 'for support']}>
          Check out both volunteer and paid project requests from individuals
          and organizations seeking support for their work for the animals.
        </SectionHeader>
        <div className="mt-10 mb-10 lg:mx-12 2xl:mx-44 xl:mx-36">
          <RequestFilters onChange={setFilters} filters={filters} />
          <div className="grid gap-8 mt-10 sm:grid-cols-2">
            {/* TODO: no available requests message */}
            {requests?.slice(startIndex, endIndex + 1).map((request) => (
              <PlaygroundRequestCard key={request.id} request={request} />
            ))}
          </div>
          <div className="flex flex-row justify-center gap-10 p-16 mx-auto">
            <DarkButton
              className="flex font-mono font-bold uppercase"
              onClick={() => {
                // decrease();
                setPreviousPage();
              }}
            >
              <div>
                <FontAwesomeIcon icon={leftArrow} size="xs" />
              </div>
              <span className="hidden pl-3 md:block">Previous</span>
            </DarkButton>
            <DarkButton
              className="font-mono font-bold uppercase"
              onClick={() => {
                // increase();
                setNextPage();
              }}
            >
              <div className="flex">
                <span className="hidden pr-3 md:block">Next</span>
                <div>
                  <FontAwesomeIcon icon={rightArrow} size="xs" />
                </div>
              </div>
            </DarkButton>
          </div>
        </div>
      </div>
    </>
  );
};

Playground.Layout = PlaygroundLandingLayout;
export default Playground;
