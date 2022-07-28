import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import TextInput from 'components/forms/inputs/textInput';
import { DarkButton } from 'components/decoration/buttons';
import { useUpdateUser } from 'lib/client/api/hooks/users';
import { useSessionQuery } from 'lib/client/api/hooks/session';
import { updateUserSchema } from 'lib/services/users';

import type { z } from 'zod';

const resolver = zodResolver(updateUserSchema);

const CompleteSignin: React.FC = ({}) => {
  const { data: session, isFetched } = useSessionQuery();
  const router = useRouter();
  const user = isFetched ? session?.user : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof updateUserSchema>>({
    resolver,
  });

  const onUserUpdate = useCallback(() => {
    void router.push('/playground');
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
