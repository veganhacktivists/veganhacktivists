import React, { useState } from 'react';
import { NextSeo } from 'next-seo';

import { trpc } from '../../lib/client/trpc';

import DataUI from './dataUI/dataUI';
import Landing from './landing/landing';

import type { DataDashboardProject } from '@prisma/client';

const Data: React.FC = () => {
  const [dataDisplayed, displayData] = useState(false);

  // Fetch all projects
  const { data: projects } = trpc.data.getDataDashboardProjects.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const [selectedProject, setSelectedProject] = useState<
    DataDashboardProject | undefined
  >();

  const changeProject = (id?: string) => {
    const project = projects?.find((p) => p.id === id);
    if (project) {
      setSelectedProject(project);
    }
    displayData(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <NextSeo title="Data" />
      <div className="bg-grey-background relative">
        {!dataDisplayed ? (
          <Landing
            project={selectedProject}
            projectOptions={projects ?? []}
            changeProject={changeProject}
          />
        ) : (
          <DataUI
            projectOptions={projects ?? []}
            project={selectedProject}
            setProject={setSelectedProject}
          />
        )}
      </div>
    </>
  );
};

export default Data;
