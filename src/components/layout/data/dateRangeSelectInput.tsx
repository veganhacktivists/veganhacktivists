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

/** Object of an associative dictionary containing attributes for each date range ID type. */
export const dateRangeAttributes: Record<
  DateRange,
  {
    /** Label of the date range giving its full description. */
    label: string;
    /** Lower bound date of the date range (undefined if it does not exist). */
    min: Date | undefined;
    /** Tick values to assign to a line chart according to the given date range (e.g.: show a tick every day). */
    ticksSpec: string | undefined;
  }
> = {
  '7d': {
    label: 'last 7 days',
    min: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ticksSpec: 'every 1 days',
  },
  '30d': {
    label: 'last 30 days',
    min: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    ticksSpec: 'every 5 days',
  },
  '60d': {
    label: 'last 60 days',
    min: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    ticksSpec: 'every 10 days',
  },
  '90d': {
    label: 'last 90 days',
    min: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    ticksSpec: 'every 15 days',
  },
  '6m': {
    label: 'Last 6 months',
    min: (() => {
      const date = new Date();
      date.setMonth(date.getMonth() - 6);
      return date;
    })(),
    ticksSpec: 'every 1 months',
  },
  YTD: {
    label: 'Current year',
    min: new Date(new Date().getFullYear(), 0, 1),
    ticksSpec: 'every 1 months',
  },
  'All time': { label: 'All time', min: undefined, ticksSpec: undefined },
};

/** Proptypes of `DateRangeSelectInput` */
interface DateRangeSelectInputProps {
  /** The id of a date range */
  readonly dateRange: DateRange | undefined;
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
  const dateRangeOptions: OptionType<DateRange>[] = Object.keys(
    dateRangeAttributes
  ).map((d) => ({
    value: d as DateRange,
    label: dateRangeAttributes[d as DateRange].label,
  }));

  return (
    <>
      <Label className="text-white" name="date-range">
        Date range
      </Label>
      <SelectInput
        theme="data"
        name="date-range"
        current={dateRangeOptions.find((d) => d.value == dateRange) ?? null}
        options={dateRangeOptions}
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
