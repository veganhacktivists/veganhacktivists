import { NextSeo } from 'next-seo';
import { useIntl } from 'react-intl';

import WorkHero from 'components/layout/work/workHero';
import OurWork from 'components/layout/work/ourWork';
import LegacyProjects from 'components/layout/work/legacyProjects';
import OtherProjects from 'components/layout/work/otherProjects';
import DesignWork from 'components/layout/work/designWork';
import KindWords from 'components/layout/work/kindWords';
import OurCommunities from 'components/layout/work/ourCommunities';
import StateOfData from 'components/layout/work/stateOfData';
import GrantProgram from 'components/layout/work/grantProgram';
import Playground from 'components/layout/work/playground';
import SharingKnowledgeAndSupport from 'components/layout/work/sharingKnowledgeAndSupport';
import LikeWhatYouSee from 'components/layout/work/likeWhatYouSee';
import { getFeaturedProjects } from 'lib/cms/helpers';
import { getContents } from 'lib/cms';
import ProvegIncubator from 'components/layout/work/provegIncubator';

import type { IProject, IProjectFields } from 'types/generated/contentful';
import type { InferGetStaticPropsType } from 'next';

export const getStaticProps = async () => {
  const [featuredProjects, otherProjects] = await Promise.all([
    getFeaturedProjects(),
    getContents<IProjectFields>({
      contentType: 'project',
      query: {
        isFeatured: false,
        filters: {
          ne: { showInWebsite: false },
          exists: { retiredInfo: false },
        },
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
    revalidate: 480,
  };
};

const Work = ({
  featuredProjects,
  otherProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const intl = useIntl();

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.work.next-seo.title',
          defaultMessage: 'Our Work',
        })}
      />

      <WorkHero />

      <OurWork />

      <LegacyProjects featuredProjects={featuredProjects} />

      <OtherProjects projects={otherProjects} />

      <DesignWork />

      <KindWords />

      <OurCommunities />

      <StateOfData />

      <GrantProgram />

      <ProvegIncubator />

      <Playground />

      <SharingKnowledgeAndSupport />

      <LikeWhatYouSee />
    </>
  );
};

export default Work;
