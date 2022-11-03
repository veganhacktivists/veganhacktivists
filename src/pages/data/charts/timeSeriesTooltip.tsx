import React from 'react';

import type { Point } from '@nivo/line';

/** Proptypes of `TimeSeriesTooltip` */
interface TimeSeriesTooltipProps {
  /** Data-point from which the tooltip is created */
  readonly dataPoint: Point;
  /** String representing the label of the x axis */
  readonly xLabel: string;
  /** String representing the label of the y axis */
  readonly yLabel: string;
}

/**
 * Component that formats the tooltip with respect to a data-point.
 *
 * @type {React.FC<TimeSeriesTooltipProps>}
 * @returns {React.ReactElement} The tooltip of the data-point.
 */
const TimeSeriesTooltip: React.FC<TimeSeriesTooltipProps> = ({
  dataPoint,
  xLabel,
  yLabel,
}) => {
  const { serieId, data, color } = dataPoint;
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
        <strong style={{ color: color, fontSize: 14 }}>{serieId}</strong>
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
};

export default TimeSeriesTooltip;
