import { useMutation, useQueryClient } from '@tanstack/react-query';

import apiClient from '..';

import type { Session } from 'next-auth';

import type { UserUpdateParams } from 'pages/api/users/[id]';
import type {
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';

import type { User } from '@prisma/client';

interface Context {
  previousSession: Session | null;
}

export const useUpdateUser: (
  mutationOptions?: UseMutationOptions<User, unknown, UserUpdateParams, Context>
) => UseMutationResult<User, unknown, UserUpdateParams, Context> = (
  mutationOptions
) => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UserUpdateParams, Context>(
    ({ id, ...user }) => apiClient.patch(`/users/${id}`, user),
    {
      ...mutationOptions,
      mutationKey: ['updateUser'],
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
    }
  );
};
