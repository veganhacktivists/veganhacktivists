import { NextSeo } from 'next-seo';
import React, { useMemo, useRef, useState } from 'react';
import {
  faLongArrowAltLeft as leftArrow,
  faLongArrowAltRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useExtendedPagination } from '../../hooks/useExtendedPagination';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';
import { SectionHeader } from 'components/decoration/textBlocks';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import { trpc } from 'lib/client/trpc';
import RequestFilters from 'components/layout/playground/requests/filters';

import { DarkButton, LightButton } from 'components/decoration/buttons';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { pixelHeart } from 'images/separators';

import type PageWithLayout from 'types/persistentLayout';

const Playground: PageWithLayout = ({}) => {
  const [filters, setFilters] = useState<
    trpc['playground']['getAllRequests']['input']
  >(() => ({
    sort: {
      createdAt: 'desc',
      dueDate: 'desc',
    },
    filter: {},
  }));
  const params = useMemo(() => {
    const { sort, ...otherFilters } = filters;
    return { sort, ...otherFilters };
  }, [filters]);

  const { data: requests } = trpc.proxy.playground.getAllRequests.useQuery(
    params,
    {
      keepPreviousData: true,
    }
  );
  const {
    startIndex,
    endIndex,
    setNextPage,
    setPreviousPage,
    increasePageParam,
    decreasePageParam,
    previousEnabled,
    nextEnabled,
  } = useExtendedPagination({
    totalItems: requests?.length,
    initialPageSize: 6,
    initialPage: 0,
  });
  const requestContainer = useRef<HTMLDivElement>(null);
  const scrollUp = () => {
    if (!requestContainer.current) return;

    window.scrollTo({
      top: requestContainer.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <NextSeo title="Requests" />
      <div>
        <SectionHeader header={['View pending', 'requests']}>
          View a list of requests below to find volunteer or paid opportunities
          to help the animals! Are you a vegan advocate or organization? Submit
          a request of your own!
        </SectionHeader>
        <div
          className="mt-10 mb-20 lg:mx-12 2xl:mx-44 xl:mx-36"
          ref={requestContainer}
        >
          <RequestFilters onChange={setFilters} filters={filters} />
          <div className="grid gap-8 mx-20 mt-10 md:mx-5 md:grid-cols-2">
            {/* TODO: no available requests message */}
            {requests?.slice(startIndex, endIndex + 1).map((request) => (
              <PlaygroundRequestCard key={request.id} request={request} />
            ))}
          </div>
          {requests?.length === 0 ? (
            <div className="mx-auto text-center text-gray-500">
              There are no requests matching your criteria
            </div>
          ) : (
            <div className="flex flex-row justify-center gap-10 p-16 mx-auto">
              <DarkButton
                className="flex font-mono font-bold uppercase"
                onClick={() => {
                  decreasePageParam();
                  setPreviousPage();
                  setTimeout(() => {
                    scrollUp();
                  }, 1);
                }}
                disabled={!previousEnabled}
              >
                <div>
                  <FontAwesomeIcon icon={leftArrow} size="xs" />
                </div>
                <span className="hidden pl-3 md:block">Previous</span>
              </DarkButton>
              <DarkButton
                className="font-mono font-bold uppercase"
                onClick={() => {
                  increasePageParam();
                  setNextPage();
                  setTimeout(() => {
                    scrollUp();
                  }, 1);
                }}
                disabled={!nextEnabled}
              >
                <div className="flex">
                  <span className="hidden pr-3 md:block">Next</span>
                  <div>
                    <FontAwesomeIcon icon={rightArrow} size="xs" />
                  </div>
                </div>
              </DarkButton>
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

          <div className="px-10 pt-4 pb-4 mx-auto text-xl md:w-1/2">
            If you are a vegan individual or organization that needs help with
            your work in helping the animals, you can apply for free support
            from Playground!
          </div>
          <LightButton href="/playground/submit" className="mx-auto w-fit">
            Submit your request
          </LightButton>
        </div>
      </div>
    </>
  );
};

Playground.Layout = PlaygroundLandingLayout;
export default Playground;
