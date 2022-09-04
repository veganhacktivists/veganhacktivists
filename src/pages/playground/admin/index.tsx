import { NextSeo } from 'next-seo';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Status } from '@prisma/client';

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

import type { NextPage } from 'next';

const AdminPage: NextPage = ({}) => {
  const { queryClient } = trpc.useContext();

  const { data, isSuccess } =
    trpc.proxy.playground.admin.pendingRequests.useQuery();

  const { mutate, isLoading: isMutationLoading } =
    trpc.proxy.playground.admin.setRequestStatus.useMutation({
      onSuccess: () => {
        void queryClient.invalidateQueries([
          'playground.admin.pendingRequests',
        ]);
      },
    });

  const { mutate: mutateDelete, isLoading: isDeletionLoading } =
    trpc.proxy.playground.admin.deleteRequest.useMutation({
      onSuccess: () => {
        void queryClient.invalidateQueries([
          'playground.admin.pendingRequests',
        ]);
      },
    });

  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

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
          className="grid gap-5 my-5 md:mb-20 sm:px-10 md:grid-cols-2 lg:px-40"
          ref={animatedRef}
        >
          {data.map((request) => (
            <div key={request.id} className="mx-auto">
              <PlaygroundRequestCard request={request}>
                <b>This request is {request.status}!</b>
                <div className="grid grid-cols-1 gap-x-5 gap-y-2 md:grid-cols-2">
                  <LightButton
                    className="w-full"
                    disabled={isMutationLoading}
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
                    className="w-full px-2 text-xl text-grey"
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
