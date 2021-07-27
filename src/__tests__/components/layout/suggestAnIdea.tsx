import { render } from '@testing-library/react';
import SuggestAnIdea from '../../../components/layout/suggestAnIdea';
import React from 'react';

it('should render correctly', () => {
  const { asFragment } = render(<SuggestAnIdea />);
  expect(asFragment()).toMatchSnapshot();
});
