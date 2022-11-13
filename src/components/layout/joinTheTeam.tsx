import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LightButton } from '../decoration/buttons';
import teamIcons from '../../../public/images/VH-team-icons.png';
import CustomImage from '../decoration/customImage';

const JoinTheTeam: React.FC = () => {
  return (
    <div className="bg-black px-5">
      <div className="content-center mx-auto md:w-1/2 text-2xl pb-12">
        <p className="mb-12 text-grey-dark pt-16">
          <span className="text-5xl font-mono text-white">
            <FormattedMessage id="section.join-the-team.headline" />
          </span>
        </p>
        <CustomImage src={teamIcons} alt="Compassion, Creativity, Code" />
        <p className="pb-5 mt-4 text-white">
          <FormattedMessage id="section.join-the-team.paragraph" />
        </p>
        <div className="flex justify-center flex-wrap">
          <LightButton
            href="/people/team"
            className="m-5 font-mono font-semibold"
          >
            <FormattedMessage id="section.join-the-team.cta.meet-the-team" />
          </LightButton>
          <LightButton href="/join" className="m-5 font-mono font-semibold">
            <FormattedMessage id="section.join-the-team.cta.join" />
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default JoinTheTeam;
