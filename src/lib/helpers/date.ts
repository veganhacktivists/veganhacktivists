import { DateTime, Duration } from 'luxon';

export const readableTimeDiff = (date: Date) => {
  const now = DateTime.now();
  const other = DateTime.fromJSDate(date);

  const isPastDate = other.diff(now).milliseconds < 0;

  const timeDiff = (isPastDate ? now : other)
    .diff(isPastDate ? other : now, ['years', 'months', 'weeks', 'days'])
    .normalize()
    .toObject();

  const diffWithoutZeroes = Object.fromEntries(
    Object.entries(timeDiff).filter(([, value]) => value >= 0.5)
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
