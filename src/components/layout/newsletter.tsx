import classNames from 'classnames';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { pixelEnvelope } from '../../images/separators';
import { DarkButton } from '../decoration/buttons';
import CustomImage from '../decoration/customImage';
import Spinner from '../decoration/spinner';
import TextInput from '../forms/inputs/textInput';

interface NewsletterRequestProps {
  email: string;
}

interface NewsletterProps {
  onChange?: (signedUp: boolean) => void;
  showCancelButton?: boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({
  onChange,
  showCancelButton,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewsletterRequestProps>();

  const onSubmit = useCallback(
    async (props: NewsletterRequestProps) => {
      const submit = async () => {
        try {
          await axios.post('/api/subscribe-to-newsletter', props);
          onChange?.(true);
        } catch (e) {
          onChange?.(false);
          throw e;
        }
      };

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
    },
    [onChange]
  );

  return (
    <div className="w-full p-8 mx-auto bg-grey-background text-grey">
      <div className="flex justify-center">
        <CustomImage
          src={pixelEnvelope.src}
          height={pixelEnvelope.height}
          width={pixelEnvelope.width}
          alt="Pixel art of a green heart emerging from an open envelope surrounded by sparkles"
        />
      </div>
      <h1 className="mb-8 text-center">
        <span className="text-3xl font-serif italic">Our</span>{' '}
        <span className="text-4xl font-bold">NEWSLETTER</span>
      </h1>
      <div className="mx-auto mb-8 text-2xl text-center">
        Sign up for our newsletter now and never miss an update! <br />
        Every month, you will receive...
      </div>
      <div
        className={classNames('mx-auto text-xl font-serif italic mb-8 w-fit')}
      >
        <ul className="list-none">
          {[
            'Updates about our org, events, and projects',
            'Exciting news and opportunities from the animal protection movement',
            'Original content from our blog',
            'And much more!',
          ].map((bulletText, i) => (
            <li
              className="flex flex-row items-baseline p-1 text-left before:bg-green before:inline-block before:w-2 before:h-2 gap-x-2 w-fit"
              key={i}
            >
              {bulletText}
            </li>
          ))}
        </ul>
      </div>

      <form className="text-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center space-x-2 gap-y-8">
          <div className="w-2/3 xl:w-1/2">
            <TextInput
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
              name="email"
            >
              <></>
            </TextInput>
          </div>
          <div className="flex flex-col justify-center align-baseline md:flex-row gap-x-10 gap-y-2">
            <DarkButton className="w-full mx-auto md:w-auto" type="submit">
              {isSubmitting ? <Spinner /> : 'Sign up!'}
            </DarkButton>
            {showCancelButton && (
              <div className="m-auto">
                <p
                  onClick={() => {
                    if (!isSubmitting) {
                      onChange?.(false);
                    }
                  }}
                  className={classNames('font-mono underline cursor-pointer', {
                    'cursor-pointer': !isSubmitting,
                    'cursor-not-allowed': isSubmitting,
                  })}
                >
                  No thanks
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;
