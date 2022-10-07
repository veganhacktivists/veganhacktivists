import { ResponsiveLine } from '@nivo/line';
import React from 'react';

export interface LineChartData {
  readonly id: string;
  readonly color: string;
  readonly data: {
    readonly x: string;
    readonly y: number;
  }[];
}

interface LineChartProps {
  readonly data: LineChartData[];
  readonly xLabel?: string;
  readonly yLabel: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, xLabel, yLabel }) => {
  return (
    <div className="md:mx-20 mx-0 h-full">
      <ResponsiveLine
        data={data}
        colors={(d: LineChartData) => d.color}
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
          format: (v: Date) => (
            <tspan>
              <tspan>
                {v.toLocaleDateString('en-us', {
                  day: 'numeric',
                  month: 'short',
                })}
              </tspan>
              <tspan dx="-30" dy="20">
                {"'"}
                {v.toLocaleDateString('en-us', {
                  year: '2-digit',
                })}
              </tspan>
            </tspan>
          ),
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
        tooltip={({ point }) => {
          const { serieId, data, color } = point;
          return (
            <div
              style={{
                padding: 12,
                background: '#FFFFFF',
                border: '1px solid #ccc',
              }}
            >
              <div className="flex justify-center flex-row">
                <span
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor: color,
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginRight: 5,
                  }}
                />
                <strong style={{ color: color, fontSize: 14 }}>
                  {serieId}
                </strong>
              </div>
              <div style={{ fontSize: 12 }}>
                <>
                  <strong>{`${xLabel ?? 'Date'}: `}</strong>
                  {(data.x as Date).toLocaleDateString('en-us', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </>
              </div>
              <div style={{ fontSize: 12 }}>
                <>
                  <strong>{`${yLabel}: `}</strong>
                  {data.y}
                </>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default LineChart;
