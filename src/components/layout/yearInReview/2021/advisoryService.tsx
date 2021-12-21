import CustomImage from '../../../decoration/customImage';
import SectionContainer from '../sectionContainer';

import advisorService from '../../../../../public/images/yearInReview/2021/advisory.png';
import React from 'react';
import { SectionHeader } from '../../../decoration/textBlocks';
import { DarkButton } from '../../../decoration/buttons';
import SquareField from '../../../decoration/squares';

const AdvisoryService: React.FC = () => {
  return (
    <>
      <SectionContainer>
        <div className="flex flex-col md:flex-row md:w-3/4 mx-auto gap-x-10 justify-center">
          <div className="mx-auto w-2/3 md:w-[100rem] pb-5 md:pb-0 md:flex-grow">
            <CustomImage src={advisorService} alt="" layout="responsive" />
          </div>
          <div className="mx-auto md:text-left space-y-5 text-2xl px-5">
            <SectionHeader
              header={['Our new', 'advisory service']}
              className="text-grey"
            />
            <p>
              We launched our newest service that connects people to our team of experts with a wide range of experience and skills. We welcome vegan activists and organizations to count us as a resource for their tech,
              org structure, strategy, marketing, grant requests, and more!
            </p>
            <p>
              We&apos;ve been very happy with this launch and we&apos;ve
              received over 100+ requests for advice! We have been able to assist organizations such as Sinergia Animal, The Humane League, Vegan
              Tokyo, Mercy for Animals, PETA, Animal Rights Advocates, among
              many others!
            </p>
            <div className="pb-10 pt-5"> 
            <DarkButton
              href="/services"
              className="font-semibold font-mono w-min mx-auto md:mx-0 mt-5"
            >
              Check out our services
            </DarkButton>
            </div>
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-light', left: 0, bottom: 0 },
          { color: 'grey', left: 0, top: 0 },
          { color: 'grey-light', right: 0, bottom: 0 },
        ]}
      />
    </>
  );
};

export default AdvisoryService;
