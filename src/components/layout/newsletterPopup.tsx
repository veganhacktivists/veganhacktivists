import React, { useState, useEffect, useCallback } from 'react';
import Modal from './modal';
import Newsletter from './newsletter';
import { useCookies } from 'react-cookie';

const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['newsletter']);
  const userHasSignedUp = cookies['newsletter'] !== undefined;

  useEffect(() => {
    if (userHasSignedUp) return;
    const timeoutHandle = setTimeout(() => {
      setIsOpen(true);
    }, 60 * 1000);

    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [userHasSignedUp]);

  const onChange = useCallback(
    (signedUp: boolean) => {
      setIsOpen(false);
      setCookies('newsletter', signedUp, {
        path: '/',
        sameSite: 'strict',
        maxAge: signedUp ? 60 * 60 * 24 * 360 * 10 : 60 * 60 * 24 * 14, // 10 years or 2 weeks
      });
    },
    [setCookies]
  );

  if (userHasSignedUp) {
    return null;
  }

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
