import ContactUsForm from '../components/forms/contactUs';
import Head from 'next/head';
import pixelHeart from '../../public/images/VH_PixelHeart.png';
import { FirstSubSection } from '../components/decoration/textBlocks';
import SquareField from '../components/decoration/squares';
import CustomImage from '../components/decoration/customImage';

const Contact: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Vegan Hacktivists</title>
      </Head>
      <SquareField
        squares={[
          { size: 16, top: 0, color: 'grey-light' },
          { size: 16, top: 16, left: 16, color: 'grey-light' },
          { size: 24, top: 0, right: 0, color: 'grey' },
        ]}
        className="hidden md:block"
      />
      <div className="bg-grey-background px-5">
        <div className="pt-10">
          <CustomImage
            src={pixelHeart}
            alt=""
            height={pixelHeart.height / 2}
            width={pixelHeart.width / 2}
          />
        </div>
        <FirstSubSection
          header="Get in contact"
          firstWordsNum={2}
          className="my-0"
        >
          If you&apos;d like to get in touch with us, please use our contact form below! 
          We do our best to respond to every email within 48 hours. Please make 
          sure to check your spam folder!
        </FirstSubSection>

        <ContactUsForm />
      </div>
    </>
  );
};

export default Contact;
