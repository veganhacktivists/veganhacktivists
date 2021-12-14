import React from 'react';
import type { IProjectFields } from '../../../../types/generated/contentful';
import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import { HighlightedProjects } from '../highlightedProjects';
import SectionContainer from '../sectionContainer';

const formatNumber: (x: number) => string = (x) => {
  return new Intl.NumberFormat('en-US').format(x);
};

export const projectDescriptions: Record<string, React.ReactNode> = {
  'Activist Hub': (
    <>
      <p>
        We surveyed over {formatNumber(1100)} animal rights activists to
        understand what tools would best support their advocacy. The number one
        request was a method of monitoring our effectiveness in order to make
        informed decisions about our strategy and future efforts. So, we created
        Activist Hub!
      </p>
      <p>
        Activist Hub is an online tool that allows activists to see how many
        people they have inspired to watch documentaries like Dominion, The Game
        Changers, Seaspiracy, to take a vegan challenge, to request a vegan
        mentor, and even to go vegan!
      </p>
      <p>
        Activist Hub also acts as the world’s first animal rights social
        network! Add friends, join groups, share or create posts, strategize and
        talk with other activists. Our hub is 100% free to use for any
        individual or organization advocating on behalf of animals.
      </p>
    </>
  ),
  'Vegan Linguists': (
    <>
      Vegan Linguists is a free content translation service that translates
      vegan-friendly content to help make veganism more accessible worldwide! We
      worked and launched with several well established organizations such as
      Animal Ethics, Faunalytics, Peace Advocacy Network, Sinergia Animal, among
      many others.
    </>
  ),
  '3 Movies': (
    <>
      Watch three thought-provoking movies that shed light on uncomfortable
      realities, and explore other resources for support! 3movies.org allows you
      to create your own landing page with vegan documentaries, videos,
      resources, challenges, and more, to share with friends, family, or online
      - and then track all of the clicks and watch time you get. Your 3 Movies
      link is the only link you&apos;ll ever need to share during your outreach!
    </>
  ),
  'Watch Dominion': (
    <>
      Watch Dominion provides easy multi-language access to the most promoted
      documentary in the vegan movement, Dominion. Watch Dominion also allows
      other organizations to embed Dominion (without age restrictions or worries
      of it being taken down) on their own website while collecting watch-time
      statistics. Anonymous for the Voiceless, DontWatch.org, Viena Animal Save,
      and many others use this project now for uninterrupted access.
    </>
  ),
};

export interface FeaturedProjectsProps {
  projects: IProjectFields[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <>
      <SectionContainer
        header={<SectionHeader header={['Featured', 'projects']} />}
        color="grey-background"
      >
        <HighlightedProjects
          projects={projects.map((project) => ({
            ...project,
            customDescription: projectDescriptions[project.name],
          }))}
        />
      </SectionContainer>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-light', left: 0, bottom: 0 },
          { color: 'grey', right: 0, top: 0 },
        ]}
      />
    </>
  );
};

export default FeaturedProjects;
