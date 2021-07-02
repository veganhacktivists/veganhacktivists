import Image from "next/image";
import logo from "../../../public/images/logo.png";

const LeftSide: React.FC = () => {
  return (
    <div className="w-5/12 py-4 pl-24 pr-10 bg-black">
      <Image
        src={logo}
        alt="Vegan Hacktivists Logo"
        layout="responsive"
        // loading="lazy"
      />
      {/* </div> */}
    </div>
  );
};

const RightSide: React.FC = () => {
  return (
    <div className="pr-24 align-middle inline bg-black text-white flex-1 h-20">
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
