import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import {
  DarkButton,
  ShareButton,
  WhiteButton,
} from '../../components/decoration/buttons';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import { getProjects } from '../../lib/cms/helpers';
import ContentfulImage from '../../components/layout/contentfulImage';
import useViewMore from '../../hooks/useViewMore';
import { firstLetterUppercase, toBaseUrl } from '../../lib/helpers/strings';
import ProjectsLayout from '../../components/layout/projects/layout';
import YearSelector from '../../components/layout/projects/yearSelector';
import ShareDialog from '../../components/layout/shareDialog';

import type PageWithLayout from '../../types/persistentLayout';
import type { GetStaticProps } from 'next';
import type { IProject } from '../../types/generated/contentful';

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

const ProjectCard: React.FC<ProjectCardProps> = ({
  project: {
    fields: {
      name,
      description,
      url,
      urlName,
      date: dateStr,
      image,
      team,
      retiredInfo,
    },
  },
}) => {
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const shareInfo = useMemo(
    () => ({
      url,
      title: name,
      description: 'Take a look at this awesome project!',
      image,
    }),
    [image, name, url]
  );

  const openDialog = useCallback(() => {
    setShareDialogOpen(true);
  }, []);

  const isRetired = !!retiredInfo;

  const date = new Date(dateStr);
  const imageSize = 280;

  return (
    <>
      <div className="flex flex-col justify-between sm:flex-row">
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
        <div className="col-span-2 text-left sm:pl-10">
          <h1 className="mb-5 text-4xl font-bold">{name}</h1>
          <div className="text-xl">
            {documentToReactComponents(description)}
          </div>
          <div className="flex flex-wrap items-center mt-10">
            {isRetired ? (
              <DarkButton href="/projects/retired">Retired projects</DarkButton>
            ) : (
              <div className="flex flex-col gap-3 md:flex-row">
                <DarkButton href={url} capitalize={false}>
                  {urlName ||
                    firstLetterUppercase(
                      toBaseUrl(
                        url
                          .replace(/^https?:\/\//, '')
                          .replace(/^w{3}/, '')
                          .replace(/\/$/, '')
                      )
                    )}
                </DarkButton>
                <ShareButton
                  shareInfo={shareInfo}
                  openAndInitiateShareDialog={openDialog}
                />
              </div>
            )}

            <span className="font-bold sm:pl-5">
              <span className="text-grey">
                {isRetired
                  ? 'This project has been retired'
                  : new Intl.DateTimeFormat('en', {
                      month: 'short',
                      year: 'numeric',
                    }).format(date)}
                {}
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
      <ShareDialog
        open={shareDialogOpen}
        shareInfo={shareInfo}
        onClose={() => {
          setShareDialogOpen(false);
        }}
      />
    </>
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
  }, [reset, selectedYear]);

  const pagedProjects = useMemo(
    () => projectsForSelectedYear.slice(0, pageSize * pageNumber),
    [pageNumber, pageSize, projectsForSelectedYear]
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
            className="flex flex-col justify-between mt-10 sm:flex-row first:mt-0"
          >
            <ProjectCard key={project.fields.name} project={project} />
          </div>
        ))}
        {pagedProjects.length < projectsForSelectedYear.length && (
          <div className="mt-16">
            <WhiteButton
              className="content-center font-mono text-2xl"
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

Projects.Layout = ProjectsLayout;

export default Projects;
