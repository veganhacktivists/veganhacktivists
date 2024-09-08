import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import type { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends React.PropsWithChildren<NextLinkProps> {
  className?: string;
  disableMagenta?: boolean;
}

const CustomLink: React.FC<LinkProps> = ({
  className,
  children,
  disableMagenta,
  href,
  ...props
}) => {
  const url = typeof href === 'string' ? href : href.pathname;

  const linkClassNames = `${
    disableMagenta ? 'text-magenta active:text-magenta-light ' : ''
  } hover:underline `;

  const classes = classNames(linkClassNames, className);

  return url?.startsWith('http://') || url?.startsWith('https://') ? (
    <a
      className={classes}
      target='_blank'
      rel='noreferrer'
      // eslint-disable-next-line
      href={href.toString()}
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link {...props} href={href} className={classes}>
      {children}
    </Link>
  );
};

export default CustomLink;
