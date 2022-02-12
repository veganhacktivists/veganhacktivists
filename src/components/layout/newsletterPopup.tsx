import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Newsletter from './newsletter';
import { useCookies } from 'react-cookie';

const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['newsletter']);
  const userHasSignedUp = cookies['newsletter'] !== undefined;

  useEffect(() => {
    let timeoutHandle: NodeJS.Timeout;
    if (!userHasSignedUp) {
      timeoutHandle = setTimeout(() => {
        setIsOpen(true);
      }, 60 * 1000);
    }

    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, []);

  if (userHasSignedUp) {
    return null;
  }

  const onChange = (signedUp: boolean) => {
    setIsOpen(false);
    setCookies('newsletter', signedUp, {
      path: '/',
      sameSite: 'strict',
      maxAge: signedUp ? 60 * 60 * 24 * 360 * 10 : 60 * 60 * 24 * 14, // 10 years or 2 weeks
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onChange(false);
      }}
    >
      <Newsletter onChange={onChange} showCancelButton />
    </Modal>
  );
};

export default NewsletterPopup;
