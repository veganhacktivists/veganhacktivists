import React from 'react';
import { render } from '@testing-library/react';
import Projects from '../../pages/projects';

it('should render correctly', () => {
  const { asFragment } = render(<Projects />);
  expect(asFragment()).toMatchSnapshot();
});
