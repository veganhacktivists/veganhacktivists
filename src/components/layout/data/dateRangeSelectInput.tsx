import React from 'react';

import Label from '../../forms/inputs/label';
import SelectInput from '../../forms/inputs/selectInput';

import type { OptionType } from '../../forms/inputs/selectInput';

/** Type describing the ID of a date range. */
export type DateRange =
  | '7d'
  | '30d'
  | '60d'
  | '90d'
  | '6m'
  | 'YTD'
  | 'All time';

const dateRangeOptions: OptionType<DateRange>[] = [
  { value: '7d', label: 'last 7 days' },
  { value: '30d', label: 'last 30 days' },
  { value: '60d', label: 'last 60 days' },
  { value: '90d', label: 'last 90 days' },
  { value: '6m', label: 'Last 6 months' },
  { value: 'YTD', label: 'Current year' },
  { value: 'All time', label: 'All time' },
];

/** Proptypes of `DateRangeSelectInput` */
interface DateRangeSelectInputProps {
  /** The id of a date range */
  readonly dateRange?: DateRange;
  /** Callback to set a new date range */
  readonly setDateRange: (dateRange: DateRange) => void;
}

/**
 * Select input to choose a date range
 * @type {React.FC<DateRangeSelectInputProps>}
 * @return {React.ReactElement} A date range select input
 */
const DateRangeSelectInput: React.FC<DateRangeSelectInputProps> = ({
  dateRange,
  setDateRange,
}) => {
  return (
    <>
      <Label className="text-white" name="date-range">
        Date range
      </Label>
      <SelectInput
        theme="data"
        name="date-range"
        current={dateRangeOptions.find((d) => d.value == dateRange) ?? null}
        options={dateRangeOptions ?? []}
        onChange={(option) => {
          if (option) {
            setDateRange(option.value);
          }
        }}
      />
    </>
  );
};

export default DateRangeSelectInput;
