import { NavButton } from 'components/decoration/buttons';
import Image from 'next/image';
import Hero from '../decoration/hero';
import SquareField from '../decoration/squares';
import heroBackground from '../../../public/images/people/VH-cow-hero-nocircles.jpg';
import heroTagline from '../../../public/images/people/VH-team-hero-text.png';

export enum TeamName {
  Brocolli = 'brocolli',
  Eggplant = 'eggplant',
  Carrot = 'carrot',
  Strawberry = 'strawberry',
  Avocado = 'avocado',
  Mango = 'mango',
  Watermelon = 'watermelon',
  Peach = 'peach',
  Bannana = 'bananna',
}

export enum Site {
  Parteon = 'patreon',
  Reddit = 'reddit',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Github = 'github',
  LinkedIn = 'linkedin',
  Website = 'website',
  Mail = 'mail',
  Facebook = 'facebook',
}

export type SocialLink = {
  site: Site;
  link: string;
};

export const PeopleButtons: React.FC = () => {
  return (
    <div className="mb-5 flex justify-center flex-wrap">
      <NavButton href="/people/team">OUR TEAM</NavButton>
      <NavButton href="/people/advisors">OUR ADVISORS</NavButton>
      <NavButton href="/people/partners">OUR PARTNERS</NavButton>
    </div>
  );
};

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

export const PeopleHero: React.FC = () => {
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
            width={heroTagline.width}
            height={heroTagline.height}
            alt="Our Community of Passionate Activists"
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
