import { NextSeo } from 'next-seo';
import React from 'react';
import type { IProject } from '../../../types/generated/contentful';

interface RetiredProjectsProps {
  projects: IProject[];
}

const RetiredProjects: React.FC<RetiredProjectsProps> = ({}) => {
  return (
    <>
      <NextSeo title="Retired projects" />
    </>
  );
};

export default RetiredProjects;
