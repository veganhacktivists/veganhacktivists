import Circle from 'components/decoration/circle';
import Image from 'next/image';
import roundLogo from '../../../../public/images/VH_Logo_Crest_Tagline.png';
import Links from './links';
import Social from './social';

const Logo: React.FC = () => (
  <Image
    src={roundLogo}
    alt="VH Round Logo"
    width={roundLogo.width * 0.4}
    height={roundLogo.height * 0.4}
    loading="lazy"
    className="pt-10 md:pt-0"
  />
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-grey-dark text-white mt-auto w-full bottom-0 left-0 flex-col md:flex-row flex flex-wrap   justify-evenly py-10 text-center items-center z-10 relative overflow-hidden">
      <Links />
      <Social />
      <Logo />
      <div className="absolute -z-10 inset-0">
        <Circle />
        <Circle xAlign="right" yAlign="bottom" />
      </div>
    </footer>
  );
};

export default Footer;
