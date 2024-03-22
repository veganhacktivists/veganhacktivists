'use client';

import { useCallback, useState } from 'react';
import { createIntl, createIntlCache } from 'react-intl';

import Modal from '../modal';

import CustomImage from 'components/decoration/customImage';
import { SectionHeader } from 'components/decoration/textBlocks';
import SquareField from 'components/decoration/squares';
import { DarkButton } from 'components/decoration/buttons';
import { Carousel } from 'components/decoration/carousel';

import type { StaticImageData } from 'next/image';

import adp from '~images/work/designSamples/designs/VH_Design_ADP.png';
import gyviGali from '~images/work/designSamples/designs/VH_Design_Document_GyviGali.jpg';
import pbd from '~images/work/designSamples/designs/VH_Design_PBD.png';
import greenbaum from '~images/work/designSamples/designs/VH_Design_Greenbaum.jpg';
import tc from '~images/work/designSamples/designs/VH_Design_TC.png';
import kerulos from '~images/work/designSamples/designs/VH_Design_Document_Kerulos.jpg';
import focus from '~images/work/designSamples/designs/VH_Design_FP.png';
import don from '~images/work/designSamples/designs/VH_Design_DonStaniford.png';
import mevs from '~images/work/designSamples/designs/VH_Design_MEVS.png';
import tnsg from '~images/work/designSamples/designs/VH_Design_NSG.png';
import phauna from '~images/work/designSamples/designs/VH_Design_Phauna.jpg';
import ivff from '~images/work/designSamples/designs/VH_Design_IVFF.png';
import reimagine from '~images/work/designSamples/designs/VH_Design_Document_ReimagineAg.jpg';
import sharpen from '~images/work/designSamples/designs/VH_Design_Sharpen.png';
import clariteam from '~images/work/designSamples/designs/VH_Design_Clariteam.png';
import sm from '~images/work/designSamples/designs/VH_Design_SM.jpg';
import law from '~images/work/designSamples/designs/VH_Design_AnimalLaw.png';
import twvns from '~images/work/designSamples/designs/VH_Design_Document_TWVNS.jpg';
import thumb1 from '~images/work/designSamples/thumbnails/VH_portfolio_1.png';
import thumb2 from '~images/work/designSamples/thumbnails/VH_portfolio_2.png';
import thumb3 from '~images/work/designSamples/thumbnails/VH_portfolio_3.png';
import thumb4 from '~images/work/designSamples/thumbnails/VH_portfolio_4.png';
import thumb5 from '~images/work/designSamples/thumbnails/VH_portfolio_5.png';
import thumb6 from '~images/work/designSamples/thumbnails/VH_portfolio_6.png';
import thumb7 from '~images/work/designSamples/thumbnails/VH_portfolio_7.png';
import thumb8 from '~images/work/designSamples/thumbnails/VH_portfolio_8.png';
import thumb9 from '~images/work/designSamples/thumbnails/VH_portfolio_9.png';
import thumb10 from '~images/work/designSamples/thumbnails/VH_portfolio_10.png';
import thumb11 from '~images/work/designSamples/thumbnails/VH_portfolio_11.png';
import thumb12 from '~images/work/designSamples/thumbnails/VH_portfolio_12.png';
import thumb13 from '~images/work/designSamples/thumbnails/VH_portfolio_13.png';
import thumb14 from '~images/work/designSamples/thumbnails/VH_portfolio_14.png';
import thumb15 from '~images/work/designSamples/thumbnails/VH_portfolio_15.png';
import thumb16 from '~images/work/designSamples/thumbnails/VH_portfolio_16.png';
import thumb17 from '~images/work/designSamples/thumbnails/VH_portfolio_17.png';
import thumb18 from '~images/work/designSamples/thumbnails/VH_portfolio_18.png';

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
  [twvns, thumb17],
  [law, thumb18],
];

const TOP_DECORATION_SQUARES = [
  { color: '#3D3D3D', size: 16, left: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, bottom: 0 },
];

const intlCache = createIntlCache();

const DesignSamples: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<StaticImageData>();
  const handleOpenImage = useCallback((image: (typeof images)[number][0]) => {
    setIsModalOpen(true);
    setCurrentImage(image);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setCurrentImage(undefined);
  }, []);

  const intl = createIntl(
    {
      locale: 'en',
    },
    intlCache,
  );

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='relative w-full overflow-hidden text-xl bg-white'>
        <div className='relative flex flex-col px-2 py-20 gap-y-8'>
          <div className='md:w-1/2 mx-auto'>
            <SectionHeader header={['See our', 'branding work']}>
              <p className='text-xl'>
                {intl.formatMessage({
                  id: 'page.our-work.section.design-samples.section-header.content',
                  defaultMessage:
                    "Whether it's branding, document design, web design, infographics, or other high-impact areas of design, we're here to help vegan organizations look sharp, build trust, increase reputation, and unite people. Here's a few examples of what we've done!",
                })}
              </p>
            </SectionHeader>
          </div>
          <Carousel
            itemWidth={300}
            layout='grid'
            theme='dark'
            items={images.map(([image, thumbnail]) => (
              <button
                key={thumbnail.src}
                type='button'
                onClick={() => {
                  handleOpenImage(image);
                }}
              >
                <CustomImage src={thumbnail} alt='' />
              </button>
            ))}
          />
          <Modal
            isOpen={isModalOpen && !!currentImage}
            onClose={handleModalClose}
            modalClassName='!w-5/6 md:!w-3/4 '
          >
            {/* TODO: image gallery */}
            {currentImage && (
              <div>
                <CustomImage placeholder='blur' src={currentImage} alt='' />
              </div>
            )}
          </Modal>
          <div className='relative mx-auto md:w-1/3'>
            <DarkButton
              href='https://drive.google.com/file/d/1j64otbbL18s7WC9bYCbNODeNgq5ColEk/view'
              className='md:w-fit mx-auto'
            >
              {intl.formatMessage({
                id: 'page.our-work.section.design-samples.cta-button.label',
                defaultMessage: 'View our branding work',
              })}
            </DarkButton>
          </div>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default DesignSamples;
