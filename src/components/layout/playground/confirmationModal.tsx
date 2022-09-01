import Modal from '../modal';

import { DarkButton } from 'components/decoration/buttons';

interface ConfirmationModalProps {
  isOpen: boolean;
  type: 'request' | 'application' | 'edit-request';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  type,
}) => {
  const message =
    type === 'edit-request' ? (
      <>
        <div className="font-bold">
          Your request has been successfully changed!
        </div>
        <div>We will get back to you soon.</div>
      </>
    ) : (
      <>
        <div className="font-bold">Thanks for submitting your {type}!</div>
        <div>We will get back to you soon.</div>
      </>
    );
  return (
    <Modal isOpen={isOpen} className="p-10 overflow-x-hidden bg-white">
      <div className="mb-10 text-xl text-center">{message}</div>
      <DarkButton href="/playground" className="mx-auto w-fit">
        Go back
      </DarkButton>
    </Modal>
  );
};

export default ConfirmationModal;
