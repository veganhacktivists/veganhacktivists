import React, { useState, useEffect } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import logoBig from '../../../public/images/VH-logo-web-white.png';
import logoOneLine from '../../../public/images/VH-logo-white-text.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeftSide: React.FC = () => {
  const ratio = 0.5;
  const { pathname } = useRouter();
  const isRootPage = pathname === '/';

  return (
    <div className="bg-black p-5 pr-5 md:pr-10 md:pl-10 xl:w-max align-middle items-center flex-shrink">
      {/* root */}
      <Link href="/">
        <a className={classNames({ hidden: !isRootPage })}>
          <Image
            src={logoBig}
            alt="Vegan Hacktivists Logo"
            layout="intrinsic"
            width={logoBig.width * ratio}
            height={logoBig.height * ratio}
            priority
          />
        </a>
      </Link>
      {/* others */}
      <Link href="/">
        <a className={classNames({ hidden: isRootPage })}>
          <Image
            src={logoOneLine}
            alt="Vegan Hacktivists Logo"
            layout="intrinsic"
            width={logoOneLine.width * ratio}
            height={logoOneLine.height * ratio}
            priority
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
    'text-center',
    className
  );

  return (
    <Link href={href} passHref>
      <a className={classes}>
        <code className={classNames({ 'border-b-[3px]': active })}>
          {label}
        </code>
      </a>
    </Link>
  );
};

const NavbarItems: React.FC = () => {
  return (
    <>
      {['about', 'services', 'projects', 'people', 'blog'].map((menuElem) => (
        <NavBarItem
          key={menuElem}
          label={menuElem}
          href={`/${menuElem}`}
          className="hover:bg-gray-dark"
        />
      ))}
      <NavBarItem
        label="Join"
        href={'/join'}
        className="bg-gray hover:bg-gray-dark font-bold"
      />
      <NavBarItem
        label="Support"
        href={'/support'}
        className="bg-magenta-light hover:bg-red font-bold"
      />
    </>
  );
};

const RightSide: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <>
      <div className="block xl:hidden text-white text-right p-5 bg-black flex-1">
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
            'font-mono text-2xl m-auto text-white h-full ml-auto align-middle uppercase font-semibold z-20 lg:flex flex-grow items-stretch w-64 max-w-min',
            menuOpen ? 'flex flex-col' : 'hidden'
          )}
        >
          {menuOpen && (
            <div className="bg-black absolute flex flex-col left-10 right-10 z-30">
              <NavbarItems />
            </div>
          )}
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
    <nav className="flex z-20 w-full">
      <LeftSide />
      <RightSide />
    </nav>
  );
};

export default Header;
