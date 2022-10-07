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

const TeamMemberCard: React.FC<{ member: ITeamMember; teamColor: string }> = ({
  member,
  teamColor,
}) => {
  const { name, team, position, image, isTeamLeader, socialLinks } =
    member.fields;
  const { name: teamName } = team!.fields;

  return (
    <div className="w-64">
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
      <div className="font-bold">{name}</div>
      <div>
        <span className="mx-1">{position}</span>
        <div style={{ color: teamColor }} className="font-bold uppercase">
          {teamName}
        </div>
      </div>
      {socialLinks && (
        <div className="mt-2">
          <SocialLinks
            socialLinks={socialLinks.fields}
            className="justify-center"
          />
        </div>
      )}
    </div>
  );
};

const TeamSelector: React.FC<{
  teams: ITeam[];
  selectedTeam: string | null;
}> = ({ teams, selectedTeam }) => {
  const [hovered, setHovered] = useState<string | null>();

  const getBackgroundColor = (slug: string, color: string) => {
    if (selectedTeam === slug || hovered === slug) {
      return color;
    }
    return undefined;
  };

  return (
    <div className="flex flex-wrap justify-center max-w-6xl m-auto mb-10">
      {teams
        .map((t) => t.fields)
        .map(({ name, color, icon, sprite, slug }) => (
          <Link key={slug} href={{ hash: slug }}>
            <a
              style={{ backgroundColor: getBackgroundColor(slug, color) }}
              className={'w-20 h-20 flex-grow-0 transition-colors'}
              onPointerEnter={() => setHovered(slug)}
              onPointerLeave={() =>
                setHovered((curr) => (curr === slug ? null : curr))
              }
            >
              {sprite ? (
                <ContentfulImage
                  image={sprite}
                  alt={name}
                  width={75}
                  height={75}
                  priority
                />
              ) : (
                <div className="text-4xl">{icon}</div>
              )}
            </a>
          </Link>
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
      <FirstSubSection header="Our team">
        We&apos;re so grateful to have so many passionate vegan volunteers with
        us supporting the movement! Each team below is run independently from
        each other and are assigned to different projects or organizations.{' '}
        <b>Please click one of the icons below!</b>
      </FirstSubSection>
      <div className="m-10">
        <TeamSelector selectedTeam={team} teams={shuffledTeams} />
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
