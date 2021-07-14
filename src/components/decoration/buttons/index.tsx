import { faInstagram, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import type { AriaAttributes } from 'react';

export interface ButtonProps extends AriaAttributes {
  primary?: boolean;
  href?: string;
  className?: string;
}

const baseButtonClasses = classNames(
  'p-3 px-4 py-2 text-2xl border-l-8 bg-w-x2 ease-linear duration-500'
);

const BaseButton: React.FC<ButtonProps> = ({ href, children }) => {
  return (
    <>
      {/* it's an external link */}
      {(href?.startsWith('http://') || href?.startsWith('https://')) && (
        <Link href={href} passHref>
          {children}
        </Link>
      )}
      {/* it's an internal link */}
      {href && !(href.startsWith('https://') || href.startsWith('https://')) && (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      )}
      {/* it's a submit button */}
      {!href && <button type="submit">{children}</button>}
    </>
  );
};

// TODO: define what a submit should look like
const SubmitButton: React.FC<ButtonProps> = (props) => {
  return <BaseButton {...props} />;
};

//TODO: define light button classes

const LightButton: React.FC<ButtonProps> = ({
  children,
  primary,
  className = '',
  ...props
}) => {
  const classes = classNames(
    baseButtonClasses,
    'hover:shadow-fill-green text-grey-dark border-green bg-w-x2 bg-white',
    primary ? 'border-strawberry' : '',
    className
  );

  return (
    <BaseButton {...props}>
      <div className={classes}>{children}</div>
    </BaseButton>
  );
};

//TODO: define dark button classes

const DarkButton: React.FC<ButtonProps> = ({
  children,
  primary,
  className = '',
  ...props
}) => {
  const classes = classNames(
    baseButtonClasses,
    primary
      ? 'hover:shadow-fill-strawberry bg-fuchsia border-strawberry'
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

const ExternalLinkButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton {...props}>
      <a>
        <div className="hover:shadow-fill-strawberry bg-fuchsia border-l-8 border-strawberry py-2 ease-linear duration-500">
          {children}
        </div>
      </a>
    </BaseButton>
  );
};

const IconButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton {...props}>
      <a {...props}>{children}</a>
    </BaseButton>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PatreonButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <IconButton
      {...props}
      className="bg-white hover:bg-green-dark text-grey hover:text-white rounded-full px-1 py-2 mx-2"
    >
      <FontAwesomeIcon size="2x" fixedWidth icon={faPatreon} />
    </IconButton>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InstagramButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <IconButton
      {...props}
      className="bg-white hover:bg-strawberry text-grey hover:text-white rounded-full px-1 py-2 mx-2"
    >
      <FontAwesomeIcon size="2x" fixedWidth icon={faInstagram} />
    </IconButton>
  );
};

export {
  ExternalLinkButton,
  SubmitButton,
  PatreonButton,
  InstagramButton,
  LightButton,
  DarkButton,
};
