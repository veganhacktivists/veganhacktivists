import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import SquareField from '../../components/decoration/squares';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';
import SubmitRequestForm from 'components/layout/playground/submitRequestForm';
import { SectionHeader } from 'components/decoration/textBlocks';

import type PageWithLayout from 'types/persistentLayout';

const Header: React.FC = () => {
  return (
    <div>
      <SectionHeader
        className="-mb-10"
        startWithBoldFont
        header="Need support? Let us know!"
      >
        Please fill in the form below.
      </SectionHeader>
    </div>
  );
};

const SubmitRequestPage: PageWithLayout = ({}) => {
  const router = useRouter();
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
        className="hidden md:block"
      />
      <SubmitRequestForm
        requestId={`${
          typeof router?.query?.id === 'string' ? router.query.id : ''
        }`}
      />
    </>
  );
};

SubmitRequestPage.Layout = PlaygroundLandingLayout;

export default SubmitRequestPage;
