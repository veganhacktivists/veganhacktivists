import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSession } from 'next-auth/react';

import { PlaygroundRequestCategory } from '@prisma/client';

import { DarkButton } from '../../decoration/buttons';
import Spinner from '../../decoration/spinner';

import TextArea from '../../forms/inputs/textArea';
import TextInput from '../../forms/inputs/textInput';
import Label from '../../forms/inputs/label';
import SelectInput from '../../forms/inputs/selectInput';
import Checkbox from '../../forms/inputs/checkbox';
import ToolTip from '../../decoration/tooltip';
import CustomLink from '../../decoration/link';

import useOnce from '../../../hooks/useOnce';

import RadioButton from '../../forms/inputs/radioButton';

import SignInPrompt from './siginInPrompt';

import { submitRequestSchemaClient } from 'lib/services/playground/schemas';
import usePlaygroundSubmitRequestStore from 'lib/stores/playground/submitRequestStore';
import { trpc } from 'lib/client/trpc';

import type { AppRouter } from 'server/routers/_app';
import type { inferMutationInput } from 'lib/client/trpc';

import type { z } from 'zod';

import type { TRPCClientError } from '@trpc/react';

type FormInput = z.infer<typeof submitRequestSchemaClient>;

const CATEGORIES = Object.keys(PlaygroundRequestCategory).map((cat) => ({
  value: cat,
  label: cat.replace(/([0-9A-Z])/g, ' $&'),
}));

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'] as const;

