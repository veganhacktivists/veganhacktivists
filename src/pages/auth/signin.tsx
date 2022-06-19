import type { InferGetServerSidePropsType, NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';

type SignInProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  if (!providers) return null;

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}{' '}
    </div>
  );
};

export default SignIn;
