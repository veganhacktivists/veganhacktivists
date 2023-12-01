import { UserRole } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';

import RequestorSignup from 'components/layout/signup/RequestorSignup';

import type { GetServerSideProps } from 'next';

interface SignupProps {
  role: UserRole;
}

const Signup: React.FC<SignupProps> = ({ role }) => {
  if (role === UserRole.Requestor || role === UserRole.Admin) {
    return <RequestorSignup />;
  }
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.user) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }
  return { props: { role: session.user.role } };
};

export default Signup;
