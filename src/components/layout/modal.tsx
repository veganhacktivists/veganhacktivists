import classNames from 'classnames';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import useReduceMotion from '../../hooks/useReduceMotion';

import { bitter, ptSans, rajdhani } from './fonts';

if (process.env.NODE_ENV !== 'test') {
  try {
    ReactModal.setAppElement('#main');
  } catch {}
}

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
    INITIAL_CONTENT_CLASS,
  );
  const [overlayTransitionClasses, setOverlayTransitionClasses] = useState(
    INITIAL_OVERLAY_CLASS,
  );

  const closeModal = useCallback(() => {
    setTransitionClasses(INITIAL_CONTENT_CLASS);
    setOverlayTransitionClasses(INITIAL_OVERLAY_CLASS);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    setTransitionClasses(isOpen ? '-translate-y-1/2' : INITIAL_CONTENT_CLASS);
    setOverlayTransitionClasses(
      isOpen ? 'bg-opacity-75' : INITIAL_OVERLAY_CLASS,
    );
  }, [isOpen]);

  const reduceMotion = useReduceMotion();

  return (
    <ReactModal
      isOpen={isOpen}
      className={classNames(
        modalClassName,
        ptSans.variable,
        rajdhani.variable,
        bitter.variable,
        'overflow-y-auto max-h-screen fixed w-full md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 z-[9999] transition-all motion-reduce:transition-none duration-700',
        transitionClasses,
      )}
      overlayClassName={classNames(
        overlayClassName,
        'bg-black inset-0 fixed transition-all motion-reduce:transition-none duration-700 z-[9998]',
        overlayTransitionClasses,
      )}
      onRequestClose={closeModal}
      closeTimeoutMS={reduceMotion ? 0 : 700}
      shouldCloseOnEsc={!!onClose}
      shouldCloseOnOverlayClick={!!onClose}
    >
      <div className={classNames(className, 'my-12 sm:my-0 relative')}>
        {onClose && (
          <div
            onClick={closeModal}
            className="absolute top-0 right-0 bg-green px-3 py-1 text-2xl text-white font-bold cursor-pointer z-[10000]"
          >
            &#10005;
          </div>
        )}
        <div>{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
