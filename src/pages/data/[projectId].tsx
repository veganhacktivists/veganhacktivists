import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SquareField from '../../components/decoration/squares';
import { trpc } from '../../lib/client/trpc';
import { dateRangeAttributes } from '../../components/layout/data/dateRangeSelectInput';
import useReactPath from '../../hooks/useReactPath';
import { botAttributes } from '../../components/layout/data/categorySelectInput';
import DataOverview from '../../components/layout/data/dataOverview';
import DataChartSection, {
  ValueTypes,
} from '../../components/layout/data/dataChartSection';
import DataOptionsSection from '../../components/layout/data/charts/dataOptionsSection';

import type { Bot } from '../../components/layout/data/categorySelectInput';
import type { DateRange } from '../../components/layout/data/dateRangeSelectInput';
import type { OptionType } from '../../components/forms/inputs/selectInput';
import type {
  DataDashboardProject,
  DataDashboardData,
  DataDashboardValue,
  DashboardValueType,
} from '@prisma/client';
import type { TimeSeriesData } from '../../components/layout/data/charts/timeSeriesLineChart';

/** Type representing a DataDashboardProject filled with data recursively filled with values. */
export type FilledDataDashboardProject = DataDashboardProject & {
  data: (DataDashboardData & { values: DataDashboardValue[] })[];
};

/** Type representing a record containing attributes for each category. */
type CategoryAttributes = Record<
  string,
  { readonly label: string; readonly color: string }
>;

/**
 * Function returning an object containing for each category (key) its attributes (e.g.: color, label)
 * @param availableCategories {string[]} Array of available categories.
 * @param currentCategoryAttributes {CategoryAttributes} Current category attributes
 * @return {CategoryAttributes} The updated category attributes.
 */
const getCategoryAttributes = (
  availableCategories: string[],
  currentCategoryAttributes: CategoryAttributes
) => {
  const newCategoryAttributes: CategoryAttributes = {};

  availableCategories
    .sort((a, b) => (a > b ? 1 : -1))
    .forEach((c) => {
      if (currentCategoryAttributes[c]) {
        newCategoryAttributes[c] = currentCategoryAttributes[c];
      } else {
        newCategoryAttributes[c] = {
          label: botAttributes[c as Bot]?.label ?? c,
          color:
            botAttributes[c as Bot]?.color ??
            `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        };
      }
    });

  return newCategoryAttributes;
};

/**
 * Function to get the time series of the given `category` for a line chart according to a certain `value`.
 * @param data {FilledDataDashboardProject} The project from which the data is fetched.
 * @param value {string}: The value to consider to build the time series (e.g.: comments; clicks).
 * @param dateRange {Range}: The range to display the data.
 * @param category {string} The category to display in the line chart (e.g.: ENG, DE). If 'All' is provided as a
 * category all available categories are shown.
 * @param categoryAttributes {CategoryAttributes} The current categories with their attributes.
 * @return {TimeSeriesData[]} An array of time series divided by category.
 */
const getLineChartData = (
  data: FilledDataDashboardProject | undefined,
  value: DashboardValueType,
  dateRange: DateRange,
  category: string,
  categoryAttributes: CategoryAttributes
): TimeSeriesData[] => {
  const availableCategories = Object.keys(categoryAttributes);

  const minimumDate = dateRange
    ? dateRangeAttributes[dateRange].min
    : undefined;

  const selectedCategories =
    category === 'All' ? availableCategories : [category];

  return (
    selectedCategories
      ?.map((c) => ({
        id: `${categoryAttributes[c]?.label ?? c} Bot`,
        color:
          categoryAttributes[c]?.color ??
          `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data:
          data?.data
            // Filter out data which has a different category than the given one
            .filter((d) => d.category === c)
            // Filter out data with no timestamp
            ?.filter((d) => d.timestamp)
            .map((d) => {
              {
                return {
                  x: d.timestamp,
                  // Set value as 0 if it is missing
                  y: d.values.find((d) => d.key === value)?.value ?? '0',
                };
              }
            })
            // Filter the data just in the provided range
            .filter((d) => (minimumDate ? d.x >= minimumDate : true)) ?? [],
      }))
      // Show categories with actual data
      .filter((d) => d.data.length)
  );
};

