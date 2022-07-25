import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Joi from 'joi';
import axios from 'axios';

import { joiResolver } from '@hookform/resolvers/joi';

import TextInput from 'components/forms/inputs/textInput';
import { DarkButton } from 'components/decoration/buttons';

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
  const { data: session, status } = useSession({ required: true });
  const user = status === 'authenticated' ? session.user : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExtraInfoParams>({
    resolver,
  });

  const onSubmit = useCallback<Parameters<typeof handleSubmit>[0]>(
    ({ userId, ...values }) => {
      void axios.patch(`/api/users/${userId}`, values, {
        withCredentials: true,
      });
    },
    []
  );

  if (!user?.id) return null;

  return (
    <div className="py-10 bg-grey-background">
      <h1>Welcome {user.name || user.email}</h1>
      <h2>Complete your info before proceeding:</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 mx-auto space-y-4"
      >
        <input {...register('userId', { value: user.id })} type="hidden" />
        <TextInput {...register('name')} error={errors.name?.message}>
          Name
        </TextInput>
        <DarkButton type="submit">Proceed</DarkButton>
      </form>
    </div>
  );
};

export default CompleteSignin;
