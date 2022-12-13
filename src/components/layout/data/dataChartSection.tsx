import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartPie } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

import type { DateRange } from './dateRangeSelectInput';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { TimeSeriesData } from './charts/timeSeriesLineChart';

const TimeSeriesLineChart = dynamic(
  () => import('./charts/timeSeriesLineChart'),
  {
    ssr: false,
  }
);

type DataNames = 'clicks' | 'comments';

interface DataType {
  readonly name: string;
  readonly timeSeriesData: TimeSeriesData[];
}

interface DataChartSectionProps {
  readonly data: DataType[];
  readonly dateRange: DateRange;
}

const dataIcons: Record<DataNames, IconDefinition> = {
  clicks: faChartPie,
  comments: faChartBar,
};

const getDataIcon = (name: string): IconDefinition => {
  if (name in dataColors) {
    return dataIcons[name as DataNames];
  }
  return faChartBar;
};

const dataColors: Record<DataNames, string> = {
  comments: 'purple',
  clicks: 'orange',
};

const getDataColor = (name: string): string => {
  if (name in dataColors) {
    return dataColors[name as DataNames];
  }
  return 'orange';
};

const DataChartSection: React.FC<DataChartSectionProps> = ({
  data,
  dateRange,
}) => {
  return (
    <>
      {data.map((d) => {
        const dataColor = getDataColor(d.name);
        const iconClassname = `text-${dataColor}`;
        const decorationClassname = `bg-${dataColor} h-full w-10`;

        // Uppercase first character of each word
        const dataPrettyName = d.name.replace(
          /(^\w{1})|(\s+\w{1})/g,
          (letter) => letter.toUpperCase()
        );
        return (
          <div key={`${d.name}-div`} className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                icon={getDataIcon(d.name)}
                className={iconClassname}
                fixedWidth
              />
              <h1 className="text-left ml-3">
                {`Number of ${dataPrettyName}`}
              </h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className={decorationClassname} />
              </div>
              <div className="h-[28rem] bg-white">
                <TimeSeriesLineChart
                  data={d.timeSeriesData}
                  yLabel={`Number of ${dataPrettyName}`}
                  dateRange={dateRange}
                />
              </div>
            </div>
          </div>
        );
      })}
      {/*
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
              <div className="bg-yellow h-full w-10"/>
            </div>
            <div className="h-28 bg-white"/>
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
        */}
    </>
  );
};

export default DataChartSection;
