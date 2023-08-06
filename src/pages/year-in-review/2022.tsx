import { NextSeo } from 'next-seo';
import React from 'react';

import Hero from '../../components/decoration/hero';
import { YearInReviewHeader } from '../../components/layout/yearInReview/layout';
import MoreEffectiveTeams from '../../components/layout/yearInReview/2022/moreEffectiveTeams';
import Intro from '../../components/layout/yearInReview/2022/intro';
import heroBackground from '../../../public/images/yearInReview/2022/2022-hero.jpg';
import heroTagline from '../../../public/images/yearInReview/2022/2022-type.png';
import MinorChangesBigImpact from '../../components/layout/yearInReview/2022/minorChangesBigImpact';
import ByTheNumbers from '../../components/layout/yearInReview/2022/byTheNumbers';
import Playground from '../../components/layout/yearInReview/2022/playground';
import NewVideos from '../../components/layout/yearInReview/2022/newVideos';
import MovingForward from '../../components/layout/yearInReview/2022/movingForward';

import SharingKnowledgeAndSupport from 'components/layout/yearInReview/2022/sharingKnowledgeAndSupport';
import FeaturedInterviews from 'components/layout/yearInReview/2022/featuredInterviews';
import GrantProgram from 'components/layout/yearInReview/2022/grantProgram';
import AnimalRightsAdvocates from 'components/layout/yearInReview/2022/animalRightsAdvocates';
import StateOfData from 'components/layout/yearInReview/2022/stateOfData';
import BonusProjects from 'components/layout/yearInReview/2022/bonusProjects';

const YearInReview2022: React.FC = ({}) => {
  return (
    <>
      <NextSeo title="2022 in Review" />
      <div className="text-2xl">
        <YearInReviewHeader
          year={2022}
          hero={
            <Hero
              imageBackground={heroBackground}
              tagline={{
                image: heroTagline,
                alt: '2022 year in review',
              }}
              alignment="left"
              classNameMapping={{
                container: 'bg-center',
              }}
            />
          }
        />

        <Intro />
        <MoreEffectiveTeams />
        <FeaturedInterviews
          interviews={[
            'leaders-in-animal-protection-jo-anne-mcarthur',
            'leaders-in-animal-protection-elly-nakajima',
            'leaders-in-animal-protection-lauren-ornelas',
            'leaders-in-animal-protection-aryenish-birdie',
            'leaders-in-animal-protection-aj-dahiya',
            'leaders-in-animal-protection-brooke-haggerty',
          ]}
        />
        <GrantProgram />
        <Playground />
        <NewVideos />
        <AnimalRightsAdvocates />
        <ByTheNumbers />
        <StateOfData />
        <BonusProjects />
        <MinorChangesBigImpact />
        <SharingKnowledgeAndSupport />
        <MovingForward />
      </div>
    </>
  );
};

export default YearInReview2022;
