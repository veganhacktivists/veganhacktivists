import { useRouter } from 'next/router';

import { z } from 'zod';

import React, { useMemo, useState } from 'react';

import { toast } from 'react-toastify';

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames';

import { DateTime, Duration } from 'luxon';

import PlaygroundLayout from 'components/layout/playground/layout';

import useOnce from 'hooks/useOnce';

import { trpc } from 'lib/client/trpc';

import Spinner from 'components/decoration/spinner';

import { DarkButton } from 'components/decoration/buttons';

import type PageWithLayout from 'types/persistentLayout';

const idSchema = z.string().cuid({ message: 'The request ID is invalid' });

const Field: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div>
      <div className="font-bold uppercase">{title}</div>
      {children}
    </div>
  );
};

const PlaygroundRequest: PageWithLayout = ({}) => {
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  useOnce(
    async () => {
      const data = idSchema.safeParse(router.query.id);
      if (data.success) {
        setId(data.data);
        return;
      }

      await router.push('/playground');
      toast.error(data.error.issues.map((issue) => issue.message).join('\n'));
    },
    { enabled: router.isReady }
  );
  const { data: request, isSuccess } = trpc.useQuery(
    ['playground.request', id as string],
    {
      enabled: !!id,
      onError: () => {
        toast.error('The request could not be found');
        void router.push('/playground', undefined, { shallow: true });
      },
    }
  );

  const timeSinceCreated = useMemo(() => {
    if (!request) return null;
    const timeDiff = DateTime.now()
      .diff(DateTime.fromJSDate(request.createdAt), [
        'years',
        'months',
        'weeks',
        'days',
      ])
      .normalize()
      .toObject();

    const diffWithoutZeroes = Object.fromEntries(
      Object.entries(timeDiff).filter(([, value]) => value >= 0.5)
    );

    if (Object.keys(diffWithoutZeroes).length === 0) {
      return null;
    }

    return Duration.fromObject(diffWithoutZeroes).toHuman({
      maximumFractionDigits: 0,
    });
  }, [request]);

  const createdAtFormatted = useMemo(() => {
    if (!request) return '';
    const date = DateTime.fromJSDate(request.createdAt);
    return date.toFormat('MMMM dd, yyyy');
  }, [request]);

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
      {isSuccess ? (
        <>
          <div className="px-10 md:px-40">
            <div
              className={classNames('px-3 py-1 ml-0 border w-fit mb-5', {
                'border-pink text-pink': request.isFree,
                'border-blue text-blue': !request.isFree,
              })}
            >
              {request.isFree ? 'Volunteer' : 'Paid'} role
            </div>
            <div className="relative flex flex-row gap-10 font-mono text-left justfy-between">
              <div className="absolute w-16 -translate-x-full -left-5 aspect-square bg-yellow" />
              <div className="flex flex-col gap-5">
                <Field title="Title">
                  <h1 className="text-2xl font-bold line-clamp-1">
                    {request.title}
                  </h1>
                </Field>
                <Field title="Description">
                  <div className="font-sans line-clamp-3">
                    {request.description}
                  </div>
                </Field>
                <Field title="Skills required">
                  <div>{request.requiredSkills.join(', ')}</div>
                </Field>
              </div>
              <div className="flex flex-col gap-1 p-2 min-w-fit bg-grey-background h-fit">
                <Field title="Category">{request.category}</Field>
                <Field title="Priority">{request.priority}</Field>
                <Field title="Due date">{createdAtFormatted}</Field>
                <Field title="Est. time required">
                  {request.estimatedTimeDays} DAYS
                </Field>
              </div>
            </div>
            <div className="text-left font-italic text-grey-light">
              <FontAwesomeIcon icon={faClock} /> Posted {timeSinceCreated} ago
            </div>
          </div>
          <div className="min-h-[30vh] bg-grey-background flex md:flex-row flex-col-reverse justify-between divide-x-2 divide-white py-10 px-20 md:px-32">
            <div className="flex-grow text-left">
              {/* There's a lot of text! The form goes here. I should separate all this */}
              <div className="text-2xl font-medium font-italic">
                Would you like to apply to help with this issue?
              </div>
              <DarkButton type="submit">Apply</DarkButton>
            </div>
            <aside className="flex flex-col pl-20 text-left">
              <div className="font-bold uppercase">About the requestor</div>
              <div className="grid content-center w-32 rounded-full place-content-center aspect-square bg-red">
                <div className="font-bold text-white text-7xl w-fit">
                  {/* Initials go here */}
                  VH
                </div>
              </div>
              <div className="truncate">
                <div className="text-lg font-bold">
                  {request.requester.name}
                </div>
                <div>{request.organization}</div>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline hover:text-grey visited:text-grey"
                    href={request.website}
                  >
                    {request.website.replace(/^https?:\/\//i, '')}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

PlaygroundRequest.Layout = PlaygroundLayout;

export default PlaygroundRequest;
