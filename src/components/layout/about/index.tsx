import { useRouter } from 'next/dist/client/router';
import { DarkButton } from 'components/decoration/buttons';
import Image from 'next/image';
import Hero from '../../decoration/hero';
import SquareField from '../../decoration/squares';
import heroBackground from '../../../../public/images/VH-pigs-hero.jpg';
import heroTagline from '../../../../public/images/VH-Mission-Hero-Text.png';

type SubSectionContent = {
  header?: string;
};

export const FirstSubSection: React.FC<SubSectionContent> = ({
  header = '',
  children,
}) => {
  const tokenizedHeader = header.split(' ');
  const firstWord = tokenizedHeader.shift();
  const remainingWords = tokenizedHeader.join(' ');

  return (
    <div className="mb-14">
      <h1>
        <span className="font-italic text-2xl mr-2">{firstWord}</span>
        <span className="font-bold font-mono text-4xl">{remainingWords}</span>
      </h1>
      <p className="max-w-2xl m-auto text-2xl font-mono ">{children}</p>
    </div>
  );
};

export const SubSection: React.FC<SubSectionContent> = ({
  header,
  children,
}) => {
  return (
    <div className="mb-10">
      <h1 className="text-2xl mb-3 font-bold">{header}</h1>
      <p className="max-w-2xl text-xl m-auto">{children}</p>
    </div>
  );
};

const NavButton: React.FC<{ href: string }> = ({ href, children }) => {
  const { pathname } = useRouter();

  return (
    <DarkButton
      primary={pathname === href}
      href={href}
      className="m-5 font-mono text-sm"
      linkProps={{ scroll: false }}
    >
      {children}
    </DarkButton>
  );
};

export const AboutButtons: React.FC = () => {
  return (
    <div className="mb-5 flex justify-center flex-wrap">
      <NavButton href="/about/our-mission">OUR MISSION</NavButton>
      <NavButton href="/about/our-story">OUR STORY</NavButton>
      <NavButton href="/about/our-values">OUR VALUES</NavButton>
    </div>
  );
};

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'magenta', size: 32, left: 16, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'yellow_orange', size: 16, right: 32, bottom: 16 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

export const AboutHero: React.FC = () => {
  return (
    <>
      <Hero
        imageBackground={heroBackground.src}
        alignment="left"
        classNameMapping={{
          container: 'bg-center',
        }}
      >
        <div>
          <Image
            src={heroTagline.src}
            width={heroTagline.width * 0.5}
            height={heroTagline.height * 0.5}
            alt="Data-Driven Activism"
          />
        </div>
      </Hero>
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};
