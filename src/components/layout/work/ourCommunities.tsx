import reddit from '../../../../public/images/work/communities/reddit.png';
import ara from '../../../../public/images/work/communities/ARA.png';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import { formatNumber } from 'lib/helpers/format';

const TOP_DECORATION_SQUARES = [
  { color: '#454545', size: 16, left: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: '#454545', size: 16, right: 0, bottom: 0 },
];

const OurCommunities: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-2xl text-white bg-[#292929] py-20">
        <SectionHeader header={['Our', 'COMMUNITIES']}>
          We manage/run these large communities of passionate vegans and
          activists, helping us empower a new age of volunteers and activism
        </SectionHeader>
        <div className="relative flex flex-col px-2 mx-auto md:w-1/2 gap-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 text-left gap-20 xl:gap-10 w-full">
            <div>
              <div>
                <CustomImage src={reddit} alt="Reddit" />
              </div>
              <div className="font-bold">Vegans of Reddit</div>
              <div>{formatNumber(1200000)}+ members</div>
            </div>
            <div>
              <div>
                <CustomImage src={ara} alt="Animal Rights Advocates" />
              </div>
              <div className="font-bold">Animal Rights Advocates</div>
              <div>{formatNumber(25000)}+ members</div>
            </div>
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

export default OurCommunities;
