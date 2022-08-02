// import ky from 'ky-universal';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback, useEffect } from 'react';

// import { useFloating } from '@floating-ui/react-dom';

import { firstLetterUppercase } from '../../../lib/helpers/strings';
import useErrorStore from '../../../lib/stores/errorStore';
import { DarkButton } from '../../decoration/buttons';
import Spinner from '../../decoration/spinner';

// import Tooltip;

import TextArea from '../../forms/inputs/textArea';
import TextInput from '../../forms/inputs/textInput';
import Label from '../../forms/inputs/label';
import SelectInput from '../../forms/inputs/selectInput';
import Checkbox from '../../forms/inputs/checkbox';
// import DateInput from './inputs/dateInput';

type Priority = 'low' | 'medium' | 'high';
type Pricing = 'free' | 'paid';

interface RequestSubmission {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  website?: string;
  calendly?: string;

  requestTitle: string;
  category: string;
  priority: Priority;
  roleTitle: string;
  skillsRequired: string;
  pricing: Pricing;
  budget: string;
  issue: string;
  dueDate: string;
  estimatedTime: string;

  qualityAgreement: boolean;
  agreeToTerms: boolean;
}

const SubmitRequestForm: React.FC = () => {
  const { pageThatErrored, clearErrorData } = useErrorStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RequestSubmission>();
  const { reload } = useRouter();

  const defaultErrorMessage = useErrorStore(
    (state) => state.generateErrorMessage
  )();

  // Clear error data on unmount so if they don't submit
  // the form is clear on return visits.
  useEffect(() => {
    return () => clearErrorData();
  }, [clearErrorData]);

  const onSubmit = useCallback(
    async (values: RequestSubmission) => {
      const submit = async () => {};
      //ky.post('/api/contact-us', {
      //  json: values,
      //});

      await toast
        .promise(submit, {
          pending: 'Submitting...',
          error:
            'Something went wrong processing your submission! Please try again later',
          success: 'Your request was sent successfully!',
        })
        .then(() => {
          reset();
          setTimeout(() => {
            reload();
          }, 5000);
        });
    },
    [reload, reset]
  );

  /*const { x, y, reference, floating, strategy } = useFloating({
    placement: 'top-end',
  });*/

  return (
    <div className="bg-grey-background" id="contact-us">
      <form
        noValidate
        //className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-10 py-10 flex flex-col flex-grow gap-5 px-10 text-left"
      >
        <div className="text-xl">Personal Information</div>
        <div className="flex flex-row gap-5">
          <TextInput
            className="w-full"
            placeholder="Name"
            showRequiredMark
            {...register('name', { required: 'Please enter a name' })}
            error={errors.name?.message}
          />
          <TextInput
            className="w-full"
            placeholder="Email"
            showRequiredMark
            {...register('email', {
              required: 'The email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            })}
            error={errors.email?.message}
          />
        </div>
        <div className="flex flex-row gap-5">
          <TextInput
            className="w-full "
            placeholder="Phone"
            type="tel"
            {...register('phone', { required: false })}
            error={errors.phone?.message}
          />
          <TextInput
            className="w-full "
            placeholder="Organization"
            {...register('organization', { required: false })}
            error={errors.organization?.message}
          />
        </div>
        <TextInput
          placeholder="www.website..."
          showRequiredMark
          {...register('website', { required: 'Please enter a valid website' })}
          error={errors.website?.message}
        />
        <TextInput
          placeholder="Calendly"
          {...register('calendly', { required: false })}
          error={errors.calendly?.message}
        >
          <div className="flex gap-2">
            Link to your Calendly
            <span>
              <sup>?</sup>
            </span>
            {/*
            <p
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
            >
              <CustomLink href="https://calendly.com/" className="text-green">
                Calendly
              </CustomLink>
              &nbsp;is your hub for scheduling meetings professionally and
              efficiently, eliminating the hassle of back-and-forth emails so
              you can get back to work.
            </p>
            {/*<Tooltip
              maxWidth={225}
              arrowPosition="end"
              message={
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
            </Tooltip>
            */}
          </div>
        </TextInput>

        <div className="text-xl">Request Information</div>
        <TextInput
          placeholder="Title of Request"
          showRequiredMark
          {...register('requestTitle', {
            required: 'Please enter the title of the request',
          })}
          error={errors.requestTitle?.message}
        >
          Title of Request
        </TextInput>
        <div className="flex flex-row gap-5">
          <TextInput
            className="w-full"
            placeholder="Category"
            showRequiredMark
            {...register('category', {
              required: 'Please select the category of the request',
            })}
            error={errors.category?.message}
          />
          <div className="w-full">
            <Label name="priority" showRequiredMark />
            <Controller
              name="priority"
              control={control}
              rules={{ required: 'Please select a priority of the request' }}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  ref={null}
                  error={errors.priority?.message}
                  options={['low', 'medium', 'high'].map((option) => ({
                    value: option,
                    label: firstLetterUppercase(`${option} priority`),
                  }))}
                  showError
                  defaultValue={pageThatErrored ? 'low' : undefined}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <TextInput
            className="w-full md:mt-0 mt-6"
            placeholder="Role title"
            showRequiredMark
            {...register('roleTitle', {
              required: 'Please select the role title of the request',
            })}
            error={errors.roleTitle?.message}
          >
            Role title
          </TextInput>
          <TextInput
            className="w-full"
            placeholder="Communication, ..."
            {...register('skillsRequired', {
              required: 'Please select the skills required for the request',
            })}
            error={errors.skillsRequired?.message}
          >
            <div className="flex flex-col md:flex-row">
              <p>
                Skills Required<span className="text-red">*</span>&nbsp;
              </p>
              <p className="font-thin">(separate by comma)</p>
            </div>
          </TextInput>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-full ">
            <Label name="pricing" showRequiredMark>
              Free or Paid?
            </Label>
            <Controller
              name="pricing"
              control={control}
              rules={{ required: 'Please select the pricing of the request' }}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  ref={null}
                  error={errors.pricing?.message}
                  options={['free', 'paid'].map((option) => ({
                    value: option,
                    label: firstLetterUppercase(
                      `${option} ${
                        option === 'free' ? '(Volunteer Requested)' : ''
                      }`
                    ),
                  }))}
                  showError
                  defaultValue={pageThatErrored ? 'free' : undefined}
                />
              )}
            />
          </div>
          <TextInput
            className="w-full"
            placeholder="Budget"
            showRequiredMark
            {...register('budget', {
              required: 'Please select the budget of the request',
              pattern: {
                value: /^(?!0\.00)[1-9]\d*(\.\d\d)?$/,
                message: 'Please enter a valid budget',
              },
            })}
            error={errors.budget?.message}
          >
            Budget?
          </TextInput>
        </div>
        <TextArea
          placeholder="Describe your issue"
          showRequiredMark
          error={errors.issue?.message}
          {...register('issue', {
            required: 'Issue description is required',
          })}
          defaultValue={defaultErrorMessage}
          style={{ resize: 'vertical' }}
        >
          Describe your issue
        </TextArea>
        <div className="flex flex-row gap-5">
          <TextInput
            className="w-full sm:mt-0 mt-6"
            min={new Date().toISOString().split('T')[0]}
            type="date"
            placeholder="Due date"
            showRequiredMark
            {...register('dueDate', {
              required: 'Please select the due date of the requested task',
            })}
            error={errors.dueDate?.message}
          >
            Due date for task
          </TextInput>
          <TextInput
            className="w-full"
            placeholder="Estimated time commitment"
            showRequiredMark
            {...register('estimatedTime', {
              required:
                'Please select the estimated time of commitment of the requested task',
            })}
            error={errors.estimatedTime?.message}
          >
            Estimated time <br className="sm:hidden" /> commitment
          </TextInput>
        </div>

        <Checkbox
          {...register('qualityAgreement', {
            required: 'You must check this option in order to continue',
          })}
        >
          I understand that Vegan Hacktivists cannot guarantee the quality of
          work done by our volunteers.
        </Checkbox>
        <Checkbox
          error={errors.agreeToTerms?.message}
          {...register('agreeToTerms')}
          onChange={(e) => {
            //const checked = e.currentTarget.checked;
            //setFormData({ agreeToTerms: checked });
            //setValue('agreeToTerms', checked);
          }}
        >
          I agree to the VH: Playground terms and conditions.
        </Checkbox>

        <DarkButton
          //className="pt-5 pb-10 text-center w-62"
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
          className="text-center mx-auto mt-24 mb-10 w-72"
        >
          {isSubmitting ? <Spinner /> : 'Submit My Request'}
        </DarkButton>
      </form>
    </div>
  );
};

export default SubmitRequestForm;
