import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import TextInput from 'components/forms/inputs/textInput';
import { DarkButton } from 'components/decoration/buttons';
import { useUpdateUser } from 'lib/client/api/hooks/users';

import { updateUserSchema } from 'lib/services/users/schemas';

import type { z } from 'zod';
import type { InferMutationInput } from 'types/trpcHelper';

const resolver = zodResolver(updateUserSchema);

const CompleteSignin: React.FC = ({}) => {
  // eslint-disable-next-line no-restricted-syntax
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = status === 'authenticated' ? session?.user : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferMutationInput<'users.updateMe'>>({
    resolver,
  });

  const onUserUpdate = useCallback(async () => {
    await router.push('/playground');
    router.reload();
  }, [router]);

  const { mutate: updateUser, isLoading } = useUpdateUser({
    onSuccess: onUserUpdate,
  });

  const onSubmit = useCallback<
    (values: z.infer<typeof updateUserSchema>) => void
  >((values) => updateUser(values), [updateUser]);

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
