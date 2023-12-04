import { getProviders, signIn, useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { UserRole } from '@prisma/client';

import TextInput from '../../components/forms/inputs/textInput';
import { DarkButton } from '../../components/decoration/buttons';
import { NavButton } from '../../components/decoration/buttons';

import useOnce from 'hooks/useOnce';
import Spinner from 'components/decoration/spinner';

import type { NextPage } from 'next';
import type { SignInResponse } from 'next-auth/react';

const signInSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInSchema>;

const resolver = zodResolver(signInSchema);

const SignIn: NextPage = () => {
  const { query, isReady } = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const { status, data } = useSession();
  const router = useRouter();

  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>(null);

  const { handleSubmit, register } = useForm<SignInForm>({ resolver });

  useOnce(() => {
    void getProviders()
      .then((providers) => {
        setProviders(providers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  useOnce(
    () => {
      // TODO: redirect/show according to role
      if (query.user === UserRole.Applicant) {
      } else if (query.user === UserRole.Organization) {
      }
    },
    { enabled: isReady }
  );

  const onSubmit = useCallback(
    async ({ email }: SignInForm) => {
      const callbackUrl = router.query.callbackUrl as string;
      setIsLoading(true);

      const { ok } = (await signIn<'email'>('email', {
        email,
        callbackUrl,
      })) as SignInResponse;
      if (!ok) {
        setIsLoading(false);
      }
    },
    [router.query]
  );

  if (isLoading || status === 'loading') {
    return <Spinner />;
  }

  if (status === 'authenticated') {
    if (
      typeof router.query.callbackUrl === 'string' &&
      router.query.callbackUrl
    ) {
      void router.push(router.query.callbackUrl);
      return null;
    }

    return (
      <div>
        You are already logged in. No callbackUrl provided.
        <NavButton href="/playground">Go to Playground</NavButton>
      </div>
    );
  }

  if (!providers?.email) {
    return null;
  }

  return (
    <>
      <NextSeo title="Sign In" />
      <div className="p-10 bg-grey-background h-max">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-1/2 mx-auto h-max">
            <TextInput {...register('email')} type="email">
              Email
            </TextInput>
          </div>
          <DarkButton type="submit" disabled={isLoading}>
            Sign in!
          </DarkButton>
        </form>
      </div>
    </>
  );
};

export default SignIn;
