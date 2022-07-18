import { toast } from 'react-toastify';
import type { ButtonHTMLAttributes } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faLinkedin,
  faReddit,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import type ShareInfo from './shareInfo';
import { IconButton } from '../../decoration/buttons';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import type { LinkProps } from 'next/link';

const getButtonClassName = (bgHoverStyle?: string) =>
  `bg-gray ${bgHoverStyle} text-white rounded-full px-2 py-2 mx-2 my-2`;

const getEncodedQueryParameters = (parameters: {
  [key: string]: string | null | undefined;
}) => {
  const filteredParameters = Object.entries(parameters).filter(
    ([, v]) => v !== undefined && v !== null
  );
  const encodedParameters = filteredParameters.map(
    ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`
  );

  return encodedParameters.length ? `?${encodedParameters.join('&')}` : '';
};

interface ShareButtonProps {
  onClick: () => void;
  shareInfo: ShareInfo;
}

interface BaseShareButtonProps extends ButtonHTMLAttributes<unknown> {
  onClick: () => void;
  href?: LinkProps['href'];
  bgHoverStyle?: `hover:bg-[#${string}]`;
  className?: string;
  faIcon: IconDefinition;
}

const BaseShareButton: React.FC<BaseShareButtonProps> = ({
  href,
  bgHoverStyle,
  faIcon,
  onClick,
  className,
  ...props
}) => {
  return (
    <IconButton
      className={className ? className : getButtonClassName(bgHoverStyle)}
      href={href}
      onClick={onClick}
      {...props}
    >
      <div className="h-8 w-8 flex justify-center items-center">
        <FontAwesomeIcon size="2x" fixedWidth icon={faIcon} />
      </div>
    </IconButton>
  );
};

const EmailButton: React.FC<ShareButtonProps> = ({ shareInfo, onClick }) => {
  const { url, description, title } = shareInfo;

  const href = `mailto:${getEncodedQueryParameters({
    subject: title,
    body: description ? `${description}\n${url}` : url,
  })}`;
  return (
    <BaseShareButton
      aria-label="Share the project via Email"
      href={href}
      onClick={onClick}
      faIcon={faEnvelope}
      bgHoverStyle="hover:bg-[#BB001B]"
    />
  );
};

const FacebookButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url } = shareInfo;

  const href = `https://www.facebook.com/sharer/sharer.php${getEncodedQueryParameters(
    { u: url }
  )}`;

  return (
    <BaseShareButton
      aria-label="Share the project on Facebook"
      href={href}
      onClick={onClick}
      faIcon={faFacebook}
      bgHoverStyle="hover:bg-[#4267B2]"
    />
  );
};

const TwitterButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url, description, title } = shareInfo;

  const href = `https://twitter.com/share${getEncodedQueryParameters({
    url,
    text: description,
    via: 'VHacktivists',
    hashtags: title.replace(/\s/g, ''),
  })}`;

  return (
    <BaseShareButton
      aria-label="Share the project on Twitter"
      href={href}
      onClick={onClick}
      faIcon={faTwitter}
      bgHoverStyle="hover:bg-[#00acee]"
    />
  );
};

const WhatsappButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const deviceDetect = useDeviceDetect();
  const { url, description, title } = shareInfo;

  const href = `https://${
    deviceDetect.isMobile() ? 'api' : 'web'
  }.whatsapp.com/send${getEncodedQueryParameters({
    text: `${description ? description : title}\n${url}`,
  })}`;

  return (
    <BaseShareButton
      aria-label="Share the project on WhatsApp"
      href={href}
      onClick={onClick}
      faIcon={faWhatsapp}
      bgHoverStyle="hover:bg-[#25D366]"
    />
  );
};

const TelegramButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url, description, title } = shareInfo;

  const href = `https://telegram.me/share/url${getEncodedQueryParameters({
    url,
    text: description ? description : title,
  })}`;

  return (
    <BaseShareButton
      aria-label="Share the project on Telegram"
      href={href}
      onClick={onClick}
      faIcon={faTelegram}
      bgHoverStyle="hover:bg-[#0088cc]"
    />
  );
};

const CopyButton: React.FC<
  ShareButtonProps & { isClicked: boolean; setClicked: (stat: boolean) => void }
> = ({ onClick, shareInfo, isClicked, setClicked }) => {
  const { url } = shareInfo;

  return (
    <BaseShareButton
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
      aria-label="Copy the project url on clipboard"
      faIcon={isClicked ? faCheck : faCopy}
    />
  );
};

const RedditButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url, title } = shareInfo;

  const href = `https://www.reddit.com/submit${getEncodedQueryParameters({
    url,
    title,
  })}`;

  return (
    <BaseShareButton
      aria-label="Share the project on Reddit"
      href={href}
      onClick={onClick}
      faIcon={faReddit}
      bgHoverStyle="hover:bg-[#FF4500]"
    />
  );
};

const LinkedinButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url } = shareInfo;

  const href = `https://linkedin.com/shareArticle${getEncodedQueryParameters({
    url,
    mini: 'true',
  })}`;

  return (
    <BaseShareButton
      aria-label="Share the project on LinkedIn"
      href={href}
      onClick={onClick}
      faIcon={faLinkedin}
      bgHoverStyle="hover:bg-[#0A66C2]"
    />
  );
};

export {
  FacebookButton,
  TwitterButton,
  LinkedinButton,
  EmailButton,
  CopyButton,
  WhatsappButton,
  TelegramButton,
  RedditButton,
};
