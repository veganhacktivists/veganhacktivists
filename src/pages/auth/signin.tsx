import type { InferGetServerSidePropsType, NextPage } from 'next';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { DarkButton } from '../../components/decoration/buttons';
import TextInput from '../../components/forms/inputs/textInput';

type SignInProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  const session = useSession();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!providers) return null;

  return (
    <div className="bg-grey-background p-10">
      {JSON.stringify(session)}
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      {session.status === 'authenticated' && (
        <DarkButton
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await signOut();
          }}
        >
          Sign out!
        </DarkButton>
      )}
      {session.status === 'unauthenticated' && (
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
          <DarkButton
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await signIn('email', { email });
            }}
          >
            Sign in!
          </DarkButton>
        </div>
      )}
    </div>
  );
};

export default SignIn;
