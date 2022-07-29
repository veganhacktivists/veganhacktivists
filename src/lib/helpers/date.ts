import { DateTime, Duration } from 'luxon';

export const readableTimeSinceDate = (date: Date) => {
  const timeDiff = DateTime.now()
    .diff(DateTime.fromJSDate(date), ['years', 'months', 'weeks', 'days'])
    .normalize()
    .toObject();

  const diffWithoutZeroes = Object.fromEntries(
    Object.entries(timeDiff).filter(([, value]) => value >= 0.5)
  );

  if (Object.keys(diffWithoutZeroes).length === 0) {
    return null;
  }

  return Duration.fromObject(diffWithoutZeroes).toHuman({
    maximumFractionDigits: 0,
  });
};
