import { NextSeo } from 'next-seo';
import React from 'react';
import RetiredProject from '../../../components/layout/projects/retired';
import type {
  IProject,
  IProjectFields,
  IRetiredProjectInfo,
  ITeam,
} from '../../../types/generated/contentful';
import { BLOCKS } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';
import type { GetStaticProps } from 'next';
import { getContents } from '../../../lib/cms';
import SubtleBorder from '../../../components/decoration/subtleBorder';
interface RetiredProjectsProps {
  projects: IProjectFields[];
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getContents<IProjectFields>({
    contentType: 'project',
    query: {
      name: 'Daily Nooch',
    },
    other: {
      order: '-fields.date',
    },
  });

  return {
    props: { projects: projects.map((project) => project.fields) },
  };
};

const RetiredProjects: React.FC<RetiredProjectsProps> = ({ projects }) => {
  return (
    <>
      <NextSeo title="Retired projects" />
      <div className="md:w-1/2 mx-auto">
        <SubtleBorder>
          {projects.map((project) => (
            <div key={project.name}>
              <RetiredProject {...project} />
            </div>
          ))}
        </SubtleBorder>
      </div>
    </>
  );
};

export default RetiredProjects;
