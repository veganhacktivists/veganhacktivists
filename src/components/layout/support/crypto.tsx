import { faBitcoin, faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import getThemeColor from '../../../lib/helpers/theme';
import { GreenButton } from '../../decoration/buttons';
import TextInput from '../../forms/inputs/textInput';

interface CryptoWalletProps {
  code: string;
  icon: React.ReactNode;
  color?: string;
}

const CryptoWallet: React.FC<CryptoWalletProps> = ({ code, icon, color }) => {
  const onCopy = useCallback(() => {
    toast.promise(navigator.clipboard.writeText(code), {
      success: 'Code succesfully copied!',
      error:
        'Something went wrong copying the code, please select and copy it manually',
    });
  }, [code]);

  return (
    <div className="flex flex-row justify-center">
      <div className="my-auto" style={{ color }}>
        {icon}
      </div>
      <div className="w-full bg-grey-over-background px-2 py-3 text-xl text-grey focus:ring-1 focus:ring-grey flex flex-row">
        <div className="text-ellipsis overflow-clip w-full -mr-5 pr-5">
          {code}
        </div>
        <div className="bg-black aspect-square w-5 h-5" />
      </div>

      <button
        onClick={onCopy}
        className="text-white bg-green text-2xl cursor-pointer px-4 py-2 flex flex-row justify-center gap-x-2"
      >
        Copy
        <div className="my-auto">
          <FontAwesomeIcon icon={faCopy} />
        </div>
      </button>
    </div>
  );
};

const Crypto: React.FC = () => {
  return (
    <div className="bg-grey-background py-5 text-xl md:w-3/4 mx-auto">
      <h3 className="font-bold text-2xl">We accept cryptocurrency!</h3>
      <div>
        Click the QR code to view the QR code enlarged, or copy the code to your
        clipboard.
      </div>
      <div className="flex flex-col gap-y-5 w-2/4 mx-auto">
        <CryptoWallet
          color={getThemeColor('yellow')}
          code="1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
          icon={<FontAwesomeIcon icon={faBitcoin} size="2x" fixedWidth />}
        />
        <CryptoWallet
          color={getThemeColor('blue')}
          code="11111111111111111111111111111111111111111111111111111111111"
          icon={<FontAwesomeIcon icon={faEthereum} size="2x" fixedWidth />}
        />
      </div>
    </div>
  );
};

export default Crypto;
