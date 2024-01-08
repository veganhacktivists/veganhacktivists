import { RequestStatus, ApplicationStatus } from '@prisma/client';

import { t } from 'server/trpc';
import { getDiscordServer } from 'lib/discord';
import { baseProcedure } from 'server/procedures';

import type { TimePerWeek } from '@prisma/client';

const averageWeeklyHoursPerValue: Record<TimePerWeek, number> = {
  OneToThree: 2,
  ThreeToFive: 4,
  FiveToEight: 6.5,
  TenPlus: 12,
};

const statsRouter = t.router({
  getPlaygroundStats: baseProcedure.query(async ({ ctx: { prisma } }) => {
    const [requestsOpen, requestsSupported, numberOfVolunteers] =
      await Promise.all([
        prisma.playgroundRequest.count({
          where: {
            status: RequestStatus.Accepted,
          },
        }),
        prisma.playgroundRequest.count({
          where: {
            status: RequestStatus.Completed,
          },
        }),
        getDiscordServer(process.env.DISCORD_PLAYGROUND_SERVER_ID!).then(
          (server) => server.approximateMemberCount
        ),
      ]);

    const acceptedApplications = await prisma.playgroundApplication.findMany({
      where: {
        status: ApplicationStatus.Accepted,
      },
      select: {
        estimatedTimeDays: true,
        applicant: {
          select: {
            applicantInformation: {
              select: {
                availableTimePerWeek: true,
              },
            },
          },
        },
      },
    });

    const hoursVolunteered = acceptedApplications.reduce(
      (acc, { applicant: { applicantInformation }, estimatedTimeDays }) => {
        const hours =
          averageWeeklyHoursPerValue[
            applicantInformation!.availableTimePerWeek
          ];
        return acc + (hours / 7) * (estimatedTimeDays ?? 0);
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
