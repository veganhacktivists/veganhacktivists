import { getProviders, signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import TextInput from '../../components/forms/inputs/textInput';
import { DarkButton } from '../../components/decoration/buttons';

import useOnce from 'hooks/useOnce';
import Spinner from 'components/decoration/spinner';

import { useSessionQuery } from 'lib/client/api/hooks/session';

import type { NextPage } from 'next';
import type { SignInResponse } from 'next-auth/react';

interface SignInForm {
  email: string;
  // name: string;
}

const signInSchema = Joi.object<SignInForm>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  // name: Joi.string().required(),
}).required();

const resolver = joiResolver(signInSchema);

const SignIn: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: session,
    isLoading: isSessionLoading,
    isFetched: isSessioNFetched,
  } = useSessionQuery();

  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>(null);

  const { handleSubmit, register } = useForm<SignInForm>({ resolver });

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
    async ({
      email,
      // name
    }) => {
      setIsLoading(true);
      const { ok } = (await signIn<'email'>('email', {
        email,
        // name,
      })) as SignInResponse;
      if (!ok) {
        setIsLoading(false);
      }
    },
    []
  );

  if (isLoading || isSessionLoading) {
    return <Spinner />;
  }

  if (isSessioNFetched && !!session) {
    return <div>You are already logged in?</div>;
  }

  if (!providers?.email) return null;

  return (
    <div className="p-10 bg-grey-background">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-1/2 mx-auto">
          <TextInput {...register('email')} type="email">
            Email
          </TextInput>
        </div>
        <DarkButton type="submit" disabled={isLoading}>
          Sign in!
        </DarkButton>
      </form>
    </div>
  );
};

export default SignIn;
