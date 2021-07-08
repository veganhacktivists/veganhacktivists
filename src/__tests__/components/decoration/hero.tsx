import React from 'react';
import { render } from '@testing-library/react';
import Hero from '../../../components/decoration/hero';

it('renders correctly when proving a URL string', () => {
  const { asFragment } = render(
    <Hero
      imageBackground="https://via.placeholder.com/500x500"
      alignment="right"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('renders correctly when proving static image data', () => {
  const { asFragment } = render(
    <Hero
      imageBackground={{
        src: 'https://via.placeholder.com/500x500',
        width: 500,
        height: 500,
      }}
      alignment="left"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
