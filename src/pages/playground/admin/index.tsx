import { NextSeo } from 'next-seo';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Status } from '@prisma/client';
import { useCallback } from 'react';

import {
  DarkButton,
  DenyButton,
  ExternalLinkButton,
  GreenButton,
  LightButton,
  LogoutButton,
} from 'components/decoration/buttons';
import { trpc } from 'lib/client/trpc';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import Spinner from 'components/decoration/spinner';

import type { NextPage } from 'next';

const AdminPage: NextPage = () => {
  const utils = trpc.useContext();

  const invalidateQuery = useCallback(
    () => utils.playground.admin.pendingRequests.invalidate(),
    [utils.playground.admin.pendingRequests]
  );

  const { data, isSuccess, isLoading } =
    trpc.playground.admin.pendingRequests.useQuery();

  const { mutate, isLoading: isMutationLoading } =
    trpc.playground.admin.setRequestStatus.useMutation({
      onSuccess: () => invalidateQuery,
    });

  const { mutate: mutateDelete, isLoading: isDeletionLoading } =
    trpc.playground.admin.deleteRequest.useMutation({
      onSuccess: () => invalidateQuery,
    });

  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isSuccess) return null;

  return (
    <>
      <NextSeo title="Admin panel" />
      <div>
        <div className="flex flex-col justify-center gap-10 p-10 mx-auto md:flex-row place-items-center">
          <DarkButton
            href="/playground/admin/applications"
            className="mx-5 w-fit"
          >
            See applications
          </DarkButton>
          <LogoutButton href="/auth/signout" className="mx-5 w-fit">
            Logout
          </LogoutButton>
        </div>
        <div
          className="grid gap-5 mx-auto my-5 md:mb-20 sm:px-10 md:grid-cols-2 lg:px-40"
          ref={animatedRef}
        >
          {data.length === 0 && (
            <div className="text-center">There are no available requests</div>
          )}
          {data.map((request) => (
            <div key={request.id}>
              <PlaygroundRequestCard request={request}>
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
                  <LightButton
                    className="w-full"
                    disabled={
                      isMutationLoading || request.status === Status.Accepted
                    }
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
                    disabled={isMutationLoading}
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
                  </DenyButton>
                  <ExternalLinkButton
                    className="w-full px-2 text-xl text-white"
                    disabled={isDeletionLoading}
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
                  <GreenButton
                    className="w-full px-2 text-xl"
                    disabled={isMutationLoading}
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
