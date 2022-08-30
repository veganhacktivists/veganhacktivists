import React from 'react';
import { render } from '@testing-library/react';

import MeetOurTeam from '../../../components/layout/meetOurTeam';

it('should render correctly', () => {
  const { asFragment } = render(<MeetOurTeam />);
  expect(asFragment()).toMatchSnapshot();
});
