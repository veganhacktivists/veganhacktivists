/* eslint-disable @typescript-eslint/no-empty-function */
jest.mock('./src/lib/cms/index', () => {});
jest.mock('next/router', () => ({
  useRouter: () => ({}),
}));
