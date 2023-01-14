import { useRouter } from 'next/router';

import { DarkButton } from '../../components/decoration/buttons';

import type { NextPage } from 'next';

const VerifyRequest: NextPage = () => {
  const { back } = useRouter();
  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold">Check your email</h1>

      <div className="mt-4 text-xl">
        Please follow the instructions we sent you.
      </div>
      <div>
        <DarkButton
          className="mt-4 mx-auto w-fit"
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
