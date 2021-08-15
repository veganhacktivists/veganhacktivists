import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import Hero from '../components/decoration/hero';
import { DarkButton, WhiteButton } from '../components/decoration/buttons';
import heroBackground from '../../public/images/VH-Hero-lamb.jpg';
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
import classNames from 'classnames';

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

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects();
  const projectYears = Array.from(
    new Set(
      projects.map((project) => new Date(project.fields.date).getFullYear())
    )
  ).sort((a, b) => b - a);

  return {
    props: { projects, projectYears },
  };
};

interface ProjectsProps {
  projects: IProject[];
  projectYears: number[];
}

const Projects: React.FC<ProjectsProps> = ({ projects, projectYears }) => {
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
            {projectYears.map((year) => (
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
          <div className="w-3/4">
            {projectsForSelectedYear.map((project, i) => {
              const {
                name,
                description,
                url,
                date: dateStr,
                image,
                team,
              } = project.fields;

              const date = new Date(dateStr);
              const imageSize = 300;
              return (
                <div
                  key={name}
                  className={classNames(
                    'flex flex-col sm:flex-row justify-between',
                    {
                      'mt-10': i !== 0,
                    }
                  )}
                >
                  {image && (
                    <div className="flex-shrink">
                      <ContentfulImage
                        image={image}
                        alt={name}
                        layout="fixed"
                        height={imageSize}
                        width={imageSize}
                        priority={i < 4}
                      />
                    </div>
                  )}
                  <div className="sm:pl-10 col-span-2 text-left">
                    <h1 className="text-4xl font-bold mb-5">{name}</h1>
                    <div className="text-xl">
                      {documentToReactComponents(description)}
                    </div>
                    <div className="mt-10 flex flex-wrap items-center">
                      <DarkButton href={url} className="font-mono">
                        {url.replace(/https?:\/\//, '').replace(/\/$/, '')}
                      </DarkButton>
                      <span className="uppercase font-bold sm:pl-5">
                        <span className="text-grey">
                          {new Intl.DateTimeFormat('en', {
                            month: 'short',
                            year: 'numeric',
                          }).format(date)}
                        </span>{' '}
                        -{' '}
                        <span style={{ color: team.fields.color }}>
                          {team?.fields.name}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
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
