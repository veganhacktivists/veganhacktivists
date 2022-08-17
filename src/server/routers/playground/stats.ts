import { Status } from '@prisma/client';

import { t } from 'server/trpc';

import type { TimePerWeek } from '@prisma/client';

const averageWeeklyHoursPerValue: Record<TimePerWeek, number> = {
  OneToThree: 2,
  ThreeToFive: 4,
  FiveToEight: 6.5,
  TenPlus: 12,
};

const statsRouter = t.router({
  stats: t.procedure.query(async ({ ctx: { prisma } }) => {
    const [requestsOpen, requestsSupported, numberOfVolunteers] =
      await Promise.all([
        prisma.playgroundRequest.count(),
        prisma.playgroundRequest.count({
          where: {
            status: Status.Accepted,
            applications: {
              some: {
                status: Status.Accepted,
              },
            },
          },
        }),
        prisma.user.count({
          where: {
            playgroundApplications: { some: {} },
          },
        }),
      ]);

    const acceptedApplications = await prisma.playgroundApplication.findMany({
      where: {
        status: Status.Accepted,
      },
      select: {
        availableTimePerWeek: true,
        request: {
          select: {
            estimatedTimeDays: true,
          },
        },
      },
    });

    const hoursVolunteered = acceptedApplications.reduce(
      (acc, { availableTimePerWeek, request: { estimatedTimeDays } }) => {
        const hours = averageWeeklyHoursPerValue[availableTimePerWeek];
        return acc + (hours / 7) * estimatedTimeDays;
      },
      0
    );

    return {
      requestsOpen,
      requestsSupported,
      numberOfVolunteers,
      hoursVolunteered: Math.round(hoursVolunteered),
    };
  }),
});

export default statsRouter;
