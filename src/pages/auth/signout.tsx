import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { DarkButton } from '../../components/decoration/buttons';

import type { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }
  return {
    props: {},
  };
};

const SignOut: NextPage = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    const { url } = await signOut({ redirect: false });
    void router.push(url);
  }, [router]);

  return (
    <div className="p-10 bg-grey-background">
      {session.status === 'authenticated' && (
        <DarkButton disabled={isLoading} onClick={handleSignOut}>
          Sign out!
        </DarkButton>
      )}
    </div>
  );
};

export default SignOut;
