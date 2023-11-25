import React from 'react';

import { LightButton } from '../decoration/buttons';
import teamIcons from '../../../public/images/VH-team-icons.png';

import CustomImage from 'components/decoration/customImage';

const JoinTheTeam: React.FC = () => {
  return (
    <div className="bg-black px-5">
      <div className="content-center mx-auto md:w-1/2 text-2xl pb-12">
        <p className="mb-12 text-grey-dark pt-16">
          <span className="text-5xl font-mono text-white">JOIN OUR TEAM</span>
        </p>
        <CustomImage src={teamIcons} alt="Compassion, Creativity, Code" />
        <p className="pb-5 mt-4 text-white">
          Are you a developer, designer, writer, or a creative professional
          interested in applying your digital skills for the animals? Learn more
          about our team members and view our openings below.
        </p>
        <div className="flex justify-center flex-wrap">
          <LightButton
            href="/people/team"
            className="m-5 font-mono font-semibold"
          >
            Meet the Team
          </LightButton>
          <LightButton href="/join" className="m-5 font-mono font-semibold">
            Apply to Join
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default JoinTheTeam;
