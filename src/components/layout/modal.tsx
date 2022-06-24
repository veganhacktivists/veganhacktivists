import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import useReduceMotion from '../../hooks/useReduceMotion';

try {
  ReactModal.setAppElement('#main');
} catch {}

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  modalClassName?: string;
  overlayClassName?: string;
}

const INITIAL_CONTENT_CLASS = 'translate-y-full';
const INITIAL_OVERLAY_CLASS = 'bg-opacity-0';

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className,
  modalClassName,
  overlayClassName,
}) => {
  const [transitionClasses, setTransitionClasses] = useState(
    INITIAL_CONTENT_CLASS
  );
  const [overlayTransitionClasses, setOverlayTransitionClasses] = useState(
    INITIAL_OVERLAY_CLASS
  );

  useEffect(() => {
    setTransitionClasses(isOpen ? '-translate-y-1/2' : INITIAL_CONTENT_CLASS);
    setOverlayTransitionClasses(
      isOpen ? 'bg-opacity-75' : INITIAL_OVERLAY_CLASS
    );
  }, [isOpen]);

  const reduceMotion = useReduceMotion();

  return (
    <ReactModal
      isOpen={isOpen}
      className={classNames(
        modalClassName,
        'overflow-y-scroll max-h-screen fixed w-full md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 z-[9999] transition-all motion-reduce:transition-none duration-700',
        transitionClasses
      )}
      overlayClassName={classNames(
        overlayClassName,
        'bg-black inset-0 fixed transition-all motion-reduce:transition-none duration-700 z-[9998]',
        overlayTransitionClasses
      )}
      onRequestClose={() => {
        setTransitionClasses(INITIAL_CONTENT_CLASS);
        setOverlayTransitionClasses(INITIAL_OVERLAY_CLASS);
        onClose?.();
      }}
      closeTimeoutMS={reduceMotion ? 0 : 700}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <div className={className}>
        <div
          onClick={() => {
            onClose?.();
          }}
          className="absolute top-0 right-0 bg-green px-3 py-1 text-2xl text-white font-bold cursor-pointer z-[10000]"
        >
          &#10005;
        </div>
        <div>{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
