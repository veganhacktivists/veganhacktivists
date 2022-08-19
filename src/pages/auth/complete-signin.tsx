import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import TextInput from 'components/forms/inputs/textInput';
import { DarkButton } from 'components/decoration/buttons';

import { updateUserSchema } from 'lib/services/users/schemas';

import { trpc } from 'lib/client/trpc';

const resolver = zodResolver(updateUserSchema);

const CompleteSignin: React.FC = ({}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = status === 'authenticated' ? session?.user : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<trpc['users']['updateMe']['input']>({
    resolver,
  });

  const onUserUpdate = useCallback(async () => {
    await router.push('/playground');
    router.reload();
  }, [router]);

  const { mutate: updateUser, isLoading } =
    trpc.proxy.users.updateMe.useMutation({
      onSuccess: onUserUpdate,
    });

  const onSubmit = useCallback(
    (values: trpc['users']['updateMe']['input']) => updateUser(values),
    [updateUser]
  );

  if (!user?.id) return null;

  return (
    <div className="py-10 bg-grey-background">
      <h1>Welcome {user.email}</h1>
      <h2>Complete your info before proceeding:</h2>
      (your current name is <code>`{user.name}`</code>)
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 mx-auto space-y-4"
      >
        <TextInput {...register('name')} error={errors.name?.message}>
          Name
        </TextInput>
        <DarkButton type="submit" disabled={isLoading}>
          Proceed
        </DarkButton>
      </form>
    </div>
  );
};

export default CompleteSignin;
