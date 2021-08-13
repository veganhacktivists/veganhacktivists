import { NavButton } from '../../decoration/buttons';
import Hero from '../../decoration/hero';
import SquareField from '../../decoration/squares';
import heroBackground from '../../../../public/images/VH-pigs-hero.jpg';
import heroTagline from '../../../../public/images/about/hero-tagline.png';

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
        tagline={{
          image: heroTagline,
          alt: 'Data-Driven Activism',
        }}
        alignment="left"
        classNameMapping={{
          container: 'bg-center',
        }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};