const dataSquaresBottom = [
  { color: 'gray-darker', size: 16, left: 0, bottom: 0 },
];

/**
 * Component of the data page of a project
 * @type {React.FC}
 * @return {React.ReactElement} A data page of a project
 */
const DataProject: React.FC = () => {
  const router = useRouter();
  const pathname = useReactPath();
  const [localProjectId, setLocalProjectId] = useState<string>(
    router.query.projectId as string
  );
  const [project, setProject] = useState<FilledDataDashboardProject>();

  /**
   * Function to initialize the time series data structure.
   * @return {Record<ValueTypes, TimeSeriesData[]>} The time series data structure.
   */
  const initializeTimeSeriesData = (): Record<ValueTypes, TimeSeriesData[]> => {
    const timeSeriesData = {} as Record<ValueTypes, TimeSeriesData[]>;
    Object.keys(ValueTypes).forEach((key) => {
      timeSeriesData[key as ValueTypes] = [];
    });
    return timeSeriesData;
  };

  const [timeSeriesData, setTimeSeriesData] = useState<
    Record<ValueTypes, TimeSeriesData[]>
  >(initializeTimeSeriesData());

  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [category, setCategory] = useState<string>('All');

  const { data } = trpc.data.getDataDashboardProject.useQuery(localProjectId, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>(
    Array.from(
      new Set(data?.data.filter((d) => d.category).map((d) => d.category))
    ) as string[]
  );

  const [categoryAttributes, setCategoryAttributes] =
    useState<CategoryAttributes>({});

  /** Effect to set the category attributes once the available categories are updated. */
  useEffect(() => {
    setCategoryAttributes(
      getCategoryAttributes(availableCategories, categoryAttributes)
    );
  }, [availableCategories]);

  /**
   * Effect to update the local project state once data changes.
   * Note: the data-points are sorted by increasing order.
   * */
  useEffect(() => {
    if (data) {
      data.data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
      setProject(data);
      setCategory('All');

      const newAvailableCategories = Array.from(
        new Set(data?.data.filter((d) => d.category).map((d) => d.category))
      );

      setAvailableCategories(newAvailableCategories as string[]);
    }
  }, [data]);

  /** Effect to change the projectId when a "popstate" is triggered by changes in the history of the window. */
  useEffect(() => {
    if (pathname) {
      const newProjectId = pathname.split('/').at(-1);
      if (newProjectId) {
        setLocalProjectId(newProjectId);
      }
    }
  }, [pathname]);

  /** Effect to update the time series data to show in the line chart once user selections change (e.g.: date range). */
  useEffect(() => {
    const newTimeSeriesData = {} as Record<ValueTypes, TimeSeriesData[]>;
    Object.keys(ValueTypes).forEach((key) => {
      newTimeSeriesData[key as ValueTypes] = getLineChartData(
        project,
        key as ValueTypes,
        dateRange,
        category,
        categoryAttributes
      );
    });

    setTimeSeriesData(newTimeSeriesData);
  }, [availableCategories, category, dateRange, project]);

  /**
   * Callback to push a new path in the history and update the `projectId` state according to a selected project.
   * The id of the selected project will be inserted as a parameter of the new path.
   * @param selectedProject {OptionType<string> | null>} The project from which the id is extracted
   */
  const selectProject = (selectedProject: OptionType<string> | null) => {
    if (selectedProject) {
      window.history.pushState(
        { path: `/data/${selectedProject.value}` },
        '',
        `/data/${selectedProject.value}`
      );
      setLocalProjectId(selectedProject.value);
    }
  };

  return (
    <div>
      <div className="flex mx-auto flex-wrap md:flex-nowrap">
        <DataOptionsSection
          category={category}
          project={project}
          selectProject={selectProject}
          availableCategories={availableCategories}
          dateRange={dateRange}
          setCategory={setCategory}
          setDateRange={setDateRange}
        />
        <div id="data" className=" w-full p-5">
          <DataOverview />
          <DataChartSection data={timeSeriesData} dateRange={dateRange} />
        </div>
      </div>
      <SquareField
        squares={dataSquaresBottom}
        className="hidden md:block z-20"
      />
    </div>
  );
};

export default DataProject;
