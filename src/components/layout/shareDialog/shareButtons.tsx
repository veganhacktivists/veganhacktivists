import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faReddit,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import type ShareInfo from './shareInfo';

const getButtonClassName = (bgHoverStyle: `hover:bg-[#${string}]`) =>
  `bg-gray ${bgHoverStyle} text-white rounded-full px-2 py-2 mx-2 my-2`;

const ICON_CONTAINER_CLASSNAME = 'h-8 w-8 flex justify-center items-center';

interface ShareButtonProps {
  onClick: () => void;
  shareInfo: ShareInfo;
}

export const EmailButton: React.FC<ShareButtonProps> = ({ shareInfo }) => {
  const { url, description, title } = shareInfo;

  return (
    <EmailShareButton
      url={url}
      body={description}
      subject={title}
      resetButtonStyle={false}
      className={getButtonClassName('hover:bg-[#BB001B]')}
    >
      <div className={ICON_CONTAINER_CLASSNAME}>
        <FontAwesomeIcon size="2x" fixedWidth icon={faEnvelope} />
      </div>
    </EmailShareButton>
  );
};

export const FacebookButton: React.FC<ShareButtonProps> = ({
  onClick,
  shareInfo,
}) => {
  const { url, description, title } = shareInfo;

  return (
    <FacebookShareButton
      url={url}
      quote={description}
      hashtag={title.replaceAll(' ', '')}
      onClick={() => {
        onClick();
      }}
      resetButtonStyle={false}
      className={getButtonClassName('hover:bg-[#4267B2]')}
    >
      <div className={ICON_CONTAINER_CLASSNAME}>
        <FontAwesomeIcon size="2x" fixedWidth icon={faFacebook} />
      </div>
    </FacebookShareButton>
  );
};

export const TwitterButton: React.FC<ShareButtonProps> = ({
  onClick,
  shareInfo,
}) => {
  const { url, description, title } = shareInfo;

  return (
    <TwitterShareButton
      url={url}
      title={description}
      hashtags={[title.replaceAll(' ', '')]}
      onClick={() => {
        onClick();
      }}
      resetButtonStyle={false}
      className={getButtonClassName('hover:bg-[#00acee]')}
    >
      <div className={ICON_CONTAINER_CLASSNAME}>
        <FontAwesomeIcon size="2x" fixedWidth icon={faTwitter} />
      </div>
    </TwitterShareButton>
  );
};

export const WhatsappButton: React.FC<ShareButtonProps> = ({
  onClick,
  shareInfo,
}) => {
  const { url, description, title } = shareInfo;

  return (
    <WhatsappShareButton
      url={url}
      title={`${description} ${title}`}
      separator={'\n'}
      onClick={() => {
        onClick();
      }}
      resetButtonStyle={false}
      className={getButtonClassName('hover:bg-[#25D366]')}
    >
      <div className={ICON_CONTAINER_CLASSNAME}>
        <FontAwesomeIcon size="2x" fixedWidth icon={faWhatsapp} />
      </div>
    </WhatsappShareButton>
  );
};

export const TelegramButton: React.FC<ShareButtonProps> = ({
  onClick,
  shareInfo,
}) => {
  const { url, description, title } = shareInfo;

  return (
    <TelegramShareButton
      url={url}
      title={`${description} ${title}`}
      onClick={() => {
        onClick();
      }}
      resetButtonStyle={false}
      className={getButtonClassName('hover:bg-[#0088cc]')}
    >
      <div className={ICON_CONTAINER_CLASSNAME}>
        <FontAwesomeIcon size="2x" fixedWidth icon={faTelegram} />
      </div>
    </TelegramShareButton>
  );
};

export const CopyButton: React.FC<
  ShareButtonProps & { isClicked: boolean; setClicked: (stat: boolean) => void }
> = ({ onClick, shareInfo, isClicked, setClicked }) => {
  const { url } = shareInfo;

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setClicked(true);
          toast.success(`url ${url} copied on clipboard.`);
          setTimeout(() => {
            onClick();
          }, 1000);
        } catch (err) {
          toast.error(
            'Something went wrong while copying your content! Please try again later'
          );
        }
      }}
      className={
        isClicked
          ? 'bg-green text-white rounded-full px-2 py-2 mx-2 my-2'
          : getButtonClassName('hover:bg-[#BB001B]')
      }
    >
      <div className={ICON_CONTAINER_CLASSNAME}>
        <FontAwesomeIcon
          size="2x"
          fixedWidth
          icon={isClicked ? faCheck : faCopy}
        />
      </div>
    </button>
  );
};

export const RedditButton: React.FC<ShareButtonProps> = ({
  onClick,
  shareInfo,
}) => {
  const { url, title } = shareInfo;

  return (
    <RedditShareButton
      url={url}
      title={title}
      onClick={() => {
        onClick();
      }}
      resetButtonStyle={false}
      className={getButtonClassName('hover:bg-[#FF4500]')}
    >
      <div className={ICON_CONTAINER_CLASSNAME}>
        <FontAwesomeIcon size="2x" fixedWidth icon={faReddit} />
      </div>
    </RedditShareButton>
  );
};
