import { DateTime, Duration } from 'luxon';

import type { DurationUnits, DurationObjectUnits } from 'luxon';

const DIFF_TIME_UNITS = ['years', 'months', 'weeks', 'days'];

export const readableTimeDiff = (date: Date) => {
  const now = DateTime.now().startOf('day');
  const other = DateTime.fromJSDate(date).startOf('day');

  const isPastDate = other.diff(now).milliseconds < 0;

  //Handling DateTimes which have the same date
  if (now.valueOf() === other.valueOf()) {
    return [null, null] as const;
  }

  const timeDiff = (isPastDate ? now : other)
    .diff(isPastDate ? other : now, DIFF_TIME_UNITS as unknown as DurationUnits)
    .normalize()
    .toObject();

  let roundedDiff: typeof timeDiff = {};

  Object.keys(timeDiff).forEach((keystring) => {
    const key = keystring as keyof DurationObjectUnits;
    const original = timeDiff[key];
    if (typeof original === 'number') {
      const addition = {
        [key]: Math.round(original),
      };
      roundedDiff = { ...roundedDiff, ...addition };
    }
  });

  const diffWithoutZeroes = Object.fromEntries(
    Object.entries(roundedDiff).filter(([, value]) => value >= 1)
  );

  if (Object.keys(diffWithoutZeroes).length === 0) {
    return [null, null] as const;
  }

  return [
    Duration.fromObject(diffWithoutZeroes, {
      locale: 'en-US',
    }).toHuman({
      maximumFractionDigits: 0,
    }),
    isPastDate,
  ] as const;
};
