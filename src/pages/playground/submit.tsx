import { NextSeo } from 'next-seo';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';

import SubmitRequestForm from 'components/layout/playground/submitRequest';

import type PageWithLayout from 'types/persistentLayout';

const Header: React.FC = () => {
  return (
    <div>
      <h3>Need support? Let us know!</h3>
      <div>Please fill in the form below.</div>
    </div>
  );
};

const SubmitRequestPage: PageWithLayout = ({}) => {
  return (
    <>
      <NextSeo title="Submit Your Request" />
      <Header />
      <SubmitRequestForm />
    </>
  );
};

SubmitRequestPage.Layout = PlaygroundLandingLayout;

export default SubmitRequestPage;
