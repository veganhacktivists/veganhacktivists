import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { DarkButton } from '../decoration/buttons';
import Spinner from '../decoration/spinner';
import SelectInput from './inputs/selectInput';
import Label from './inputs/label';
import TextInput from './inputs/textInput';
import TextArea from './inputs/textArea';

import 'react-toastify/dist/ReactToastify.css';
import { firstLetterUppercase } from '../../lib/helpers/strings';
import { useRouter } from 'next/router';
import ky from 'ky-universal';
import useErrorStore from '../../lib/stores/errorStore';

type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

interface ContactUsSubmission {
  name: string;
  email: string;
  service: Service;
  message: string;
}

const ContactUsForm: React.FC = () => {
  const { pageThatErrored, clearErrorData } = useErrorStore();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactUsSubmission>();
  const { reload } = useRouter();

  const defaultErrorMessage = useErrorStore(
    (state) => state.generateErrorMessage
  )();

  // Clear error data on unmount so if they don't submit
  // the form is clear on return visits.
  useEffect(() => {
    return () => clearErrorData();
  }, []);

  const onSubmit = useCallback(async (values: ContactUsSubmission) => {
    const submit = async () =>
      ky.post('/api/contact-us', {
        json: values,
      });

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
  }, []);

  return (
    <div className="md:w-2/3 mx-auto pt-5" id="contact-us">
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
            render={({ field }) => (
              <SelectInput
                {...field}
                ref={null}
                error={errors.service?.message}
                options={[
                  'website',
                  'project',
                  'funding',
                  'advice',
                  'other',
                ].map((option) => ({
                  value: option,
                  label: firstLetterUppercase(option),
                }))}
                defaultValue={
                  pageThatErrored
                    ? { value: 'website', label: 'Website' }
                    : null
                }
              />
            )}
          />
          {errors.service && (
            <p className="text-red">⚠ {errors.service.message}</p>
          )}
        </div>
        <div>
          <TextArea
            error={errors.message?.message}
            {...register('message')}
            defaultValue={defaultErrorMessage}
          />
        </div>
        <div className="pt-5 pb-10">
          <DarkButton
            type="submit"
            disabled={isSubmitting || isSubmitSuccessful}
            className="w-52 px-10"
          >
            {isSubmitting ? <Spinner /> : 'Submit'}
          </DarkButton>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ContactUsForm;
