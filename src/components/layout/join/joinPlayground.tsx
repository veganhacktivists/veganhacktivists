import { LightButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';

const JoinPlayground: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[{ size: 16, color: 'gray-light', right: 0, bottom: 0 }]}
        className="hidden md:block"
      />
      <div className="bg-grey-darker text-white text-xl pt-16 pb-20">
        <div className="mx-auto md:w-1/2">
          <h2 className="mb-8 text-6xl font-bold font-mono">
            Attention Developers!
          </h2>
          <div className="text-2xl">
            <p className="mb-4">
            We launched a open-source community available to the public called <b>VH: Playground</b>, 
            with over 400+ members and counting! Playground allows developers who don&apos;t have the 
            time or specific skills to join the core Vegan Hacktivists team to still contribute 
              to the movement, whether that be on our open source projects or your own!
            </p>
          </div>
          <div className="relative mx-10 md:mx-auto mt-10 md:w-1/3">
            <LightButton
              href="https://discord.gg/Yt3zADeJKx"
              className="font-mono font-semibold mt-10"
            >
              Join VH: Playground
            </LightButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={[
          { size: 16, color: 'gray', left: 0, bottom: 0 },
          { size: 16, color: 'gray-light', left: 0, top: 0 },
        ]}
        className="hidden md:block"
      />
    </>
  );
};

export default JoinPlayground;
