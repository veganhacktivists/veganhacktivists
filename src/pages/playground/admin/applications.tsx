import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useCallback } from 'react';

import { DarkButton, ExternalLinkButton } from 'components/decoration/buttons';
import { trpc } from 'lib/client/trpc';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import ApplicationCard from 'components/layout/playground/applicationCard';
import Spinner from 'components/decoration/spinner';

import type { NextPage } from 'next';

const AdminPage: NextPage = ({}) => {
  const utils = trpc.useContext();
  const {
    data,
    isSuccess,
    isLoading: isQueryLoading,
  } = trpc.playground.admin.requestsWithPendingApplications.useQuery();
  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

  const invalidateQuery = useCallback(
    () => utils.playground.admin.requestsWithPendingApplications.invalidate(),
    [utils.playground.admin.requestsWithPendingApplications]
  );

  const { mutate: mutateDelete, isLoading: isDeletionLoading } =
    trpc.playground.admin.deleteApplication.useMutation({
      onSuccess: () => invalidateQuery,
    });

  const { mutate, isLoading: isMutationLoading } =
    trpc.playground.admin.setApplicationStatus.useMutation({
      onSuccess: () => invalidateQuery,
    });

  const isLoading = isMutationLoading || isDeletionLoading;

  if (isQueryLoading) {
    return <Spinner />;
  }
  if (!isSuccess) return null;

  return (
    <div>
      <DarkButton href="/playground/admin" className="m-10 mx-auto w-fit">
        See requests
      </DarkButton>
      <div
        className="flex flex-row flex-wrap justify-center gap-5"
        ref={animatedRef}
      >
        {data.length === 0 && (
          <div className="text-center">There are no pending requests</div>
        )}
        {data.map((request) => (
          <div key={request.id}>
            <div className="h-full max-w-xl">
              <PlaygroundRequestCard request={request}>
                <b>
                  {request._count.applications > 0 ? (
                    <>
                      There are {request._count.applications} accepted
                      applications for this request
                    </>
                  ) : (
                    <>There are no accepted applications in this request</>
                  )}
                </b>
                <div className="pt-5 text-xl font-bold border-b">
                  Applications
                </div>
                <div className="flex flex-col gap-5 divide-y">
                  {request.applications.map((app) => (
                    <ApplicationCard key={app.id} application={app}>
                      <div className="flex flex-col gap-2 md:flex-row ">
                        <DarkButton
                          className="w-full"
                          disabled={isLoading}
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to deny ${app.name}'s application?`
                              )
                            ) {
                              mutate({ id: app.id, status: 'Accepted' });
                            }
                          }}
                        >
                          Accept
                        </DarkButton>
                        <ExternalLinkButton
                          className="w-full px-4 text-xl text-grey-dark"
                          disabled={isLoading}
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to deny ${app.name}'s application?`
                              )
                            ) {
                              mutate({ id: app.id, status: 'Rejected' });
                            }
                          }}
                        >
                          Deny
                        </ExternalLinkButton>
                        <ExternalLinkButton
                          className="w-full"
                          disabled={isLoading}
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to delete ${app.name}'s application?`
                              )
                            ) {
                              mutateDelete(app.id);
                            }
                          }}
                        >
                          🤫 Delete
                        </ExternalLinkButton>
                      </div>
                    </ApplicationCard>
                  ))}
                </div>
              </PlaygroundRequestCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
