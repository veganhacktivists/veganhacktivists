import ContactUsForm from '../components/forms/contactUs';
import Head from 'next/head';
import Image from 'next/image';
import pixelHeart from '../../public/images/VH_PixelHeart.png';
import { FirstSubSection } from '../components/decoration/textBlocks';
import SquareField from '../components/decoration/squares';

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
      <div className="bg-grey-background">
        <div className="pt-10 mb-[-15px]">
          <Image
            src={pixelHeart}
            alt=""
            height={pixelHeart.height / 2}
            width={pixelHeart.width / 2}
          />
        </div>
        <FirstSubSection header="Get in contact" firstWordsNum={2}>
          If you&apos;d like to talk about any of these services, please use our
          contact form to get in touch! We do our best to respond to every email
          within 48 hours.
        </FirstSubSection>

        <ContactUsForm />
      </div>
    </>
  );
};

export default Contact;
