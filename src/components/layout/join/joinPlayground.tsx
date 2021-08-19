import { LightButton } from '../../decoration/buttons';

const JoinPlayground: React.FC = () => {
  return (
    <div className="bg-black text-white text-xl pt-16 pb-20">
      <div className="mx-auto md:w-1/2">
        <h1 className="mb-8 text-4xl font-bold font-mono">
          Attention Developers!
        </h1>
        <p className="mb-4">
          Join <strong>VH: Playground</strong>, our open source community, to
          begin contributing to animal rights projects today!
        </p>
        <p className="mb-8">
          <em>
            Note: Due to limited spots on our core teams, we only recruit
            developers that are active in VH: Playground.
          </em>
        </p>
        <LightButton className="font-mono">Join VH: Playground</LightButton>
      </div>
    </div>
  );
};

export default JoinPlayground;
