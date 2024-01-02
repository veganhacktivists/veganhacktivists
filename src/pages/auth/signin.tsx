import { getProviders, signIn, useSession } from 'next-auth/react';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { UserRole } from '@prisma/client';

import TextInput from '../../components/forms/inputs/textInput';
import { DarkButton } from '../../components/decoration/buttons';

import useOnce from 'hooks/useOnce';
import Spinner from 'components/decoration/spinner';

import type { BuiltInProviderType } from 'next-auth/providers';
import type { NextPage } from 'next';
import type {
  ClientSafeProvider,
  LiteralUnion,
  SignInResponse,
} from 'next-auth/react';

const emailSignInSchema = z.object({
  email: z.string().email(),
});

interface AuthProviderProps {
  callbackUrl?: string;
}

type EmailSignInForm = z.infer<typeof emailSignInSchema>;

const resolver = zodResolver(emailSignInSchema);

type AuthProviders = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

const SignInWithEmail = ({ callbackUrl }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register } = useForm<EmailSignInForm>({ resolver });
  const onSubmit = useCallback(
    async ({ email }: EmailSignInForm) => {
      setIsLoading(true);

      const { ok } = (await signIn('email', {
        email,
        callbackUrl,
      })) as SignInResponse;
      if (!ok) {
        setIsLoading(false);
      }
    },
    [callbackUrl]
  );

  return (
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
  );
};

const SignIn: NextPage = () => {
  const { query, isReady, push } = useRouter();
  const { role: queryRole } = query;

  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  const [providers, setProviders] = useState<AuthProviders | null>();

  useOnce(() => {
    void getProviders()
      .then((providers) => {
        setProviders(providers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useOnce(
    () => {
      if (queryRole === UserRole.Requestor) {
        setSelectedRole(UserRole.Requestor);
      } else {
        setSelectedRole(UserRole.Applicant);
      }
    },
    { enabled: isReady }
  );

  const callbackUrl = useMemo(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    const isRelative = ((query.callbackUrl as string) ?? '/').startsWith('/');
    const url = new URL(
      (query.callbackUrl as string) ?? '/playground/signup',
      isRelative
        ? (document.location as unknown as URL)
        : (query.callbackUrl as string)
    );

    if (selectedRole) {
      url.searchParams.set('role', selectedRole);
    }
    return url.toString();
  }, [query.callbackUrl, selectedRole]);

  useOnce(
    () => {
      if (typeof query.callbackUrl === 'string' && query.callbackUrl) {
        void push(query.callbackUrl);
      } else {
        void push('/playground');
      }
    },
    { enabled: status === 'authenticated' && isReady }
  );

  if (isLoading || status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      <NextSeo title="Sign In" />
      <div className="p-10 bg-grey-background h-max">
        <div className="flex flex-wrap justify-center mt-10 mb-5">
          <DarkButton
            onClick={() => setSelectedRole(UserRole.Applicant)}
            active={selectedRole === UserRole.Applicant}
            className="m-5 font-mono"
          >
            I&apos;m an applicant
          </DarkButton>
          <DarkButton
            onClick={() => setSelectedRole(UserRole.Requestor)}
            className="m-5 font-mono"
            active={selectedRole === UserRole.Requestor}
          >
            I&apos;m a requestor
          </DarkButton>
        </div>

        {providers?.email && <SignInWithEmail callbackUrl={callbackUrl} />}
      </div>
    </>
  );
};

export default SignIn;
