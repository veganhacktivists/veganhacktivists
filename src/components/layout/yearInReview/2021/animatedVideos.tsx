import React from 'react';
import CustomLink from '../../../decoration/link';
import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';

import SectionContainer from '../sectionContainer';

const AnimatedVideos: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[
          { color: 'grey-background', bottom: 0, left: 0, size: 24 },
          { color: 'white', top: 0, left: 0, size: 24 },
          { color: 'grey-background', bottom: 0, right: 0, size: 24 },
        ]}
        className="hidden md:block"
      />
      <SectionContainer
        color="grey-background"
        header={
          <SectionHeader
            className="text-grey"
            header={['Our new', 'animated videos']}
          >
            We&apos;ve partnered with{' '}
            <CustomLink href="https://expandedcircle.org/">
              Expanded Circle Collective
            </CustomLink>{' '}
             in order to produce
            two animated introductory videos for Activist Hub and Vegan
            Bootcamp! These videos are fantastic resources for viewers to
            quickly get familiar with our work. We look forward to continuing our work with them in the new year.
          </SectionHeader>
        }
      >
        <div>
          <div className="flex flex-col md:flex-row mx-auto gap-y-10 gap-x-10 md:w-2/3 mt-10 mb-10">
            <div className="md:w-1/2">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/9W_nU_znBQk"
                title="Activist Hub - World's first animal rights social network and outreach dashboard!"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="md:w-1/2">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/D9svDr0UhqI"
                title="Vegan Bootcamp - Free 30 day vegan challenge program!"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default AnimatedVideos;
