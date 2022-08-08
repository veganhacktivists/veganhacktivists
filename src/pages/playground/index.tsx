import { NextSeo } from 'next-seo';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';

import { SectionHeader } from 'components/decoration/textBlocks';

import PlaygroundRequestCard from 'components/layout/playground/requestCard';

import { trpc } from 'lib/client/trpc';

import type PageWithLayout from 'types/persistentLayout';

const Playground: PageWithLayout = ({}) => {
  const { data: requests, isFetched } =
    trpc.proxy.playground.requests.useQuery();

  return (
    <>
      <NextSeo title="Requests" />
      <div>
        <SectionHeader
          header={['Open requests', 'for support']}
        >
          Check out both volunteer and paid project requests from individuals and organizations seeking support for their work for the animals.
        </SectionHeader>
        <div className="grid gap-8 lg:mx-12 2xl:mx-44 xl:mx-36 sm:grid-cols-2">
          {/* TODO: no available requests message */}
          {isFetched &&
            requests?.map((request) => (
              <PlaygroundRequestCard key={request.id} request={request} />
            ))}
        </div>
      </div>
    </>
  );
};

Playground.Layout = PlaygroundLandingLayout;
export default Playground;
