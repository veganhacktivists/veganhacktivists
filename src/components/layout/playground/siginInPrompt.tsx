import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import Modal from '../modal';

import TextInput from 'components/forms/inputs/textInput';
import { DarkButton } from 'components/decoration/buttons';

interface SignInPromptProps {
  email: string;
  type: 'request' | 'application';
  isOpen: boolean;
  onClose: () => void;
  submitOnVerify?: boolean;
}

const signInSchema = z.object({
  email: z.string().email(),
});

const resolver = zodResolver(signInSchema);

const SignInPrompt: React.FC<SignInPromptProps> = ({
  email,
  type,
  isOpen,
  onClose,
  submitOnVerify = false,
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

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setValue('email', email);
  }, [email, isOpen, setValue]);

  const onSubmit = useCallback(
    ({ email }: z.infer<typeof signInSchema>) => {
      setIsLoading(true);

      const searchParams = new URLSearchParams();
      if (submitOnVerify) {
        searchParams.append('submit', 'true');
      }

      const callbackUrl = `${router.asPath}?${searchParams.toString()}`;

      void signIn<'email'>('email', {
        email,
        callbackUrl,
      }).finally(() => {
        setIsLoading(false);
      });
    },
    [router.asPath, submitOnVerify],
  );

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-10 bg-grey-background">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <div className="font-bold">Just one more thing</div>
            <div>
              Before submitting your {type}, please verify your email address,
              so we can reach out to you.
            </div>
          </div>
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
