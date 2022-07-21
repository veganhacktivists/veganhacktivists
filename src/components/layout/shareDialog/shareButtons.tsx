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

/**
 * Function to get a share button style.
 * @param bgHoverStyle {string?} Optional string to set the color of the background of the button on hover.
 *
 * @return {string} The style to apply to the share button.
 */
const getShareButtonStyle = (bgHoverStyle?: string) =>
  `bg-gray ${bgHoverStyle} text-white rounded-full px-2 py-2 mx-2 my-2`;

/**
 * Function to get the query parameters of a request encoded as a URI string.
 * @param parameters {Object} Object in which each property is the name of a parameter with the respective value.
 *
 * @return {string} The query parameters of the URI request.
 */
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

/**
 * Proptypes of the share buttons.
 */
interface ShareButtonProps {
  /** Callback executed when the button is clicked. */
  onClick: () => void;
  /** Information to share. */
  shareInfo: ShareInfo;
}

/**
 * Proptypes of a `BaseShareButton`.
 */
interface BaseShareButtonProps extends ButtonHTMLAttributes<unknown> {
  /** Callback executed when the button is clicked. */
  onClick: () => void;
  /** URI containing the information to share and the website where it will be shared. */
  href?: LinkProps['href'];
  /** Optional string to set the color of the background of the button on hover */
  bgHoverStyle?: `hover:bg-[#${string}]`;
  /** Optional style of the button. */
  className?: string;
  /** Font Awesome icon to show inside the button. */
  faIcon: IconDefinition;
}

/**
 * Component of a base share button
 */
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
      className={className ? className : getShareButtonStyle(bgHoverStyle)}
      href={href}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-center w-8 h-8">
        <FontAwesomeIcon size="2x" fixedWidth icon={faIcon} />
      </div>
    </IconButton>
  );
};

/**
 * Button to share content through Email.
 */
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

/**
 * Button to share content through Facebook.
 */
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

/**
 * Button to share content through Twitter.
 */
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

/**
 * Button to share content through WhatsApp.
 */
const WhatsappButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { isMobile, isReady } = useDeviceDetect();
  const { url, description, title } = shareInfo;

  const href = `https://${
    isMobile ? 'api' : 'web'
  }.whatsapp.com/send${getEncodedQueryParameters({
    text: `${description ? description : title}\n${url}`,
  })}`;

  if (!isReady) {
    return null;
  }

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

/**
 * Button to share content through Telegram.
 */
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

/**
 * Button to copy an URL to the clipboard.
 */
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
          : getShareButtonStyle('hover:bg-[#BB001B]')
      }
      aria-label="Copy the project url on clipboard"
      faIcon={isClicked ? faCheck : faCopy}
    />
  );
};

/**
 * Button to share content through Reddit.
 */
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

/**
 * Button to share content through LinkedIn.
 */
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
