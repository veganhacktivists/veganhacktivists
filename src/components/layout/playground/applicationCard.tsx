import React, { useMemo } from 'react';
import classNames from 'classnames';

import { TimePerWeekLabel } from './applyForm';

import { readableTimeDiff } from 'lib/helpers/date';

import type { trpc } from 'lib/client/trpc';

interface ApplicationCardProps {
  application: trpc['playground']['admin']['requestsWithPendingApplications']['output'][number]['applications'][number];
}

const Data: React.FC<{ name: string; value: React.ReactNode | null }> = ({
  name,
  value,
}) => {
  if (!value) return null;

  return (
    <div>
      <span className="font-bold">{name}:</span> <span>{value}</span>
    </div>
  );
};

const ApplicationCard: React.FC<
  React.PropsWithChildren<ApplicationCardProps>
> = ({ children, application: app }) => {
  const [timeSinceCreated] = useMemo(
    () => readableTimeDiff(app.createdAt),
    [app.createdAt]
  );
  return (
    <div className="py-5">
      <div>
        <span className="font-bold">{app.name}</span> ({app.providedEmail})
        {app.providedEmail !== app.applicant.email && (
          <> &rArr; (logs in as {app.applicant.email})</>
        )}
      </div>
      <div>
        Applied {timeSinceCreated ? `${timeSinceCreated} ago` : 'today'}
      </div>
      <div
        className={classNames('font-bold', {
          'text-red': !app.isVegan,
          'text-green': app.isVegan,
        })}
      >
        {app.isVegan ? 'Vegan :D' : 'Not vegan D:'}
      </div>
      <Data
        name="Available time per week"
        value={TimePerWeekLabel[app.availableTimePerWeek]}
      />
      <Data name="Portfolio" value={app.portfolioLink} />
      <Data name="Calendly" value={app.calendlyUrl} />
      <Data name="Instagram" value={app.instagramUrl} />
      <Data name="Twitter" value={app.twitterUrl} />
      <Data name="LinkedIn" value={app.linkedinUrl} />
      <Data
        name="Applied in the past"
        value={JSON.stringify(app.hasAppliedInThePast)}
      />
      <Data
        name="Comments"
        value={
          app.moreInfo ? (
            <>
              {app.moreInfo?.split('\n').map((paragraph, i) => (
                <div className="mb-2" key={i}>
                  {paragraph}
                </div>
              ))}
            </>
          ) : (
            'None'
          )
        }
      />
      {children}
    </div>
  );
};

export default ApplicationCard;
