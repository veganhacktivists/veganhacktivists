import { LightButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';

const JoinPlayground: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[{ size: 16, color: 'gray-light', right: 0, bottom: 0 }]}
      />
      <div className="bg-grey-darker text-white text-xl pt-16 pb-20">
        <div className="mx-auto md:w-1/2">
          <h2 className="mb-8 text-6xl font-bold font-mono">
            Attention Developers!
          </h2>
          <div className="text-4xl">
            <p className="mb-4">
              Join <strong>VH: Playground</strong>, our open source community,
              to begin contributing to animal rights projects today!
            </p>
            <p className="mb-8">
              <em>
                Note: Due to limited spots on our core teams, we only recruit
                developers that are active in VH: Playground.
              </em>
            </p>
          </div>

          <LightButton className="font-mono">Join VH: Playground</LightButton>
        </div>
      </div>
      <SquareField
        squares={[
          { size: 16, color: 'gray', left: 0, bottom: 0 },
          { size: 16, color: 'gray-light', left: 0, top: 0 },
        ]}
      />
    </>
  );
};

export default JoinPlayground;
