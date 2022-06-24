import type React from 'react';

export type Layout = (page: React.ReactNode) => React.ReactNode;

// eslint-disable-next-line @typescript-eslint/ban-types
type PageWithLayout<P = {}> = React.FC<P> & { getLayout: Layout };

export default PageWithLayout;
