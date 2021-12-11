import React, { useState } from 'react';
import { firstLetterUppercase } from '../../../lib/helpers/strings';
import type { IProjectFields } from '../../../types/generated/contentful';
import { DarkButton } from '../../decoration/buttons';
import { FirstSubSection } from '../../decoration/textBlocks';
import { ContentButton } from './contentButton';

export interface HighlightedProject extends IProjectFields {
  customDescription: React.ReactNode;
}

interface HighlightedProjectsProps {
  projects: HighlightedProject[];
}

export const HighlightedProjects: React.FC<HighlightedProjectsProps> = ({
  projects,
}) => {
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const project = projects[projectIndex];

  return (
    <div className="py-24 -mt-16">
      <FirstSubSection
        header="See our HIGHLIGHTED PROJECTS"
        firstWordsNum={2}
      />
      <div className="flex flex-col md:flex-row justify-center gap-x-16">
        <div>
          <div className="overflow-hidden pb-80">
            {projects.map((project, i) => {
              return (
                <div key={project.url}>
                  <ContentButton
                    down={projectIndex < i}
                    content={{ image: project.image, title: project.name }}
                    setContent={() => {
                      setProjectIndex(i);
                    }}
                    active={projectIndex === i}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 md:text-left mt-8 md:mt-0 mx-auto md:mx-0">
          <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
          <p className="text-2xl">{project.customDescription}</p>
          <div className="flex mt-10">
            <DarkButton href={'https://' + project.url} className="normal-case">
              {firstLetterUppercase(project.url)}
            </DarkButton>
          </div>
        </div>
      </div>
    </div>
  );
};