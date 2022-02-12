import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import useReduceMotion from '../../hooks/useReduceMotion';

ReactModal.setAppElement('#main');

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const INITIAL_CONTENT_CLASS = 'translate-y-full';
const INITIAL_OVERLAY_CLASS = 'bg-opacity-0';

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [transitionClasses, setTransitionClasses] = useState(
    INITIAL_CONTENT_CLASS
  );
  const [overlayTransitionClasses, setOverlayTransitionClasses] = useState(
    INITIAL_OVERLAY_CLASS
  );

  useEffect(() => {
    setTimeout(() => {
      setTransitionClasses(isOpen ? '-translate-y-1/2' : INITIAL_CONTENT_CLASS);
      setOverlayTransitionClasses(
        isOpen ? 'bg-opacity-75' : INITIAL_OVERLAY_CLASS
      );
    }, 1);
  }, [isOpen]);

  const reduceMotion = useReduceMotion();

  return (
    <ReactModal
      isOpen={isOpen}
      className={classNames(
        'fixed w-full md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 z-[9999] transition-all motion-reduce:transition-none duration-700',
        transitionClasses
      )}
      overlayClassName={classNames(
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
      <div>
        <div
          onClick={() => {
            onClose?.();
          }}
          className="absolute top-0 right-0 bg-green px-3 py-1 text-2xl text-white font-bold cursor-pointer"
        >
          &#10005;
        </div>
        <div>{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
