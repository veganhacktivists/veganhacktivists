import classNames from 'classnames';

import family from '../../../../public/images/yearInReview/2022/vh-family.jpg';
import malina from '../../../../public/images/yearInReview/2022/malina-tran-at-care.jpg';
import james from '../../../../public/images/yearInReview/2022/james-morgan-at-ava-summit.jpg';
import CustomImage from '../../decoration/customImage';
import { SectionHeader } from '../../decoration/textBlocks';
import SquareField from '../../decoration/squares';

import Circle from 'components/decoration/circle';
import getThemeColor from 'lib/helpers/theme';

import type { StaticImageData } from 'next/image';

interface SectionContainerProps extends React.PropsWithChildren {
  header?: React.ReactNode;
  className?: string;
  color?: string;
  circles?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  header,
  className,
  circles = false,
  color,
}) => {
  const classes = classNames(className, 'pt-20 pb-10 px-5', {
    relative: circles,
  });
  const backgroundColor = color ? getThemeColor(color) : 'inherit';

  return (
    <div className={classes} style={{ backgroundColor }}>
      {circles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Circle xAlign="right" radius={30} opacity={0.1} />
          <Circle yAlign="bottom" radius={34} opacity={0.2} />
        </div>
      )}
      <div className="pb-10">{header}</div>
      <div>{children}</div>
    </div>
  );
};

interface ImageWithCaptionTypes {
  caption: string;
  subcaption?: string;
  image: StaticImageData;
  bgColor: string;
}

const ImageWithCaption: React.FC<ImageWithCaptionTypes> = ({
  caption,
  subcaption,
  image,
  bgColor,
}) => {
  return (
    <div className={'flex flex-col'}>
      <CustomImage src={image} alt={caption} />
      <div
        className={'text-left flex-x-grow flex-x-shrink flex flex-col h-auto'}
      >
        <div className={`bg-${bgColor} items-center`}>
          <div className="p-5 md:p-3 lg:p-5">
            <span className="font-bold text-xl leading-5 md:text-lg md:leading-4 lg:text-xl lg:leading-5 block pb-2">
              {caption}
            </span>
            <span className="italic text-lg leading-5 md:text-base md:leading-4 lg:text-lg lg:leading-5 block">
              {subcaption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TOP_DECORATION_SQUARES = [
  { color: '#292929', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  {
    left: 0,
    bottom: 0,
    color: '#DDDDDD',
    size: 16,
  },
];

const SharingKnowledgeAndSupport: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <SectionContainer
        header={
          <SectionHeader
            header={['Sharing', 'knowledge & support']}
            newDesign={true}
          />
        }
      >
        <div className="text-xl md:w-2/3 xl:w-1/2 mx-auto">
          This year, we were invited to speak at <b>CARE Conference</b> in
          Warsaw, Poland and the first-ever <b>AVA Summit</b> in Washington, DC.
          We spoke about our work for the animal protection movement and how
          organizations and individuals could get involved with our services to
          get the support they need.
        </div>
        <div className="xl:w-2/3 mx-auto mt-20">
          <div className="flex flex-col md:flex-row gap-5 pb-20">
            <div className="flex flex-col flex-1 min-w-[29%] lg:min-w-[25%] xl:min-w-[27%] 2xl:min-w-[32%] 3xl:min-w-[34%] gap-5 md:gap-1 lg:gap-5 justify-between">
              <div className="flex ">
                <ImageWithCaption
                  bgColor="yellow"
                  image={malina}
                  caption={'Malina Tran at CARE Conference'}
                  subcaption={'Data & Tech in Animal Rights Activism'}
                />
              </div>
              <div className="flex ">
                <ImageWithCaption
                  bgColor="green"
                  image={james}
                  caption={'James Morgan at AVA Summit'}
                  subcaption={'Tech Innovation in Animal Protection'}
                />
              </div>
            </div>
            <div className="flex  items-center">
              <div className="flex">
                <CustomImage
                  src={family}
                  alt="Vegan Hacktivist team at the Animal & Vegan Advocacy Summit"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default SharingKnowledgeAndSupport;
