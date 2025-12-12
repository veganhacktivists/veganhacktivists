import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';

import Modal from './modal';

import { DarkButton, WhiteButton } from 'components/decoration/buttons';

const FlockworkModal = () => {
  const [cookies, setCookies] = useCookies(['flockworkModalDismissed']);
  const [flockworkModalOpen, setFlockworkModalOpen] = useState(
    cookies.flockworkModalDismissed !== 'true',
  );
  const dismissModal = useCallback(() => {
    setFlockworkModalOpen(false);
    setCookies('flockworkModalDismissed', 'true', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  }, [setCookies]);

  return (
    <Modal isOpen={flockworkModalOpen} onClose={() => dismissModal()}>
      <div className='w-full pt-[50px] pb-[100px] px-[90px] mx-auto bg-grey-background text-black font-mono'>
        <div className='flex flex-col justify-center pt-24 gap-x-10 md:flex-row md:pt-24 md:gap-x-8'>
          <div className='flex items-center mx-auto mt-5 md:m-0'>
            <div>
              <h1 className='mb-20 text-center'>
                <span className='text-4xl font-bold'>
                  Your volunteer platform just got better!
                </span>
              </h1>
              <div className='text-center text-4xl mb-10'>
                <strong>Playground</strong> is now <strong>Flockwork</strong>,
                with new account features, better matching, and more
                opportunities to help animals.
              </div>
              <div className='flex justify-center gap-10'>
                <WhiteButton
                  className='text-2xl w-[236px]'
                  onClick={() => dismissModal()}
                >
                  Stay here
                </WhiteButton>
                <DarkButton
                  className='text-2xl flex-1 flex items-center justify-center'
                  href='https://flockwork.org?source=playground'
                >
                  Take me there
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FlockworkModal;
