import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

import { firstLetterUppercase } from '../../lib/helpers/strings';
import useErrorStore from '../../lib/stores/errorStore';
import { DarkButton } from '../decoration/buttons';
import Spinner from '../decoration/spinner';

import TextArea from './inputs/textArea';
import TextInput from './inputs/textInput';
import Label from './inputs/label';
import SelectInput from './inputs/selectInput';

import { useFAQDetect } from 'hooks/useFAQDetect';

const SERVICES = ['website', 'project', 'funding', 'advice'] as const;

interface ContactUsSubmission {
  name: string;
  email: string;
  service: (typeof SERVICES)[number] | null;
  message: string;
}

const ContactUsForm: React.FC = () => {
  const { pageThatErrored, clearErrorData } = useErrorStore();
  const { onMessageChange, suggestions } = useFAQDetect();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactUsSubmission>({
    defaultValues: {
      service: pageThatErrored ? 'website' : null,
    },
  });
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
    async (values: ContactUsSubmission) => {
      const submit = async () => axios.post('/api/contact-us', values);

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

  return (
    <div className="pt-5 mx-auto md:w-2/3" id="contact-us">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            placeholder="Name"
            {...register('name', { required: 'Please enter a name' })}
            error={errors.name?.message}
          />
        </div>
        <div>
          <TextInput
            placeholder="yourname@example.com"
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
        <div>
          <Label name="service" />
          <Controller
            name="service"
            control={control}
            rules={{ required: 'Select a service' }}
            render={({ field: { value, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={
                  value
                    ? { value: value, label: firstLetterUppercase(value) }
                    : null
                }
                onChange={(option) => {
                  onChange(option ? option.value : null);
                }}
                ref={null}
                error={errors.service?.message}
                options={SERVICES.map((option) => ({
                  value: option,
                  label: firstLetterUppercase(option),
                }))}
              />
            )}
          />
        </div>
        <div>
          <TextArea
            error={errors.message?.message}
            {...register('message')}
            defaultValue={defaultErrorMessage}
            onChange={onMessageChange}
          />
        </div>
        {suggestions.map((suggestion, i) => (
          <div
            className="text-left border-l-8 border-l-yellow bg-white p-4"
            key={i}
          >
            {suggestion}
          </div>
        ))}
        <div className="pt-5 pb-10">
          <DarkButton
            type="submit"
            disabled={isSubmitting || isSubmitSuccessful}
            className="px-10 w-52"
          >
            {isSubmitting ? <Spinner /> : 'Submit'}
          </DarkButton>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
