import React, { useMemo } from 'react';
import {
  faInstagram,
  faPatreon,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import useDeviceDetect from '../../../hooks/useDeviceDetect';

import { getButtonFillStyle } from './utils';

import type {
  MouseEventHandler,
  AnchorHTMLAttributes,
  Ref,
  HTMLAttributes,
} from 'react';
import type { LinkProps } from 'next/link';
import type ShareInfo from '../../layout/shareDialog/shareInfo';

export interface ButtonProps
  extends React.RefAttributes<HTMLElement>,
    HTMLAttributes<HTMLElement>,
    React.PropsWithChildren {
  primary?: boolean;
  href?: LinkProps['href'];
  className?: string;
  active?: boolean;
  linkProps?: Partial<LinkProps> & Partial<AnchorHTMLAttributes<unknown>>;
  onClick?: MouseEventHandler;
  type?: 'submit' | 'reset' | 'button';
  capitalize?: boolean;
  newTab?: boolean;
  disabled?: boolean;
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

const BaseButton = React.forwardRef<
  HTMLElement,
  ButtonProps & { fillColor?: [from: string, to: string] }
>(
  (
    {
      children,
      linkProps,
      capitalize = true,
      className = '',
      newTab = false,
      fillColor,
      style: _style,
      ...props
    },
    ref
  ) => {
    const classes = classNames(
      className,
      'block',
      'transition-background-position duration-[400ms] ease-linear',
      {
        'hover:!bg-left group-hover:!bg-left': !props.disabled,
      },
      { capitalize }
    );

    const isExternal = isExternalLink(props.href);

    const openInNewTab = useMemo(
      () => newTab || linkProps?.target || isExternal,
      [isExternal, linkProps?.target, newTab]
    );

    const style = useMemo(() => {
      if (!fillColor) {
        return _style;
      }
      const [from, to] = fillColor;
      return { ..._style, ...getButtonFillStyle(from, to) };
    }, [_style, fillColor]);

    return (
      <>
        {props.href ? (
          <Link
            {...linkProps}
            href={props.href}
            passHref
            ref={ref as Ref<HTMLAnchorElement>}
            className={classNames(
              classes,
              `${props.disabled ? 'bg-gray-light text-black' : ''}`
            )}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noreferrer' : undefined}
            style={style}
          >
            <span>{children}</span>
          </Link>
        ) : (
          <button
            type="button"
            {...props}
            className={classes}
            ref={ref as Ref<HTMLButtonElement>}
            style={style}
          >
            {children}
          </button>
        )}
      </>
    );
  }
);

const LightButton: React.FC<ButtonProps> = ({
  children,
  primary,
  className = '',
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      fillColor={['white', 'green']}
      className={classNames(
        baseButtonClasses,
        'text-grey-dark border-green bg-w-x2 bg-white font-mono font-semibold',
        primary ? 'border-pink' : '',
        className
      )}
    >
      {children}
    </BaseButton>
  );
};

const DarkButton = React.forwardRef<HTMLElement, ButtonProps>(
  ({ children, active, className = '', ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        fillColor={active ? ['magenta', 'magenta'] : ['grey-dark', 'green']}
        ref={ref}
        className={classNames(
          baseButtonClasses,
          'transition-all overflow-hidden text-white',
          active ? 'border-pink' : 'border-green',
          className
        )}
      >
        {children}
      </BaseButton>
    );
  }
);

const DenyButton = React.forwardRef<HTMLElement, ButtonProps>(
  ({ children, active, className = '', ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        fillColor={active ? ['magenta', 'magenta'] : ['grey-dark', '#ff1b18']}
        ref={ref}
        className={classNames(
          baseButtonClasses,
          'transition-all overflow-hidden text-white',
          active ? 'border-pink' : 'border-[#FF1B18]',
          className
        )}
      >
        {children}
      </BaseButton>
    );
  }
);

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
        'bg-grey text-white border-none overflow-hidden',
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
    <BaseButton
      {...props}
      fillColor={primary ? ['fuchsia', 'pink'] : ['green', 'green-dark']}
      className={classNames(
        baseButtonClasses,
        'text-white border-green-dark',
        className
      )}
    >
      {children}
    </BaseButton>
  );
};

const BlueButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      fillColor={['blue', 'blue-dark']}
      className={classNames(
        baseButtonClasses,
        'text-white border-blue-dark',
        className
      )}
    >
      {children}
    </BaseButton>
  );
};

const ExternalLinkButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      fillColor={['magenta', 'pink-dark']}
      className={classNames(
        baseButtonClasses,
        className,
        'py-2 border-l-8 border-pink-dark'
      )}
    >
      {children}
    </BaseButton>
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
          void toast.promise(shareNatively, {
            error:
              'Something went wrong while sharing your content! Please try again later',
          });
        } else {
          shareWithDialog();
        }
      }}
      linkProps={{ scroll: false }}
    >
      <div className="flex items-center justify-center gap-2">
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
    <BaseButton {...props} fillColor={['white', 'green']}>
      <div className={classes}>{children}</div>
    </BaseButton>
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

const OutlineButton: React.FC<ButtonProps> = ({
  className,
  active = false,
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      className={classNames(
        baseButtonClasses,
        className,
        'border-grey-dark border-l border focus:ring-0 bg-none',
        {
          'text-grey-dark': !active,
          'text-white bg-grey-dark': active,
        }
      )}
    />
  );
};

const LogoutButton: React.FC<ButtonProps> = ({
  children,
  primary,
  className = '',
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      fillColor={['white', '#ff1a18']}
      className={classNames(
        baseButtonClasses,
        'text-grey-dark border-[#FF1A18] bg-w-x2 bg-white font-mono font-semibold',
        primary ? 'border-pink' : '',
        className
      )}
    >
      {children}
    </BaseButton>
  );
};

export {
  ExternalLinkButton,
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
  OutlineButton,
  DenyButton,
  LogoutButton,
  BlueButton,
};
