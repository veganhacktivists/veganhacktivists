import type React from 'react';

export type Layout = React.FC<React.PropsWithChildren>;

type PageWithLayout<P = object> = React.FC<P> & { Layout: Layout };

export default PageWithLayout;
