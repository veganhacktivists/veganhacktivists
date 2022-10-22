import { ResponsiveLine } from '@nivo/line';
import React from 'react';

import XTickTimeSeriesLabel from './xTickTimeSeriesLabel';
import TimeSeriesTooltip from './timeSeriesTooltip';

/** Interface describing a time series data structure */
export interface TimeSeriesData {
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
  readonly data: TimeSeriesData[];
  /** Optional string representing the label of the x axis */
  readonly xLabel?: string;
  /** String representing the label of the x axis */
  readonly yLabel: string;
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
}) => {
  return (
    <div className="md:mx-20 mx-0 h-full">
      <ResponsiveLine
        data={data}
        colors={(d: TimeSeriesData) => d.color}
        margin={{ top: 95, right: 50, bottom: 160, left: 50 }}
        theme={{
          fontFamily: 'PT Sans',
          fontSize: 14,
        }}
        animate
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
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 20,
        }}
        pointLabelYOffset={-12}
        legends={data.map((d, index) => ({
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
      />
    </div>
  );
};

export default TimeSeriesLineChart;
