import { SectionHeader } from '../../../decoration/textBlocks';

import docImage from '../../../../../public/images/yearInReview/2021/comm_docs.png';
import safetyImage from '../../../../../public/images/yearInReview/2021/comm_safety.png';
import techImage from '../../../../../public/images/yearInReview/2021/comm_tech.png';
import CustomImage from '../../../decoration/customImage';
import React from 'react';
import SectionContainer from '../sectionContainer';

const growthPoints: {
  image: StaticImageData;
  header: string;
  content: React.ReactNode;
}[] = [
  {
    image: docImage,
    header: 'Documentation',
    content: (
      <>
        Growth doesn&apos;t just come in numbers, it comes in structure. We
        combined our organization documentation from 4 different platforms into one easily
        digestible section of our new website.
      </>
    ),
  },
  {
    image: techImage,
    header: 'Technology',
    content: (
      <>
        We&apos;ve embraced new technologies in order to be able to both improve
        the quality of our projects, and bring in more talent, such as those who
        prefer other languages like JavaScript.
      </>
    ),
  },
  {
    image: safetyImage,
    header: 'Safety',
    content: (
      <>
        We now have a Code of Conduct for our growing community, and ask all
        roles to complete our Effective Communication, Unconscious
        Bias, and Consent training courses in order to foster a healthy and
        inclusive environment.
      </>
    ),
  },
];

const imageDimension = 150;

const CommunityGrowth: React.FC = () => {
  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={['Encouraging', 'community growth']}
            className="text-grey"
          />
        }
      >
        <div>
          <div className="mx-auto md:w-2/3 pb-10">
            {growthPoints.map(({ image, header, content }) => (
              <div
                key={header}
                className="flex flex-col md:flex-row gap-x-10 mb-10 last:mb-0 pt-10"
              >
                <div>
                  <CustomImage
                    src={image}
                    alt=""
                    layout="fixed"
                    height={imageDimension}
                    width={imageDimension}
                  />
                </div>
                <div className="md:text-left">
                  <h2 className="text-4xl font-bold text-grey mb-4">
                    {header}
                  </h2>
                  <div className="text-2xl">{content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default CommunityGrowth;
