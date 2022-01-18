import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import CustomImage from '../decoration/customImage';
import { DarkButton } from '../decoration/buttons';
import useErrorStore from '../../lib/stores/errorStore';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({
  statusCode: statusCodeProp,
}: ErrorProps) => {
  const router = useRouter();

  const { setErrorData, generateErrorMessage } = useErrorStore();

  const handleContactClick = () => setErrorData(router.asPath, statusCode);

  const contactPageError: string | boolean = router.asPath === '/contact';

  return (
    <>
      <NextSeo noindex title="Page Not Found" />
      <article className="min-h-[40rem] flex flex-col justify-center items-center p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-start gap-12">
            <CustomImage
              src="/images/VH-error-type.png"
              width="320"
              height="84"
              alt="ERROR"
            />
            <div className="flex flex-col items-start justify-evenly gap-3 md:gap-0 text-2xl text-center md:text-left">
              <h1 className="text-red font-mono font-bold w-full">
                {contactPageError ? 'Whoops!' : 'Page not found.'}
              </h1>
              <div className="font-mono w-full">
                {contactPageError
                  ? 'Please contact us at...'
                  : 'If you believe this is a mistake...'}
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-start gap-12">
            <div className="md:-mt-3">
              {['avo', 'mango', 'peach', 'spotato', 'wmelon'].map((fruit) => (
                <CustomImage
                  key={fruit}
                  src={`/images/people/teamIcons/icon-${fruit}.png`}
                  height="64"
                  width="64"
                  alt=""
                />
              ))}
            </div>
            <div className="w-full md:w-min flex justify-center">
              {contactPageError ? (
                <span className="font-mono text-2xl md:text-left font-bold">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`mailto:hello@veganhacktivists.org?subject=Website%20error!&body=${encodeURI(
                      generateErrorMessage({
                        pageThatErrored: router.asPath,
                        statusCode,
                      }) || ''
                    )}`}
                  >
                    hello@veganhacktivists.org
                  </a>
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
