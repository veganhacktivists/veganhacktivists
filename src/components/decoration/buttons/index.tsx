import { faInstagram, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import type { AriaAttributes } from 'react';

export interface ButtonProps extends AriaAttributes {
  href?: string;
  className?: string;
}

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
      {href && !(href.startsWith('http://') || href.startsWith('https://')) && (
        <a href={href}>{children}</a>
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

const LightButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const classes = classNames(
    'hover:shadow-fill-green p-3 px-4 text-2xl text-grey-dark border-l-8 border-green py-2 bg-w-x2 bg-white ease-linear duration-500'
  );

  return (
    <BaseButton {...props}>
      <a>
        <div className={classes}>{children}</div>
      </a>
    </BaseButton>
  );
};

//TODO: define dark button classes

const DarkButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton {...props}>
      <a>
        <div className="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 ease-linear duration-500">
          {children}
        </div>
      </a>
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
