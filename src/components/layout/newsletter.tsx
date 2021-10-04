import axios from 'axios';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { DarkButton } from '../decoration/buttons';
import Spinner from '../decoration/spinner';
import TextInput from '../forms/inputs/textInput';

import 'react-toastify/dist/ReactToastify.css';
import { FirstSubSection } from '../decoration/textBlocks';

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
        pending: 'Submitting...',
        error:
          'An error has ocurred. Please check that your email is correct and try again',
        success: 'Welcome to the newsletter!',
      })
      .catch(() => {
        //ignore
      });
  }, []);

  return (
    <div className="p-10 bg-grey-background">
      <FirstSubSection header="Our Newsletter">
        <div className="md:w-2/3 mx-auto">
          Sign up to our newsletter and never miss a post! We&apos;ll send you
          occasional updated from our blog, and sneak previews for our upcoming
          projects and events.
        </div>
      </FirstSubSection>
      <form className="space-y-10 text-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto md:w-1/3">
          <TextInput
            className="w-full"
            {...register('email', {
              required: 'Please enter an email!',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            })}
            placeholder="Enter your email"
            error={errors.email?.message}
          >
            <></>
          </TextInput>
        </div>
        <div>
          <DarkButton type="submit">
            {isSubmitting ? <Spinner /> : 'Sign up!'}
          </DarkButton>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Newsletter;
