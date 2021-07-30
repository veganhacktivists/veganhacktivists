import Image from 'next/image';
import { LightButton } from '../decoration/buttons';

import teamIcons from '../../../public/images/VH-team-icons.png';

const JoinTheTeam: React.FC = () => {
  return (
    <div className="bg-black">
      <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pb-12">
        <p className="mb-12 text-grey-dark pt-16">
          <span className="text-5xl font-mono text-white">JOIN OUR TEAM</span>
        </p>
        <Image
          src={teamIcons.src}
          width={teamIcons.width}
          height={teamIcons.height}
          alt="Compassion, Creativity, Code"
        />
        <p className="pb-5 mt-16 text-white">
          Are you a developer, designer, writer, or other creative professional
          wanting to use skills for the animals? We&apos;re always looking for
          more vegan activist volunteers to join our team! If you&apos;re
          interested and have the time to spare, click to see our positions.
        </p>
        <div className="flex justify-center flex-wrap">
          <LightButton href="/people/team" className="m-5 font-mono text-sm">
            Meet the Team
          </LightButton>
          <LightButton href="/join" className="m-5 font-mono text-sm">
            Apply to Join
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default JoinTheTeam;
