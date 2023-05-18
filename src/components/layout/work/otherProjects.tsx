import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [
  { color: 'gray-background', size: 16, right: 0, top: 0 },
];

const OtherProjects: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-2xl text-white bg-[#3D3D3D]">
        <div className="relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8">
          <SectionHeader
            className="mb-2"
            header={['Other', 'PROJECTS', 'worth mentioning']}
          />
          TBD
        </div>
      </div>
    </>
  );
};

export default OtherProjects;
