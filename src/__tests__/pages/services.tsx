import React from 'react';
import { render } from '@testing-library/react';
import Services from '../../pages/services';

it('should render correctly', () => {
  const { asFragment } = render(<Services />);
  expect(asFragment()).toMatchSnapshot();
});
