import React, { useEffect, useState } from 'react';
import Modal from '../modal';
import CustomImage from '../../decoration/customImage';
import { pixelStar } from '../../../images/separators';
import {
  CopyButton,
  EmailButton,
  FacebookButton,
  LinkedinButton,
  RedditButton,
  TelegramButton,
  TwitterButton,
  WhatsappButton,
} from './shareButtons';
import type ShareInfo from './shareInfo';

/**
 * Proptypes of `ShareDialog`.
 */
interface ShareDialogProps {
  /** Whether the dialog is open or not. */
  open: boolean;
  /** Information to share through the dialog. */
  shareInfo: ShareInfo;
  /** Callback executed when the dialog is closed. */
  onClose: () => void;
}

/**
 * Component of a share dialog.
 */
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
        <div className="flex flex-row mx-auto justify-center">
          <EmailButton onClick={onClose} shareInfo={shareInfo} />
          <FacebookButton onClick={onClose} shareInfo={shareInfo} />
          <TwitterButton onClick={onClose} shareInfo={shareInfo} />
          <LinkedinButton onClick={onClose} shareInfo={shareInfo} />
        </div>
        <div className="flex flex-row mx-auto justify-center">
          <WhatsappButton onClick={onClose} shareInfo={shareInfo} />
          <TelegramButton onClick={onClose} shareInfo={shareInfo} />
          <RedditButton onClick={onClose} shareInfo={shareInfo} />
          <CopyButton
            onClick={onClose}
            shareInfo={shareInfo}
            isClicked={copyButtonClicked}
            setClicked={setCopyButtonClicked}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShareDialog;
