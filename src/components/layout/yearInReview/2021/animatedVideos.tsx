import CustomImage from '../../../decoration/customImage';
import CustomLink from '../../../decoration/link';
import { SectionHeader } from '../../../decoration/textBlocks';
import Link from 'next/link';

import ahCover from '../../../../../public/images/yearInReview/2021/activist-hub-video-thumb.png';
import vbCover from '../../../../../public/images/yearInReview/2021/vegan-bootcamp-introduction-thumbnail.png';
import SectionContainer from '../sectionContainer';

const AnimatedVideos: React.FC = () => {
  return (
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
          (formerly known as Better Eating International) in order to produce
          two animated introductory videos for Activist Hub and Vegan Bootcamp!
          These videos are fantastic resources for viewers to quickly get
          familiar with our work when on our landing page. We had a great time
          working with the Expanded Circle team and we&apos;ll be producing more
          with them for 2022.
        </SectionHeader>
      }
    >
      <div>
        <div className="flex flex-col md:flex-row mx-auto gap-10 w-2/3 mt-10">
          {/* TODO: better alts */}
          <div className="w-1/2">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/9W_nU_znBQk"
              title="Activist Hub - World's first animal rights social network and outreach dashboard!"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* <Link href="https://youtu.be/9W_nU_znBQk">
      <a>
        <CustomImage
          src={ahCover}
          alt="Click me to see the Activist Hub video!"
        />
      </a>
    </Link> */}
          </div>
          <div className="w-1/2">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/D9svDr0UhqI"
              title="Vegan Bootcamp - Free 30 day vegan challenge program!"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* <Link href="https://youtu.be/D9svDr0UhqI">
      <a>
        <CustomImage
          src={vbCover}
          alt="Click me to see the Vegan Bootcamp video!"
        />
      </a>
    </Link> */}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AnimatedVideos;
