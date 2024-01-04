import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Sprite, { chicken } from '../../../decoration/sprite';
import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import teamCommunication from '../../../../../public/images/yearInReview/2022/team-peach.png';
import teamCore from '../../../../../public/images/yearInReview/2022/team-apple.png';
import teamPlayground from '../../../../../public/images/yearInReview/2022/team-banana.png';

import TeamBlock from './teamBlock';

const MoreEffectiveTeams: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <SquareField
        squares={[
          { size: 16, right: 0, bottom: 0, color: 'grey-background' },
          { size: 16, left: 0, bottom: 0, color: 'grey-light' },
          { size: 16, left: 0, top: 0, color: 'grey' },
        ]}
        className="hidden md:block z-10"
      />
      <SectionContainer
        header={
          <SectionHeader
            header={['Building more', 'effective teams']}
            newDesign={true}
          />
        }
        color="grey-dark"
        className="text-white relative"
      >
        <div className="md:w-2/3 xl:w-1/2 mx-auto mb-20">
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2022.section.building-effective-teams.comms.heading',
              defaultMessage: 'Communication Team',
            })}
            image={teamCommunication}
            color="orange"
          >
            <FormattedMessage
              id="page.year-in-review.2022.section.building-effective-teams.comms.paragraph"
              defaultMessage="We are excited to have a dedicated comms team led by Malina Tran, our Director of Communications. This versatile team manages our blog, software content, social media, marketing, fundraising and grant application— and has been vital to our success and growth in showcasing the work we do to the public."
            />
          </TeamBlock>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2022.section.building-effective-teams.core.heading',
              defaultMessage: 'Core Team',
            })}
            image={teamCore}
            color="red"
          >
            <FormattedMessage
              id="page.year-in-review.2022.section.building-effective-teams.core.paragraph"
              defaultMessage="We've also made several changes to our team structure! We now have a leadership team that includes key roles such as communications, product management, operations, engineering, design and lead architect supporting various teams and the organization as a whole. Branded with an apple (core), of course!"
            />
          </TeamBlock>
          <TeamBlock
            team={intl.formatMessage({
              id: 'page.year-in-review.2022.section.building-effective-teams.playground.heading',
              defaultMessage: 'Playground Teams',
            })}
            image={teamPlayground}
            color="yellow"
          >
            <FormattedMessage
              id="page.year-in-review.2022.section.building-effective-teams.playground.paragraph"
              defaultMessage="As our volunteer community has grown, we've moved our signature team branding to Playground! Each team will specialize in a specific role which will allow us to connect volunteers with requests much easier. We're looking forward to building the community further there!"
            />
          </TeamBlock>
        </div>
      </SectionContainer>
      <div className="relative">
        <Sprite image={chicken} pixelsLeft={1} pixelsRight={1} />
      </div>
      <SquareField
        squares={[
          { right: 0, bottom: 0, size: 16, color: 'grey' },
          { right: 0, top: 0, size: 16, color: 'grey-light' },
        ]}
        className="hidden md:block"
      />
    </>
  );
};

export default MoreEffectiveTeams;
