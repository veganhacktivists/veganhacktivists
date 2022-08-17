import { useRouter } from 'next/router';

import { DarkButton } from '../../components/decoration/buttons';

import type { NextPage } from 'next';

const VerifyRequest: NextPage = () => {
  const { back } = useRouter();
  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold">Check your email</h1>

      <div className="mt-4 text-xl">
        A sign in link has been sent to your email address.
      </div>
      <div>
        <DarkButton
          className="mx-auto w-fit"
          onClick={() => {
            back();
          }}
        >
          Go back
        </DarkButton>
      </div>
    </div>
  );
};

export default VerifyRequest;
