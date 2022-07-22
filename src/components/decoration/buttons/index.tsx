import React from 'react';
import {
  faInstagram,
  faPatreon,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { LinkProps } from 'next/link';
import type {
  MouseEventHandler,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react';
import { FillBackground } from './utils';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import type ShareInfo from '../../layout/shareDialog/shareInfo';

export interface ButtonProps
  extends React.PropsWithChildren<ButtonHTMLAttributes<unknown>> {
  primary?: boolean;
  href?: LinkProps['href'];
  className?: string;
  active?: boolean;
  linkProps?: Partial<LinkProps> & Partial<AnchorHTMLAttributes<unknown>>;
  onClick?: MouseEventHandler;
  type?: 'submit' | 'reset' | 'button';
  capitalize?: boolean;
}

const baseButtonClasses = classNames(
  'p-3 px-4 py-2 text-2xl border-l-8 transition-shadow font-mono cursor-pointer disabled:bg-grey-light disabled:cursor-not-allowed disabled:hover:shadow-none truncate focus:ring'
);

const isExternalLink: (href: ButtonProps['href']) => boolean = (href) => {
  if (!href) return false;
  if (typeof href === 'string') {
    return href.startsWith('http:') || href.startsWith('https:');
  }

  const { protocol, pathname, hostname } = href;

  return (
    protocol?.startsWith('mailto') ||
    [protocol, pathname, hostname].some(
      (x) => x?.startsWith('http') || x?.startsWith('https')
    )
  );
};

const BaseButton: React.FC<ButtonProps> = ({
  children,
  linkProps,
  capitalize = true,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const classes = classNames(className, { capitalize });

  const isExternal = isExternalLink(props.href);
  return (
    <>
      {props.href ? (
        <Link {...linkProps} href={props.href} passHref={isExternal}>
          <a
            target={linkProps?.target || isExternal ? '_blank' : undefined}
            rel={linkProps?.rel || isExternal ? 'noreferrer' : undefined}
            aria-label={ariaLabel}
          >
            <div className={classes} {...props}>
              {children}
            </div>
          </a>
        </Link>
      ) : (
        <button
          type="button"
          {...props}
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      )}
    </>
  );
};

// TODO: define what a submit should look like
const SubmitButton: React.FC<ButtonProps> = (props) => {
  return <BaseButton {...props} />;
};

const LightButton: React.FC<ButtonProps> = ({
  children,
  primary,
  className = '',
  ...props
}) => {
  return (
    <FillBackground base="white" fill="green" disabled={props.disabled}>
      <BaseButton
        {...props}
        className={classNames(
          baseButtonClasses,
          'text-grey-dark border-green bg-w-x2 bg-white font-mono font-semibold',
          primary ? 'border-pink' : '',
          className
        )}
      >
        {children}
      </BaseButton>
    </FillBackground>
  );
};

const DarkButton: React.FC<ButtonProps> = ({
  children,
  active,
  className = '',
  ...props
}) => {
  return (
    <FillBackground
      disabled={props.disabled}
      base={active ? 'magenta' : 'grey-dark'}
      fill={active ? 'magenta' : 'green'}
    >
      <BaseButton
        {...props}
        className={classNames(
          baseButtonClasses,
          'transition-all overflow-hidden text-white',
          active ? 'border-pink' : 'border-green',
          className
        )}
      >
        {children}
      </BaseButton>
    </FillBackground>
  );
};

const GreyButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      className={classNames(
        baseButtonClasses,
        'bg-grey border-none overflow-hidden text-white',
        className
      )}
    >
      {children}
    </BaseButton>
  );
};

const GreenButton: React.FC<ButtonProps> = ({
  children,
  primary,
  className = '',
  ...props
}) => {
  return (
    <FillBackground
      disabled={props.disabled}
      base={primary ? 'fuchsia' : 'green-light'}
      fill={primary ? 'pink' : 'green'}
    >
      <BaseButton
        {...props}
        className={classNames(baseButtonClasses, 'text-white', className)}
      >
        {children}
      </BaseButton>
    </FillBackground>
  );
};

const ExternalLinkButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <FillBackground base="magenta" fill="pink-dark" disabled={props.disabled}>
      <BaseButton {...props}>
        <div className="py-2 border-l-8 border-pink-dark">{children}</div>
      </BaseButton>
    </FillBackground>
  );
};

