import Sprite, { pig } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, top: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'gray-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'gray-background', size: 16, right: 0, top: 0 },
];

const FeaturedProjects: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-2xl bg-grey-background">
        <div className="relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8">
          <SectionHeader className="mb-2" header={['Featured', 'PROJECTS']} />
          <p>
            Here are just a few of the projects we’ve built for the movement and
            in collaboration with other partners.
          </p>
          TBD
        </div>
      </div>

      <Sprite image={pig} pixelsLeft={1} pixelsRight={0} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default FeaturedProjects;
