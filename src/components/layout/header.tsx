import Image from "next/image";
import logo from "../../../public/images/logo.png";

const LeftSide: React.FC = () => {
  const ratio = 0.27;

  return (
    <div className="bg-black relative p-5 pl-44">
      <Image
        src={logo}
        alt="Vegan Hacktivists Logo"
        layout="fixed"
        // loading="lazy"
        width={logo.width * ratio}
        height={logo.height * ratio}
      />
      {/* </div> */}
    </div>
  );
};

const RightSide: React.FC = () => {
  return (
    <div className="pr-24 align-middle bg-black text-white flex-1 h-20 hidden md:block">
      right
    </div>
  );
};

const Header: React.FC = () => {
  //   return (
  //     <nav className="flex justify-between bg-black text-white h-12 align-middle">
  //       <LeftSide />
  //       <RightSide />
  //     </nav>
  //   );
  return (
    <nav className="flex">
      <LeftSide />
      <RightSide />
    </nav>
  );
};

export default Header;
