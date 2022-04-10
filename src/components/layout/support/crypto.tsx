import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faBitcoinSign, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import ReactModal from 'react-modal';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import getThemeColor from '../../../lib/helpers/theme';
import Modal from '../modal';

interface CryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CryptoModal: React.FC<CryptoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      test
    </Modal>
  );
};

interface CryptoWalletProps {
  code: string;
  icon: IconDefinition;
  color?: string;
  currencyName: string;
}

const CryptoWallet: React.FC<CryptoWalletProps> = ({ code, icon, color }) => {
  const onCopy = useCallback(() => {
    toast.promise(navigator.clipboard.writeText(code), {
      success: 'Code succesfully copied!',
      error:
        'Something went wrong copying the code, please select and copy it manually',
    });
  }, [code]);

  const [modalOpen, setModalOpen] = useState(false);

  const QR_LEVEL = 'H';

  return (
    <>
      <div className="flex flex-col md:flex-row min-w-0">
        <div style={{ backgroundColor: color }} className="py-1 my-auto">
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            fixedWidth
            className="text-white"
          />
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-row min-w-0 w-full px-2 py-2 text-xl bg-grey-over-background text-grey focus:ring-1 focus:ring-grey justify-between">
            <div className="pr-10 my-auto -mr-10 overflow-hidden text-ellipsis whitespace-nowrap">
              {code}
            </div>
            <div
              className="w-5 h-5 mx-2 my-auto aspect-square cursor-pointer"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <QRCode value={code} size={20} />
            </div>
          </div>
          <button
            onClick={onCopy}
            className="whitespace-nowrap flex flex-row justify-center px-4 py-2 text-2xl text-white cursor-pointer w-min bg-green gap-x-2"
          >
            Copy
            <div className="my-auto">
              <FontAwesomeIcon icon={faCopy} />
            </div>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div className="bg-white mx-auto w-screen left-0">
          <QRCode value={code} size={300} level={QR_LEVEL} />
        </div>
      </Modal>
    </>
  );
};

const Crypto: React.FC = () => {
  return (
    <div className="py-5 mx-auto space-y-5 text-xl bg-grey-background">
      <h3 className="text-2xl font-bold">We accept cryptocurrency!</h3>
      <div>
        Click the QR code to view the QR code enlarged, or copy the code to your
        clipboard.
      </div>
      <div className="grid gap-y-5 mx-auto md:px-10 lg:w-3/4">
        <CryptoWallet
          color={getThemeColor('yellow')}
          code="14qFZxHb3C8UuijTLJYccZVQzgVbQrQh1f"
          icon={faBitcoinSign}
          currencyName="Bitcoin"
        />
        <CryptoWallet
          color={getThemeColor('blue')}
          code="0x933AE0800e1Bb6aC4c720B4565Acc66eccc2127b"
          icon={faEthereum}
          currencyName="Ethereum"
        />
      </div>
    </div>
  );
};

export default Crypto;
