import React from 'react';

import { pixelStar } from '../../../images/separators';
import CustomImage from '../../decoration/customImage';
import SquareField from '../../decoration/squares';
import { SectionHeader } from '../../decoration/textBlocks';
import ContentfulImage from '../contentfulImage';
import Modal from '../modal';
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
  return (
    <Modal isOpen={open} onClose={onClose}>
      <>
        <SquareField
          squares={[
            { top: 0, left: 0, color: 'grey-lighter', size: 16 },
            { top: 16, left: 16, color: 'grey-lighter', size: 10 },
          ]}
        />
        <div className="w-full p-8 mx-auto bg-grey-background text-grey">
          <div className="mx-auto mb-2 w-fit">
            <CustomImage
              src={pixelStar.src}
              height={pixelStar.height / 2}
              width={pixelStar.width / 2}
              alt="Pixel art of a star emerging from leaves"
            />
          </div>
          <h1 className="mb-8 text-center">
            <span className="text-4xl font-bold">
              <SectionHeader
                startWithBoldFont
                header={['Share', 'this project']}
              >
                <div className="-mt-4 text-3xl">{shareInfo.title}</div>
              </SectionHeader>
            </span>
          </h1>
          <div className="flex flex-col justify-center gap-5 mx-auto mb-10 md:flex-row">
            <div className="w-1/2 mx-auto md:w-1/3">
              <ContentfulImage
                image={shareInfo.image}
                alt={`${shareInfo.title} logo`}
              />
            </div>
            <div className="grid grid-cols-4 gap-4 align-middle gap-y-8 place-items-center auto-cols-min">
              <EmailButton onClick={onClose} shareInfo={shareInfo} />
              <FacebookButton onClick={onClose} shareInfo={shareInfo} />
              <TwitterButton onClick={onClose} shareInfo={shareInfo} />
              <LinkedinButton onClick={onClose} shareInfo={shareInfo} />
              <WhatsappButton onClick={onClose} shareInfo={shareInfo} />
              <TelegramButton onClick={onClose} shareInfo={shareInfo} />
              <RedditButton onClick={onClose} shareInfo={shareInfo} />
              <CopyButton onClick={onClose} shareInfo={shareInfo} />
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ShareDialog;
