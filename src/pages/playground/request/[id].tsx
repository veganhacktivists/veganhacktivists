import { useRouter } from 'next/router';
import { z } from 'zod';
import React from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import PlaygroundLayout from 'components/layout/playground/layout';
import useOnce from 'hooks/useOnce';
import { trpc } from 'lib/client/trpc';
import Spinner from 'components/decoration/spinner';
import {
  RequestApplyForm,
  RequestDetails,
} from 'components/layout/playground/request';

import type PageWithLayout from 'types/persistentLayout';

const idSchema = z.string().cuid({ message: 'The request ID is invalid' });

const PlaygroundRequest: PageWithLayout = ({}) => {
  const router = useRouter();
  useOnce(
    async () => {
      const data = idSchema.safeParse(router.query.id);
      if (data.success) {
        return;
      }

      await router.push('/playground');
      toast.error(data.error.issues.map((issue) => issue.message).join('\n'));
    },
    { enabled: router.isReady }
  );

  const { data: request, status } = trpc.useQuery(
    ['playground.request', router.query.id as string],
    {
      // enabled: !!id || typeof window === 'undefined',
      onError: () => {
        toast.error('The request could not be found');
        void router.push('/playground', undefined, { shallow: true });
      },
    }
  );

  return (
    <div>
      <div className="m-10 mb-5 w-fit text-grey">
        <Link
          href={{
            pathname: '/playground',
          }}
        >
          <a>
            <FontAwesomeIcon icon={faArrowLeft} /> Return to requests page
          </a>
        </Link>
      </div>
      {status === 'success' && (
        <>
          <RequestDetails request={request} />
          <RequestApplyForm request={request} />
        </>
      )}
      {status === 'loading' && (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

PlaygroundRequest.Layout = PlaygroundLayout;

export default PlaygroundRequest;
