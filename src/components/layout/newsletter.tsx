import classNames from 'classnames';
import ky from 'ky-universal';
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

  const onSubmit = useCallback(async (props: NewsletterRequestProps) => {
    const submit = async () => {
      try {
        await ky.post('/api/subscribe-to-newsletter', {
          json: props,
        });
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
  }, []);

  return (
    <div className="p-8 bg-grey-background text-grey w-full mx-auto">
      <div className="flex justify-center">
        <CustomImage
          src={pixelEnvelope.src}
          height={pixelEnvelope.height}
          width={pixelEnvelope.width}
          alt="Pixel art of a green heart emerging from an open envelope surrounded by sparkles"
        />
      </div>
      <h1 className="text-center mb-8">
        <span className="font-italic text-3xl">Our</span>{' '}
        <span className="font-bold text-4xl">NEWSLETTER</span>
      </h1>
      <div className="mx-auto text-center text-2xl mb-8">
        Join our newsletter now and never miss an update! <br />
        Sign up now to receive...
      </div>
      <div className={classNames('mx-auto text-xl font-italic mb-8 w-fit')}>
        <ul className="list-none">
          {[
            'Instant updates from our blog',
            'Exclusive previews of upcoming events',
            'Early access to events',
            'And Much More!',
          ].map((bulletText, i) => (
            <li
              className="before:bg-green before:inline-block before:w-2 before:h-2 flex flex-row gap-x-2 items-baseline p-1 w-fit text-left"
              key={i}
            >
              {bulletText}
            </li>
          ))}
        </ul>
      </div>

      <form className="text-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-x-2 justify-center items-center gap-y-8">
          <div className="md:w-1/2">
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
            <div className="flex flex-col md:flex-row mt-5 align-baseline gap-x-10 gap-y-2 justify-center">
              <DarkButton className="w-full md:w-auto" type="submit">
                {isSubmitting ? <Spinner /> : 'Sign up!'}
              </DarkButton>
              {showCancelButton && (
                <div className="my-auto">
                  <p
                    onClick={() => onChange?.(false)}
                    className="font-mono underline cursor-pointer"
                  >
                    No thanks
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;
