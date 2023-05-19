import { NextSeo } from 'next-seo';

import WorkHero from 'components/layout/work/workHero';
import OurWork from 'components/layout/work/ourWork';
import FeaturedProjects from 'components/layout/work/featuredProjects';
import OtherProjects from 'components/layout/work/otherProjects';
import DesignSamples from 'components/layout/work/designSamples';
import HoursVolunteered from 'components/layout/work/hoursVolunteered';
import KindWords from 'components/layout/work/kindWords';
import OurCommunities from 'components/layout/work/ourCommunities';
import StateOfData from 'components/layout/work/stateOfData';
import GrantProgram from 'components/layout/work/grantProgram';
import Playground from 'components/layout/work/playground';
import SharingKnowledgeAndSupport from 'components/layout/work/sharingKnowledgeAndSupport';
import LikeWhatYouSee from 'components/layout/work/likeWhatYouSee';
import { getFeaturedProjects } from 'lib/cms/helpers';
import { getContents } from 'lib/cms';

import type { IProject, IProjectFields } from 'types/generated/contentful';
import type { InferGetStaticPropsType } from 'next';

export const getStaticProps = async () => {
  const [featuredProjects, otherProjects] = await Promise.all([
    getFeaturedProjects(),
    getContents<IProjectFields>({
      contentType: 'project',
      query: {
        isFeatured: false,
      },
      other: {
        order: '-fields.date',
      },
    }) as Promise<IProject[]>,
  ]);

  return {
    props: {
      featuredProjects,
      otherProjects,
    },
  };
};

const Work = ({
  featuredProjects,
  otherProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo title="Our Work" />

      <WorkHero />

      <OurWork />

      <FeaturedProjects featuredProjects={featuredProjects} />

      <OtherProjects projects={otherProjects} />

      <DesignSamples />

      <HoursVolunteered />

      <KindWords />

      <OurCommunities />

      <StateOfData />

      <GrantProgram />

      <Playground />

      <SharingKnowledgeAndSupport />

      <LikeWhatYouSee />
    </>
  );
};

export default Work;
