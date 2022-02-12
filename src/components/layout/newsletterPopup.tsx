import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Newsletter from './newsletter';
import { useCookies } from 'react-cookie';

const NewsletterPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(['newsletter']);

  useEffect(() => {
    const userHasSignedUp = cookies['newsletter'];

    if (userHasSignedUp === undefined) {
      setTimeout(() => {
        setOpen(true);
      }, 60 * 1000);
    }
  }, []);

  return (
    <Modal open={open} animationDuration="700ms">
      <Newsletter popup setOpen={setOpen} />
    </Modal>
  );
};

export default NewsletterPopup;
