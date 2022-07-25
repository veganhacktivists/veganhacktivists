import { getProviders, signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';

import TextInput from '../../components/forms/inputs/textInput';
import { DarkButton } from '../../components/decoration/buttons';

import useOnce from 'hooks/useOnce';

import Spinner from 'components/decoration/spinner';

import type { NextPage } from 'next';
import type { SignInResponse } from 'next-auth/react';

interface SignInForm {
  email: string;
}

const SignIn: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>(null);

  const { handleSubmit, register } = useForm<SignInForm>({});

  useOnce(() => {
    getProviders()
      .then((providers) => {
        setProviders(providers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const onSubmit = useCallback<Parameters<typeof handleSubmit>[0]>(
    async ({ email }) => {
      setIsLoading(true);
      const { ok } = (await signIn<'email'>('email', {
        email,
      })) as SignInResponse;
      if (!ok) {
        setIsLoading(false);
      }
    },
    []
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!providers?.email) return null;

  return (
    <div className="p-10 bg-grey-background">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/2 mx-auto">
          <TextInput {...register('email', { required: true })} type="email" />
        </div>
        <DarkButton type="submit" disabled={isLoading}>
          Sign in!
        </DarkButton>
      </form>
    </div>
  );
};

export default SignIn;
