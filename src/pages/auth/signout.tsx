import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DarkButton } from '../../components/decoration/buttons';

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
  return (
    <div className="bg-grey-background p-10">
      {session.status === 'authenticated' && (
        <DarkButton
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const { url } = await signOut({ redirect: false });
            router.push(url);
          }}
        >
          Sign out!
        </DarkButton>
      )}
    </div>
  );
};

export default SignOut;
