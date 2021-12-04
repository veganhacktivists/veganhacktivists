import React from 'react';

import type { LinkProps } from 'next/link';
import Link from 'next/link';

const CustomLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <a className="text-magenta hover:underline active:text-magenta-light">
        {children}
      </a>
    </Link>
  );
};

export default CustomLink;
