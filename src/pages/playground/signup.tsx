import { getSession, useSession } from 'next-auth/react';
import React from 'react';

import RequestorSignup from 'components/layout/signup/RequestorSignup';
import ApplicantSignup from 'components/layout/signup/ApplicantSignup';
import Spinner from 'components/decoration/spinner';

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import type { UserRole } from '@prisma/client';

export const getServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContext) => {
  const session = await getSession({ req });
  const hasCompletedProfile = !!session?.user?.name;

  const callbackUrl = query.callbackUrl as string | undefined;
  const role = query.role as UserRole | undefined;

  if (hasCompletedProfile) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  return {
    props: {
      callbackUrl,
      role,
    },
  };
};

const Signup = ({
  callbackUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession({ required: true });

  if (status === 'loading') {
    return <Spinner />;
  }

  if (session.user?.isRequestor) {
    return <RequestorSignup {...{ callbackUrl }} />;
  }
  return <ApplicantSignup {...{ callbackUrl }} />;
};

export default Signup;
