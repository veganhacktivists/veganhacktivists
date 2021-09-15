import type { NextPage } from 'next';
import type React from 'react';

type PageWithLayout = NextPage & { getLayout: React.FC };

export default PageWithLayout;
