import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import type { TeamName } from 'components/layout/people';
import { PeopleHero } from 'components/layout/people';
import { FirstSubSection } from 'components/decoration/text-blocks';
import { mockPeople, mockTeams } from './mockData';
import { LightButton, WhiteButton } from 'components/decoration/buttons';

type Team = {
  image: StaticImageData;
  selectedImage: StaticImageData;
  teamName: TeamName;
  color: string;
};

type Person = {
  image: StaticImageData | undefined;
  teamName: TeamName;
  tags: string[];
  name: string;
};

const TeamMemberCard: React.FC<{ person: Person; teamColor: string }> = ({
  person,
  teamColor,
}) => {
  const { name, teamName, tags } = person;
  return (
    <div className="w-64">
      <div className="bg-grey w-100 h-64 flex justify-end mb-2">
        <div className={`bg-${teamColor} w-8 h-8`} />
      </div>
      <div className="font-bold">{name}</div>
      <div>
        {tags.map((t, i) => (
          <span className="mx-1" key={i}>
            {t};
          </span>
        ))}
        <div className={`text-${teamColor} font-bold`}>
          TEAM {teamName.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const TeamSelector: React.FC<{
  teams: Team[];
  selectedTeam: TeamName | undefined;
  selectCallback: (arg0: TeamName | undefined) => void;
}> = ({ teams, selectedTeam, selectCallback }) => {
  return (
    <div className="flex h-28 max-w-5xl m-auto mb-10">
      <button
        className={`w-64 font-bold flex-grow-0 font-mono text-2xl hover:bg-grey hover:text-white transition-colors ${
          selectedTeam === undefined ? 'bg-grey text-white' : 'bg-white'
        }`}
        onClick={() => selectCallback(undefined)}
      >
        View all
      </button>
      {teams.map(({ teamName, image, selectedImage, color }) => (
        <button
          className={`w-64 hover:bg-${color} flex-grow-0 transition-colors ${
            selectedTeam === teamName ? `bg-${color}` : 'bg-white'
          }`}
          onClick={() => selectCallback(teamName)}
          key={teamName}
        >
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={teamName}
          />
          {/* {selectedTeam === teamName ? (
            <Image
              src={selectedImage.src}
              width={selectedImage.width}
              height={selectedImage.height}
              alt={teamName}
            />
          ) : (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={teamName}
            />
          )} */}
        </button>
      ))}
    </div>
  );
};

const MemberList: React.FC<{ people: Person[]; teams: Team[] }> = ({
  people,
  teams,
}) => {
  const colorMap = useMemo(() => {
    if (!teams) return {};
    return teams.reduce((acc, curr) => {
      acc[curr.teamName] = curr.color;
      return acc;
    }, {} as Record<string, string>);
  }, [teams]);

  return (
    <div className="flex flex-wrap justify-center ">
      {people.map((p, i) => (
        <div className="m-5" key={i}>
          <TeamMemberCard person={p} teamColor={colorMap[p.teamName]} />
        </div>
      ))}
    </div>
  );
};

function useViewMore(pageSize = 9) {
  const [pageNumber, setPageNumber] = useState(1);
  const viewMore = useCallback(() => {
    setPageNumber((curr) => curr + 1);
  }, []);

  return { pageSize, viewMore, pageNumber };
}

function usePeople(
  selectedTeam: string | undefined,
  pageSize: number,
  pageNumber: number
) {
  const allPeople = mockPeople;
  const filteredByTeam = selectedTeam
    ? mockPeople.filter((p) => p.teamName == selectedTeam)
    : allPeople;

  const paged = filteredByTeam.slice(0, pageSize * pageNumber);

  return {
    loading: false,
    people: paged as Person[],
    totalPeople: filteredByTeam.length,
  };
}

const OurTeam: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamName | undefined>();
  const { pageNumber, pageSize, viewMore } = useViewMore();

  const { people, totalPeople } = usePeople(selectedTeam, pageSize, pageNumber);
  return (
    <>
      <Head>
        <title>Our Team | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="max-w-7xl m-auto p-16">
        <FirstSubSection header="Our Team">
          Our passionate vegan activist volunteer team listed below – thank you
          so much to each and every one of them. We’re constantly looking to
          expand our team of developers, designers, and content creators.{' '}
          <Link passHref href={'/join'}>
            <a className="text-magenta underline">Apply to join us!</a>
          </Link>
        </FirstSubSection>
        <TeamSelector
          selectedTeam={selectedTeam}
          selectCallback={setSelectedTeam}
          teams={mockTeams}
        />
        <MemberList people={people} teams={mockTeams} />
        {people.length < totalPeople && (
          <WhiteButton
            className="border-2 border-grey"
            onClick={() => viewMore()}
          >
            VIEW MORE
          </WhiteButton>
        )}
      </div>
    </>
  );
};

export default OurTeam;
