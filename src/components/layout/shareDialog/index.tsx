import React, { useEffect, useState } from 'react';
import Modal from '../modal';
import CustomImage from '../../decoration/customImage';
import { pixelStar } from '../../../images/separators';
import {
  TelegramButton,
  EmailButton,
  FacebookButton,
  RedditButton,
  TwitterButton,
  WhatsappButton,
  CopyButton,
} from './shareButtons';

interface ShareInfo {
  url: string;
  title: string;
  description?: string;
}

interface ShareDialogProps {
  open: boolean;
  shareInfo: ShareInfo;
  onClose: () => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  shareInfo,
  onClose,
}) => {
  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);
  useEffect(() => {
    if (open) {
      setCopyButtonClicked(false);
    }
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        onClose();
      }}
    >
      <div className="p-8 bg-grey-background text-grey w-full mx-auto">
        <div className="flex justify-center">
          <CustomImage
            src={pixelStar.src}
            height={pixelStar.height / 2}
            width={pixelStar.width / 2}
            alt="Pixel art of a star emerging from leaves"
          />
        </div>
        <h1 className="text-center mb-8">
          <span className="font-bold text-4xl">
            Share project: {shareInfo.title}
          </span>
        </h1>
        <div className="mx-auto text-center">
          <EmailButton onClick={onClose} {...shareInfo} />
          <FacebookButton onClick={onClose} {...shareInfo} />
          <TwitterButton onClick={onClose} {...shareInfo} />
          <CopyButton
            onClick={onClose}
            {...shareInfo}
            isClicked={copyButtonClicked}
            setClicked={setCopyButtonClicked}
          />
          <WhatsappButton onClick={onClose} {...shareInfo} />
          <TelegramButton onClick={onClose} {...shareInfo} />
          <RedditButton onClick={onClose} {...shareInfo} />
        </div>
      </div>
    </Modal>
  );
};

export default ShareDialog;
