import { NextSeo } from 'next-seo';
import React, { useMemo, useState } from 'react';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';
import { SectionHeader } from 'components/decoration/textBlocks';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import { trpc } from 'lib/client/trpc';
import RequestFilters from 'components/layout/playground/requests/filters';
import CustomImage from 'components/decoration/customImage';
import { pixelHeart } from 'images/separators';
import { LightButton } from 'components/decoration/buttons';
import SquareField from 'components/decoration/squares';

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
        <SectionHeader header={['Requests', 'for support']}>
          Find volunteer and paid opportunities to support the animal protection
          movement, or if you&apos;re a vegan advocate or organization, submit a
          request of your own!
        </SectionHeader>
        <div className="mt-10 mb-20 lg:mx-12 2xl:mx-44 xl:mx-36">
          <RequestFilters onChange={setFilters} filters={filters} />
          <div className="grid gap-8 mt-10 sm:grid-cols-2">
            {/* TODO: no available requests message */}
            {requests?.map((request) => (
              <PlaygroundRequestCard key={request.id} request={request} />
            ))}
          </div>
          {requests?.length === 0 && (
            <div className="mx-auto text-center text-gray-500">
              There are no requests matching your criteria
            </div>
          )}
        </div>
        <SquareField
          squares={[
            { bottom: 0, left: 0, color: 'grey', size: 16 },
            { top: 0, right: 0, color: 'white', size: 16 },
            { top: 16, right: 16, color: 'white', size: 16 },
          ]}
        />
        <div className="space-y-5 text-white py-14 bg-grey">
          <div>
            <div className="w-20 mx-auto">
              <CustomImage src={pixelHeart} alt="" />
            </div>
            <h2 className="text-2xl font-bold">Need support?</h2>
          </div>

          <div className="px-10 mx-auto text-xl md:w-1/2">
            If you are a vegan individual or organization that needs help with
            your work in helping the animals, you can apply for free support
            from Playground!
          </div>
          <LightButton href="/playground/submit" className="mx-auto w-fit">
            Submit you request
          </LightButton>
        </div>
      </div>
    </>
  );
};

Playground.Layout = PlaygroundLandingLayout;
export default Playground;
