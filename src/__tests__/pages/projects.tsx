import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Projects from '../../pages/projects';

const projects = [
  {
    fields: {
      name: 'Activist Hub',
      date: '2021-04-01',
      year: 2021,
      team: { fields: { name: 'Test Team', color: 'black', icon: '' } },
      url: 'https://activisthub.org',
    },
  },
  {
    fields: {
      name: 'Sehati Sanctuary',
      date: '2021-03-01',
      year: 2021,
      team: { fields: { name: 'Test Team', color: 'black', icon: '' } },
      url: 'https://sehatisanctuary.org',
    },
  },
];

const projectYears = [2021, 2020, 2019, 2018];

it('should render correctly', () => {
  const { asFragment } = render(
    <Projects projects={projects as any} projectYears={projectYears} />
  );
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
  it.only(`should show only projects made in ${year}`, async () => {
    const { findByText } = render(
      <Projects projects={projects as any} projectYears={projectYears} />
    );

    await act(async () => {
      (await findByText(year.toString())).click();
    });

    const actual = Array.from(
      document.querySelectorAll('.text-left > h1.text-4xl.font-bold')
    ).map(({ innerHTML }) => innerHTML);
    expect(actual).toEqual(expected);
  });
});

it('should show all projects', () => {
  const expected = expectedProjectsPerYear.reduce(
    (accumulator, { projects }) => [...accumulator, ...projects],
    [] as string[]
  );
  render(<Projects projects={projects as any} projectYears={projectYears} />);
  fireEvent.click(screen.getByText('View all'));
  const actual = Array.from(
    document.querySelectorAll('h1.text-4xl.font-bold')
  ).map(({ innerHTML }) => innerHTML);
  expect(actual).toEqual(expected);
});
