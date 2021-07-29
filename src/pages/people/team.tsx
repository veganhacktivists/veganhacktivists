import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import type {
  ITeamFields,
  ITeam,
  ITeamMember,
} from '../../@types/generated/contentful';
import { PeopleButtons, PeopleHero } from 'components/layout/people';
import { FirstSubSection } from 'components/decoration/text-blocks';
import { LightButton, WhiteButton } from 'components/decoration/buttons';
import { getContents } from 'lib/cms';
import CarrotImage from '../../../public/images/fruit and veg/carrot_nobg.png';
import SquareField from 'components/decoration/squares';

export const getStaticProps: GetStaticProps = async () => {
  const teams = await getContents<ITeamFields>('team');
  const teamMembers = await getContents<ITeamFields>('teamMember');
  return {
    props: { teams, teamMembers },
  };
};

const TeamMemberCard: React.FC<{ member: ITeamMember; teamColor: string }> = ({
  member,
  teamColor,
}) => {
  const { name, team, position, image } = member.fields;
  const { name: teamName } = team.fields;
  return (
    <div className="w-64">
      <div className="bg-grey w-100 h-64 flex justify-end mb-2">
        {image && (
          <Image
            src={`https:${image.fields.file.url}`}
            width={image.fields.file.details.size}
            height={image.fields.file.details.size}
            alt={name}
          />
        )}
        <div
          style={{ backgroundColor: teamColor }}
          className={'absolute w-8 h-8'}
        />
      </div>
      <div className="font-bold">{name}</div>
      <div>
        <span className="mx-1">{position};</span>
        <div style={{ color: teamColor }} className={'font-bold'}>
          {teamName.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const TeamSelector: React.FC<{
  teams: ITeam[];
  selectedTeam: string | undefined;
  selectCallback: (arg0: string | undefined) => void;
}> = ({ teams, selectedTeam, selectCallback }) => {
  const [hovered, setHovered] = useState<string | undefined>();

  const getBackgroundColor = (name: string, color: string) => {
    if (selectedTeam === name || hovered === name) {
      return color;
    }
    return 'white';
  };

  return (
    <div className="flex flex-wrap justify-center max-w-6xl m-auto mb-10">
      <button
        className={`w-28 h-28 font-bold flex-grow-0 font-mono text-2xl hover:bg-grey hover:text-white transition-colors ${
          selectedTeam === undefined ? 'bg-grey text-white' : 'bg-white'
        }`}
        onClick={() => selectCallback(undefined)}
      >
        View all
      </button>
      {teams
        .map((t) => t.fields)
        .map(({ name, color, icon, sprite }) => (
          <button
            style={{ backgroundColor: getBackgroundColor(name, color) }}
            className={'w-28 h-28 flex-grow-0 transition-colors'}
            onClick={() => selectCallback(name)}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() =>
              setHovered((curr) => (curr === name ? undefined : curr))
            }
            key={name}
          >
            {sprite ? (
              <Image
                src={`https:${sprite.fields.file.url}`}
                width={sprite.fields.file.details.size}
                height={sprite.fields.file.details.size}
                alt={name}
              />
            ) : (
              <div className="text-4xl">{icon}</div>
            )}
          </button>
        ))}
    </div>
  );
};

const MemberList: React.FC<{ members: ITeamMember[]; teams: ITeam[] }> = ({
  members,
  teams,
}) => {
  const colorMap = useMemo(() => {
    if (!teams) return {};
    return teams.reduce((acc, curr) => {
      const { name: teamName, color } = curr.fields;

      acc[teamName] = color;
      return acc;
    }, {} as Record<string, string>);
  }, [teams]);

  return (
    <div className="flex flex-wrap justify-center ">
      {members.map((m) => (
        <div className="m-5" key={m.sys.id}>
          <TeamMemberCard
            member={m}
            teamColor={colorMap[m.fields.team.fields.name]}
          />
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

function useFilteredMembers(
  allMembers: ITeamMember[],
  selectedTeam: string | undefined,
  pageSize: number,
  pageNumber: number
) {
  return useMemo(() => {
    const filteredByTeam = selectedTeam
      ? allMembers.filter((p) => p.fields.team.fields.name === selectedTeam)
      : allMembers;

    const paged = filteredByTeam.slice(0, pageSize * pageNumber);

    return {
      members: paged as ITeamMember[],
      totalMembers: filteredByTeam.length,
    };
  }, [allMembers, selectedTeam, pageSize, pageNumber]);
}

const TEAM_SQUARES1 = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

const TEAM_SQUARES2 = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 0, top: 0 },
  { color: 'grey-darker', size: 16, right: 0, bottom: 0 },
  { color: 'grey', size: 16, right: 16, top: 0 },
];

const Team: React.FC<{ teams: ITeam[]; teamMembers: ITeamMember[] }> = ({
  teams,
  teamMembers,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>();

  const { pageNumber, pageSize, viewMore } = useViewMore();
  const { members, totalMembers } = useFilteredMembers(
    teamMembers,
    selectedTeam,
    pageSize,
    pageNumber
  );

  return (
    <>
      <Head>
        <title>Our Team | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="max-w-7xl m-auto p-16">
        <PeopleButtons />
        <FirstSubSection header="Our Team">
          Our passionate vegan activist volunteer team listed below – thank you
          so much to each and every one of them. We’re constantly looking to
          expand our team of developers, designers, and content creators.
          <Link passHref href={'/join'}>
            <a className="text-magenta underline">Apply to join us!</a>
          </Link>
        </FirstSubSection>
        <TeamSelector
          selectedTeam={selectedTeam}
          selectCallback={setSelectedTeam}
          teams={teams}
        />
        <MemberList members={members} teams={teams} />
        {members.length < totalMembers && (
          <WhiteButton
            className="border-2 border-grey"
            onClick={() => viewMore()}
          >
            VIEW MORE
          </WhiteButton>
        )}
      </div>
      <SquareField squares={TEAM_SQUARES1} className="hidden md:block" />
      <div className="bg-grey-light pb-10 pt-24 px-10">
        <FirstSubSection header="Our Community">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis,
          risus in consectetur pretium, sem mauris pellentesque ex, vel sodales
          justo odio sit amet purus. Cras iaculis bibendum lorem a elementum.
          Integer vel tellus neque. Nam sed nisi at diam mattis bibendum ut ac
          erat. Etiam ac ultrices tortor
        </FirstSubSection>
      </div>
      <SquareField squares={TEAM_SQUARES2} className="hidden md:block" />
      <div className="bg-grey-darker m-auto py-24">
        <Image
          src={CarrotImage}
          width={CarrotImage.width / 2}
          height={CarrotImage.height / 2}
          alt="Carrot"
        />
        <div className="text-grey-background text-4xl font-mono font-bold">
          JOIN OUR TEAM
        </div>
        <div className="max-w-xs m-auto">
          <LightButton className=" m-5 font-mono text-sm" href="/join">
            Learn More
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default Team;
