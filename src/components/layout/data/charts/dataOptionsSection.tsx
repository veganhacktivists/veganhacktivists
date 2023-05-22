import React from 'react';

import Label from '../../../forms/inputs/label';
import SelectInput from '../../../forms/inputs/selectInput';
import DateRangeSelectInput from '../dateRangeSelectInput';
import CategorySelectInput from '../categorySelectInput';
import { trpc } from '../../../../lib/client/trpc';
import { ValueTypes } from '../dataChartSection';

import type { DateRange } from '../dateRangeSelectInput';
import type { OptionType } from '../../../forms/inputs/selectInput';
import type { FilledDataDashboardProject } from '../../../../pages/data/[projectId]';
import type { DataDashboardProject } from '@prisma/client';

/** Proptypes of `DataOptionsSection`. */
interface DataOptionsSectionProps {
  /** The selected project. */
  readonly project: FilledDataDashboardProject | undefined;
  /** Callback to select a new project. */
  readonly selectProject: (selectedProject: OptionType<string> | null) => void;
  /** The selected category. */
  readonly category: string;
  /** Callback to select a new category. */
  readonly setCategory: React.Dispatch<React.SetStateAction<string>>;
  /** Selectable categories array. */
  readonly availableCategories: string[];
  /** The selected date range. */
  readonly dateRange: DateRange;
  /** Callback to select a new date range. */
  readonly setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  /** The charts to show. */
  readonly shownCharts: Record<ValueTypes, boolean>;
  /** Callback to select the charts to show. */
  readonly setShownCharts: React.Dispatch<
    React.SetStateAction<Record<ValueTypes, boolean>>
  >;
}

/**
 * Component of the option selection section of the data page of a project
 * @type {React.FC<DataOptionsSectionProps>}
 * @return {React.ReactElement} The option selection section of the data page of a project
 */
const DataOptionsSection: React.FC<DataOptionsSectionProps> = ({
  project,
  selectProject,
  category,
  setCategory,
  availableCategories,
  dateRange,
  setDateRange,
  shownCharts,
  setShownCharts,
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
        {Object.keys(ValueTypes).map((valueName) => (
          <div
            key={`${valueName}-checkbox-div`}
            className="checkbox-container mb-3 flex items-center"
          >
            <input
              className={
                'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
              }
              type="checkbox"
              name={valueName}
              checked={shownCharts[valueName as ValueTypes]}
              onChange={(e) => {
                const newShownCharts = { ...shownCharts };
                newShownCharts[valueName as ValueTypes] = e.target.checked;
                setShownCharts(newShownCharts);
              }}
            />
            <Label className="text-white mb-0 ml-3" name={valueName}>
              {
                // Uppercase first character of each word
                valueName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )
              }
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataOptionsSection;
