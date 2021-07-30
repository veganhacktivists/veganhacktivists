import Image from 'next/image';
import Hero from '../../decoration/hero';
import heroBackground from '../../../../public/images/grants/VH-hero-grants.jpg';
import heroTagline from '../../../../public/images/grants/VH-grants-hero-text.png';

const GrantsHero: React.FC = () => {
  return (
    <Hero
      imageBackground={heroBackground}
      tagline={{ image: heroTagline, alt: 'Grants for a kinder world' }}
      alignment="left"
      classNameMapping={{
        container: 'bg-center',
      }}
    />
  );
};

export default GrantsHero;
