import Sprite, { cow } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

const BOTTOM_DECORATION_SQUARES = [
  {
    bottom: 0,
    left: 0,
    color: '#BCBCBC',
    size: 16,
  },
  {
    bottom: 0,
    right: 0,
    color: '#DDDDDD',
    size: 16,
  },
];

const KindWords: React.FC = () => {
  return (
    <>
      <div className="relative w-full overflow-hidden text-2xl bg-white">
        <div className="relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8">
          <SectionHeader className="mb-2" header={['Some', 'KIND WORDS']} />
          <p>
            TBD What impresses me most about the Vegan Hacktivists is their high
            level of critical thinking in terms of ideation and their consistent
            follow through. This has resulted in several high level deliverables
            I have been able to use and highly recommended to others. Courtney
            Dillard Mercy for Animals
          </p>
        </div>
      </div>

      <Sprite image={cow} pixelsLeft={0} pixelsRight={0} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default KindWords;
