import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Projects from '../../pages/projects';

const image = {
  fields: { file: { url: null, details: { image: { width: 0, height: 0 } } } },
};

const projects = [
  {
    fields: {
      name: 'Activist Hub',
      image,
      date: '2021-04-01',
      year: 2021,
      team: { fields: { name: 'Test Team', color: 'black', icon: '' } },
      // description: (
      //   <p>
      //     The days of wondering whether or not our activism is effective are
      //     over. Activist Hub is the world&apos;s first street outreach dashboard
      //     that provides volunteers with the ability to monitor and understand
      //     their effectiveness through real data and analytics (DnA). Personal
      //     and group results will help everyone interested in making informed and
      //     strategic decisions for the animals!
      //   </p>
      // ),
      url: 'https://activisthub.org',
    },
  },
  {
    fields: {
      name: 'Sehati Sanctuary',
      image,
      date: '2021-03-01',
      year: 2021,
      team: { fields: { name: 'Test Team', color: 'black', icon: '' } },
      // description: (
      //   <p>
      //     Sehati Animal Sanctuary is the first farmed animal sanctuary in
      //     Indonesia which provides a loving haven to animals rescued from
      //     needless exploitation, violence, and slaughter. The sanctuary supports
      //     human-animal bonding and serves to educate the public about animal
      //     rights in order to reduce worldwide animal suffering.
      //   </p>
      // ),
      url: 'https://sehatisanctuary.org',
    },
  },
];

it('should render correctly', () => {
  const { asFragment } = render(<Projects projects={projects as any} />);
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
    render(<Projects projects={projects as any} />);
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
  render(<Projects projects={projects as any} />);
  fireEvent.click(screen.getByText('View all'));
  const actual = Array.from(
    document.querySelectorAll('h1.text-4xl.font-bold')
  ).map(({ innerHTML }) => innerHTML);
  expect(actual).toEqual(expected);
});
