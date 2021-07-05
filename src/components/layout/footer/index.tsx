import Image from "next/image";
import roundLogo from "../../../../public/images/VH_Logo_Crest_Tagline.png";
import Links from "./links";
import Social from "./social";

const Logo: React.FC = () => {
  return (
    <div>
      <Image
        src={roundLogo}
        layout="fixed"
        alt="VH Round Logo"
        width={roundLogo.width / 2}
        height={roundLogo.height / 2}
        loading="lazy"
      />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div>
      <footer className="bg-grey-dark text-white mt-auto w-full bottom-0 left-0 flex-col md:flex-row flex flex-wrap justify-around p-10 text-center items-center">
        <Links />
        <Social />
        <Logo />
      </footer>
    </div>
  );
};

export default Footer;
