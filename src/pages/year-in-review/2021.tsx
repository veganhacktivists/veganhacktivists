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
import type {
  BlogPostItem,
  FeaturedBlogPostsProps,
} from '../../components/layout/yearInReview/2021/featuredBlogPosts';
import FeaturedBlogPosts from '../../components/layout/yearInReview/2021/featuredBlogPosts';
import type {
  IBlogEntryFields,
  IProjectFields,
  ITagFields,
  ITeamMemberFields,
} from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import { sortByArray } from '../../lib/helpers/array';
import type { FeaturedProjectsProps } from '../../components/layout/yearInReview/2021/featuredProjects';
import { projectDescriptions } from '../../components/layout/yearInReview/2021/featuredProjects';
import FeaturedProjects from '../../components/layout/yearInReview/2021/featuredProjects';
import Rebrand from '../../components/layout/yearInReview/2021/rebrand';
import Partnerships from '../../components/layout/yearInReview/2021/partnerships';
import NewsletterLaunch from '../../components/layout/yearInReview/2021/newsletterLaunch';
import AdvisoryService from '../../components/layout/yearInReview/2021/advisoryService';
import ByTheNumbers from '../../components/layout/yearInReview/2021/byTheNumbers';
import Playground from '../../components/layout/yearInReview/2021/playground';
import MovingForward from '../../components/layout/yearInReview/2021/movingForward';

interface YearInReviewProps {
  featuredBlogPosts: FeaturedBlogPostsProps['featuredBlogPosts'];
  featuredProjects: FeaturedProjectsProps['projects'];
}

const getFeaturedBlogPosts = async () => {
  const memberSlugs = [
    'gerard-oneill',
    'kate-rodman',
    'joaquin-trinanes',
    'suan-chin',
    'david-van-beveren',
    'stephan-de-vries',
  ];

  const [unorderedMembers, [meetTheTeamTag]] = await Promise.all([
    getContents<ITeamMemberFields>({
      contentType: 'teamMember',
      query: {
        filters: {
          in: {
            slug: memberSlugs,
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
    memberSlugs,
    (member) => member.fields.slug
  );

  const meetTheMembers = await getContents<IBlogEntryFields>({
    contentType: 'blogEntry',
    query: {
      'tags.sys.id': meetTheTeamTag.sys.id,
    },
    other: { select: ['fields.slug', 'fields.title'] },
  });

  return members.map((member) => ({
    member,
    blogEntry: meetTheMembers.find((blogEntry) =>
      blogEntry.fields.title.includes(member.fields.name.split(' ')[0])
    ),
  }));
};

export const getFeaturedProjects = async () => {
  const projects = await getContents<IProjectFields>({
    contentType: 'project',
    query: {
      filters: {
        in: {
          name: Object.keys(projectDescriptions),
        },
      },
    },
  });

  const projectsSorted = sortByArray(
    projects,
    Object.keys(projectDescriptions),
    (project) => project.fields.name
  );

  return projectsSorted.map((project) => project.fields);
};

export const getStaticProps: GetStaticProps = async () => {
  const [featuredBlogPosts, featuredProjects] = await Promise.all([
    getFeaturedBlogPosts(),
    getFeaturedProjects(),
  ]);

  return {
    props: {
      featuredBlogPosts,
      featuredProjects,
    },
  };
};

const YearInReview2021: React.FC<YearInReviewProps> = ({
  featuredBlogPosts,
  featuredProjects,
}) => {
  return (
    <>
      <NextSeo title="2021 in Review" />
      <div className="text-2xl">
        <YearInReviewHeader
          year={2021}
          hero={
            <Hero
              imageBackground={heroBackground}
              tagline={{
                image: heroTagline,
                alt: '2021 year in review',
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
        <FeaturedBlogPosts featuredBlogPosts={featuredBlogPosts} />
        <FeaturedProjects projects={featuredProjects} />
        <Rebrand
          kate={
            featuredBlogPosts.find(
              (post) => post.member.fields.name === 'Kate Rodman'
            ) as BlogPostItem
          }
        />
        <Partnerships />
        <NewsletterLaunch />
        <AdvisoryService />
        <ByTheNumbers />
        {/* IdeaBoard */}
        <Playground />
        <MovingForward />
      </div>
    </>
  );
};

export default YearInReview2021;
