import React from 'react';
import { render } from '@testing-library/react';

import { WhiteButton } from '../../../../components/decoration/buttons';

describe('WhiteButton', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <WhiteButton href='https://example.org'>Foo</WhiteButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
