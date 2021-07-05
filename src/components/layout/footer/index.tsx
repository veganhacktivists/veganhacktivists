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
    <footer className="bg-grey-dark text-white fixed w-full bottom-0 left-0 flex flex-wrap justify-around px-0 md:p-10">
      <Links />
      <Social />
      <Logo />
    </footer>
  );
};

export default Footer;