const IconButton: React.FC<ButtonProps> = (props) => {
  return <BaseButton {...props} />;
};

const PatreonButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <IconButton
      aria-label="Support us on Patreon!"
      {...props}
      className={classNames(
        'bg-white hover:bg-green-dark text-grey hover:text-white rounded-full px-2 py-2',
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8">
        <FontAwesomeIcon size="2x" fixedWidth icon={faPatreon} />
      </div>
    </IconButton>
  );
};

const YoutubeButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <IconButton
      aria-label="Subscribe to our Youtube channel!"
      {...props}
      className={classNames(
        'bg-white hover:bg-red text-grey hover:text-white rounded-full px-2 py-2',
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8">
        <FontAwesomeIcon size="2x" fixedWidth icon={faYoutube} />
      </div>
    </IconButton>
  );
};

const InstagramButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <IconButton
      aria-label="Follow us on Instagram!"
      {...props}
      className={classNames(
        'bg-white hover:bg-blue text-grey hover:text-white rounded-full px-2 py-2',
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8">
        <FontAwesomeIcon size="2x" fixedWidth icon={faInstagram} />
      </div>
    </IconButton>
  );
};

const ShareButton: React.FC<
  ButtonProps & {
    openAndInitiateShareDialog: () => void;
    shareInfo: ShareInfo;
  }
> = ({ openAndInitiateShareDialog, shareInfo }) => {
  const { isMobile, isReady } = useDeviceDetect();
  const { url, title, description } = shareInfo;

  const shareNatively = async () => {
    await navigator.share({ title, text: description, url });
  };

  const shareWithDialog = () => {
    openAndInitiateShareDialog();
  };

  return (
    <DarkButton
      disabled={!isReady}
      onClick={() => {
        if (navigator && navigator['share'] && isMobile) {
          toast.promise(shareNatively, {
            error:
              'Something went wrong while sharing your content! Please try again later',
          });
        } else {
          shareWithDialog();
        }
      }}
      linkProps={{ scroll: false }}
    >
      <div className="flex items-center gap-2 justify-center">
        <FontAwesomeIcon size="1x" fixedWidth icon={faShare} />
        <div>Share</div>
      </div>
    </DarkButton>
  );
};

const WhiteButton: React.FC<ButtonProps> = ({
  children,
  active,
  className = '',
  ...props
}) => {
  const classes = classNames(
    'border-2 border-opacity-50 p-3',
    {
      'bg-gray text-white border-grey': active,
      'text-black': !active,
    },
    className
  );

  return (
    <FillBackground base="white" fill="green" disabled={props.disabled}>
      <BaseButton {...props}>
        <div className={classes}>{children}</div>
      </BaseButton>
    </FillBackground>
  );
};

const NavButton: React.FC<ButtonProps & { href: string }> = ({
  href,
  className = '',
  children,
}) => {
  const { pathname } = useRouter();
  const atLocation = pathname === href;

  const classes = classNames('m-5 font-mono', className);

  return (
    <DarkButton
      active={atLocation}
      href={href}
      className={classes}
      linkProps={{ scroll: false }}
    >
      {children}
    </DarkButton>
  );
};

export {
  ExternalLinkButton,
  SubmitButton,
  PatreonButton,
  InstagramButton,
  IconButton,
  YoutubeButton,
  ShareButton,
  LightButton,
  DarkButton,
  WhiteButton,
  GreenButton,
  NavButton,
  GreyButton,
};
