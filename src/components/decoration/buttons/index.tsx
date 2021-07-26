import React from 'react';
import { faInstagram, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AriaAttributes } from 'react';

export interface ButtonProps extends AriaAttributes {
  primary?: boolean;
  href?: string;
  className?: string;
  active?: boolean;
  linkProps?: Partial<LinkProps>;
}

const baseButtonClasses = classNames(
  'p-3 px-4 py-2 text-2xl border-l-8 bg-w-x2 ease-out duration-1000 cursor-pointer'
);

const BaseButton: React.FC<ButtonProps> = ({
  href,
  children,
  linkProps,
  ...props
}) => {
  return (
    <>
      {/* it's an external link */}
      {(href?.startsWith('http://') || href?.startsWith('https://')) && (
        <a href={href} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      )}
      {/* it's an internal link */}
      {href && !(href.startsWith('http://') || href.startsWith('https://')) && (
        <Link {...linkProps} href={href} {...props}>
          <a>{children}</a>
        </Link>
      )}
      {/* it's a submit button */}
      {!href && (
        <button type="submit" {...props}>
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
  const classes = classNames(
    baseButtonClasses,
    'hover:shadow-fill-green text-grey-dark border-green bg-w-x2 bg-white',
    primary ? 'border-pink' : '',
    className
  );

  return (
    <BaseButton {...props}>
      <div className={classes}>{children}</div>
    </BaseButton>
  );
};

const DarkButton: React.FC<ButtonProps> = ({
  children,
  active,
  className = '',
  ...props
}) => {
  const classes = classNames(
    baseButtonClasses,
    active
      ? 'hover:shadow-fill-pink bg-fuchsia border-pink'
      : 'hover:shadow-fill-green bg-grey-dark border-green',
    'text-white',
    className
  );

  return (
    <BaseButton {...props}>
      <div className={classes}>{children}</div>
    </BaseButton>
  );
};

const GreenButton: React.FC<ButtonProps> = ({
  children,
  primary,
  className = '',
  ...props
}) => {
  const classes = classNames(
    baseButtonClasses,
    primary
      ? 'hover:shadow-fill-pink bg-fuchsia border-pink'
      : 'hover:shadow-fill-green bg-green-light border-green',
    'text-white',
    className
  );

  return (
    <BaseButton {...props}>
      <div className={classes}>{children}</div>
    </BaseButton>
  );
};

const ExternalLinkButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton {...props}>
      <div className="hover:shadow-fill-red bg-magenta border-l-8 border-red py-2 ease-linear duration-500">
        {children}
      </div>
    </BaseButton>
  );
};

const IconButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <BaseButton {...props}>{children}</BaseButton>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PatreonButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <IconButton
      {...props}
      className={classNames(
        'bg-white hover:bg-green-dark text-grey hover:text-white rounded-full px-1 py-2',
        className
      )}
    >
      <FontAwesomeIcon size="2x" fixedWidth icon={faPatreon} />
    </IconButton>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InstagramButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <IconButton
      {...props}
      className={classNames(
        'bg-white hover:bg-red text-grey hover:text-white rounded-full px-1 py-2',
        className
      )}
    >
      <FontAwesomeIcon size="2x" fixedWidth icon={faInstagram} />
    </IconButton>
  );
};

const WhiteButton: React.FC<ButtonProps> = ({
  children,
  active,
  className = '',
  ...props
}) => {
  const classes = classNames(
    'border-2 border-gray-200 border-opacity-50 p-3',
    {
      'bg-gray': active,
      'text-white': active,
    },
    className
  );

  return (
    <BaseButton {...props}>
      <div className={classes}>{children}</div>
    </BaseButton>
  );
};

export {
  ExternalLinkButton,
  SubmitButton,
  PatreonButton,
  InstagramButton,
  LightButton,
  DarkButton,
  WhiteButton,
  GreenButton,
};
