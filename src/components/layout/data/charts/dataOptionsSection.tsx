import React from 'react';

import Label from '../../../forms/inputs/label';
import SelectInput from '../../../forms/inputs/selectInput';
import DateRangeSelectInput from '../dateRangeSelectInput';
import CategorySelectInput from '../categorySelectInput';
import { trpc } from '../../../../lib/client/trpc';

import type { DateRange } from '../dateRangeSelectInput';
import type { OptionType } from '../../../forms/inputs/selectInput';
import type { FilledDataDashboardProject } from '../../../../pages/data/[projectId]';
import type { DataDashboardProject } from '@prisma/client';

interface DataOptionsSectionProps {
  readonly project: FilledDataDashboardProject | undefined;
  readonly selectProject: (selectedProject: OptionType<string> | null) => void;
  readonly category: string;
  readonly setCategory: React.Dispatch<React.SetStateAction<string>>;
  readonly availableCategories: string[];
  readonly dateRange: DateRange;
  readonly setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const DataOptionsSection: React.FC<DataOptionsSectionProps> = ({
  project,
  selectProject,
  category,
  setCategory,
  availableCategories,
  dateRange,
  setDateRange,
}) => {
  const { data: projects } = trpc.data.getDataDashboardProjects.useQuery(
    undefined,
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div
      id="data-options"
      className="flex flex-col w-full md:w-72 lg:w-80 bg-gray-dark p-5 relative"
    >
      <div className="w-full mb-4">
        <Label className="text-white" name="project" />
        <SelectInput
          theme="data"
          name="project"
          current={project ? { label: project.label, value: project.id } : null}
          options={
            (projects as DataDashboardProject[])?.map((p) => ({
              value: p.id,
              label: p.label,
            })) ?? []
          }
          onChange={selectProject}
        />
      </div>
      <div className="w-full mb-4">
        <DateRangeSelectInput
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
      <div className="w-full mb-4">
        <CategorySelectInput
          category={category}
          setCategory={setCategory}
          availableCategories={availableCategories}
        />
      </div>
      <div className="w-full">
        <p className="mb-2 text-white font-bold text-left block">Show / Hide</p>
        <div className="checkbox-container mb-3 flex items-center">
          <input
            className={
              'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
            }
            type="checkbox"
            name="engagement"
          />
          <Label className="text-white mb-0 ml-3" name="engagement">
            User engagement
          </Label>
        </div>
        <div className="checkbox-container mb-3 flex items-center">
          <input
            className={
              'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
            }
            type="checkbox"
            name="replies"
          />
          <Label className="text-white mb-0 ml-3" name="replies">
            Nº of replies
          </Label>
        </div>
        <div className="checkbox-container flex items-center">
          <input
            className={
              'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
            }
            type="checkbox"
            name="retweets"
          />
          <Label className="text-white mb-0 ml-3" name="retweets">
            Nº of retweets
          </Label>
        </div>
      </div>
    </div>
  );
};

export default DataOptionsSection;
