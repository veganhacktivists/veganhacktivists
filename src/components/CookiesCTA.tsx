import React from 'react';
import { useCookies } from 'react-cookie';

const CookiesCTA = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(['allowCookies']);

  function onChange(newName: boolean) {
    setCookie('allowCookies', newName, { path: '/' });
  }

  return (
    <div id="cookies" className="fixed right-0 bottom-0 z-50 p-8">
      <div
        className="bg-white relative p-8 pb-4 max-w-full shadow-md"
        style={{ width: 400 }}
      >
        <p>Cookie: {cookies.allowCookies}</p>
        <div
          onClick={() => onChange(false)}
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
