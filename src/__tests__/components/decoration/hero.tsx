import React from 'react';
import { render } from '@testing-library/react';
import Hero from '../../../components/decoration/hero';

jest.mock(
  'next/image',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ({ src, alt }: any) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

it('should render correctly when providing a URL string', () => {
  const { asFragment } = render(
    <Hero
      imageBackground="https://via.placeholder.com/500x500"
      alignment="right"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should render correctly when providing static image data', () => {
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
