import { LightButton } from 'components/decoration/buttons';
import Sprite, { duck } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [{ color: 'white', size: 16, right: 0, top: 0 }];

const LikeWhatYouSee: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-xl text-white bg-[#3D3D3D]">
        <div className="relative flex flex-col items-center px-2 py-20 gap-y-8">
          <SectionHeader
            className="mb-2"
            header="LIKE WHAT YOU SEE?"
            startWithBoldFont
          />

          <div className="text-xl md:w-1/2 xl:w-1/2 mx-auto">
            Get in touch if you’d like to volunteer, support our work, or make
            use of our services!
          </div>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row md:justify-around basis-0 flex-grow max-w-screen-lg md:mx-auto gap-4 w-fit mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <LightButton className="w-full md:w-40" href="/donate">
                  Donate
                </LightButton>
                <LightButton className="w-full md:w-40" href="/support">
                  Get support
                </LightButton>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <LightButton className="w-full md:w-40" href="/services">
                  Services
                </LightButton>
                <LightButton className="w-full md:w-40" href="/contact">
                  Contact us
                </LightButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sprite image={duck} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default LikeWhatYouSee;
