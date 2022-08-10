import { useRouter } from 'next/router';
import { z } from 'zod';
import React from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { NextSeo } from 'next-seo';

import { useSession } from 'next-auth/react';

import PlaygroundLayout from 'components/layout/playground/layout';
import useOnce from 'hooks/useOnce';
import { trpc } from 'lib/client/trpc';
import Spinner from 'components/decoration/spinner';
import {
  RequestApplyForm,
  RequestDetails,
} from 'components/layout/playground/applyForm';

import type PageWithLayout from 'types/persistentLayout';

const idSchema = z.string().cuid({ message: 'The request ID is invalid' });

const PlaygroundRequest: PageWithLayout = ({}) => {
  const router = useRouter();
  const session = useSession();
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

  const { data: request, status } = trpc.proxy.playground.request.useQuery(
    router.query.id as string,
    {
      onError: () => {
        toast.error('The request could not be found');
        void router.push('/playground', undefined, { shallow: true });
      },
    }
  );

  return (
    <>
      <NextSeo title={request?.title} />
      <div className="mt-24">
        <div className="m-10 mb-5 w-fit text-grey">
          <Link
            href={{
              pathname: '/playground',
            }}
          >
            <a>
              <FontAwesomeIcon icon={faArrowLeft} /> View all requests
            </a>
          </Link>
          {session.data?.user?.role === 'Admin' && (
            <div className="text-left">
              <Link
                href={{
                  pathname: '/playground/admin',
                }}
              >
                <a>
                  <FontAwesomeIcon icon={faArrowLeft} /> Review requests
                </a>
              </Link>
            </div>
          )}
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
    </>
  );
};

PlaygroundRequest.Layout = PlaygroundLayout;

export default PlaygroundRequest;
