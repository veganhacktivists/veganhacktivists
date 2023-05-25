import { DarkButton } from 'components/decoration/buttons';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [
  { color: '#3D3D3D', size: 16, left: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, bottom: 0 },
];

const DesignSamples: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-2xl bg-white">
        <div className="relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8">
          <SectionHeader
            className="mb-2"
            header={['Check out our', 'DESIGN SAMPLES']}
          />
          <p>
            Whether it’s branding, document design, web design, infographics, or
            other high-impact areas of design, we’re here to help vegan
            organizations look sharp, build trust, increase reputation, and
            unite people.
          </p>
          TBD
          <div className="relative mx-auto md:w-1/3">
            <DarkButton
              href="https://drive.google.com/file/d/1j64otbbL18s7WC9bYCbNODeNgq5ColEk/view"
              className="font-mono"
            >
              View our branding work
            </DarkButton>
          </div>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default DesignSamples;
