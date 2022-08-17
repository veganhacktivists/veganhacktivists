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

import { TimePerWeek } from '@prisma/client';

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

import TextArea from 'components/forms/inputs/textArea';

import SelectInput from 'components/forms/inputs/selectInput';

import Label from 'components/forms/inputs/label';

import type { AppRouter } from 'server/routers/_app';

import type { inferMutationInput, inferQueryOutput } from 'lib/client/trpc';

import type { TRPCClientError } from '@trpc/react';

import type { z } from 'zod';

export const TimePerWeekLabel: Record<TimePerWeek, string> = {
  OneToThree: '1-3 hours/week',
  ThreeToFive: '3-5 hours/week',
  FiveToEight: '5-8 hours/week',
  TenPlus: '10+ hours/week',
};

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
  request: inferQueryOutput<'playground.request'>;
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

      <div className="relative flex flex-row gap-10 mb-4 font-mono text-left justfy-between">
        <div className="absolute w-16 -translate-x-full -left-5 aspect-square bg-yellow" />
        <div className="flex flex-col gap-5">
          <Field title="Title">
            <h1
              className="text-2xl font-bold line-clamp-1"
              title={request.title}
            >
              {request.title}
            </h1>
          </Field>
          <Field title="Description">
            <div className="font-sans">{request.description}</div>
          </Field>
          <Field title="Skills required">
            <div>{request.requiredSkills.join(', ')}</div>
          </Field>
        </div>
        <SubtleBorder className="flex flex-col gap-1 p-8 min-w-fit bg-grey-background h-fit">
          <Field title="Category">{request.category}</Field>
          <Field title="Priority">{request.priority}</Field>
          <Field title="Due date">{createdAtFormatted}</Field>
          <Field title="Est. time required">
            {request.estimatedTimeDays} DAYS
          </Field>
        </SubtleBorder>
      </div>
      <div className="font-serif italic text-left text-grey-light">
        <FontAwesomeIcon icon={faClock} /> Posted {timeSinceCreated} ago
      </div>
    </div>
  );
};

