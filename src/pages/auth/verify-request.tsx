import { useRouter } from 'next/router';

import { DarkButton } from '../../components/decoration/buttons';

import type { NextPage } from 'next';

const VerifyRequest: NextPage = () => {
  const { back } = useRouter();
  return (
    <div>
      <h1 className="font-bold text-3xl mt-8">Check your email</h1>

      <div className="text-xl mt-4">
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
