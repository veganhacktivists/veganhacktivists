import React from 'react';

import ARABackground from '../../../../../public/images/yearInReview/2022/ara-background.png';
import ARALogo from '../../../../../public/images/yearInReview/2022/ara-logo.png';
import ARAAnimals from '../../../../../public/images/yearInReview/2022/ara-animals.png';
import ARADiscord from '../../../../../public/images/yearInReview/2022/ara-discord.png';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';

const AnimalRightsAdvocates: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[{ left: 0, bottom: 0, color: 'grey-background', size: 16 }]}
      />
      <div className="w-full relative">
        <CustomImage
          alt=""
          src={ARABackground}
          layout="fill"
          objectFit="cover"
          objectPosition={'top'}
        />
        <div className="flex relative z-10">
          <div className="flex flex-row">
            <div className="w-full lg:w-1/2 self-center">
              <div className="xl:w-2/3 lg:mx-0 lg:ml-5 py-10 lg:py-0 xl:ml-auto ">
                <div className="md:w-[668px] md:h-[204px] px-5 md:px-0 mx-auto lg:mx-0">
                  <CustomImage
                    alt="Animal Rights Advocates logo"
                    src={ARALogo}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 collapse lg:visible">
              <div className="flex">
                <CustomImage alt="ARA animals" src={ARAAnimals} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-grey px-5">
        <div className="xl:w-2/3 mx-auto flex flex-row flex-wrap py-20">
          <div className="text-white w-full md:w-2/3 text-center md:text-left md:pr-5">
            <span className="text-6xl font-mono font-bold uppercase">
              Uplifting online community
            </span>
            <div className="mt-10">
              <span className="text-xl">
                We acquired the largest animal rights online community in the
                world. Founded in 2019, Animal Rights Advocates (ARA) is a
                platform on Discord for young activists. ARA has over 22,000
                members who participate daily in vegan outreach efforts across
                hundreds of Discord communities. In addition to outreach events
                and training, this community also hosts AMA events with
                philosophers, activists, and influencers every week. ARA is also
                an inclusive community that strongly believes in
                intersectionality, feminism, diversity, trans rights, and more
                – a space where everyone is welcome.
              </span>
            </div>
          </div>
          <div className="md:pl-5 w-1/3 collapse md:visible">
            <div className="ml-auto flex ">
              <CustomImage src={ARADiscord} alt="ARA Discord" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalRightsAdvocates;
