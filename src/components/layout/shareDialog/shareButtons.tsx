import { toast } from 'react-toastify';

import { useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck, faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faLinkedin,
  faReddit,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

import classNames from 'classnames';

import { IconButton } from '../../decoration/buttons';

import useDeviceDetect from '../../../hooks/useDeviceDetect';

import type ShareInfo from './shareInfo';

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { ButtonHTMLAttributes } from 'react';
import type { UrlObject } from 'url';

/**
 * Function to get a share button style.
 * @param bgHoverStyle {string?} Optional string to set the color of the background of the button on hover.
 *
 * @return {string} The style to apply to the share button.
 */

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
  href?: UrlObject; // LinkProps['href'];
  /** Optional string to set the color of the background of the button on hover */
  bgHoverColor?: string;
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
  bgHoverColor,
  faIcon,
  onClick,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <IconButton
      className={classNames(
        className,
        'bg-gray text-white rounded-full p-2.5 m-1 w-min aspect-square'
      )}
      href={href}
      onClick={onClick}
      style={{
        backgroundColor: isHovered ? bgHoverColor : undefined,
      }}
      {...props}
      onPointerEnter={(e) => {
        setIsHovered(true);
        return props?.onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setIsHovered(false);
        return props?.onPointerLeave?.(e);
      }}
    >
      <div className="flex items-center justify-center mx-auto w-fit aspect-square">
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

  const href = `mailto:?subject=${title}&body=${
    description ? `${description}${encodeURIComponent('\n')}${url}` : url
  }`;
  return (
    <BaseShareButton
      aria-label="Share the project via Email"
      onClick={() => {
        window.open(href, '_blank');
        onClick();
      }}
      faIcon={faEnvelope}
      bgHoverColor="#BB001B"
    />
  );
};

/**
 * Button to share content through Facebook.
 */
const FacebookButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url } = shareInfo;

  return (
    <BaseShareButton
      aria-label="Share the project on Facebook"
      href={{
        protocol: 'https',
        pathname: 'facebook.com/sharer/sharer.php',
        query: { u: url },
      }}
      onClick={onClick}
      faIcon={faFacebook}
      bgHoverColor="#4267B2"
    />
  );
};

/**
 * Button to share content through Twitter.
 */
const TwitterButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url, description, title } = shareInfo;

  return (
    <BaseShareButton
      aria-label="Share the project on Twitter"
      href={{
        protocol: 'https',
        pathname: 'twitter.com/share',
        query: {
          url,
          text: description,
          via: 'VHacktivists',
          hashtags: title.replace(/\s/g, ''),
        },
      }}
      onClick={onClick}
      faIcon={faTwitter}
      bgHoverColor="#00acee"
    />
  );
};

/**
 * Button to share content through WhatsApp.
 */
const WhatsappButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { isMobile, isReady } = useDeviceDetect();
  const { url, description, title } = shareInfo;

  if (!isReady) {
    return null;
  }

  return (
    <BaseShareButton
      aria-label="Share the project on WhatsApp"
      href={{
        protocol: 'https',
        pathname: `${isMobile ? 'api' : 'web'}.whatsapp.com/send`,
        query: { text: `${description ? description : title}\n${url}` },
      }}
      onClick={onClick}
      faIcon={faWhatsapp}
      bgHoverColor="#25D366"
    />
  );
};

/**
 * Button to share content through Telegram.
 */
const TelegramButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url, description, title } = shareInfo;

  return (
    <BaseShareButton
      aria-label="Share the project on Telegram"
      href={{
        protocol: 'https',
        pathname: 'telegram.me/share/url',
        query: {
          url,
          text: description ? description : title,
        },
      }}
      onClick={onClick}
      faIcon={faTelegram}
      bgHoverColor="#0088cc"
    />
  );
};

/**
 * Button to copy an URL to the clipboard.
 */
const CopyButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url, title } = shareInfo;

  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <BaseShareButton
      onClick={() => {
        void toast
          .promise(navigator.clipboard.writeText(url), {
            success: `${title}'${
              title.endsWith('s') ? '' : 's'
            } URL copied to clipboard.`,
            error:
              'Something went wrong while copying your content! Please try again later',
          })
          .then(() => {
            setIsSuccess(true);
            setTimeout(() => {
              onClick();
            }, 1000);
          });
      }}
      className={classNames(isSuccess && 'bg-green')}
      bgHoverColor={isSuccess ? undefined : '#BB001B'}
      aria-label="Copy the project url on clipboard"
      faIcon={isSuccess ? faCheck : faCopy}
    />
  );
};

/**
 * Button to share content through Reddit.
 */
const RedditButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url, title } = shareInfo;

  return (
    <BaseShareButton
      aria-label="Share the project on Reddit"
      href={{
        protocol: 'https',
        pathname: 'reddit.com/submit',
        query: {
          url,
          title,
        },
      }}
      onClick={onClick}
      faIcon={faReddit}
      bgHoverColor="#FF4500"
    />
  );
};

/**
 * Button to share content through LinkedIn.
 */
const LinkedinButton: React.FC<ShareButtonProps> = ({ onClick, shareInfo }) => {
  const { url } = shareInfo;

  return (
    <BaseShareButton
      aria-label="Share the project on LinkedIn"
      href={{
        protocol: 'https',
        pathname: 'linkedin.com/shareArticle',
        query: {
          url,
          // mini: true,
        },
      }}
      onClick={onClick}
      faIcon={faLinkedin}
      bgHoverColor="#0A66C2"
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
