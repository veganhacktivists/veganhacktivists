import { useRouter } from 'next/router';
import { z } from 'zod';
import React from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { NextSeo } from 'next-seo';

import { useSession } from 'next-auth/react';

import { faLongArrowAltLeft as leftArrow } from '@fortawesome/free-solid-svg-icons';

import { DarkButton } from '../../../components/decoration/buttons';

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

  const { data: request, status } = trpc.proxy.playground.getRequest.useQuery(
    router.query.id as string,
    {
      retry: 1,
      onError: () => {
        toast.error('The request could not be found');
        void router.push('/playground', undefined, { shallow: true });
      },
    }
  );

  const truncatedDescription = request?.description.slice(0, 300);

  return (
    <>
      <NextSeo
        title={request?.title}
        description={truncatedDescription}
        openGraph={{ title: request?.title }}
      />
      <div className="mt-24">
        <div className="m-10 mb-5 w-fit text-grey ml-10 md:ml-20">
          <Link
            href={{
              pathname: '/playground',
            }}
          >
            <a>
              <DarkButton className="flex font-mono font-bold uppercase">
                <div>
                  <FontAwesomeIcon icon={leftArrow} size="xs" />
                </div>
                <span className="pl-3 block">Go Back</span>
              </DarkButton>
            </a>
          </Link>
          {session.data?.user?.role === 'Admin' && (
            <div className="text-left mt-2">
              <Link
                href={{
                  pathname: '/playground/admin',
                }}
              >
                <a>
                  <DarkButton className="flex font-mono font-bold uppercase">
                    <div>
                      <FontAwesomeIcon icon={leftArrow} size="xs" />
                    </div>
                    <span className="block pl-3">Review requests</span>
                  </DarkButton>
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
