import { DarkButton, ExternalLinkButton } from 'components/decoration/buttons';
import { trpc } from 'lib/client/trpc';

import type { PlaygroundApplication } from '@prisma/client';
import type { NextPage } from 'next';

const AdminPage: NextPage = ({}) => {
  const { queryClient } = trpc.useContext();

  const { data, isSuccess } = trpc.useQuery([
    'playground.admin.pendingApplications',
  ]);

  const { mutate, isLoading: isMutationLoading } = trpc.useMutation(
    ['playground.admin.setApplicationStatus'],
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries([
          'playground.admin.pendingApplications',
        ]);
        const previousApplications = queryClient.getQueryData<
          PlaygroundApplication[]
        >(['playground.admin.pendingApplications']);

        queryClient.setQueryData<PlaygroundApplication[]>(
          ['playground.admin.pendingApplications'],
          (oldApplications = []) =>
            oldApplications?.filter((old) => old.id !== id)
        );

        return { previousApplications };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData(
          ['playground.admin.pendingApplications'],
          context?.previousApplications
        );
      },
      onSettled: () => {
        void queryClient.invalidateQueries([
          'playground.admin.pendingApplications',
        ]);
      },
    }
  );

  if (!isSuccess) return null;
  return (
    <div>
      {data.map((application) => (
        <div key={application.id}>
          <div>{JSON.stringify(application)}</div>
          <div className="flex flex-row gap-5">
            <DarkButton
              disabled={isMutationLoading}
              onClick={() => {
                mutate({ id: application.id, status: 'Accepted' });
              }}
            >
              Accept
            </DarkButton>
            <ExternalLinkButton
              disabled={isMutationLoading}
              onClick={() => {
                mutate({ id: application.id, status: 'Rejected' });
              }}
            >
              Deny
            </ExternalLinkButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
