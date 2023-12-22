import { useSession } from 'next-auth/react';
import React from 'react';

import RequestorSignup from 'components/layout/signup/RequestorSignup';
import ApplicantSignup from 'components/layout/signup/ApplicantSignup';
import Spinner from 'components/decoration/spinner';

import type { UserRole } from '@prisma/client';

interface SignupProps {
  role: UserRole;
}

const Signup: React.FC<SignupProps> = () => {
  const { data: session, status } = useSession({ required: true });

  if (status === 'loading') {
    return <Spinner />;
  }

  if (session.user?.isRequestor) {
    return <RequestorSignup />;
  }
  return <ApplicantSignup />;
};

export default Signup;
