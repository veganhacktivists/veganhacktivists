import { NextSeo } from 'next-seo';

import SquareField from '../../components/decoration/squares';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';

import SubmitRequestForm from 'components/layout/playground/submitRequestForm';

import type PageWithLayout from 'types/persistentLayout';

const Header: React.FC = () => {
  return (
    <div>
      <h3 className="text-3xl uppercase font-mono font-bold mb-3">
        Need support? Let us know!
      </h3>
      <div>Please fill in the form below.</div>
    </div>
  );
};

const SubmitRequestPage: PageWithLayout = ({}) => {
  return (
    <>
      <NextSeo title="Submit Your Request" />
      <Header />
      <SquareField
        squares={[
          { size: 16, top: -16, color: 'grey-background' },
          { size: 16, top: -16, right: 0, color: 'grey-background' },
          { size: 16, top: 0, right: 0, color: 'white' },
        ]}
        className="mt-11"
      />
      <SubmitRequestForm />
    </>
  );
};

SubmitRequestPage.Layout = PlaygroundLandingLayout;

export default SubmitRequestPage;
