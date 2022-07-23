import { getSession } from 'next-auth/react';
import { getProviders, signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import TextInput from '../../components/forms/inputs/textInput';
import { DarkButton } from '../../components/decoration/buttons';

import type { GetServerSideProps, NextPage } from 'next';
import type { SignInResponse } from 'next-auth/react';

interface SignInProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export const getServerSideProps: GetServerSideProps<SignInProps> = async ({
  req,
}) => {
  const [providers, session] = await Promise.all([
    getProviders(),
    getSession({ req }),
  ]);

  if (session) {
    return { redirect: { destination: '/auth/signout', permanent: false } };
  }

  return {
    props: { providers },
  };
};

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    const { ok } = (await signIn<'email'>('email', {
      email,
    })) as SignInResponse;
    if (!ok) {
      setIsLoading(false);
    }
  }, [email]);

  if (!providers?.email) return null;

  return (
    <div className="p-10 bg-grey-background">
      <div className="">
        <div className="w-1/2 mx-auto">
          <TextInput
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </div>
        <DarkButton disabled={isLoading} onClick={handleSignIn}>
          Sign in!
        </DarkButton>
      </div>
    </div>
  );
};

export default SignIn;
