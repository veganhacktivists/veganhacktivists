import { useQuery } from '@tanstack/react-query';

import apiClient from '..';

import type { PlaygroundRequest, User } from '@prisma/client';

export interface PlaygroundRequestType
  extends Omit<PlaygroundRequest, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  requester: Required<Pick<User, 'id' | 'name'>>;
}

export const usePlaygroundRequests = () => {
  const query = useQuery<PlaygroundRequestType[]>(
    ['playground-requests'],
    () =>
      apiClient
        .get<PlaygroundRequestType[]>('/playground/requests', {
          // TODO
          // page: 1,
          // limit: 10,
        })
        .then((res) => res.data),
    { placeholderData: [] }
  );

  return query;
};
