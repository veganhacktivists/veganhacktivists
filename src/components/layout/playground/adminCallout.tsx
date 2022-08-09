import { useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { DarkButton } from 'components/decoration/buttons';
import TextInput from 'components/forms/inputs/textInput';
import TextArea from 'components/forms/inputs/textArea';

import { trpc } from 'lib/client/trpc';

import type { inferMutationInput } from 'lib/client/trpc';

const AdminCallout: React.FC = () => {
  const { handleSubmit, register } =
    useForm<inferMutationInput<'discord.sendTestMessage'>>();

  const { mutate } = trpc.proxy.discord.sendTestMessage.useMutation();

  const onSubmit = useCallback(
    ({ channelId, message }: inferMutationInput<'discord.sendTestMessage'>) => {
      mutate({
        channelId: channelId || undefined,
        message: message || undefined,
      });
    },
    [mutate]
  );

  return (
    <div className="flex flex-col gap-4 p-10 py-5 mx-auto divide-y w-fit bg-grey-over-background">
      <div>
        <div>You&apos;re an admin!</div>
        <DarkButton href="/playground/admin">Enter review mode</DarkButton>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Wanna send a Discord test message?</div>
        <TextInput {...register('channelId')}>Channel ID</TextInput>
        <TextArea {...register('message')} rows={2}>
          Message
        </TextArea>
        <DarkButton type="submit">Send!</DarkButton>
      </form>
    </div>
  );
};

export default AdminCallout;
