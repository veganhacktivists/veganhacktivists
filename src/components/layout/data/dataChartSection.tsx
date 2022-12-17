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

// TODO: temporary enum for value types
export enum ValueTypes {
  clicks = 'clicks',
  comments = 'comments',
}

const dataIcons: Record<ValueTypes, IconDefinition> = {
  clicks: faChartPie,
  comments: faChartBar,
};

/**
 * Function to get the icon associated with a value name.
 * @param valueName {string} The value name from which the associated icon is returned.
 * @returns {IconDefinition} The icon associated with `valueName`.
 */
const getDataIcon = (valueName: string): IconDefinition => {
  if (valueName in dataColors) {
    return dataIcons[valueName as ValueTypes];
  }
  return faChartBar;
};

const dataColors: Record<ValueTypes, string> = {
  comments: 'purple',
  clicks: 'orange',
};

/**
 * Function to get the color associated with a value name.
 * @param valueName {string} The value name from which the associated color is returned.
 * @return {string} The color associated with `valueName`.
 */
const getDataColor = (valueName: string): string => {
  if (valueName in dataColors) {
    return dataColors[valueName as ValueTypes];
  }
  return 'orange';
};

/** Proptypes of `DataChartSection`. */
interface DataChartSectionProps {
  /** Record containing for each value types an array of time series. */
  readonly data: Record<ValueTypes, TimeSeriesData[]>;
  /** The selected date range. */
  readonly dateRange: DateRange;
}

/**
 * Component of the chart section of the data page of a project
 * @type {React.FC<DataChartSectionProps>}
 * @return {React.ReactElement} The chart section of the data page of a project
 */
const DataChartSection: React.FC<DataChartSectionProps> = ({
  data,
  dateRange,
}) => {
  return (
    <>
      {Object.keys(data).map((dataName) => {
        const timeSeriesData = data[dataName as ValueTypes];
        const dataColor = getDataColor(dataName);
        const iconClassname = `text-${dataColor}`;
        const decorationClassname = `bg-${dataColor} h-full w-10`;

        // Uppercase first character of each word
        const dataPrettyName = dataName.replace(
          /(^\w{1})|(\s+\w{1})/g,
          (letter) => letter.toUpperCase()
        );
        return (
          <div key={`${dataName}-div`} className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                icon={getDataIcon(dataName)}
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
                  data={timeSeriesData}
                  yLabel={`Number of ${dataPrettyName}`}
                  dateRange={dateRange}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DataChartSection;
