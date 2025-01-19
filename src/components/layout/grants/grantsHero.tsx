import Hero from '../../decoration/hero';

import getServerIntl from 'app/intl';

import heroTagline from '~images/grants/VH-grants-hero-text.png';
import heroBackground from '~images/grants/VH-hero-grants.jpg';

interface Props {
  locale: string;
}

const GrantsHero: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

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
