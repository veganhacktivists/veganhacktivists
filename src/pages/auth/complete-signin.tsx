import { useForm } from 'react-hook-form';

import { useCallback } from 'react';

import ky from 'ky-universal';

import { useSession } from 'next-auth/react';

import TextInput from 'components/forms/inputs/textInput';

import { DarkButton } from 'components/decoration/buttons';

const CompleteSignin: React.FC = ({}) => {
  const { data: session, status } = useSession({ required: true });

  const user = status === 'authenticated' ? session.user : null;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = useCallback(() => {
    void ky.post('/api/auth/complete-register', {
      credentials: 'include',
    });
  }, []);

  if (!user) return null;

  return (
    <div className="py-10 bg-grey-background">
      <h1>Welcome {user.name || user.email}</h1>
      <h2>Complete your info before proceeding:</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 mx-auto space-y-4"
      >
        <TextInput {...register('name', { required: true, minLength: 1 })}>
          Name
        </TextInput>
        <DarkButton type="submit">Proceed</DarkButton>
      </form>
    </div>
  );
};

export default CompleteSignin;
