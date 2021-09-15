import type React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type PageWithLayout<P = {}> = React.FC<P> & { getLayout: React.FC };

export default PageWithLayout;
