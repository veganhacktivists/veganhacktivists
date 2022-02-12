import classNames from 'classnames';
import React from 'react';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  return (
    <div className={classNames({ invisible: !open })}>
      <div
        onClick={() => {
          onClose?.();
        }}
        className={classNames(
          'fixed w-full top-0 left-0 h-full bg-black transition-all duration-700 z-[999]',
          open ? 'opacity-70' : 'opacity-0'
        )}
      />
      <div
        className={classNames(
          'z-[1000] w-full md:w-1/2 fixed top-1/2 left-1/2  -translate-x-1/2 transition-all duration-700',
          {
            '-translate-y-1/2': open,
          }
        )}
      >
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
    </div>
  );
};

export default Modal;
