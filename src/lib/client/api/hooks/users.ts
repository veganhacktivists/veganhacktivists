import { trpc } from 'lib/client/trpc';

import type { UseTRPCMutationOptions } from '@trpc/react';

import type { InferMutationInput, InferMutationOutput } from 'types/trpcHelper';

import type { Session } from 'next-auth';

interface Context {
  previousSession: Session | null;
}

export const useUpdateUser = (
  mutationOptions: UseTRPCMutationOptions<
    InferMutationInput<'users.updateMe'>,
    unknown,
    InferMutationOutput<'users.updateMe'>
  >
) => {
  const { queryClient } = trpc.useContext();
  return trpc.useMutation(['users.updateMe'], {
    ...mutationOptions,
    onMutate: async (user) => {
      await queryClient.cancelQueries(['session']);
      const previousSession = queryClient.getQueryData<Session | null>([
        'session',
      ]);
      queryClient.setQueryData<Session | null>(
        ['session'],
        (old) =>
          ({
            ...old,
            user: {
              ...old?.user,
              ...user,
            },
          } as Session)
      );

      return { previousSession } as Context;
    },
    onError: (error, variables, context) => {
      void mutationOptions?.onError?.(error, variables, context);
      queryClient.setQueryData(['session'], context?.previousSession);
    },
    onSettled: (data, error, variables, context) => {
      void mutationOptions?.onSettled?.(data, error, variables, context);
      void queryClient.invalidateQueries(['session']);
    },
  });
};
