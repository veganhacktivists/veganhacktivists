import { DateTime } from 'luxon';
import { useCallback, useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faClock } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames';

import { Controller, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSession } from 'next-auth/react';

import { readableTimeSinceDate } from 'lib/helpers/date';

import { DarkButton } from 'components/decoration/buttons';

import { applyToRequestSchema } from 'lib/services/playground/schemas';

import useOnce from 'hooks/useOnce';

import TextInput from 'components/forms/inputs/textInput';

import { trpc } from 'lib/client/trpc';

import RadioButton from 'components/forms/inputs/radioButton';

import Checkbox from 'components/forms/inputs/checkbox';

import type { InferMutationInput, InferQueryOutput } from 'types/trpcHelper';

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
interface RequestProps {
  request: InferQueryOutput<'playground.request'>;
}

export const RequestDetails: React.FC<RequestProps> = ({ request }) => {
  const timeSinceCreated = useMemo(() => {
    if (!request) return null;
    return readableTimeSinceDate(request.createdAt);
  }, [request]);

  const createdAtFormatted = useMemo(() => {
    if (!request) return '';
    return DateTime.fromJSDate(request.createdAt).toFormat('MMMM dd, yyyy');
  }, [request]);

  return (
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
            <h1 className="text-2xl font-bold line-clamp-1">{request.title}</h1>
          </Field>
          <Field title="Description">
            <div className="font-sans line-clamp-3">{request.description}</div>
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
  );
};

const FormSidebar: React.FC<RequestProps> = ({ request }) => {
  return (
    <aside className="flex flex-col pl-20 text-left">
      <div className="font-bold uppercase">About the requestor</div>
      <div className="grid content-center w-32 rounded-full place-content-center aspect-square bg-red">
        <div className="font-bold text-white text-7xl w-fit">
          {/* Initials go here */}
          VH
        </div>
      </div>
      <div className="truncate">
        <div className="text-lg font-bold">{request.requester.name}</div>
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
  );
};

const MainForm: React.FC<RequestProps> = ({ request }) => {
  const { data: session, status: sessionStatus } = useSession();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    control,
  } = useForm<InferMutationInput<'playground.apply'>>({
    defaultValues: {
      requestId: request.id,
    },
    resolver: zodResolver(applyToRequestSchema),
  });

  useOnce(
    () => {
      const name = session?.user?.name;
      if (name) {
        setValue('name', name);
      }
    },
    { enabled: sessionStatus === 'authenticated' }
  );

  const { mutate } = trpc.useMutation(['playground.apply']);
  const onSubmit = useCallback(
    (values: InferMutationInput<'playground.apply'>) => {
      mutate(values);
    },
    [mutate]
  );

  const hasAppliedInThePast = useWatch({
    control,
    name: 'hasAppliedInThePast',
  });
  const isVegan = useWatch({
    control,
    name: 'isVegan',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-grow gap-5 px-10 text-left"
    >
      <div className="text-2xl font-medium font-italic">
        Would you like to apply to help with this issue?
      </div>
      <TextInput
        error={errors.name?.message}
        {...register('name')}
        placeholder="Your name"
      >
        Name
      </TextInput>
      <div className="flex flex-row gap-5">
        <TextInput
          error={errors.email?.message}
          {...register('email')}
          className="w-full"
          placeholder="name@example.com"
        >
          Email
        </TextInput>
        <TextInput
          className="w-full"
          error={errors.portfolioLink?.message}
          {...register('portfolioLink')}
          placeholder="yourportfolio.com"
        >
          Portfolio link
        </TextInput>
      </div>
      <div className="flex flex-row gap-5">
        <TextInput
          error={errors.email?.message}
          {...register('twitter')}
          placeholder="@yourhandle"
          className="w-full"
        >
          Twitter
        </TextInput>
        <TextInput
          className="w-full"
          error={errors.portfolioLink?.message}
          {...register('instagram')}
          placeholder="@yourhandle"
        >
          Instagram
        </TextInput>
        <TextInput
          className="w-full"
          error={errors.portfolioLink?.message}
          {...register('linkedin')}
          placeholder="LinkedIn username"
        >
          LinkedIn
        </TextInput>
      </div>
      <div className="flex flex-row justify-start gap-5">
        <div>Have you applied for a Playground role in the past?</div>
        <Controller
          control={control}
          name="hasAppliedInThePast"
          render={({ field: { value, onChange } }) => (
            <>
              <RadioButton
                onChange={() => {
                  onChange(true);
                }}
                checked={value === true}
                label="Yes"
              />
              <RadioButton
                onChange={() => {
                  onChange(false);
                }}
                checked={value === false}
                label="No"
              />
            </>
          )}
        />
      </div>
      <div className="flex flex-row justify-start gap-5">
        <div>Are you vegan?</div>
        <Controller
          control={control}
          name="isVegan"
          render={({ field: { value, onChange } }) => (
            <>
              <RadioButton
                {...register('isVegan')}
                onChange={() => {
                  onChange(true);
                }}
                checked={value === true}
                label="Yes"
              />
              <RadioButton
                {...register('isVegan')}
                onChange={() => {
                  onChange(false);
                }}
                checked={value === false}
                label="No"
              />
            </>
          )}
        />
      </div>
      <TextInput
        error={errors.calendlyUrl?.message}
        {...register('calendlyUrl')}
        placeholder="calendly.com/yourname"
      >
        Link to your Calendly, if you have one
      </TextInput>
      <TextInput
        {...register('moreInfo')}
        placeholder="e.g. What skill you have relating to this project, why do you want to help, etc."
      >
        Is there anything else you&apos;d like to add?
      </TextInput>
      <Checkbox {...register('commitToHelping')}>
        I understand that by applying to help that I will in a timely manner
        reasonably commit to helping this organization or person for the
        animals.
      </Checkbox>
      <Checkbox {...register('agreeToTerms')}>
        I agree to the VH: Playground terms and conditions.
      </Checkbox>
      <DarkButton type="submit">Apply</DarkButton>
    </form>
  );
};

export const RequestApplyForm: React.FC<RequestProps> = ({ request }) => {
  return (
    <div className="min-h-[30vh] bg-grey-background flex md:flex-row flex-col-reverse justify-between divide-x-2 divide-white py-10 px-20 md:px-32">
      <MainForm request={request} />
      <FormSidebar request={request} />
    </div>
  );
};

export default Request;
