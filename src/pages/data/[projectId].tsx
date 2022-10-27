import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

import Label from '../../components/forms/inputs/label';
import SelectInput from '../../components/forms/inputs/selectInput';
import SquareField from '../../components/decoration/squares';
import { trpc } from '../../lib/client/trpc';
import prisma from '../../lib/db/prisma';
import DateRangeSelectInput from '../../components/layout/data/dateRangeSelectInput';
import useReactPath from '../../hooks/useReactPath';

import type { DateRange } from '../../components/layout/data/dateRangeSelectInput';
import type { OptionType } from '../../components/forms/inputs/selectInput';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type {
  DataDashboardProject,
  DataDashboardData,
  DataDashboardValue,
} from '@prisma/client';
import type { TimeSeriesData } from '../../components/layout/data/charts/timeSeriesLineChart';

const TimeSeriesLineChart = dynamic(
  () => import('../../components/layout/data/charts/timeSeriesLineChart'),
  {
    ssr: false,
  }
);

/** Type representing a DataDashboardProject filled with data recursively filled with values. */
type FilledDataDashboardProject = DataDashboardProject & {
  data: (DataDashboardData & { values: DataDashboardValue[] })[];
};

/**
 * Function that computes the lower bound of a date range according to a given "date range id".
 * @param dateRange {DateRange | undefined} The id of a date range from which the lower date bound is computed.
 * @return {Date | null} The lower date bound if it exist.
 */
const getDateRangeMinimum = (dateRange: DateRange | undefined): Date | null => {
  switch (dateRange) {
    case '7d':
      return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    case '30d':
      return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    case '60d':
      return new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    case '90d':
      return new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    case '6m':
      const date = new Date();
      date.setMonth(date.getMonth() - 6);
      return date;
    case 'YTD':
      return new Date(new Date().getFullYear(), 0, 1);
    case 'All time':
      return null;
    default:
      return null;
  }
};

// TODO: filter by category
/**
 * Function to get a time series for a line chart
 * @param data {FilledDataDashboardProject} The project from which the data is fetched
 * @param value {string}: The value to consider to build the time series (e.g.: comments; clicks)
 * @param id {string}: The ID of the time series which will even function as the label
 * @param color {string}: The color to represent the time series as a line in the chart
 * @param dateRange {Range}: The range to display the data
 *
 * @return {TimeSeriesData} A complete time series
 */
const getLineChartData = (
  data: FilledDataDashboardProject | undefined,
  value: string,
  id: string,
  color: string,
  dateRange?: DateRange
): TimeSeriesData => {
  const minimumDate = getDateRangeMinimum(dateRange);

  return {
    id,
    color,
    data:
      data?.data
        // Filter out data which has a different category than the given one
        // .filter((d) => d.category === category)
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
  };
};

const dataSquares = {
  data: {
    overview: {
      top: [
        { color: 'gray-background', size: 4, right: 0, top: 0 },
        { color: 'gray-background', size: 4, right: 4, top: 4 },
      ],
      bottom: [
        { color: 'gray-background', size: 4, left: 0, bottom: 0 },
        { color: 'gray-background', size: 3, right: 0, bottom: 0 },
      ],
    },
    bottom: [{ color: 'gray-darker', size: 16, left: 0, bottom: 0 }],
  },
};

/**
 * Component of the data page of a project
 * @type {React.FC<InferGetStaticPropsType<typeof getStaticProps>>}
 * @return {React.ReactElement} A data page of a project
 */
