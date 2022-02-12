import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useRef } from 'react';

interface ModalProps {
  open: boolean;
  animationDuration?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  animationDuration = '500ms',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={classNames(
        'fixed top-0 z-[999] w-full h-full flex items-center justify-center',
        open ? '' : 'pointer-events-none'
      )}
    >
      <div
        className={`absolute top-0 w-full h-full bg-black ${
          open ? 'opacity-70' : 'opacity-0'
        } transition-all ease-out`}
        style={{ transitionDuration: animationDuration }}
      />
      <div
        className={`h-full w-full flex items-center justify-center ${
          open ? 'translate-y-[0vh]' : 'translate-y-[100vh]'
        } transition-all ease-out`}
        style={{ transitionDuration: animationDuration }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
