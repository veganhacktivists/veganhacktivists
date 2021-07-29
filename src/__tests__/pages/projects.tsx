import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Projects from '../../pages/projects';

it('should render correctly', () => {
  const { asFragment } = render(<Projects />);
  expect(asFragment()).toMatchSnapshot();
});

const expectedProjectsPerYear = [
  {
    year: 2018,
    projects: [],
  },
  {
    year: 2019,
    projects: [],
  },
  {
    year: 2020,
    projects: [],
  },
  {
    year: 2021,
    projects: ['Activist Hub', 'Sehati Sanctuary'],
  },
];

expectedProjectsPerYear.forEach(({ year, projects: expected }) => {
  it(`should show only projects made in ${year}`, () => {
    render(<Projects />);
    fireEvent.click(screen.getByText(year));
    const actual = Array.from(
      document.querySelectorAll('h1.text-4xl.font-bold')
    ).map(({ innerHTML }) => innerHTML);
    expect(actual).toEqual(expected);
  });
});

it('should show all projects', () => {
  const expected = expectedProjectsPerYear.reduce(
    (accumulator, { projects }) => [...accumulator, ...projects],
    [] as string[]
  );
  render(<Projects />);
  fireEvent.click(screen.getByText('View all'));
  const actual = Array.from(
    document.querySelectorAll('h1.text-4xl.font-bold')
  ).map(({ innerHTML }) => innerHTML);
  expect(actual).toEqual(expected);
});
