import React from 'react';
import Link from 'next/link';

import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import brandGuideImage from '../../../../../public/images/yearInReview/2021/VH_BrandGuide.jpg';
import CustomImage from '../../../decoration/customImage';
import { LightButton } from '../../../decoration/buttons';
import SquareField from '../../../decoration/squares';

import type { BlogPostItem } from './featuredBlogPosts';

interface RebrandProps {
  kate: BlogPostItem;
}

const Rebrand: React.FC<RebrandProps> = ({ kate }) => {
  return (
    <>
      <SectionContainer color="grey-dark" className="text-white">
        <div className="flex flex-col-reverse md:flex-row gap-x-24 md:w-2/3 justify-center mx-auto">
          <div className="max-w-screen-sm">
            <CustomImage src={brandGuideImage} alt="Brand Guide" />
          </div>
          <div className="text-2xl md:text-left mx-auto md:w-2/3 space-y-5">
            <SectionHeader header={['Our', 'rebrand']} />
            <p>
              This year, we decided to professionally rebrand both the
              organization and our website from the ground up. We wanted our
              branding to still deeply represent our tech background, but also
              be far more inviting and fun to better represent our work and our
              community.
            </p>
            <p>
              We saw an immediate increase in applications on both our website
              and social platforms from interested volunteers for those who
              found us on either platform.
            </p>
            <p>
              Our branding was done by our newest Team Lead,{' '}
              <Link
                href={{
                  pathname: '/blog/[slug]',
                  query: { slug: kate.blogEntry.fields.slug },
                }}
                scroll
                className="font-bold"
                style={{ color: kate.member.fields.team?.fields.color }}
              >
                {kate.member.fields.name}
              </Link>
              , who&apos;s been at the heart of transforming the way we work and
              look at design here at VH.
            </p>
            <div className="w-min pt-5 mx-auto md:mx-0">
              <LightButton
                href="/resources/VH_BrandGuide.pdf"
                className="my-5"
                linkProps={{ target: '_blank', rel: 'noreferrer' }}
              >
                See our new brand guide!
              </LightButton>
            </div>
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey', left: 0, bottom: 0 },
          { color: 'grey-light', left: 0, top: 0 },
          { color: 'grey-light', right: 0, bottom: 0 },
        ]}
      />
    </>
  );
};

export default Rebrand;
