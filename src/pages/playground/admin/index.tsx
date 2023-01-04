import { NextSeo } from 'next-seo';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Status } from '@prisma/client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import {
  DenyButton,
  ExternalLinkButton,
  GreenButton,
  LightButton,
  LogoutButton,
  OutlineButton,
  BlueButton,
} from 'components/decoration/buttons';
import { trpc } from 'lib/client/trpc';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import Spinner from 'components/decoration/spinner';
import useOnce from 'hooks/useOnce';

import type { NextPage } from 'next';

const STATES_TO_HIDE: Status[] = [Status.Rejected];

const AdminPage: NextPage = () => {
  const utils = trpc.useContext();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<Status>(Status.Pending);

  const readFromQuery = useOnce(
    () => {
      const status = router.query.status as Status;
      if (status) {
        setStatusFilter(status);
      }
    },
    { enabled: router.isReady }
  );

  useOnce(
    () => {
      Object.values(Status)
        .filter(
          (status) =>
            status !== statusFilter && !STATES_TO_HIDE.includes(status)
        )
        .forEach(async (status) => {
          await utils.playground.admin.getRequests.prefetch({
            status,
          });
        });
    },
    { enabled: readFromQuery }
  );

  const invalidateQuery = useCallback(
    () => utils.playground.admin.getRequests.invalidate(),
    [utils.playground.admin.getRequests]
  );

  const { data, isSuccess, isLoading } =
    trpc.playground.admin.getRequests.useQuery({
      status: statusFilter,
    });

  const { mutate, isLoading: isMutationLoading } =
    trpc.playground.admin.setRequestStatus.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const { mutate: mutateDelete, isLoading: isDeletionLoading } =
    trpc.playground.admin.deleteRequest.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const { mutate: mutateRepost, isLoading: isRepostLoading } =
    trpc.playground.admin.repostRequest.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

  const RequestFilterButton = useCallback(
    ({ status }: { status: Status }) => {
      return (
        <OutlineButton
          active={status === statusFilter}
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.set('status', status);
            window.history.pushState({}, '', url);
            setStatusFilter(status);
          }}
        >
          {status === 'Accepted' ? 'Live' : status} requests
        </OutlineButton>
      );
    },
    [statusFilter]
  );

  const isActionLoading =
    isMutationLoading || isRepostLoading || isDeletionLoading;

  if (isLoading) {
    return <Spinner />;
  }

  if (!isSuccess) return null;

  return (
    <>
      <NextSeo title={`${statusFilter} Requests - Admin panel`} />
      <div>
        <div className="flex flex-col justify-center gap-10 p-10 mx-auto md:flex-row place-items-center">
          {Object.values(Status)
            .filter((status) => !STATES_TO_HIDE.includes(status))
            .map((status) => (
              <RequestFilterButton key={status} status={status} />
            ))}
          <OutlineButton
            href="/playground/admin/applications"
            className="mx-5 w-fit"
          >
            See applications
          </OutlineButton>
          <LogoutButton href="/auth/signout" className="mx-5 w-fit">
            Logout
          </LogoutButton>
        </div>
        {data.length === 0 && (
          <div className="text-center">There are no available requests</div>
        )}
        <div
          className="grid gap-5 mx-auto my-5 md:mb-20 sm:px-10 md:grid-cols-2 lg:px-40"
          ref={animatedRef}
        >
          {data.map((request) => (
            <div key={request.id}>
              <PlaygroundRequestCard
                request={request}
                disabled={isActionLoading}
              >
                <b>This request is {request.status}!</b>
                {request.status === Status.Accepted && (
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
                )}
                <div className="grid grid-cols-1 gap-x-5 gap-y-2 md:grid-cols-2">
                  {request.status === Status.Pending ? (
                    <>
                      <LightButton
                        className="w-full"
                        disabled={isActionLoading}
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to accept '${request.title}'?`
                            )
                          ) {
                            mutate({ id: request.id, status: 'Accepted' });
                          }
                        }}
                      >
                        Accept
                      </LightButton>
                      <DenyButton
                        className="w-full text-xl text-white"
                        disabled={isActionLoading}
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to reject '${request.title}'?`
                            )
                          ) {
                            mutate({ id: request.id, status: 'Rejected' });
                          }
                        }}
                      >
                        Deny
                      </DenyButton>{' '}
                    </>
                  ) : (
                    <BlueButton
                      className="w-full px-2 text-xl"
                      disabled={isActionLoading}
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to repost '${request.title}'?`
                          )
                        ) {
                          mutateRepost({ id: request.id });
                        }
                      }}
                    >
                      🔁 Repost request
                    </BlueButton>
                  )}
                  {request.status !== Status.Completed ? (
                    <GreenButton
                      className="w-full px-2 text-xl"
                      disabled={isActionLoading}
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to complete '${request.title}'?`
                          )
                        ) {
                          mutate({ id: request.id, status: Status.Completed });
                        }
                      }}
                    >
                      🎉 Mark as completed
                    </GreenButton>
                  ) : null}
                  <ExternalLinkButton
                    className="w-full px-2 text-xl text-white"
                    disabled={isActionLoading}
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete '${request.title}'?`
                        )
                      ) {
                        mutateDelete({ id: request.id });
                      }
                    }}
                  >
                    🤫 Delete
                  </ExternalLinkButton>
                </div>
              </PlaygroundRequestCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
