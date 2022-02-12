import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Newsletter from './newsletter';
import { useCookies } from 'react-cookie';

const NewsletterPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(['newsletter']);

  useEffect(() => {
    const userHasSignedUp = cookies['newsletter'];

    let timeoutHandle: NodeJS.Timeout;
    if (userHasSignedUp === undefined) {
      timeoutHandle = setTimeout(() => {
        setOpen(true);
      }, 60 * 1000);
    }

    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, []);

  return (
    <Modal open={open} animationDuration="700ms">
      <Newsletter popup setOpen={setOpen} />
    </Modal>
  );
};

export default NewsletterPopup;
