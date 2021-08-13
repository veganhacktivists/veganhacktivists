import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages';
import type { IProjectFields } from '../types/generated/contentful';

const featuredProjects: IProjectFields[] = [];

test('Application renders without failing', () => {
  render(<Home featuredProjects={featuredProjects} />);
});

test('Application renders correctly', () => {
  const { asFragment } = render(<Home featuredProjects={featuredProjects} />);
  expect(asFragment()).toMatchSnapshot();
});
