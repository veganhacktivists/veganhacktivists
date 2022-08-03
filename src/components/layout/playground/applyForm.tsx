import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faClock } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useRef } from 'react';

import SignInPrompt from './siginInPrompt';

import { readableTimeSinceDate } from 'lib/helpers/date';

import { DarkButton } from 'components/decoration/buttons';

import { applyToRequestSchemaClient } from 'lib/services/playground/schemas';

import useOnce from 'hooks/useOnce';

import TextInput from 'components/forms/inputs/textInput';

import { trpc } from 'lib/client/trpc';

import RadioButton from 'components/forms/inputs/radioButton';

import Checkbox from 'components/forms/inputs/checkbox';

import SubtleBorder from 'components/decoration/subtleBorder';

import usePlaygroundApplyStore from 'lib/stores/playground/applyStore';

import Spinner from 'components/decoration/spinner';

import type { AppRouter } from 'pages/api/trpc/[trpc]';

import type { TRPCClientError } from '@trpc/react';

import type { z } from 'zod';

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
    <div className="px-10 mb-5 md:px-40">
      <div className="flex flex-row justify-start gap-5">
        <div
          className={classNames('px-3 py-1 ml-0 border w-fit mb-5', {
            'border-pink text-pink': request.isFree,
            'border-blue text-blue': !request.isFree,
          })}
        >
          {request.isFree ? 'Volunteer' : 'Paid'} role
        </div>
        {request.status !== 'Accepted' && (
          <div
            className={classNames('px-3 py-1 ml-0 border w-fit mb-5', {
              'bg-red text-white': request.status === 'Rejected',
              'bg-grey text-grey-light': request.status === 'Pending',
            })}
          >
            {request.status === 'Pending' ? 'Pending' : 'Denied'} request!
          </div>
        )}
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
        <SubtleBorder className="flex flex-col gap-1 p-2 min-w-fit bg-grey-background h-fit">
          <Field title="Category">{request.category}</Field>
          <Field title="Priority">{request.priority}</Field>
          <Field title="Due date">{createdAtFormatted}</Field>
          <Field title="Est. time required">
            {request.estimatedTimeDays} DAYS
          </Field>
        </SubtleBorder>
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

type FormInput = z.infer<typeof applyToRequestSchemaClient>;

