import { render, screen } from '@testing-library/react';

import Home from '../pages';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders', () => {
    render(<Home featuredProjects={[]} lastBlogEntries={[]} />);
  });
});
