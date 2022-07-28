import { NextSeo } from 'next-seo';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';

import type PageWithLayout from 'types/persistentLayout';

const SubmitRequest: PageWithLayout = ({}) => {
  return (
    <>
      <NextSeo title="Submit Your Request" />
      <div>submit a request!</div>
    </>
  );
};

SubmitRequest.Layout = PlaygroundLandingLayout;

export default SubmitRequest;