const FormSidebar: React.FC<RequestProps> = ({ request }) => {
  const initials = useMemo(() => {
    const [first, second] = request.name.split(/\s+/);
    if (second) {
      return `${first[0]}${second[0]}`.toUpperCase();
    }

    return `${first[0].toUpperCase()}${first?.[1] || ''}`;
  }, [request.name]);

  return (
    <aside className="flex flex-col pl-20 ml-0 md:mx-auto md:text-left">
      <div className="font-bold uppercase">About the Requestor</div>
      <div className="grid content-center w-32 mt-4 mb-4 ml-0 rounded-full place-content-center aspect-square bg-red">
        <div className="font-bold text-white text-7xl w-fit">{initials}</div>
      </div>
      <div className="truncate">
        <div className="text-lg font-bold">{request.name}</div>
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
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<inferMutationInput<'playground.apply'>>({
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
  const shouldSubmit = router.query.submit === 'true';

  const { data: lastApplication, isLoading: isLastApplicationLoading } =
    trpc.proxy.playground.lastApplication.useQuery(undefined, {
      enabled: sessionStatus === 'authenticated',
    });

  const userDataFilled = useOnce(
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
    {
      enabled:
        sessionStatus === 'authenticated' && !shouldSubmit && router.isReady,
    }
  );
  useOnce(
    () => {
      if (!lastApplication) return;
      Object.entries(lastApplication).forEach(([key, value]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (value && !watch(key as any)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue(key as any, value);
        }
      });
    },
    {
      enabled: userDataFilled && !isLastApplicationLoading,
    }
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
    (values: inferMutationInput<'playground.apply'>) => {
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

  useOnce(
    () => {
      if (router.query.submit !== 'true') return;
      if (formRef.current) {
        formRef.current.scrollIntoView();
      }
      void handleSubmit(onSubmit)();
    },
    { enabled: router.isReady && userDataFilled }
  );

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-3xl grid-cols-1 gap-5 mx-auto text-left align-bottom lg:pr-10 md:grid-cols-6"
      >
        <div className="font-serif text-2xl italic font-medium col-span-full">
          Interested in applying to help with this project?
        </div>
        <TextInput
          className="col-span-full"
          error={errors.name?.message}
          {...myRegister('name')}
          placeholder="Your name"
        >
          Name
        </TextInput>
        <TextInput
          className="flex flex-col justify-end md:col-span-3"
          error={errors.providedEmail?.message}
          {...myRegister('providedEmail')}
          placeholder="name@example.com"
        >
          Email
        </TextInput>
        <TextInput
          className="md:col-span-3"
          error={errors.portfolioLink?.message}
          {...myRegister('portfolioLink')}
          placeholder="yourwebsite.com"
        >
          <span className="hidden lg:inline">Personal website or p</span>
          <span className="inline lg:hidden">P</span>ortfolio link
        </TextInput>
        <TextInput
          className="md:col-span-2"
          error={errors.twitterUrl?.message}
          {...myRegister('twitterUrl')}
          placeholder="@yourhandle"
        >
          Twitter
        </TextInput>
        <TextInput
          className="md:col-span-2"
          error={errors.instagramUrl?.message}
          {...myRegister('instagramUrl')}
          placeholder="@yourhandle"
        >
          Instagram
        </TextInput>
        <TextInput
          className="md:col-span-2"
          error={errors.linkedinUrl?.message}
          {...myRegister('linkedinUrl')}
          placeholder="linkedin.com/in/"
        >
          LinkedIn
        </TextInput>
        <div className="flex flex-col justify-start gap-5 md:flex-row col-span-full">
          <div className="font-bold">
            Have you applied for a Playground project in the past?
          </div>
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
        <div className="flex flex-col justify-start gap-5 md:flex-row col-span-full">
          <div className="font-bold">Are you vegan?</div>
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
          className="col-span-full md:col-span-3"
          error={errors.calendlyUrl?.message}
          {...myRegister('calendlyUrl')}
          placeholder="calendly.com/yourname"
        >
          Calendly link (or alternative scheduling link)
        </TextInput>
        <div className="relative bottom-0 self-end col-span-full md:col-span-3">
          <Label
            name="availableTimePerWeek"
            error={errors.availableTimePerWeek?.message}
            showRequiredMark
          >
            Available time per week
          </Label>
          <Controller
            control={control}
            name="availableTimePerWeek"
            render={({ field: { value: current, onChange, ...field } }) => (
              <SelectInput
                {...field}
                placeholder="Select an option"
                onChange={(value) => {
                  setFormData({
                    availableTimePerWeek: value?.value as TimePerWeek,
                  });
                  onChange(value ? value.value : null);
                }}
                current={{ value: current, label: TimePerWeekLabel[current] }}
                options={Object.keys(TimePerWeek).map((time) => ({
                  value: time,
                  label: TimePerWeekLabel[time as TimePerWeek],
                }))}
              />
            )}
          />
        </div>
        <TextArea
          className="col-span-full"
          rows={5}
          {...myRegister('moreInfo')}
          placeholder="e.g. What skill you have relating to this project, why do you want to help, etc."
        >
          Is there anything else you&apos;d like to add?
        </TextArea>
        <Controller
          control={control}
          name="commitToHelping"
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              labelPosition="right"
              checked={value}
              onChange={(checked) => {
                setFormData({ [field.name]: checked });
                onChange(checked);
              }}
              className="col-span-full"
              error={errors.commitToHelping?.message}
              {...field}
            >
              I understand that if selected, I will do my best to commit to a
              reasonable amount of time needed to help with this project,
              communicate progress updates, and meet any potential deadlines.
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name="agreeToTerms"
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              labelPosition="right"
              checked={value}
              onChange={(checked) => {
                setFormData({ [field.name]: checked });
                onChange(checked);
              }}
              className="col-span-full"
              error={errors.agreeToTerms?.message}
              {...field}
            >
              I agree to the VH: Playground terms and conditions.
            </Checkbox>
          )}
        />
        <DarkButton
          disabled={isLoading || isSuccess || request.userAlreadyApplied}
          type="submit"
          className="w-full px-10 mx-auto col-span-full md:ml-0 md:w-fit"
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
    <div className="min-h-[30vh] bg-grey-background flex lg:flex-row flex-col-reverse justify-between lg:divide-x-2 divide-white py-10 px-20 md:px-32 gap-y-5">
      <MainForm request={request} />
      <FormSidebar request={request} />
    </div>
  );
};

export default Request;
