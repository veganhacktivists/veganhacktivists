import { LightButton } from '../../decoration/buttons';
import Hero from '../../decoration/hero';
import Sprite, { chicken } from '../../decoration/sprite';
import SquareField from '../../decoration/squares';
import InfoBox from '../../infoBox';
import JoinTheTeam from '../joinTheTeam';

import heroBackground from '../../../../public/images/VH-Hero-lamb.jpg';
import heroTagline from '../../../../public/images/projects/hero-tagline.png';
import lampImage from '../../../../public/images/Services-icon-project.png';
import type { Layout } from '../../../types/persistentLayout';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const JOIN_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, top: 0 },
  { color: 'gray-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'gray-lighter', size: 16, right: 0, bottom: 0 },
];

const ProjectsLayout: Layout = (page) => {
  return (
    <div>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'Building projects with impact',
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
      {page}
      <SquareField
        squares={JOIN_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="bg-gray-background py-16 md:py-24 flex flex-row justify-center">
        <InfoBox
          title="Have an idea for a project?"
          icon={lampImage}
          iconBgColor="green"
          iconAccentColor="green-dark"
        >
          <p className="my-5 text-xl">
            <b>We&apos;re all ears!</b> We&apos;d love to hear your ideas for
            projects that can help empower the animal rights movement, if we
            like it, we&apos;ll build it! While we do get a lot of project
            suggestions every month, we do consider every single one. If you
            rather build it yourself and want advice, no problem - get in touch!
          </p>
          <div className="md:flex md:justify-start font-semibold">
            <LightButton href={{ pathname: '/services', hash: 'contact-us' }}>
              Suggest a project idea
            </LightButton>
          </div>
        </InfoBox>
      </div>
      <Sprite image={chicken} />
      <JoinTheTeam />
    </div>
  );
};

export default ProjectsLayout;
