import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import PeopleLayout from '../../components/layout/people';
import { getContents } from '../../lib/cms';
import { getActiveTeams } from '../../lib/cms/helpers';
import ContentfulImage from '../../components/layout/contentfulImage';
import RichText from '../../components/decoration/richText';
import SocialLinks from '../../components/layout/team/socialLinks';

import type PageWithLayout from '../../types/persistentLayout';
import type { ITeamFields } from '../../types/generated/contentful';
import type { ITeamMember } from '../../types/generated/contentful';
import type { ITeam } from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const teams = await getActiveTeams();
  const members = await getContents<ITeamFields>({
    contentType: 'teamMember',
    query: {
      isCoreMember: true,
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
    other: { order: 'fields.prio' },
  });

  return {
    props: { teams, members },
    revalidate: 480,
  };
};

const TeamMemberCardPhoto: React.FC<{
  member: ITeamMember;
  teamColor: string;
}> = ({ member, teamColor }) => {
  const { name, image, isTeamLeader } = member.fields;

  return (
    <div className='flex-none w-64 h-64'>
      <div className='flex justify-end h-64 mb-2 bg-grey w-100 group'>
        {image && (
          <div className='relative w-full filter'>
            <ContentfulImage
              downloadwidth={500}
              image={image}
              alt={name}
              priority={isTeamLeader}
            />
            <div
              className={'left-0 top-0 w-full h-full absolute opacity-0'}
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
}> = ({ member }) => {
  const { name, team, position, bio, socialLinks } = member.fields;
  const { name: teamName, sprite: teamSprite } = team!.fields;

  return (
    <div className='grow shrink lg:text-left justify-center lg:justify-start'>
      <div className='text-2xl mb-[-6px] font-bold text-grey'>{name}</div>
      <div>
        <div
          className={
            'flex flex-row justify-center lg:justify-start items-center'
          }
        >
          <span className='flex flex-col lg:flex-row items-center'>
            <span className='font-bold float-left text-lg uppercase text-grey text-opacity-80'>
              {position}
            </span>
            <span className='mx-1 ml-3 hidden lg:block float-left text-lg text-grey-light relative'>
              &bull;
            </span>
            <div className={'ml-[-2px] float-left'}>
              {teamSprite && (
                <ContentfulImage
                  image={teamSprite}
                  alt={teamName}
                  width={'40'}
                  height={'40'}
                  priority
                />
              )}
            </div>
          </span>
        </div>
        <div className='mt-2 text-justify lg:text-left'>
          {bio && <RichText document={bio} />}
        </div>
      </div>
      {socialLinks && (
        <div className={'mt-6'}>
          <SocialLinks socialLinks={socialLinks.fields} className='mt-2' />
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
        className={`flex flex-col lg:flex-row flex-wrap items-center lg:items-start gap-4 lg:gap-8 lg:flex-nowrap justify-center lg:justify-start pb-12 pt-8 lg:pt-0 lg:pb-8 mb-0 border-grey-light border-opacity-40 ${
          showDividerBelow ? 'border-b-2' : ''
        }`}
      >
        <TeamMemberCardPhoto member={member} teamColor={teamColor} />
        <TeamMemberCardBody member={member} />
      </div>
    );
  } else {
    return (
      <div
        className={`flex flex-col-reverse lg:flex-row items-center lg:items-start flex-wrap-reverse gap-4 lg:gap-8 lg:flex-nowrap justify-center lg:justify-start pb-12 pt-8 lg:pt-0 lg:pb-8  mb-0 border-grey-light border-opacity-40 ${
          showDividerBelow ? 'border-b-2' : ''
        }`}
      >
        <TeamMemberCardBody member={member} />
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
    return teams.reduce(
      (acc, curr) => {
        const { name: teamName, color } = curr.fields;

        acc[teamName] = color;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [teams]);

  return (
    <div className='md:mx-auto md:w-4/6'>
      {members.map((m, index) => (
        <div className='m-5' key={m.sys.id}>
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

interface TeamProps {
  teams: ITeam[];
  members: ITeamMember[];
}

const Team: PageWithLayout<TeamProps> = ({ teams, members }) => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.people.section.team.next-seo.title',
          defaultMessage: 'Our Team',
        })}
      />
      <div className='m-10'>
        <MemberList members={members} teams={teams} />
      </div>
    </>
  );
};

Team.Layout = PeopleLayout;

export default Team;
