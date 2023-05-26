import { useCallback, useState } from 'react';

import adp from '../../../../public/images/work/designSamples/designs/VH_Design_ADP.png';
import gyviGali from '../../../../public/images/work/designSamples/designs/VH_Design_Document_GyviGali.png';
import pbd from '../../../../public/images/work/designSamples/designs/VH_Design_PBD.png';
import greenbaum from '../../../../public/images/work/designSamples/designs/VH_Design_Greenbaum.png';
import tc from '../../../../public/images/work/designSamples/designs/VH_Design_TC.png';
import kerulos from '../../../../public/images/work/designSamples/designs/VH_Design_Document_Kerulos.png';
import focus from '../../../../public/images/work/designSamples/designs/VH_Design_FP.png';
import don from '../../../../public/images/work/designSamples/designs/VH_Design_DonStaniford.png';
import mevs from '../../../../public/images/work/designSamples/designs/VH_Design_MEVS.png';
import tnsg from '../../../../public/images/work/designSamples/designs/VH_Design_NSG.png';
import phauna from '../../../../public/images/work/designSamples/designs/VH_Design_Phauna.png';
import ivff from '../../../../public/images/work/designSamples/designs/VH_Design_IVFF.png';
import reimagine from '../../../../public/images/work/designSamples/designs/VH_Design_Document_ReimagineAg.png';
import sharpen from '../../../../public/images/work/designSamples/designs/VH_Design_Sharpen.png';
import clariteam from '../../../../public/images/work/designSamples/designs/VH_Design_Clariteam.png';
import sm from '../../../../public/images/work/designSamples/designs/VH_Design_SM.png';
import law from '../../../../public/images/work/designSamples/designs/VH_Design_ADP.png';
import twvns from '../../../../public/images/work/designSamples/designs/VH_Design_Document_TWVNS.png';
import thumb1 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_1.png';
import thumb2 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_2.png';
import thumb3 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_3.png';
import thumb4 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_4.png';
import thumb5 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_5.png';
import thumb6 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_6.png';
import thumb7 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_7.png';
import thumb8 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_8.png';
import thumb9 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_9.png';
import thumb10 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_10.png';
import thumb11 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_11.png';
import thumb12 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_12.png';
import thumb13 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_13.png';
import thumb14 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_14.png';
import thumb15 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_15.png';
import thumb16 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_16.png';
import thumb17 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_17.png';
import thumb18 from '../../../../public/images/work/designSamples/thumbnails/VH_portfolio_18.png';
import Modal from '../modal';

import { SectionHeader } from 'components/decoration/textBlocks';
import SquareField from 'components/decoration/squares';
import { DarkButton } from 'components/decoration/buttons';
import { Carousel } from 'components/decoration/carousel';
import CustomImage from 'components/decoration/customImage';

import type { StaticImageData } from 'next/image';

const images: [image: StaticImageData, thumbnail: StaticImageData][] = [
  [adp, thumb1],
  [gyviGali, thumb2],
  [pbd, thumb3],
  [greenbaum, thumb4],
  [tc, thumb5],
  [kerulos, thumb6],
  [focus, thumb7],
  [don, thumb8],
  [mevs, thumb9],
  [tnsg, thumb10],
  [phauna, thumb11],
  [ivff, thumb12],
  [reimagine, thumb13],
  [sharpen, thumb14],
  [clariteam, thumb15],
  [sm, thumb16],
  [law, thumb17],
  [twvns, thumb18],
];

const TOP_DECORATION_SQUARES = [
  { color: '#3D3D3D', size: 16, left: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, bottom: 0 },
];

const DesignSamples: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<StaticImageData>();
  const handleOpenImage = useCallback((image: typeof images[number][0]) => {
    setIsModalOpen(true);
    setCurrentImage(image);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setCurrentImage(undefined);
  }, []);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-2xl bg-white">
        <div className="relative flex flex-col px-2 py-20 gap-y-8">
          <SectionHeader
            className="mb-2"
            header={['Check out our', 'DESIGN SAMPLES']}
          >
            Whether it&apos;s branding, document design, web design,
            infographics, or other high-impact areas of design, we&apos;re here
            to help vegan organizations look sharp, build trust, increase
            reputation, and unite people.
          </SectionHeader>
          <Carousel
            layout="grid"
            theme="dark"
            items={images.map(([image, thumbnail]) => (
              <button
                key={thumbnail.src}
                type="button"
                onClick={() => {
                  handleOpenImage(image);
                }}
              >
                <CustomImage src={thumbnail} alt="" />
              </button>
            ))}
          />
          <Modal
            isOpen={isModalOpen && !!currentImage}
            onClose={handleModalClose}
          >
            {/* TODO: image gallery */}
            {currentImage && (
              <div>
                <CustomImage src={currentImage} alt="" />
              </div>
            )}
          </Modal>
          <div className="relative mx-auto md:w-1/3">
            <DarkButton
              href="https://drive.google.com/file/d/1j64otbbL18s7WC9bYCbNODeNgq5ColEk/view"
              className="md:w-fit mx-auto"
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
