import { NextSeo } from 'next-seo';

import {
  DarkButton,
  ExternalLinkButton,
  LightButton,
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

  if (!isSuccess) return null;
  return (
    <>
      <NextSeo title="Admin panel" />
      <div>
        <DarkButton
          href="/playground/admin/applications"
          className="m-10 mx-auto w-fit"
        >
          See applications
        </DarkButton>
        <LightButton href="/auth/signout" className="m-10 mx-auto w-fit">
          Logout
        </LightButton>
        <div className="grid gap-5 px-10 my-5 md:grid-cols-2 lg:px-40">
          {data.map((request) => (
            <div key={request.id}>
              <PlaygroundRequestCard request={request}>
                <div className="flex flex-row gap-5">
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
                  <ExternalLinkButton
                    className="w-full px-2 text-xl text-grey-dark"
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
