import Image from 'next/image';
import Hero from '../../decoration/hero';
import heroBackground from '../../../../public/images/grants/VH-hero-grants.jpg';
import heroTagline from '../../../../public/images/grants/VH-grants-hero-text.png';

const GrantsHero: React.FC = () => {
  return (
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
          width={heroTagline.width * 0.65}
          height={heroTagline.height * 0.65}
          alt="Grants for a kinder world"
          layout="intrinsic"
          priority
        />
      </div>
    </Hero>
  );
};

export default GrantsHero;
