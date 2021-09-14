import React, { useState } from 'react';
import { firstLetterUppercase } from '../../../lib/helpers/strings';
import { DarkButton } from '../../decoration/buttons';
import { FirstSubSection } from '../../decoration/textBlocks';
import { ContentButton } from './contentButton';

const ORGANIZATIONS = {
  savemovement: {
    title: 'Animal Save Movement',
    url: 'thesavemovement.org',
    content:
      // eslint-disable-next-line quotes
      `We were able to work with Animal Save and help them with their new website. We also
      helped with their Ad campaign and managed those for a few months to help promote more
      of Save's work and newsletter. If you haven't heard of Save, their mission is to hold
      vigils at every slaughterhouse and to bear witness to every exploited animal. They also
      run the Climate and Health Save Movement, which promote reversing catastrophic climate
      change and making plant-based diets accessible. It was an absolute joy to meet and work 
      with their team of passionate activists!`,
  },
  animalrebellion: {
    title: 'Animal Rebellion',
    url: 'animalrebellion.org',
    content:
      // eslint-disable-next-line quotes
      `We partnered with Animal Rebellion this year to help build their new website, which we dedicated
      an entire team for that took about 6 months of work. Their tech team were fantastic to work with,
      they were very knowledgeable and we felt like we were working with a team of professional during
      each encounter during our work. Animal Rebellion is a mass movement that uses nonviolent civil
      resistance to bring about a transition to a just and sustainable plant-based food system as an
      attempt to halt massive extinction, alleviate the worst effects of climate breakdown, and ensure
      justice for animals.`,
  },
  lebanesevegans: {
    title: 'Lebanese Vegans',
    url: 'lebanesevegans.org',
    content:
      // eslint-disable-next-line quotes
      `The Lebanese Vegans social hub is the only animal rights and vegan support center in Southwest Asia and
      North Africa offering free monthly workshops and lectures about veganism, free weekly food distribution
      and monthly campaigns raising awareness about animal rights. We were lucky enough to work with them to help
      them both launch their new website and also re-branding with a new logo. We had a great time working through
      our advisor, Seb Alex, who organizes the work behind Lebanese Vegans.`,
  },
  theexcelsior4: {
    title: 'The Excelsior 4',
    url: 'excelsior4.org',
    content:
      // eslint-disable-next-line quotes
      `The Excelsior 4 are four activists are facing charges, with 21 counts in total after exposing criminal animal
      cruelty at Excelsior Hog Farm. We worked with them to get a new site launched that would allow them to fundraise
      their legal defense as fast as possible. We really think that the work they did and what they exposed is extremely
      important and we're so happy to have had the chance to support and help them get up and running. Please do check
      them out and support if you can!`,
  },
};

export const Organizations: React.FC = ({}) => {
  const [organization, setOrganization] = useState('savemovement');
  return (
    <div className="pb-20 pt-8 bg-grey-background">
      <FirstSubSection
          header="Working with ORGANIZATIONS"
          firstWordsNum={2}
        />
      <div className="flex flex-col md:flex-row mx-auto justify-center gap-x-16">
        <div>
          <div className="overflow-hidden pb-80">
            <ContentButton
              white
              contentTitle="Save Movement"
              setContent={setOrganization}
              currentContent={organization}
            />
            <ContentButton
              white
              down={organization === 'savemovement'}
              contentTitle="Animal Rebellion"
              setContent={setOrganization}
              currentContent={organization}
            />
            <ContentButton
              white
              down={
                organization === 'savemovement' ||
                organization === 'animalrebellion'
              }
              contentTitle="Lebanese Vegans"
              setContent={setOrganization}
              currentContent={organization}
            />
            <ContentButton
              white
              down={organization !== 'theexcelsior4'}
              contentTitle="The Excelsior 4"
              setContent={setOrganization}
              currentContent={organization}
            />
          </div>
        </div>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 md:text-left gap-y-4 mt-8 md:mt-0 mx-auto md:mx-0">
          <h1 className="text-4xl font-bold mb-8">
            {ORGANIZATIONS[organization as keyof typeof ORGANIZATIONS].title}
          </h1>
          <p className="text-2xl">
            {ORGANIZATIONS[organization as keyof typeof ORGANIZATIONS].content}
          </p>
          <div className="flex mt-10">
            <DarkButton
              href={
                'https://' +
                ORGANIZATIONS[organization as keyof typeof ORGANIZATIONS].url
              }
              className="normal-case"
            >
              {firstLetterUppercase(
                ORGANIZATIONS[organization as keyof typeof ORGANIZATIONS].url
              )}
            </DarkButton>
          </div>
        </div>
      </div>
    </div>
  );
};