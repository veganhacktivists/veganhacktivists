import { zodResolver } from '@hookform/resolvers/zod';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn } from 'next-auth/react';

import Modal from '../modal';

import TextInput from 'components/forms/inputs/textInput';
import { DarkButton } from 'components/decoration/buttons';

interface SignInPromptProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

const signInSchema = z.object({
  email: z.string().email(),
});

const resolver = zodResolver(signInSchema);

const SignInPrompt: React.FC<SignInPromptProps> = ({
  email,
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { email },
    resolver,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setValue('email', email);
  }, [email, isOpen, setValue]);

  const onSubmit = useCallback(({ email }: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    signIn<'email'>('email', { email }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-10 bg-grey-background">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>Just one more thing</div>
          <div>You need to verify your email before applying</div>
          <div className="flex flex-col gap-5">
            <TextInput
              error={errors.email?.message}
              type="email"
              {...register('email')}
            />
            <DarkButton disabled={isLoading} type="submit">
              Verify!
            </DarkButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SignInPrompt;