const MainForm: React.FC<RequestProps> = ({ request }) => {
  const { data: session, status: sessionStatus } = useSession();
  const storedForm = usePlaygroundApplyStore((state) =>
    state.getForm(request.id)
  );
  const setFormData = usePlaygroundApplyStore((state) =>
    state.setForm(request.id)
  );
  const clearFormData = usePlaygroundApplyStore((state) =>
    state.resetForm(request.id)
  );

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const onModalClose = useCallback(() => {
    setIsSignInModalOpen(false);
  }, []);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<InferMutationInput<'playground.apply'>>({
    defaultValues: {
      ...storedForm,
      hasAppliedInThePast: request.userAlreadyApplied,
      requestId: request.id,
    },
    resolver: zodResolver(applyToRequestSchemaClient),
  });

  const onChangeValue = useCallback(
    (name: keyof FormInput) => (value: unknown) => {
      setFormData({ [name]: value });
    },
    [setFormData]
  );

  const myRegister = useCallback<typeof register>(
    (name, options) => {
      return register(name, {
        ...options,
        onChange: (value) => {
          options?.onChange?.(value);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          onChangeValue(name)(value.currentTarget.value);
        },
      });
    },
    [onChangeValue, register]
  );

  const dataFilled = useOnce(
    () => {
      if (!session?.user) return;
      const { name, email } = session.user;
      if (name && !watch('name')) {
        setValue('name', name);
      }

      if (email && !watch('providedEmail')) {
        setValue('providedEmail', email);
      }
    },
    { enabled: sessionStatus === 'authenticated' }
  );

  const { mutateAsync, isLoading, isSuccess } = trpc.useMutation(
    ['playground.apply'],
    {
      onSuccess: () => {
        clearFormData();
        reset();
      },
    }
  );
  const onSubmit = useCallback(
    (values: InferMutationInput<'playground.apply'>) => {
      if (sessionStatus === 'unauthenticated') {
        setIsSignInModalOpen(true);
        return;
      } else if (sessionStatus === 'loading') {
        return;
      }
      void toast.promise(mutateAsync(values), {
        pending: 'Submitting...',
        success: 'Your application has been submitted!',
        error: {
          render: ({ data }: { data?: TRPCClientError<AppRouter> }) => {
            return data?.message;
          },
        },
      });
    },
    [mutateAsync, sessionStatus]
  );

  const router = useRouter();

  useOnce(
    () => {
      if (router.query.submit !== 'true') return;
      if (formRef.current) {
        formRef.current.scrollIntoView();
      }
      void handleSubmit(onSubmit)();
    },
    { enabled: router.isReady && dataFilled }
  );

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-grow gap-5 px-10 text-left"
      >
        <div className="text-2xl font-medium font-italic">
          Would you like to apply to help with this issue?
        </div>
        <TextInput
          error={errors.name?.message}
          {...myRegister('name')}
          placeholder="Your name"
        >
          Name
        </TextInput>
        <div className="flex flex-row gap-5">
          <TextInput
            error={errors.providedEmail?.message}
            {...myRegister('providedEmail')}
            className="w-full"
            placeholder="name@example.com"
          >
            Email
          </TextInput>
          <TextInput
            className="w-full"
            error={errors.portfolioLink?.message}
            {...myRegister('portfolioLink')}
            placeholder="yourportfolio.com"
          >
            Portfolio link
          </TextInput>
        </div>
        <div className="flex flex-row gap-5">
          <TextInput
            error={errors.twitterUrl?.message}
            {...myRegister('twitterUrl')}
            placeholder="@yourhandle"
            className="w-full"
          >
            Twitter
          </TextInput>
          <TextInput
            className="w-full"
            error={errors.instagramUrl?.message}
            {...myRegister('instagramUrl')}
            placeholder="@yourhandle"
          >
            Instagram
          </TextInput>
          <TextInput
            className="w-full"
            error={errors.linkedinUrl?.message}
            {...myRegister('linkedinUrl')}
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
                    setFormData({ hasAppliedInThePast: true });
                    onChange(true);
                  }}
                  checked={value === true}
                  label="Yes"
                />
                <RadioButton
                  onChange={() => {
                    setFormData({ hasAppliedInThePast: false });

                    onChange(false);
                  }}
                  checked={value === false}
                  label="No"
                />
                {errors.hasAppliedInThePast?.message && (
                  <span className="text-red">
                    {errors.hasAppliedInThePast.message}
                  </span>
                )}
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
                  onChange={() => {
                    setFormData({ isVegan: true });

                    onChange(true);
                  }}
                  checked={value === true}
                  label="Yes"
                />
                <RadioButton
                  onChange={() => {
                    setFormData({ isVegan: true });
                    onChange(false);
                  }}
                  checked={value === false}
                  label="No"
                />
                {errors.isVegan?.message && (
                  <span className="text-red">{errors.isVegan.message}</span>
                )}
              </>
            )}
          />
        </div>
        <TextInput
          error={errors.calendlyUrl?.message}
          {...myRegister('calendlyUrl')}
          placeholder="calendly.com/yourname"
        >
          Link to your Calendly, if you have one
        </TextInput>
        <TextInput
          {...myRegister('moreInfo')}
          placeholder="e.g. What skill you have relating to this project, why do you want to help, etc."
        >
          Is there anything else you&apos;d like to add?
        </TextInput>
        <Checkbox
          error={errors.commitToHelping?.message}
          {...myRegister('commitToHelping')}
          onChange={(e) => {
            const checked = e.currentTarget.checked;
            setFormData({ commitToHelping: checked });
            setValue('commitToHelping', checked);
          }}
        >
          I understand that by applying to help that I will in a timely manner
          reasonably commit to helping this organization or person for the
          animals.
        </Checkbox>
        <Checkbox
          error={errors.agreeToTerms?.message}
          {...myRegister('agreeToTerms')}
          onChange={(e) => {
            const checked = e.currentTarget.checked;
            setFormData({ agreeToTerms: checked });
            setValue('agreeToTerms', checked);
          }}
        >
          I agree to the VH: Playground terms and conditions.
        </Checkbox>
        <DarkButton
          disabled={isLoading || isSuccess || request.userAlreadyApplied}
          type="submit"
        >
          {isLoading ? (
            <Spinner />
          ) : request.userAlreadyApplied ? (
            'You have already applied!'
          ) : (
            'Submit'
          )}
          {/* Apply */}
        </DarkButton>
      </form>
      <SignInPrompt
        isOpen={isSignInModalOpen}
        onClose={onModalClose}
        email={watch('providedEmail')}
        submitOnVerify
      />
    </>
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
