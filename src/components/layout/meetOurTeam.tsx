import Image from 'next/image';
import { LightButton } from '../decoration/buttons';
import teamIcons from '../../../public/images/VH-team-icons.png';

const MeetOurTeam: React.FC = () => {
  return (
    <div className="bg-black">
      <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pb-12">
        <p className="mb-12 text-grey-dark pt-16">
          <span className="text-5xl font-mono uppercase text-white">
            Meet our team
          </span>
        </p>
        <Image
          src={teamIcons}
          width={teamIcons.width}
          height={teamIcons.height}
          alt="Compassion, Creativity, Code"
          placeholder="empty"
        />
        <div className="flex justify-center flex-wrap">
          <LightButton href="/people/team" className="m-5 font-mono text-sm">
            Learn more
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
