import { useIntl } from 'react-intl';

import Hero from '../../decoration/hero';
import heroBackground from '../../../../public/images/grants/VH-hero-grants.jpg';
import heroTagline from '../../../../public/images/grants/VH-grants-hero-text.png';

const GrantsHero: React.FC = () => {
  const intl = useIntl();
  return (
    <Hero
      imageBackground={heroBackground}
      tagline={{
        image: heroTagline,
        alt: intl.formatMessage({
          id: 'page.grants.hero.image.alt-text',
          defaultMessage: 'Grants for a kinder world',
        }),
      }}
      alignment='left'
      classNameMapping={{
        container: 'bg-center',
      }}
    />
  );
};

export default GrantsHero;
