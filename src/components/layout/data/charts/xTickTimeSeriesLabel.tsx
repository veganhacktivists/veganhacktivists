import React from 'react';

/** Proptypes of `XTickTimeSeriesLabel` */
interface XTickTimeSeriesLabelProps {
  /** Timestamp from which the label is obtained */
  readonly timestamp: Date;
}

/**
 * Component that formats the label of the x-tick of a time series.
 *
 * @type {React.FC<XTickTimeSeriesLabelProps>}
 * @returns {React.ReactElement} The label of the x-tick of a time series.
 */
const XTickTimeSeriesLabel: React.FC<XTickTimeSeriesLabelProps> = ({
  timestamp,
}) => (
  <tspan>
    <tspan>
      {timestamp.toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
      })}
    </tspan>
    <tspan dx="-30" dy="20">
      {"'"}
      {timestamp.toLocaleDateString('en-us', {
        year: '2-digit',
      })}
    </tspan>
  </tspan>
);

export default XTickTimeSeriesLabel;
