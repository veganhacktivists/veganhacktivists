import React from 'react';

import type { LinkProps as NextLinkProps } from 'next/link';
import Link from 'next/link';
import classNames from 'classnames';

const linkClassNames = 'text-magenta hover:underline active:text-magenta-light';

interface LinkProps extends React.PropsWithChildren<NextLinkProps> {
  className?: string;
}

const CustomLink: React.FC<LinkProps> = ({
  className,
  children,
  href,
  ...props
}) => {
  const url = typeof href === 'string' ? href : href.pathname;

  const classes = classNames(className, linkClassNames);

  return url?.startsWith('http://') || url?.startsWith('https://') ? (
    <a
      className={classes}
      target="_blank"
      rel="noreferrer"
      href={href.toString()}
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link {...props} href={href}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

export default CustomLink;
