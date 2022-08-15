import { NextSeo } from 'next-seo';
import React, { useMemo, useState } from 'react';

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
            {requests?.map((request) => (
              <PlaygroundRequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

Playground.Layout = PlaygroundLandingLayout;
export default Playground;
