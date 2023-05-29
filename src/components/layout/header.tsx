import React, { useEffect, useRef } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Player } from '@lottiefiles/react-lottie-player';

import CustomImage from '../decoration/customImage';
import logoOneLine from '../../../public/images/VH-logo-white-text.png';
import logoBig from '../../../public/images/VH_Logo_Loop.json';

const LeftSide: React.FC = () => {
  const ratio = 0.5;
  const { pathname } = useRouter();
  const isRootPage = pathname === '/';

  return (
    <div
      className={classNames(
        'flex items-center flex-shrink p-5 pr-5 align-middle bg-black md:pr-10 md:pl-10 xl:w-max'
      )}
    >
      {/* root */}
      <Link href="/">
        <a className={classNames({ hidden: !isRootPage })}>
          <Player
            autoplay
            loop
            src={logoBig}
            style={{
              maxWidth: '344px',
              maxHeight: '113.5px',
            }}
          />
        </a>
      </Link>
      {/* others */}
      <Link href="/">
        <a className={classNames('flex items-center', { hidden: isRootPage })}>
          <CustomImage
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

interface NavbarItemProps extends React.PropsWithChildren {
  href: string;
  className?: string;
}

const NavBarItem: React.FC<NavbarItemProps> = ({
  children,
  href,
  className = '',
}) => {
  const { pathname } = useRouter();

  const active = pathname.startsWith(href);

  const classes = classNames(
    'p-5 py-6 transition duration-500 text-center whitespace-nowrap',
    className
  );

  return (
    <Link href={href} passHref>
      <a className={classes}>
        <code className={classNames({ 'border-b-[3px]': active })}>
          {children}
        </code>
      </a>
    </Link>
  );
};

const NavbarItems: React.FC = () => {
  return (
    <>
      {['about', 'services', 'work', 'people', 'blog'].map((menuElem) => (
        <NavBarItem
          key={menuElem}
          href={`/${menuElem}`}
          className="hover:bg-gray-dark"
        >
          {menuElem}
        </NavBarItem>
      ))}
      <NavBarItem
        href={'/join'}
        className="font-bold bg-gray hover:bg-gray-dark"
      >
        Join
      </NavBarItem>
      <NavBarItem
        href={'/support'}
        className="font-bold bg-pink hover:bg-pink-dark"
      >
        Donate
      </NavBarItem>
      <NavBarItem
        href={'/playground'}
        className="font-bold bg-green hover:bg-green-dark"
      >
        Get Help
      </NavBarItem>
      <a
        className="p-5 py-6 text-center transition duration-500 hover:bg-gray-dark"
        href="https://www.instagram.com/veganhacktivists/"
        target="_blank"
        rel="noreferrer"
        aria-label="Follow us on Instagram"
      >
        <FontAwesomeIcon icon={faInstagram} fixedWidth />
      </a>
    </>
  );
};

const RightSide: React.FC = () => {
  const router = useRouter();

  const menuInputCheckRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      if (!menuInputCheckRef.current) return;
      menuInputCheckRef.current.checked = false;
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const buttonMenuId = 'menu-button';

  return (
    <>
      <div className="flex-1 block p-5 text-right text-white bg-black cursor-pointer xl:hidden">
        <input
          type="checkbox"
          hidden
          ref={menuInputCheckRef}
          id={buttonMenuId}
          className="peer"
        />
        <label
          htmlFor={buttonMenuId}
          className="cursor-pointer"
          aria-haspopup
          aria-controls="mobile-menu"
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </label>
        <div
          id="mobile-menu"
          className="z-20 flex-col items-stretch flex-grow hidden w-64 h-full m-auto ml-auto font-mono text-2xl font-semibold text-white uppercase align-middle max-w-min peer-checked:flex"
        >
          <div className="absolute z-30 flex flex-col bg-black left-10 right-10">
            <NavbarItems />
          </div>
        </div>
      </div>
      <div className="justify-end flex-1 hidden h-full ml-auto font-mono text-2xl font-semibold text-right text-white uppercase align-middle bg-black pr-28 xl:flex flex-nowrap">
        <NavbarItems />
      </div>
    </>
  );
};

const Header: React.FC = () => {
  return (
    <nav className="z-20 flex w-full">
      <LeftSide />
      <RightSide />
    </nav>
  );
};

export default Header;