const DataProject: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects,
  projectId,
}) => {
  const pathname = useReactPath();
  const [localProjectId, setLocalProjectId] = useState<string>(
    projectId as string
  );
  const [project, setProject] = useState<FilledDataDashboardProject>();
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>();
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const { data } = trpc.data.getDataDashboardProject.useQuery(localProjectId);

  /**
   * Effect to update the local project state once data changes.
   * Note: the data-points are sorted by increasing order.
   * */
  useEffect(() => {
    if (data) {
      data.data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
      setProject(data);
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

  /** Effect to update the time series data to show in the line chart once the project or the date range change. */
  useEffect(() => {
    setTimeSeriesData([
      getLineChartData(project, 'clicks', 'Clicks', '#DD3E2B', dateRange),
      getLineChartData(project, 'comments', 'Comments', '#7F3C97', dateRange),
    ]);
  }, [dateRange, project]);

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
        <div
          id="data-options"
          className="flex flex-col w-full md:w-72 lg:w-80 bg-gray-dark p-5 relative"
        >
          <div className="w-full mb-4">
            <Label className="text-white" name="project" />
            <SelectInput
              theme="data"
              name="project"
              current={
                project ? { label: project.label, value: project.id } : null
              }
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
            <Label className="text-white" name="bot">
              Select bot
            </Label>
            <SelectInput theme="data" name="bot" current={null} options={[]} />
          </div>
          <div className="w-full">
            <p className="mb-2 text-white font-bold text-left block">
              Show / Hide
            </p>
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
        <div id="data" className=" w-full p-5">
          <div id="data-overview" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-blue-dark"
                icon={faChartSimple}
                fixedWidth
              />
              <h1 className="text-left ml-3">Data overview</h1>
            </div>
            <SquareField squares={dataSquares.data.overview.top} />
            <div className="relative bg-white flex-wrap w-full flex p-4">
              <div className="pr-4 mb-6 lg:mb-0 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    125
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">Total replies</p>
              </div>
              <div className="px-4 mb-6 lg:mb-0 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    85
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">Total retweets</p>
              </div>
              <div className="px-4 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    78
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">
                  Average <span className="hidden lg:inline">number of</span>
                  <span className="lg:hidden inline">#</span>&nbsp;likes
                </p>
              </div>
              <div className="pl-4 lg:w-1/4 w-1/2">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    14
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-red-dark rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">New followers</p>
              </div>
            </div>
            <SquareField squares={dataSquares.data.overview.bottom} />
          </div>
          <div id="number-of-retweets" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                icon={faChartPie}
                className="text-orange"
                fixedWidth
              />
              <h1 className="text-left ml-3">Number of Retweets</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-orange h-full w-10" />
              </div>
              <div className="h-[28rem] bg-white">
                <TimeSeriesLineChart
                  data={timeSeriesData}
                  yLabel="Number of clicks"
                  dateRange={dateRange}
                />
              </div>
            </div>
          </div>
          <div id="number-of-replies" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-purple"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">Number of Replies</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-purple h-full w-10" />
              </div>
              <div className="h-[28rem] bg-white">
                <TimeSeriesLineChart
                  data={timeSeriesData?.length ? [timeSeriesData[0]] : []}
                  yLabel="Number of comments"
                  dateRange={dateRange}
                />
              </div>
            </div>
          </div>
          <div id="user-engagement-replies" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-yellow"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">User engagement - User replies</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-yellow h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
          <div id="user-engagement-likes" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-green"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">User engagement - Likes</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-green h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
        </div>
      </div>
      <SquareField
        squares={dataSquares.data.bottom}
        className="hidden md:block z-20"
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await prisma.dataDashboardProject.findMany({
    select: {
      id: true,
      label: true,
    },
  });
  return {
    paths: projects.map((project) => ({
      params: {
        projectId: project.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projectId = context.params?.projectId as string;

  // Prefetch
  const projects = await prisma.dataDashboardProject.findMany({
    select: {
      id: true,
      label: true,
    },
  });
  await prisma.dataDashboardProject.findFirst({
    where: {
      id: projectId,
    },
    include: {
      data: {
        include: {
          values: true,
        },
      },
    },
  });

  return {
    props: {
      projects: projects ?? [],
      projectId,
    },
    revalidate: 10,
  };
};

export default DataProject;
