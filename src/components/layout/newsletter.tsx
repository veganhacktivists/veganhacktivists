import axios from 'axios';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { DarkButton } from '../decoration/buttons';
import Spinner from '../decoration/spinner';
import TextInput from '../forms/inputs/textInput';

import 'react-toastify/dist/ReactToastify.css';

interface NewsletterRequestProps {
  email: string;
}

const Newsletter: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewsletterRequestProps>();

  const onSubmit = useCallback(async (props: NewsletterRequestProps) => {
    const submit = async () =>
      axios.post('/api/subscribe-to-newsletter', props);

    await toast
      .promise(submit, {
        pending: 'pending',
        error: 'error',
        success: 'success',
      })
      // for some reason if the promise fails the error propagates
      .catch(() => {
        //ignore
      });
  }, []);

  return (
    <>
      <form
        className="p-10 bg-grey-background space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-2xl">Sign up and never miss a post!</div>
        <div className="mx-auto md:w-1/3">
          <TextInput
            className="text-3xl w-full"
            {...register('email', {
              required: 'Please enter an email!',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            })}
            placeholder="email"
            error={errors.email?.message}
          />
        </div>
        <div>
          <DarkButton type="submit">{JSON.stringify(isSubmitting)}</DarkButton>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Newsletter;
