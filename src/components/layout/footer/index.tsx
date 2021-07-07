import Circle from 'components/decoration/circle';
import Image from 'next/image';
import roundLogo from '../../../../public/images/VH_Logo_Crest_Tagline.png';
import Links from './links';
import Social from './social';

const Logo: React.FC = () => {
  return (
    <div className="pt-10 md:pt-0">
      <Image
        src={roundLogo}
        layout="fixed"
        alt="VH Round Logo"
        width={roundLogo.width * 0.4}
        height={roundLogo.height * 0.4}
        loading="lazy"
      />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div>
      <footer className="bg-grey-dark text-white mt-auto w-full bottom-0 left-0 flex-col md:flex-row flex flex-wrap   justify-evenly py-10 text-center items-center z-10 relative overflow-y-hidden">
        <Links />
        <Social />
        <Logo />
        <div className="absolute -z-10">
          <Circle
            radius={600}
            color="grey"
            cx={300}
            cy={-380}
            thickness="20px"
          />
          <Circle
            radius={600}
            color="grey"
            cx={1600}
            cy={380}
            thickness="20px"
          />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
