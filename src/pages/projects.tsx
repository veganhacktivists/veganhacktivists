import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import Hero from '../components/decoration/hero';
import { DarkButton, WhiteButton } from '../components/decoration/buttons';
import heroBackground from '../../public/images/VH-pig2-hero.jpg';
import heroTagline from '../../public/images/projects/hero-tagline.png';
import JoinTheTeam from '../components/layout/joinTheTeam';
import SquareField from '../components/decoration/squares';
import SuggestAnIdea from '../components/layout/suggestAnIdea';
import { FirstSubSection } from '../components/decoration/textBlocks';
import type { IProject } from '../types/generated/contentful';
import type { GetStaticProps } from 'next';
import { getProjects } from '../lib/cms/helpers';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ContentfulImage from '../components/layout/ContentfulImage';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'magenta', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow_orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const JOIN_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, top: 0 },
  { color: 'gray-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'gray-lighter', size: 16, right: 0, bottom: 0 },
];

const projectsYears = Array.from(
  { length: new Date().getFullYear() - 2017 },
  (_, index) => 2018 + index
);

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects();

  return {
    props: { projects },
  };
};

interface ProjectsProps {
  projects: IProject[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const projectsForSelectedYear =
    selectedYear !== null
      ? projects.filter(
          (project) =>
            new Date(project.fields.date).getFullYear() === selectedYear
        )
      : projects;

  return (
    <>
      <Head>
        <title>Projects | Vegan Hacktivists</title>
      </Head>
      <div>
        <Hero
          imageBackground={heroBackground.src}
          tagline={{
            image: heroTagline,
            alt: 'Building projects with impact',
          }}
          alignment="left"
          classNameMapping={{
            container: 'bg-center',
          }}
        />
        <SquareField
          squares={HERO_DECORATION_SQUARES}
          className="hidden md:block"
        />
        <FirstSubSection header="Our projects">
          We&apos;re constantly working on new projects every month, whether
          they&apos;re ideas of our own or supporting organizations and
          activists that reach out to us. Below is a list of our work, and which
          of our teams worked on it.
        </FirstSubSection>
        <div className="flex flex-col space-y-20 items-center mx-auto drop-shadow-2xl text-2xl pb-20">
          <div className="flex flex-wrap place-content-center justify-center">
            <WhiteButton
              className="w-40 uppercase flex-1 m-1"
              active={selectedYear === null}
              type="button"
              onClick={() => setSelectedYear(null)}
            >
              View all
            </WhiteButton>
            {projectsYears.map((year) => (
              <WhiteButton
                key={year}
                className="w-40 flex-1 m-1"
                type="button"
                onClick={() => setSelectedYear(year)}
                active={selectedYear === year}
              >
                {year}
              </WhiteButton>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-3/4">
            {projectsForSelectedYear.map((project) => {
              const {
                name,
                description,
                url,
                date: dateStr,
                image,
                team,
              } = project.fields;

              const date = new Date(dateStr);

              return (
                <Fragment key={name}>
                  {image && (
                    <div>
                      <ContentfulImage image={image} alt={name} />
                    </div>
                  )}
                  <div className="col-span-2 text-left">
                    <h1 className="text-4xl font-bold">{name}</h1>
                    <p className="my-3">
                      <span className="font-bold text-grey uppercase">
                        {new Intl.DateTimeFormat('en', {
                          month: 'short',
                          year: 'numeric',
                        }).format(date)}
                      </span>{' '}
                      -{' '}
                      <span
                        className="uppercase font-bold"
                        style={{ color: team.fields.color }}
                      >
                        {team?.fields.name}
                      </span>
                    </p>
                    <div>{documentToReactComponents(description)}</div>
                    <div className="mt-10 w-min">
                      <DarkButton href={url} className="font-mono">
                        {url.replace(/https?:\/\//, '').replace(/\/$/, '')}
                      </DarkButton>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
        <SquareField
          squares={JOIN_DECORATION_SQUARES}
          className="hidden md:block"
        />
        <SuggestAnIdea />
        <JoinTheTeam />
      </div>
    </>
  );
};

export default Projects;
