import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { DarkButton } from '../decoration/buttons';
import classNames from 'classnames';
import Spinner from '../decoration/spinner';
import SelectInput from './inputs/selectInput';
import Label from './inputs/label';
import TextInput from './inputs/textInput';
import TextArea from './inputs/textArea';

type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

interface ContactUsSubmission {
  name: string;
  email: string;
  service: Service;
  message: string;
}

const ContactUsForm: React.FC = () => {
  const onSubmit = useCallback(async (values: ContactUsSubmission) => {
    try {
      await axios.post('/api/contact-us', values);
    } catch (e) {}
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsSubmission>();

  return (
    <div className="md:w-2/3 mx-auto pt-5">
      <div className="text-xl md:w-1/2 mx-auto text-grey-dark py-5">
        If you&apos;d like to talk about any of these services, please use our
        contact form to get in touch! We do our best to respond to every email
        within 48 hours.
      </div>
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
              <SelectInput {...field} ref={null} error={!!errors.service} />
            )}
          />
          {errors.service && (
            <p className="text-red">⚠ {errors.service.message}</p>
          )}
        </div>
        <div>
          <TextArea error={errors.message?.message} {...register('message')} />
        </div>
        <div className="pt-5 pb-10">
          <DarkButton
            type="submit"
            disabled={isSubmitting}
            className="w-52 px-10"
          >
            {isSubmitting ? <Spinner /> : 'Submit'}
          </DarkButton>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
