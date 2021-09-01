import Image from 'next/image';
import { LightButton } from '../../decoration/buttons';
import teamIcons from '../../../../public/images/VH-team-icons.png';

const JoinOurTeam: React.FC = () => {
  return (
    <div className="bg-black">
      <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pb-12">
        <p className="mb-12 text-grey-dark pt-16">
          <span className="text-5xl font-mono uppercase text-white">
            Join Our Team
          </span>
        </p>
        <Image
          src={teamIcons.src}
          width={teamIcons.width}
          height={teamIcons.height}
          alt="Compassion, Creativity, Code"
        />
        <div className="flex justify-center flex-wrap">
          <LightButton href="/join" className="font-semibold m-5 font-mono">
            Learn more
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default JoinOurTeam;
