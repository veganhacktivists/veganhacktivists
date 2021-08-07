/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import type {
  ITeamFields,
  ITeam,
  ITeamMember,
} from '../../types/generated/contentful';
import { PeopleHero, PeopleButtons } from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import { WhiteButton } from '../../components/decoration/buttons';
import { getContents } from '../../lib/cms';
import SquareField from '../../components/decoration/squares';
import JoinTheTeam from '../../components/layout/joinTheTeam';

export const getStaticProps: GetStaticProps = async () => {
  const teams = await getContents<ITeamFields>('team');
  const teamMembers = await getContents<ITeamFields>('teamMember', {
    type: 'team',
  });
  return {
    props: { teams, teamMembers },
    revalidate: 120,
  };
};

const TeamMemberCard: React.FC<{ member: ITeamMember; teamColor: string }> = ({
  member,
  teamColor,
}) => {
  const { name, team, position, image } = member.fields;
  const { name: teamName } = team!.fields;
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
        <div style={{ color: teamColor }} className="font-bold uppercase">
          {teamName}
        </div>
      </div>
    </div>
  );
};

const TeamSelector: React.FC<{
  teams: ITeam[];
  selectedTeam: string | null;
  selectCallback: (arg0: string | null) => void;
}> = ({ teams, selectedTeam, selectCallback }) => {
  const [hovered, setHovered] = useState<string | null>();

  const getBackgroundColor = (name: string, color: string) => {
    if (selectedTeam === name || hovered === name) {
      return color;
    }
    return undefined;
  };

  return (
    <div className="flex flex-wrap justify-center max-w-6xl m-auto mb-10">
      {teams
        .map((t) => t.fields)
        .map(({ name, color, icon, sprite }) => (
          <button
            style={{ backgroundColor: getBackgroundColor(name, color) }}
            className={'w-20 h-20 flex-grow-0 transition-colors'}
            onClick={() => selectCallback(name)}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() =>
              setHovered((curr) => (curr === name ? null : curr))
            }
            key={name}
          >
            {sprite ? (
              <Image
                src={`https:${sprite.fields.file.url}`}
                width={75}
                height={75}
                alt={name}
                priority
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
    <div className="md:mx-auto md:w-4/6">
      <div className="flex flex-wrap justify-center">
        {members.map((m) => (
          <div className="m-5" key={m.sys.id}>
            <TeamMemberCard
              member={m}
              teamColor={colorMap[m.fields.team!.fields.name]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const useViewMore = (pageSize = 12) => {
  const [pageNumber, setPageNumber] = useState(1);
  const viewMore = useCallback(() => {
    setPageNumber((curr) => curr + 1);
  }, []);

  return { pageSize, viewMore, pageNumber };
};

const useFilteredMembers = (
  allMembers: ITeamMember[],
  selectedTeam: string | null,
  pageSize: number,
  pageNumber: number
) => {
  return useMemo(() => {
    const filteredByTeam = selectedTeam
      ? allMembers.filter((p) => p.fields.team!.fields.name === selectedTeam)
      : allMembers;

    const paged = filteredByTeam.slice(0, pageSize * pageNumber);

    return {
      members: paged as ITeamMember[],
      totalMembers: filteredByTeam.length,
    };
  }, [allMembers, selectedTeam, pageSize, pageNumber]);
};

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

interface TeamProps {
  teams: ITeam[];
  teamMembers: ITeamMember[];
}

const Team: React.FC<TeamProps> = ({ teams, teamMembers }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

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
      <div className="m-10">
        <PeopleButtons />
        <FirstSubSection header="Our team">
          We&apos;re so grateful to have so many passionate vegan volunteers
          with us supporting the movement! Each team below is run independently
          from each other and are assigned to different projects or
          organizations. Please click one of the icons below!
        </FirstSubSection>

        <TeamSelector
          selectedTeam={selectedTeam}
          selectCallback={setSelectedTeam}
          teams={teams}
        />
        <MemberList members={members} teams={teams} />
        {members.length < totalMembers && (
          <WhiteButton
            className="border-2 border-grey uppercase"
            onClick={() => viewMore()}
          >
            View more
          </WhiteButton>
        )}
      </div>
      <SquareField squares={TEAM_SQUARES1} className="hidden md:block" />
      <div className="bg-grey-light pb-10 pt-24 px-10">
        <FirstSubSection header="Our community">
          We’re not just volunteers, but we’re a community. We know each other
          personally, we play games together, talk about our lives, meet up in
          person at events, and share daily. A strong community is not only key
          for a volunteer organization, it’s vital to keeping us happy, healthy,
          and active for the animals. Interested in joining? We’re constantly
          looking to expand our team!{' '}
          <Link passHref href={'/join'}>
            <a className="text-magenta underline">Apply to join us!</a>
          </Link>
        </FirstSubSection>
      </div>
      <SquareField squares={TEAM_SQUARES2} className="hidden md:block" />
      <JoinTheTeam />
    </>
  );
};

export default Team;
