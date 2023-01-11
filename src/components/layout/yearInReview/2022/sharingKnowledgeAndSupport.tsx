import family from '../../../../../public/images/yearInReview/2022/vh-family.jpg';
import malina from '../../../../../public/images/yearInReview/2022/malina-tran-at-care.jpg';
import james from '../../../../../public/images/yearInReview/2022/james-morgan-at-ava-summit.jpg';
import CustomImage from '../../../decoration/customImage';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import SquareField from '../../../decoration/squares';

import type { StaticImageData } from 'next/image';

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
    <div className={`bg-${bgColor}`}>
      <CustomImage src={image} alt={caption} />
      <div className={'w-full p-5 text-left'}>
        <span className="font-bold">{caption}</span>
        <br />
        <span className="italic">{subcaption}</span>
      </div>
    </div>
  );
};

const SharingKnowledgeAndSupport: React.FC = () => {
  return (
    <>
      <SectionContainer
        color="grey-background"
        header={
          <SectionHeader
            className="text-grey-dark"
            header={['Sharing', 'knowledge & support']}
          >
            This year, we were invited to speak at CARE Conference in Warsaw,
            Poland and the first-ever AVA Summit in Washington, DC. We spoke
            about our work for the animal protection movement and how
            organizations and individuals could get involved with our services
            to get the support they need.
          </SectionHeader>
        }
      >
        <div className="flex flex-col justify-center mx-auto md:flex-row gap-x-24 gap-y-10 ">
          <div className="flex flex-col lg:grid grid-rows-2 grid-cols-3 gap-5 md:w-3/4 max-w-[1350px] ">
            <div className="row-span-1">
              <ImageWithCaption
                bgColor="yellow"
                image={malina}
                caption={'Malina Tran at CARE Conference'}
                subcaption={'Data & Tech in Animal Rights Activism'}
              />
            </div>
            <div className="row-span-2 col-span-2">
              <CustomImage
                src={family}
                alt="Vegan Hacktivist team at the Animal & Vegan Advocacy Summit"
                className="w-full"
              />
            </div>
            <div className="row-span-1 flex items-end xl:mb-[0.45rem]">
              <ImageWithCaption
                bgColor="yellow"
                image={james}
                caption={'James Morgan at AVA Summit'}
                subcaption={'Tech Innovation in Animal Protection'}
              />
            </div>
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className="hidden md:block"
        squares={[{ color: 'grey-background', left: 0, top: 0 }]}
      />
    </>
  );
};

export default SharingKnowledgeAndSupport;
