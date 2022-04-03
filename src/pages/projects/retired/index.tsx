import { NextSeo } from 'next-seo';
import React, { useMemo, useState } from 'react';
import RetiredProject from '../../../components/layout/projects/retired';
import type {
  IProjectFields,
  IRetiredProjectInfo,
} from '../../../types/generated/contentful';
import type { GetStaticProps } from 'next';
import { getContents } from '../../../lib/cms';
import type PageWithLayout from '../../../types/persistentLayout';
import ProjectsLayout from '../../../components/layout/projects/layout';
import YearSelector from '../../../components/layout/projects/yearSelector';
import { FirstSubSection } from '../../../components/decoration/textBlocks';
import CustomLink from '../../../components/decoration/link';
interface RetiredProjectsProps {
  projects: (IProjectFields & { retiredInfo: IRetiredProjectInfo })[];
  projectYears: number[];
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getContents<IProjectFields>({
    contentType: 'project',
    query: {
      filters: {
        exists: { retiredInfo: true },
      },
    },
    other: {
      order: '-fields.date',
    },
  });

  const projectYears = Array.from(
    new Set(
      projects.map((project) => new Date(project.fields.date).getFullYear())
    )
  ).sort((a, b) => b - a);

  return {
    props: {
      projects: projects.map((project) => project.fields),
      projectYears,
    },
  };
};

const RetiredProjects: PageWithLayout<RetiredProjectsProps> = ({
  projects,
  projectYears,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const projectsForSelectedYear = useMemo(() => {
    if (selectedYear === null) {
      return projects;
    }
    return projects.filter((project) => {
      const date = new Date(project.date);
      return date.getFullYear() === selectedYear;
    });
  }, [selectedYear, projects]);

  return (
    <>
      <NextSeo title="Retired Projects" />
      <FirstSubSection header="Retired projects">
        <div>
          Unfortunately, no matter how fun or interesting the idea is, not all
          projects will, or have, taken off the way we wanted &mdash; nor
          addressed the problems it aimed to solve. While not every project will
          be impactful, each project has helped us learn and grow as a
          community, as developers, designers, and as an organization.{' '}
          <CustomLink href="/projects">
            See our maintained projects here
          </CustomLink>
          .
        </div>
      </FirstSubSection>
      <YearSelector
        years={projectYears}
        selectedYear={selectedYear}
        onChange={setSelectedYear}
      />
      <div className="md:w-3/4 4xl:w-1/2 mx-auto">
        {projectsForSelectedYear.map((project) => (
          <RetiredProject key={project.name} {...project} />
        ))}
      </div>
    </>
  );
};

RetiredProjects.getLayout = ProjectsLayout;

export default RetiredProjects;
