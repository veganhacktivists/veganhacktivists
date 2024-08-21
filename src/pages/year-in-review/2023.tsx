import { NextSeo } from 'next-seo';
import React from 'react';
import { useIntl } from 'react-intl';

import Hero from '../../components/decoration/hero';
import { YearInReviewHeader } from '../../components/layout/yearInReview/layout';
import Intro from '../../components/layout/yearInReview/2023/intro';
import heroBackground from '../../../public/images/yearInReview/2023/2023-hero.jpg';
import heroTagline from '../../../public/images/yearInReview/2023/2023-type.png';

const YearInReview2023: React.FC = ({}) => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.year-in-review.2023.next-seo.title',
          defaultMessage: '2023 in Review',
        })}
      />
      <div className='text-2xl'>
        <YearInReviewHeader
          year={2023}
          hero={
            <Hero
              imageAlignment='65%_25%'
              imageBackground={heroBackground}
              tagline={{
                image: heroTagline,
                alt: intl.formatMessage({
                  id: 'page.year-in-review.2023.section.header.image.alt-text',
                  defaultMessage: '2023 year in review',
                }),
              }}
              alignment='left'
              classNameMapping={{
                container: 'bg-center',
              }}
            />
          }
          customMainSection={
            <div className='text-center text-xl md:w-3/4 pb-10 mx-auto space-y-5 mt-12 px-5 max-w-4xl'>
              <h2 className='text-5xl font-mono font-bold'>
                {intl.formatMessage({
                  id: 'page.year-in-review.2023.section.header.title',
                  defaultMessage:
                    'Serving Our Movement with New Tools & Technology',
                })}
              </h2>
              <p>
                {intl.formatMessage({
                  id: 'page.year-in-review.2023.section.header.content',
                  defaultMessage:
                    "In <no-localization>2023</no-localization>, we strengthened our role as capacity builders, saving the movement the largest amount of funds in our history. By serving over <no-localization>130</no-localization> organizations this year alone with our tech, design, and advisory services, we managed to save the movement a staggering <no-localization>$750k</no-localization>. As we continue through <no-localization>2024</no-localization>, we maintain our focus on leveraging the solid foundation we've built in <no-localization>2023</no-localization> to continue addressing the existing gaps within our movement and making the animal advocacy space more powerful than before.",
                })}
              </p>
            </div>
          }
        />
        <Intro />
      </div>
    </>
  );
};

export default YearInReview2023;
