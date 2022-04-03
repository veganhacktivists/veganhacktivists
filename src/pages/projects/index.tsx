import React, { Fragment, useEffect, useMemo, useState } from 'react';

import { DarkButton, WhiteButton } from '../../components/decoration/buttons';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import type { IProject } from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';
import { getProjects } from '../../lib/cms/helpers';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ContentfulImage from '../../components/layout/contentfulImage';
import Link from 'next/link';
import useViewMore from '../../hooks/useViewMore';
import { firstLetterUppercase } from '../../lib/helpers/strings';
import { NextSeo } from 'next-seo';
import type PageWithLayout from '../../types/persistentLayout';
import ProjectsLayout from '../../components/layout/projects/layout';
import YearSelector from '../../components/layout/projects/yearSelector';

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects();
  const projectYears = Array.from(
    new Set(
      projects.map((project) => new Date(project.fields.date).getFullYear())
    )
  ).sort((a, b) => b - a);

  return {
    props: { projects, projectYears },
    revalidate: 480,
  };
};

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { name, description, url, date: dateStr, image, team } = project.fields;

  const date = new Date(dateStr);
  const imageSize = 280;
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      {image && (
        <div className="flex-shrink">
          <ContentfulImage
            image={image}
            alt={name}
            layout="fixed"
            height={imageSize}
            width={imageSize}
          />
        </div>
      )}
      <div className="sm:pl-10 col-span-2 text-left">
        <h1 className="text-4xl font-bold mb-5">{name}</h1>
        <div className="text-xl">{documentToReactComponents(description)}</div>
        <div className="mt-10 flex flex-wrap items-center">
          <DarkButton href={url} className="font-mono" capitalize={false}>
            {firstLetterUppercase(
              url.replace(/https?:\/\//, '').replace(/\/$/, '')
            )}
          </DarkButton>
          <span className="font-bold sm:pl-5">
            <span className="text-grey">
              {new Intl.DateTimeFormat('en', {
                month: 'short',
                year: 'numeric',
              }).format(date)}
            </span>
            {team && (
              <>
                {' '}
                -{' '}
                <Link
                  href={{
                    pathname: '/people/team',
                    hash: team.fields.isInactive ? null : team.fields.slug,
                  }}
                  scroll={true}
                >
                  <a>
                    {team.fields.icon}{' '}
                    <span style={{ color: team.fields.color }}>
                      {team.fields.name}
                    </span>
                  </a>
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

interface ProjectsProps {
  projects: IProject[];
  projectYears: number[];
}

const Projects: PageWithLayout<ProjectsProps> = ({
  projects,
  projectYears,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const projectsForSelectedYear = useMemo(() => {
    if (selectedYear === null) {
      return projects;
    }
    return projects.filter((project) => {
      const date = new Date(project.fields.date);
      return date.getFullYear() === selectedYear;
    });
  }, [selectedYear, projects]);

  const { pageNumber, pageSize, viewMore, reset } = useViewMore(10);

  useEffect(() => {
    reset();
  }, [selectedYear]);

  const pagedProjects = useMemo(
    () => projectsForSelectedYear.slice(0, pageSize * pageNumber),
    [projectsForSelectedYear, pageSize * pageNumber]
  );

  return (
    <>
      <NextSeo title="Projects" />
      <FirstSubSection header="Our projects">
        We&apos;re constantly working on new projects every month, whether
        they&apos;re ideas of our own or supporting organizations and activists
        that reach out to us. Below is a list of our work, and which of our
        teams worked on it.
      </FirstSubSection>
      <YearSelector
        years={projectYears}
        selectedYear={selectedYear}
        onChange={setSelectedYear}
      />
      <div className="w-3/4 mx-auto my-10 text-xl">
        {pagedProjects.map((project) => (
          <div
            key={project.fields.name}
            className="flex flex-col sm:flex-row justify-between mt-10 first:mt-0"
          >
            <ProjectCard key={project.fields.name} project={project} />
          </div>
        ))}
        {pagedProjects.length < projectsForSelectedYear.length && (
          <div className="mt-16">
            <WhiteButton
              className="font-mono content-center text-2xl"
              onClick={() => viewMore()}
            >
              Load more
            </WhiteButton>
          </div>
        )}
      </div>
    </>
  );
};

Projects.getLayout = ProjectsLayout;

export default Projects;
