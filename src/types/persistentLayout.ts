import type React from 'react';

export type Layout = React.FC<React.PropsWithChildren>;

// eslint-disable-next-line @typescript-eslint/ban-types
type PageWithLayout<P = {}> = React.FC<P> & { Layout: Layout };

export default PageWithLayout;
