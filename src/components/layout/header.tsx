import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.png";

const LeftSide: React.FC = () => {
  const ratio = 0.27;

  return (
    <div className="bg-black relative w-full md:w-min md:p-5 md:pl-44">
      <Link href="/" passHref>
        <a>
          <Image
            src={logo}
            alt="Vegan Hacktivists Logo"
            layout="fixed"
            // loading="lazy"
            width={logo.width * ratio}
            height={logo.height * ratio}
          />
        </a>
      </Link>
    </div>
  );
};

interface INavbarItem {
  label: string;
  href: string;
  className?: string;
}

const NavBarItem: React.FC<INavbarItem> = ({ label, href, className }) => {
  return (
    //h-full text-5xl align-middle inline-block
    <Link href={href} passHref>
      <a className={`p-5 py-6 ${className}`}>
        <code>{label}</code>
      </a>
    </Link>
  );
};

const RightSide: React.FC = () => {
  return (
    <div className="font-mono text-2xl pr-24 text-right bg-black text-white flex-1 h-full hidden md:flex ml-auto justify-end align-middle uppercase font-extrabold">
      {["about", "services", "projects", "people", "blog", "contact"].map(
        (menuElem) => (
          <NavBarItem key={menuElem} label={menuElem} href={`/${menuElem}`} />
        )
      )}
      {/* Colors TBD.Why is Tailwind's grey blue-ish??? */}
      <NavBarItem label="Join Us" href={`/joinUs`} className="bg-gray-800" />
      <NavBarItem
        label="Support Us"
        href={`/supportUs`}
        className="bg-pink-600"
      />
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <nav className="flex">
      <LeftSide />
      <RightSide />
    </nav>
  );
};

export default Header;
