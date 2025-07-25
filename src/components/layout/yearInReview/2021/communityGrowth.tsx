import type React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { SectionHeader } from '../../../decoration/textBlocks';
import docImage from '../../../../../public/images/yearInReview/2021/comm_docs.png';
import safetyImage from '../../../../../public/images/yearInReview/2021/comm_safety.png';
import techImage from '../../../../../public/images/yearInReview/2021/comm_tech.png';
import SectionContainer from '../sectionContainer';

import CustomImage from 'components/decoration/customImage';

import type { StaticImageData } from 'next/image';

const growthPoints: {
  image: StaticImageData;
  header: React.ReactNode;
  content: React.ReactNode;
}[] = [
  {
    image: docImage,
    header: (
      <FormattedMessage
        id="page.year-in-review.2021.section.community-growth.documentation.heading"
        defaultMessage="Documentation"
      />
    ),
    content: (
      <>
        <FormattedMessage
          id="page.year-in-review.2021.section.community-growth.documentation.paragraph"
          defaultMessage="Growth doesn't just come in numbers, it comes in structure. We combined our organization documentation from four different platforms into one user-friendly section of our new website."
        />
      </>
    ),
  },
  {
    image: techImage,
    header: (
      <FormattedMessage
        id="page.year-in-review.2021.section.community-growth.technology.heading"
        defaultMessage="Technology"
      />
    ),
    content: (
      <>
        <FormattedMessage
          id="page.year-in-review.2021.section.community-growth.technology.paragraph"
          defaultMessage="We've embraced new technologies to improve the overall quality and robustness of our projects, as well as meet our developers where they're at."
        />
      </>
    ),
  },
  {
    image: safetyImage,
    header: (
      <FormattedMessage
        id="page.year-in-review.2021.section.community-growth.safety.heading"
        defaultMessage="Safety"
      />
    ),
    content: (
      <>
        <FormattedMessage
          id="page.year-in-review.2021.section.community-growth.safety.paragraph"
          defaultMessage="We now have a Code of Conduct for our growing community, and ask all volunteers to complete our Effective Communication, Unconscious Bias, and Consent training courses in order to foster a healthy and inclusive environment."
        />
      </>
    ),
  },
];

const imageDimension = 150;

const CommunityGrowth: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.community-growth.headline',
              defaultMessage: 'Encouraging <b>community growth</b>',
            })}
            className="text-grey"
          />
        }
      >
        <div>
          <div className="mx-auto md:w-2/3 pb-10">
            {growthPoints.map(({ image, header, content }) => (
              <div
                key={image.src}
                className="flex flex-col md:flex-row gap-x-10 mb-10 last:mb-0 pt-10"
              >
                <div className={'shrink-0'}>
                  <CustomImage
                    src={image}
                    alt=""
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
