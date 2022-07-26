import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import Joi from 'joi';

import { joiResolver } from '@hookform/resolvers/joi';

import { getToken } from 'next-auth/jwt';

import { useRouter } from 'next/router';

import TextInput from 'components/forms/inputs/textInput';
import { DarkButton } from 'components/decoration/buttons';
import { useUpdateUser } from 'lib/client/api/hooks/users';
import { useSessionQuery } from 'lib/client/api/hooks/session';

interface ExtraInfoParams {
  userId: string;
  name: string;
}

const schema = Joi.object<ExtraInfoParams>({
  name: Joi.string().required(),
  userId: Joi.string().required(),
}).required();

const resolver = joiResolver(schema);

const CompleteSignin: React.FC = ({}) => {
  const { data: session, isFetched } = useSessionQuery();
  const router = useRouter();
  const user = isFetched ? session?.user : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExtraInfoParams>({
    resolver,
  });

  const onUserUpdate = useCallback(() => {
    void router.push('/playground');
  }, [router]);

  const { mutate: updateUser, isLoading } = useUpdateUser({
    onSuccess: onUserUpdate,
  });

  const onSubmit = useCallback<Parameters<typeof handleSubmit>[0]>(
    ({ userId, ...values }) => updateUser({ id: userId, ...values }),
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
        <input {...register('userId', { value: user.id })} type="hidden" />
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
