import React from 'react';
import Hero from '../../components/decoration/hero';

import { NextSeo } from 'next-seo';
import { YearInReviewHeader } from '../../components/layout/yearInReview/layout';

import FeedbackAndTesting from '../../components/layout/yearInReview/2021/feedbackAndTesting';
import CommunityGrowth from '../../components/layout/yearInReview/2021/communityGrowth';
import AnimatedVideos from '../../components/layout/yearInReview/2021/animatedVideos';
import Intro from '../../components/layout/yearInReview/2021/intro';

// images imports
import heroBackground from '../../../public/images/yearInReview/2021/2021-hero.jpg';
import heroTagline from '../../../public/images/yearInReview/2021/2021-type.png';
import MinorChangesBigImpact from '../../components/layout/yearInReview/2021/minorChangesBigImpact';
import DesignsForVeganOrgs from '../../components/layout/yearInReview/2021/designsForVeganOrgs';
import type { FeaturedBlogPostsProps } from '../../components/layout/yearInReview/2021/featuredBlogPosts';
import FeaturedBlogPosts from '../../components/layout/yearInReview/2021/featuredBlogPosts';
import type {
  IBlogEntryFields,
  ITagFields,
  ITeamMemberFields,
} from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import { sortByArray } from '../../lib/helpers/array';

interface YearInReviewProps {
  featuredMembers: FeaturedBlogPostsProps['featuredBlogPosts'];
}

export const getStaticProps: GetStaticProps = async () => {
  const memberNames = [
    'Joaquín Triñanes',
    'Stephan de Vries',
    'David van Beveren',
    'Kate Rodman',
    'Suan Chin Yeo',
  ];

  const [unorderedMembers, [meetTheTeamTag]] = await Promise.all([
    getContents<ITeamMemberFields>({
      contentType: 'teamMember',
      query: {
        filters: {
          in: {
            name: memberNames,
          },
        },
      },
    }),
    getContents<ITagFields>({
      contentType: 'tag',
      query: {
        slug: 'meet-the-team',
      },
    }),
  ]);

  const members = sortByArray(
    unorderedMembers,
    memberNames,
    (member) => member.fields.name
  );

  const meetTheMembers = await getContents<IBlogEntryFields>({
    contentType: 'blogEntry',
    query: {
      'tags.sys.id': meetTheTeamTag.sys.id,
    },
  });

  return {
    props: {
      featuredMembers: members.map((member) => ({
        member,
        blogEntry: meetTheMembers.find((blogEntry) =>
          blogEntry.fields.title.includes(member.fields.name.split(' ')[0])
        ),
      })),
    },
  };
};

const YearInReview2021: React.FC<YearInReviewProps> = ({ featuredMembers }) => {
  return (
    <>
      <NextSeo title="2021 in Review" />
      <div className="mb-20 text-2xl">
        <YearInReviewHeader
          year={2021}
          hero={
            <Hero
              imageBackground={heroBackground}
              tagline={{
                image: heroTagline,
                alt: '2020 year in review',
              }}
              alignment="left"
              classNameMapping={{
                container: 'bg-center',
              }}
            />
          }
        />

        <Intro />
        <FeedbackAndTesting />
        <CommunityGrowth />
        <AnimatedVideos />
        <MinorChangesBigImpact />
        <DesignsForVeganOrgs />
        <FeaturedBlogPosts featuredBlogPosts={featuredMembers} />
      </div>
    </>
  );
};

export default YearInReview2021;
