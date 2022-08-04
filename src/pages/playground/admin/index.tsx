import {
  DarkButton,
  ExternalLinkButton,
  LightButton,
} from 'components/decoration/buttons';
import { trpc } from 'lib/client/trpc';

import PlaygroundRequestCard from 'components/layout/playground/requestCard';

import type { PlaygroundRequest } from '@prisma/client';
import type { NextPage } from 'next';

const AdminPage: NextPage = ({}) => {
  const { queryClient } = trpc.useContext();

  const { data, isSuccess } = trpc.useQuery([
    'playground.admin.pendingRequests',
  ]);

  const { mutate, isLoading: isMutationLoading } = trpc.useMutation(
    ['playground.admin.setRequestStatus'],
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries(['playground.admin.pendingRequests']);
        const previousRequests = queryClient.getQueryData<PlaygroundRequest[]>([
          'playground.admin.pendingRequests',
        ]);

        queryClient.setQueryData<PlaygroundRequest[]>(
          ['playground.admin.pendingRequests'],
          (oldRequests = []) => oldRequests?.filter((old) => old.id !== id)
        );

        return { previousApplications: previousRequests };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData(
          ['playground.admin.pendingRequests'],
          context?.previousApplications
        );
      },
      onSettled: () => {
        void queryClient.invalidateQueries([
          'playground.admin.pendingRequests',
        ]);
      },
    }
  );

  if (!isSuccess) return null;
  return (
    <div>
      <DarkButton
        href="/playground/admin/applications"
        className="m-10 mx-auto w-fit"
      >
        See applications
      </DarkButton>
      <div className="grid gap-5 px-10 my-5 md:grid-cols-2 md:px-40">
        {data.map((request) => (
          <div key={request.id}>
            <PlaygroundRequestCard request={request}>
              <div className="flex flex-row gap-5">
                <LightButton
                  className="w-full"
                  disabled={isMutationLoading}
                  onClick={() => {
                    mutate({ id: request.id, status: 'Accepted' });
                  }}
                >
                  Accept
                </LightButton>
                <ExternalLinkButton
                  className="w-full px-2 text-xl text-grey-dark"
                  disabled={isMutationLoading}
                  onClick={() => {
                    mutate({ id: request.id, status: 'Rejected' });
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
  );
};

export default AdminPage;
