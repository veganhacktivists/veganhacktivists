import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages';

test('Application renders without failing', () => {
  render(<Home />);
});

test('Application renders correctly', () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});
