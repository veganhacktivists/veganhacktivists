import { DarkButton } from 'components/decoration/buttons';
import Sprite, { goat } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [
  { color: 'yellow', size: 16, left: 0, top: 0 },
  {
    color: 'red',
    size: 32,
    right: 0,
    top: 0,
    className: 'scale-y-50 -translate-y-8',
  },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'gray-background', size: 16, left: 0, bottom: 0 },
];

const OurWork: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-2xl bg-white">
        <div className="relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8">
          <SectionHeader className="mb-2" header={['Our', 'WORK']} />
          <p>
            We’ve worked with over <b>160+ organizations</b> in the animal
            protection movement, through our development, design and advisory
            services.
          </p>
          TBD
          <div className="relative mx-auto md:w-fit">
            <DarkButton href="/services" className="font-mono w-fit">
              Explore our services
            </DarkButton>
          </div>
        </div>
      </div>

      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default OurWork;
