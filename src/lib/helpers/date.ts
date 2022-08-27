import { DateTime, Duration } from 'luxon';

export const readableTimeDiff = (date: Date) => {
  const now = DateTime.now();
  const other = DateTime.fromJSDate(date);

  const isPastDate = other.diff(now).milliseconds < 0;

  const timeDiff: {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
  } = (isPastDate ? now : other)
    .diff(isPastDate ? other : now, ['years', 'months', 'weeks', 'days'])
    .normalize()
    .toObject();

  let roundedDiff: {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
  } = {};

  Object.keys(timeDiff).forEach((keystring) => {
    const key = keystring as keyof typeof roundedDiff;
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
    Duration.fromObject(diffWithoutZeroes).toHuman({
      maximumFractionDigits: 0,
    }),
    isPastDate,
  ] as const;
};
