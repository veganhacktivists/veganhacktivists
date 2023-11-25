import { NextSeo } from 'next-seo';

import SquareField from '../components/decoration/squares';
import Newsletter from '../components/layout/newsletter';
import { pixelHeart } from '../images/separators';

import CustomImage from 'components/decoration/customImage';

const Contact: React.FC = () => {
  return (
    <>
      <NextSeo title="Our Newsletter" />
      <SquareField
        squares={[
          { size: 16, top: 0, color: 'grey-light' },
          { size: 16, top: 16, left: 16, color: 'grey-light' },
          { size: 24, top: 0, right: 0, color: 'grey' },
        ]}
        className="hidden md:block"
      />
      <div className="bg-grey-background py-10 md:min-h-[75vh]">
        <div className="translate-y-10">
          <CustomImage
            src={pixelHeart}
            alt=""
            height={pixelHeart.height / 2}
            width={pixelHeart.width / 2}
          />
        </div>

        <Newsletter />
      </div>
    </>
  );
};

export default Contact;
