import React, { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/VH-logo-web-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeftSide: React.FC = () => {
  const ratio = 0.5;

  return (
    <div className="bg-black relative flex p-5 md:pr-10 md:pl-40 w-full xl:w-min align-middle items-center">
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

const NavBarItem: React.FC<INavbarItem> = ({ label, href, className = '' }) => {
  const { pathname } = useRouter();

  const active = pathname.startsWith(href);

  const classes = classNames(
    'p-5',
    'py-6',
    'transition duration-500',
    'hover:bg-gray-dark',
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

const NavbarItems: React.FC = () => {
  return (
    <>
      {['about', 'services', 'projects', 'people', 'blog'].map((menuElem) => (
        <NavBarItem key={menuElem} label={menuElem} href={`/${menuElem}`} />
      ))}
      <NavBarItem
        label="Join"
        href={'/join'}
        className="bg-gray hover:bg-gray-dark font-bold"
      />
      <NavBarItem
        label="Support"
        href={'/support'}
        className="bg-bubblegum hover:bg-strawberry font-bold"
      />
    </>
  );
};

const RightSide: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <div className="block xl:hidden text-white absolute text-right p-10 right-0 top-0">
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
          className="cursor-pointer"
        />
        <div
          className={classNames(
            'font-mono text-2xl px-16 m-auto w-full bg-black text-white h-full ml-auto align-middle uppercase font-semibold z-20 relative',
            'lg:flex',
            'bg-black',
            'flex-grow',
            'items-center',
            menuOpen ? ' flex flex-col' : ' hidden'
          )}
        >
          {menuOpen && <NavbarItems />}
        </div>
      </div>
      <div className="font-mono text-2xl pr-28 text-right bg-black text-white flex-1 h-full ml-auto justify-end align-middle uppercase font-semibold hidden xl:flex flex-nowrap">
        <NavbarItems />
      </div>
    </>
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
