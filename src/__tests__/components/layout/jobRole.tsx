import React from 'react';
import { render } from '@testing-library/react';
import JobRole from '../../../components/layout/jobRole';
import codeLogo from '../../public/images/joinUs/VH-icon-dev.png';

it('should render correctly', () => {
  const { asFragment } = render(
    <JobRole image={codeLogo} color="red" title="foo" description="bar" />
  );
  expect(asFragment()).toMatchSnapshot();
});
