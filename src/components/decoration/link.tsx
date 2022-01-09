import React from 'react';

import type { LinkProps } from 'next/link';
import Link from 'next/link';

const linkClassNames = 'text-magenta hover:underline active:text-magenta-light';

const CustomLink: React.FC<LinkProps> = ({ children, href, ...props }) => {
  const url = typeof href === 'string' ? href : href.pathname;

  return url?.startsWith('http://') || url?.startsWith('https://') ? (
    <a
      className={linkClassNames}
      target="_blank"
      rel="noreferrer"
      href={href.toString()}
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link {...props} href={href}>
      <a className={linkClassNames}>{children}</a>
    </Link>
  );
};

export default CustomLink;
