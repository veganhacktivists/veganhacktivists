import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import CustomImage from '../decoration/customImage';
import { DarkButton } from '../decoration/buttons';
import useErrorStore from '../../lib/stores/errorStore';

import errorTypeImage from '../../../public/images/VH-error-type.png';
import Link from 'next/link';
import {
  avocado,
  mango,
  peach,
  sweetPotato,
  watermelon,
} from '../../images/teams';
import { StatusCodes } from 'http-status-codes';
import type { FallbackProps } from 'react-error-boundary';
import { useEffect } from 'react';

interface ErrorProps extends Partial<FallbackProps> {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({
  statusCode,
  error,
  resetErrorBoundary,
}) => {
  const router = useRouter();

  useEffect(() => {
    return () => {
      resetErrorBoundary?.();
    };
  }, []);

  const { setErrorData, generateErrorMessage } = useErrorStore();

  const handleContactClick = () => {
    resetErrorBoundary?.();
    setErrorData({ pageThatErrored: router.asPath, statusCode, error });
  };

  const contactPageError: string | boolean = router.asPath === '/contact';

  const message =
    statusCode === StatusCodes.NOT_FOUND ? 'Page not found.' : 'Whoops!';

  return (
    <>
      <NextSeo noindex title="Page Not Found" />
      <article className="min-h-[40rem] flex flex-col justify-center items-center p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-start gap-12">
            <div className="w-80">
              <CustomImage src={errorTypeImage} alt="ERROR" priority />
            </div>
            <div className="flex flex-col items-start justify-evenly gap-3 md:gap-0 text-2xl text-center md:text-left">
              <h1 className="text-red font-mono font-bold w-full">{message}</h1>
              <div className="font-mono w-full">
                {contactPageError
                  ? 'Please contact us at...'
                  : 'If you believe this is a mistake...'}
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-start gap-12">
            <div className="md:-mt-3">
              {[avocado, mango, peach, sweetPotato, watermelon].map((fruit) => (
                <CustomImage
                  key={fruit.src}
                  src={fruit}
                  height="64"
                  width="64"
                  alt=""
                />
              ))}
            </div>
            <div className="w-full md:w-min flex justify-center">
              {contactPageError ? (
                <span className="font-mono text-2xl md:text-left font-bold">
                  <Link
                    href={{
                      pathname: 'mailto:hello@veganhacktivists.org',
                      query: {
                        subject: 'Website error!',
                        body: generateErrorMessage({
                          pageThatErrored: router.asPath,
                          statusCode,
                        }),
                      },
                    }}
                    passHref
                  >
                    <a target="_blank" rel="noreferrer">
                      hello@veganhacktivists.org
                    </a>
                  </Link>
                </span>
              ) : (
                <DarkButton
                  className="w-52"
                  href="/contact"
                  onClick={handleContactClick}
                >
                  Let us know!
                </DarkButton>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Error;
