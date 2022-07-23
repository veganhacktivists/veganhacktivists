import { useRouter } from 'next/router';

import { DarkButton } from '../../components/decoration/buttons';

import type { NextPage } from 'next';

const VerifyRequest: NextPage = () => {
  const { back } = useRouter();
  return (
    <div>
      <h1 className="font-bold text-3xl">Check your email</h1>

      <div className="text-xl">
        A sign in link has been sent to your email address.
      </div>
      <div>
        <DarkButton
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
