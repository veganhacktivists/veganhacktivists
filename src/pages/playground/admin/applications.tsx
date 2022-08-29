import { useAutoAnimate } from '@formkit/auto-animate/react';

import { DarkButton, ExternalLinkButton } from 'components/decoration/buttons';
import { trpc } from 'lib/client/trpc';

import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';

import ApplicationCard from 'components/layout/playground/applicationCard';

import type { NextPage } from 'next';

const AdminPage: NextPage = ({}) => {
  const { queryClient } = trpc.useContext();

  const { data, isSuccess } =
    trpc.proxy.playground.admin.requestsWithPendingApplications.useQuery();
  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

  const { mutate: mutateDelete, isLoading: isDeletionLoading } =
    trpc.proxy.playground.admin.deleteApplication.useMutation({
      onSuccess: () => {
        void queryClient.invalidateQueries([
          'playground.admin.requestsWithPendingApplications',
        ]);
      },
    });

  const { mutate, isLoading: isMutationLoading } =
    trpc.proxy.playground.admin.setApplicationStatus.useMutation({
      onSuccess: () => {
        void queryClient.invalidateQueries([
          'playground.admin.requestsWithPendingApplications',
        ]);
      },
    });

  const isLoading = isMutationLoading || isDeletionLoading;

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
        {data.map((request) => (
          <div key={request.id}>
            <div className="max-w-xl h-ful">
              <PlaygroundRequestCard request={request}>
                <div className="pt-5 mt-10 text-xl font-bold border-b">
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
