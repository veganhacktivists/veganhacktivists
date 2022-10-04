import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import PeopleLayout from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import { WhiteButton } from '../../components/decoration/buttons';
import { getContents } from '../../lib/cms';
import SquareField from '../../components/decoration/squares';
import { getActiveTeams } from '../../lib/cms/helpers';
import ContentfulImage from '../../components/layout/contentfulImage';
import { useHash } from '../../hooks/useHash';
import shuffle from '../../lib/helpers/shuffle';
import useViewMore from '../../hooks/useViewMore';
import CustomImage from '../../components/decoration/customImage';
import RichText from '../../components/decoration/richText';
import SocialLinks from '../../components/layout/team/socialLinks';
import { pixelHeart } from '../../images/separators';

import type PageWithLayout from '../../types/persistentLayout';
import type { ITeamFields } from '../../types/generated/contentful';
import type { ITeamMember } from '../../types/generated/contentful';
import type { ITeam } from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const teams = await getActiveTeams();
  const teamMembers = await getContents<ITeamFields>({
    contentType: 'teamMember',
    query: {
      type: 'team',
      filters: {
        exists: {
          team: true,
          isCoreMember: true,
        },
        ne: {
          isInactive: true,
        },
      },
    },
    other: { order: 'fields.isTeamLeader' },
  });

  return {
    props: { teams, teamMembers },
    revalidate: 480,
  };
};

const TeamMemberCardPhoto: React.FC<{
  member: ITeamMember;
  teamColor: string;
}> = ({ member, teamColor }) => {
  const { name, image, isTeamLeader } = member.fields;

  return (
    <div className="flex-none mx-4 w-64 h-64">
      <div className="flex justify-end h-64 mb-2 bg-grey w-100 group">
        {image && (
          <div className="relative w-full filter grayscale group-hover:grayscale-0">
            <ContentfulImage
              downloadWidth={500}
              image={image}
              alt={name}
              priority={isTeamLeader}
            />
            <div
              className={
                'left-0 top-0 w-full h-full absolute opacity-0 group-hover:opacity-10'
              }
              style={{
                backgroundColor: teamColor,
              }}
            />
          </div>
        )}
        <div
          style={{ backgroundColor: teamColor }}
          className={'absolute w-8 h-8'}
        />
      </div>
    </div>
  );
};

const TeamMemberCardBody: React.FC<{
  member: ITeamMember;
  teamColor: string;
}> = ({ member, teamColor }) => {
  const { name, team, position, bio, socialLinks } = member.fields;
  const { name: teamName } = team!.fields;

  return (
    <div className="grow shrink lg:text-left mx-4 justify-center lg:justify-start">
      <div className="text-xl font-bold text-grey">{name}</div>
      <div>
        <span className="font-bold uppercase text-grey-light">{position}</span>
        <span className="mx-1 text-grey-light">&bull;</span>
        <span style={{ color: teamColor }} className="font-bold uppercase">
          {teamName}
        </span>
        <div className="mt-2 text-sm">
          <RichText document={bio} />
        </div>
      </div>
      {socialLinks && (
        <div>
          <SocialLinks socialLinks={socialLinks.fields} className="mt-2" />
        </div>
      )}
    </div>
  );
};

const TeamMemberCard: React.FC<{
  member: ITeamMember;
  teamColor: string;
  showPhotoFirst: boolean;
  showDividerBelow: boolean;
}> = ({ member, teamColor, showPhotoFirst, showDividerBelow }) => {
  if (showPhotoFirst) {
    return (
      <div
        className={`flex flex-wrap lg:flex-nowrap justify-center lg:justify-start pb-8 mb-0 border-grey-light ${
          showDividerBelow ? 'border-b-2' : ''
        }`}
      >
        <TeamMemberCardPhoto member={member} teamColor={teamColor} />
        <TeamMemberCardBody member={member} teamColor={teamColor} />
      </div>
    );
  } else {
    return (
      <div
        className={`flex flex-wrap-reverse lg:flex-nowrap justify-center lg:justify-start pb-8 mb-0 border-grey-light ${
          showDividerBelow ? 'border-b-2' : ''
        }`}
      >
        <TeamMemberCardBody member={member} teamColor={teamColor} />
        <TeamMemberCardPhoto member={member} teamColor={teamColor} />
      </div>
    );
  }
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
      {members.map((m, index) => (
        <div className="m-5" key={m.sys.id}>
          <TeamMemberCard
            member={m}
            teamColor={colorMap[m.fields.team!.fields.name]}
            showPhotoFirst={!(index % 2)}
            showDividerBelow={index + 1 < members.length}
          />
        </div>
      ))}
    </div>
  );
};

const useFilteredMembers = (
  allMembers: ITeamMember[],
  selectedTeam: string | null,
  pageSize: number,
  pageNumber: number
) => {
  return useMemo(() => {
    const filteredByTeam = selectedTeam
      ? allMembers.filter((p) => {
          return p.fields.team?.fields.slug === selectedTeam;
        })
      : allMembers;

    const paged = filteredByTeam.slice(0, pageSize * pageNumber);

    return {
      members: paged,
      totalMembers: filteredByTeam.length,
    };
  }, [allMembers, selectedTeam, pageSize, pageNumber]);
};

const TEAM_SQUARES = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

interface TeamProps {
  teams: ITeam[];
  teamMembers: ITeamMember[];
}

const Team: PageWithLayout<TeamProps> = ({ teams, teamMembers }) => {
  const [team] = useHash();

  const [shuffledTeams, setShuffledTeams] = useState<ITeam[]>([]);
  const [shuffledTeamMembers, setShuffledTeamMembers] = useState<ITeamMember[]>(
    []
  );

  const { pageNumber, pageSize, viewMore } = useViewMore();
  const { members, totalMembers } = useFilteredMembers(
    shuffledTeamMembers,
    team,
    pageSize,
    pageNumber
  );

  useEffect(() => {
    setShuffledTeams(shuffle(teams));
  }, [teams]);

  useEffect(() => {
    setShuffledTeamMembers([
      ...shuffle<ITeamMember>(
        teamMembers.filter((member) => member.fields.isTeamLeader)
      ),
      ...shuffle<ITeamMember>(
        teamMembers.filter((member) => !member.fields.isTeamLeader)
      ),
    ]);
  }, [teamMembers]);

  return (
    <>
      <NextSeo title="Our Team" />
      <div className="m-10">
        <MemberList members={members} teams={teams} />
        {members.length < totalMembers && (
          <div className="mt-10 flex justify-center">
            <WhiteButton
              className="content-center font-mono text-2xl"
              onClick={() => viewMore()}
            >
              Load more
            </WhiteButton>
          </div>
        )}
      </div>
      <SquareField squares={TEAM_SQUARES} className="hidden md:block" />
      <div className="px-10 pt-16 pb-10 bg-gray-background">
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Our community"
        />
        <FirstSubSection header="Our community">
          We’re not just volunteers, but we’re a community. We know each other
          personally, we play games together, talk about our lives, meet up in
          person at events, and share daily. A strong community is not only key
          for a volunteer organization, it’s vital to keeping us happy, healthy,
          and active for the animals. Interested in joining? Scroll down!
        </FirstSubSection>
      </div>
    </>
  );
};

Team.Layout = PeopleLayout;

export default Team;
