import classNames from 'classnames';
import ky from 'ky-universal';
import React, { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pixelEnvelope } from '../../images/separators';
import { DarkButton } from '../decoration/buttons';
import CustomImage from '../decoration/customImage';
import Spinner from '../decoration/spinner';
import TextInput from '../forms/inputs/textInput';

interface NewsletterRequestProps {
  email: string;
}

interface NewsletterProps {
  popup?: boolean;
  setOpen?: (open: boolean) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({
  popup = false,
  setOpen = () => {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewsletterRequestProps>();

  const [_, setCookies] = useCookies(['newsletter']);

  const onSubmit = useCallback(async (props: NewsletterRequestProps) => {
    const submit = async () => {
      await ky.post('/api/subscribe-to-newsletter', {
        json: props,
      });

      setCookies('newsletter', 'true', {
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 360 * 10, // Ten years
      });

      if (popup) {
        setOpen(false);
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
    <div
      className={classNames(
        'p-8 bg-grey-background text-grey w-full mx-auto',
        popup ? '' : 'md:w-1/2'
      )}
    >
      <div className="flex justify-center">
        <CustomImage
          src={pixelEnvelope.src}
          height={pixelEnvelope.height}
          width={pixelEnvelope.width}
          alt="Pixel art of a green heart emerging from an open envelope surrounded by sparkles"
        />
      </div>
      <h1 className={classNames('text-center', popup ? 'mb-4' : 'mb-8')}>
        <span className="font-italic text-3xl">Our</span>{' '}
        <span className="font-bold text-4xl">NEWSLETTER</span>
      </h1>
      <div
        className={classNames(
          'mx-auto text-center text-2xl mb-8',
          popup ? 'hidden md:block' : ''
        )}
      >
        Join our newsletter now and never miss an update! <br />
        Sign up now to receive...
      </div>
      <div
        className={classNames(
          'mx-auto w-full text-xl font-italic mb-8',
          popup ? 'md:w-2/3' : ''
        )}
      >
        {[
          'Instant updates from our blog',
          'Exclusive previews of upcoming events',
          'Early access to events',
          'And Much More!',
        ].map((bulletText, i) => (
          <div
            className={classNames(
              'inline-flex text-left items-baseline space-x-2 w-full p-1',
              popup ? 'md:w-1/2' : ''
            )}
            key={i}
          >
            <div>
              <div className="w-2 h-2 mb-1 bg-green" />
            </div>
            <p>{bulletText}</p>
          </div>
        ))}
      </div>

      <form className="text-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={classNames(
            'flex flex-col space-x-2 justify-center',
            popup
              ? 'md:flex-row items-end md:items-baseline space-y-2'
              : 'items-center space-y-8'
          )}
        >
          <div className={classNames('w-full', popup ? 'md:w-1/3' : '')}>
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
          <DarkButton className="w-full md:w-auto" type="submit">
            {isSubmitting ? <Spinner /> : 'Sign up!'}
          </DarkButton>
          {popup && (
            <DarkButton
              className="w-full md:w-auto"
              type="button"
              onClick={() => {
                setCookies('newsletter', 'false', {
                  path: '/',
                  sameSite: 'strict',
                  maxAge: 60 * 60 * 24 * 14, // 2 weeks
                });
                setOpen(false);
              }}
            >
              No Thanks
            </DarkButton>
          )}
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Newsletter;
