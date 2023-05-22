import { ResponsiveLine } from '@nivo/line';
import React from 'react';

import { dateRangeAttributes } from '../dateRangeSelectInput';

import XTickTimeSeriesLabel from './xTickTimeSeriesLabel';
import TimeSeriesTooltip from './timeSeriesTooltip';

import type { Serie } from '@nivo/line';
import type { DateRange } from '../dateRangeSelectInput';

/**
 * Function that asserts that the provided Line Chart data is correct and can be visualized.
 * @param data {TimeSeriesData[] | undefined} The line chart data.
 * @return {boolean} Whether the line chart data is correct or not.
 * If true, `data` is asserted as being a `TimeSeriesData` array.
 */
const assertDataIsCorrect = (
  data: TimeSeriesData[] | undefined
): data is TimeSeriesData[] => !!data?.filter((d) => d?.data?.length).length;

/** Interface describing a time series data structure which extends the `Serie` interface */
export interface TimeSeriesData extends Serie {
  /** String representing the id of the time series */
  readonly id: string;
  /** String representing the color to represent the time-series in the line */
  readonly color: string;
  /** Array of data-points of the time series */
  readonly data: {
    /** Data representing the x-value of the data-point (i.e.: the timestamp) */
    readonly x: Date;
    /** Data representing the y-value of the data-point */
    readonly y: string;
  }[];
}

/** Proptypes of `TimeSeriesLineChart` */
interface TimeSeriesLineChartProps {
  /** Array of `TimeSeriesData` to represent */
  readonly data?: TimeSeriesData[];
  /** Optional string representing the label of the x axis */
  readonly xLabel?: string;
  /** String representing the label of the x axis */
  readonly yLabel: string;
  /** Date range for showing the data */
  readonly dateRange: DateRange;
}

/**
 * Component of a time series line chart
 * @type {React.FC<TimeSeriesLineChartProps>}
 * @return {React.ReactElement} A time series line chart
 */
const TimeSeriesLineChart: React.FC<TimeSeriesLineChartProps> = ({
  data,
  xLabel,
  yLabel,
  dateRange,
}) => {
  return (
    <div className="md:mx-20 mx-0 h-full">
      {assertDataIsCorrect(data) ? (
        <ResponsiveLine
          data={data}
          colors={(d: TimeSeriesData) => d.color}
          margin={{ top: 95, right: 50, bottom: 160, left: 50 }}
          theme={{
            fontFamily: 'PT Sans',
            fontSize: 14,
          }}
          lineWidth={3}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            min: 'auto',
            max: 'auto',
          }}
          yScale={{
            type: 'linear',
          }}
          enablePoints={false}
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            format: (d: Date) => <XTickTimeSeriesLabel timestamp={d} />,
            tickValues: dateRangeAttributes[dateRange].ticksSpec,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 20,
          }}
          pointLabelYOffset={-12}
          legends={data?.map((d, index) => ({
            data: [
              {
                id: d.id,
                color: d.color,
                label: d.id,
              },
            ],
            anchor: 'bottom-left',
            direction: 'column',
            translateX: -20,
            translateY: 100 + index * 20,
            itemDirection: 'left-to-right',
            itemWidth: 200,
            itemHeight: 25,
            itemTextColor: d.color,
            symbolSize: 8,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 0.8,
                },
              },
            ],
          }))}
          useMesh
          tooltip={({ point }) => (
            <TimeSeriesTooltip
              dataPoint={point}
              xLabel={xLabel ?? 'Date'}
              yLabel={yLabel}
            />
          )}
          animate={true}
        />
      ) : (
        <div className="mt-auto"> No data available</div>
      )}
    </div>
  );
};

export default TimeSeriesLineChart;