const SubmitRequestForm: React.FC = () => {
  const { data: session, status: sessionStatus } = useSession();

  const storedForm = usePlaygroundSubmitRequestStore((state) =>
    state.getForm()
  );
  const setFormData = usePlaygroundSubmitRequestStore((state) =>
    state.setForm()
  );
  const clearFormData = usePlaygroundSubmitRequestStore((state) =>
    state.resetForm()
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
  } = useForm<FormInput>({
    defaultValues: {
      ...storedForm,
    },
    resolver: zodResolver(submitRequestSchemaClient),
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
          onChangeValue(name as any)(value.currentTarget?.value);
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

  const { mutateAsync, isLoading, isSuccess } =
    trpc.proxy.playground.submitRequest.useMutation({
      onSuccess: () => {
        clearFormData();
        reset();
      },
    });

  const onSubmit = useCallback(
    (values: inferMutationInput<'playground.submitRequest'>) => {
      if (sessionStatus === 'unauthenticated') {
        setIsSignInModalOpen(true);
        return;
      } else if (sessionStatus === 'loading') {
        return;
      }
      void toast.promise(mutateAsync(values), {
        pending: 'Submitting...',
        success: 'Your request has been submitted!',
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
    <div className="bg-grey-background" id="contact-us">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 py-10 mx-10 text-left md:px-10 xl:px-40 md:grid-cols-2"
      >
        <div className="text-xl col-span-full">Personal Information</div>
        <TextInput
          className="w-full"
          placeholder="Name"
          showRequiredMark
          {...myRegister('name', { required: 'Please enter a name' })}
          error={errors.name?.message}
        />
        <TextInput
          className="w-full"
          placeholder="Email"
          showRequiredMark
          {...myRegister('providedEmail', {
            required: 'The email is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email',
            },
          })}
          error={errors.providedEmail?.message}
        />
        <TextInput
          className="w-full "
          placeholder="Phone"
          type="tel"
          {...myRegister('phone', { required: false })}
          error={errors.phone?.message}
        />
        <TextInput
          className="w-full "
          placeholder="Organization"
          {...myRegister('organization', { required: false })}
          error={errors.organization?.message}
        />
        <TextInput
          placeholder="www.website..."
          showRequiredMark
          {...myRegister('website', {
            required: 'Please enter a valid website',
          })}
          className="col-span-full"
          error={errors.website?.message}
        />
        <TextInput
          placeholder="Calendly"
          className="col-span-full"
          {...myRegister('calendlyUrl')}
          error={errors.calendlyUrl?.message}
        >
          <div className="flex gap-2">
            Link to your Calendly
            <ToolTip
              placement="top-end"
              content={
                <p>
                  <CustomLink
                    href="https://calendly.com/"
                    className="text-green"
                  >
                    Calendly
                  </CustomLink>
                  &nbsp;is your hub for scheduling meetings professionally and
                  efficiently, eliminating the hassle of back-and-forth emails
                  so you can get back to work.
                </p>
              }
            >
              <sup>?</sup>
            </ToolTip>
          </div>
        </TextInput>

        <div className="text-xl col-span-full">Request Information</div>
        <TextInput
          placeholder="Title of Request"
          showRequiredMark
          {...myRegister('title', {
            required: 'Please enter the title of the request',
          })}
          className="col-span-full"
          error={errors.title?.message}
        >
          Title of Request
        </TextInput>
        <div className="w-full">
          <Label name="category" showRequiredMark />
          <Controller
            name="category"
            control={control}
            rules={{ required: 'Please select a category of the request' }}
            render={({ field: { value: current, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={CATEGORIES.find((c) => c.value === current) || null}
                error={errors.category?.message}
                options={CATEGORIES}
                showError
                {...myRegister('category')}
                onChange={(option) => {
                  onChange(option?.value || null);
                  setFormData({
                    category: option?.value as PlaygroundRequestCategory,
                  });
                }}
              />
            )}
          />
        </div>
        <div className="w-full">
          <Label name="priority" showRequiredMark />
          <Controller
            name="priority"
            control={control}
            rules={{ required: 'Please select a priority of the request' }}
            render={({ field: { value, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={
                  isNaN(value) ? null : { value, label: PRIORITIES[value] }
                }
                error={errors.priority?.message}
                options={PRIORITIES.map((priority, i) => ({
                  value: i,
                  label: priority,
                }))}
                showError
                {...myRegister('priority', { valueAsNumber: true })}
                onChange={(e) => {
                  const value = e?.value;
                  onChange(isNaN(value as number) ? null : value);
                  setFormData({ priority: value as number });
                }}
              />
            )}
          />
        </div>
        <TextInput
          className="w-full mt-6 md:mt-0"
          placeholder="Role title"
          showRequiredMark
          {...myRegister('roleTitle', {
            required: 'Please select the role title of the request',
          })}
          error={errors.roleTitle?.message}
        >
          Role title
        </TextInput>
        <TextInput
          className="w-full"
          placeholder="Communication, ..."
          {...myRegister('requiredSkills', {
            required: 'Please select the skills required for the request',
          })}
          error={errors.requiredSkills?.message}
        >
          <div className="flex flex-col md:flex-row">
            <p>
              Skills Required<span className="text-red">*</span>&nbsp;
            </p>
            <p className="font-thin">(separate by comma)</p>
          </div>
        </TextInput>
        <div className="w-full ">
          <Label name="isFree" showRequiredMark>
            Free or Paid?
          </Label>
          <Controller
            control={control}
            name="isFree"
            render={({ field: { value, onChange } }) => (
              <div className="sm:flex sm:flex-row sm:gap-20 sm:mb-2 sm:mt-3">
                <RadioButton
                  onChange={() => {
                    setFormData({ isFree: true });
                    onChange(true);
                  }}
                  checked={value === true}
                  label="Free"
                />
                <RadioButton
                  onChange={() => {
                    setFormData({ isFree: false });

                    onChange(false);
                  }}
                  checked={value === false}
                  label="Paid"
                />
              </div>
            )}
          />
          {errors.isFree?.message && (
            <span className="text-red">⚠ {errors.isFree.message}</span>
          )}
        </div>
        <TextInput
          className="w-full"
          placeholder="Budget"
          type="number"
          inputMode="numeric"
          step={50}
          min={0}
          showRequiredMark
          {...myRegister('budget', { valueAsNumber: true })}
          error={errors.budget?.message}
        >
          Budget?
        </TextInput>
        <TextArea
          placeholder="Describe your issue"
          showRequiredMark
          error={errors.description?.message}
          {...myRegister('description', {
            required: 'Issue description is required',
          })}
          style={{ resize: 'vertical' }}
          className="col-span-full"
        >
          Describe your issue
        </TextArea>
        <TextInput
          className="w-full mt-6 sm:mt-0"
          min={new Date().toISOString().split('T')[0]}
          type="date"
          placeholder="Due date"
          showRequiredMark
          {...myRegister('dueDate', {
            valueAsDate: true,
          })}
          error={errors.dueDate?.message}
        >
          Due date for task
        </TextInput>
        <TextInput
          className="w-full"
          type="number"
          min={0}
          placeholder="Days"
          showRequiredMark
          {...myRegister('estimatedTimeDays', { valueAsNumber: true })}
          error={errors.estimatedTimeDays?.message}
        >
          Estimated time <br className="sm:hidden" /> commitment
        </TextInput>
        <Checkbox
          className="col-span-full"
          error={errors.qualityAgreement?.message}
          {...myRegister('qualityAgreement')}
          onChange={(checked) => {
            setFormData({ qualityAgreement: checked });
            setValue('qualityAgreement', checked);
          }}
        >
          I understand that Vegan Hacktivists cannot guarantee the quality of
          work done by our volunteers.
        </Checkbox>
        <Checkbox
          className="col-span-full"
          error={errors.agreeToTerms?.message}
          {...myRegister('agreeToTerms')}
          onChange={(checked) => {
            setFormData({ agreeToTerms: checked });
            setValue('agreeToTerms', checked);
          }}
        >
          I agree to the VH: Playground terms and conditions.
        </Checkbox>
        <DarkButton
          className="mb-10 text-center w-fit md:w-72"
          disabled={isLoading || isSuccess}
          type="submit"
        >
          {isLoading ? <Spinner /> : 'Submit My Request'}
        </DarkButton>
      </form>
      <SignInPrompt
        isOpen={isSignInModalOpen}
        onClose={onModalClose}
        email={watch('providedEmail')}
        submitOnVerify
      />
    </div>
  );
};

export default SubmitRequestForm;
