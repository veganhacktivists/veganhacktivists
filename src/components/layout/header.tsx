import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/VH-logo-web-white.png";

const LeftSide: React.FC = () => {
  const ratio = 0.5;

  return (
    <div className="bg-black relative w-full md:w-min md:p-5 md:pr-10 md:pl-40">
      <Link href="/" passHref>
        <a>
          <Image
            src={logo}
            alt="Vegan Hacktivists Logo"
            layout="fixed"
            loading="eager"
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

const NavBarItem: React.FC<INavbarItem> = ({ label, href, className = "" }) => {
  const { pathname } = useRouter();

  const active = pathname.startsWith(href);

  const classes = classNames(
    "p-5",
    "py-6",
    "transition duration-500",
    "hover:bg-gray-dark",
    className,
    { underline: active }
  );

  return (
    <Link href={href} passHref>
      <a className={classes}>
        <code>{label}</code>
      </a>
    </Link>
  );
};

const RightSide: React.FC = () => {
  return (
    <div className="font-mono text-2xl pr-28 text-right bg-black text-white flex-1 h-full hidden md:flex ml-auto justify-end align-middle uppercase font-semibold">
      {["about", "services", "projects", "people", "blog"].map((menuElem) => (
        <NavBarItem key={menuElem} label={menuElem} href={`/${menuElem}`} />
      ))}
      {/* Colors TBD.Why is Tailwind's grey blue-ish??? */}
      <NavBarItem
        label="Join"
        href={`/join`}
        className="bg-gray hover:bg-gray-dark font-bold"
      />
      <NavBarItem
        label="Support"
        href={`/support`}
        className="bg-bubblegum hover:bg-strawberry font-bold"
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
