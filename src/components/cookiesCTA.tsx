import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const CONSENT_COOKIE_NAME = 'vh_analytics';

const CookiesCTA: React.FC = () => {
  const [cookies, setCookies] = useCookies([CONSENT_COOKIE_NAME]);
  const [cookie, setCookie] = useState<boolean | null>(null);

  useEffect(() => {
    const value = cookies[CONSENT_COOKIE_NAME];

    if (!value) return;
    setCookie(value === 'true');
  }, []);

  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    if (cookie === null) return;
    setCookies(CONSENT_COOKIE_NAME, cookie, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 360,
    });
  }, [cookie]);

  const onChange = (newValue: boolean) => {
    setCookie(newValue);
  };

  if (cookie !== null || !show) {
    return null;
  }

  return (
    <div id="cookies" className="fixed right-0 bottom-0 z-50 p-8">
      <div className="bg-white relative p-8 pb-4 max-w-full shadow-lg w-[400px]">
        <div
          onClick={() => {
            setShow(false);
          }}
          className="absolute top-0 right-0 bg-green px-3 py-1 text-2xl text-white font-bold cursor-pointer"
        >
          &#10005;
        </div>
        <p className="font-mono font-semibold text-3xl mb-3">Hey there!</p>
        <p className="font-mono text-xl mb-7">
          This website uses cookies to enhance your browsing experience.
        </p>
        <div
          onClick={() => onChange(true)}
          className="border-l-8 border-green inline-block mb-4 px-16 py-2 text-xl bg-gray ease-out duration-[2s] cursor-pointer hover:shadow-fill-green text-white font-mono font-semibold"
        >
          Accept cookies
        </div>
        <p
          onClick={() => onChange(false)}
          className="font-mono underline cursor-pointer"
        >
          No cookies, please
        </p>
      </div>
    </div>
  );
};

export default CookiesCTA;
