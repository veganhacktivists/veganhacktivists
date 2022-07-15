import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { DarkButton } from './decoration/buttons';
import SubtleBorder from './decoration/subtleBorder';

const CONSENT_COOKIE_NAME = 'vh_analytics';

const CookiesCTA: React.FC = () => {
  const [cookies, setCookies] = useCookies([CONSENT_COOKIE_NAME]);
  const [cookie, setCookie] = useState<boolean | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const value = cookies[CONSENT_COOKIE_NAME];
    setShow(true);

    if (!value) return;
    setCookie(value === 'true');
  }, [cookies]);

  useEffect(() => {
    if (cookie === null) return;
    setCookies(CONSENT_COOKIE_NAME, cookie, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 360,
    });
  }, [cookie, setCookies]);

  const onChange = (newValue: boolean) => {
    setCookie(newValue);
  };

  if (cookie !== null || !show) {
    return null;
  }

  return (
    <div
      id="cookies"
      className="fixed bottom-0 z-50 px-8 pt-8 translate-x-1/2 right-1/2 md:translate-x-0 md:right-0 md:pb-8"
    >
      <SubtleBorder className="bg-white relative p-8 pb-4 max-w-full w-screen md:w-[400px]">
        <div
          onClick={() => {
            setShow(false);
          }}
          className="absolute top-0 right-0 px-3 py-1 text-2xl font-bold text-white cursor-pointer bg-green"
        >
          &#10005;
        </div>
        <p className="mb-3 font-mono text-3xl font-semibold">Hey there!</p>
        <p className="font-mono text-xl mb-7">
          This website uses cookies to enhance your browsing experience.
        </p>
        <DarkButton className="w-3/4 mb-4" onClick={() => onChange(true)}>
          Accept cookies
        </DarkButton>
        <p
          onClick={() => onChange(false)}
          className="font-mono underline cursor-pointer"
        >
          No cookies, please
        </p>
      </SubtleBorder>
    </div>
  );
};

export default CookiesCTA;
