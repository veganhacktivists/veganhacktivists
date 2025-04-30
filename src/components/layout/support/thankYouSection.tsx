import { FormattedMessage, useIntl } from 'react-intl';
import { useMemo, type PropsWithChildren } from 'react';

import { pixelHeart } from '../../../images/separators';
import Accordion from '../accordion';

import CustomImage from 'components/decoration/customImage';

import type { IntlShape } from 'react-intl';

interface Org {
  title: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
}

const getOrgs = (intl: IntlShape): Org[] => [
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.0.title',
      defaultMessage: '<no-localization>Stray Dog Institute</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.0.description',
      defaultMessage:
        'Stray Dog Institute focuses on cultivating dignity, justice, and sustainability in the food system, providing funding, strategic research, and collaboration opportunities for a more compassionate world for people, animals, and the environment.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.0.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://straydoginstitute.org/',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.1.title',
      defaultMessage:
        '<no-localization>Craigslist Charitable Fund</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.1.description',
      defaultMessage:
        'The craigslist Charitable Fund (CCF) supports organizations working to improve planetary health and well-being for all of earth’s inhabitants including humans — by ending factory farming and all other forms of animal exploitation.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.1.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://www.craigslistfund.org/',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.2.title',
      defaultMessage: '<no-localization>Greenbaum Foundation</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.2.description',
      defaultMessage:
        'The Greenbaum Foundation focuses their funding on effective and efficient projects working to bring about the end of suffering (human and non-human) in areas of the highest need and where they can have the most impact. They assist organizations with guidance, networking and funding.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.2.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://www.greenbaumfoundation.org/',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.3.title',
      defaultMessage:
        '<no-localization>Animal Charity Evaluators</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.3.description',
      defaultMessage:
        'ACE is an organization dedicated to helping people help animals more effectively. They evaluate animal charities, prioritize causes, and offer resources and advice for effective animal advocacy. Their Movement Grants program is aimed at building and strengthening the global animal advocacy movement.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.3.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://animalcharityevaluators.org/',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.4.title',
      defaultMessage: '<no-localization>Lush Charity Pot</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.4.description',
      defaultMessage:
        'Lush supports small, grassroots organizations in areas of animal protection, environmental justice, and human rights through its grant program.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.4.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://www.lush.com/us/en_us/a/na-donation-funding-application',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.5.title',
      defaultMessage:
        '<no-localization>Tipping Point Foundation</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.5.description',
      defaultMessage:
        'Tipping Point supports a range of organizations and causes dedicated to factory farming alternatives. To amplify impact we pursue alliances with like-minded institutions that share our vision and desired outcomes.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.5.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://www.tpprivatefoundation.org/',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.6.title',
      defaultMessage:
        '<no-localization>EA Animal Welfare Fund</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.6.description',
      defaultMessage:
        'Managed by Effective Altruism Funds, this fund focuses on improving the well-being of nonhuman animals. It supports a variety of initiatives including research into animal advocacy, welfare, and activities that could make it easier to help animals in the future.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.6.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://funds.effectivealtruism.org/funds/animal-welfare',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.7.title',
      defaultMessage: '<no-localization>Navigation Fund</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.7.description',
      defaultMessage:
        'The Navigation Fund offers grants to high-impact organizations and projects that are taking bold action and making significant changes in key areas, such as open science, farmed animal welfare, criminal justice, digital sentience, and climate change.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.7.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://www.navigation.org/',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.8.title',
      defaultMessage: '<no-localization>Phauna Project</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.8.description',
      defaultMessage:
        'Phauna funds and seeds ambitious animal rights organizations and individuals working to end human exploitation of other species. Their focus includes increasing the capacity, endurance, and power of the animal rights movement, with a particular interest in liberation and culture change.',
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.8.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://www.phaunaproject.org/',
  },
  {
    title: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.9.title',
      defaultMessage: '<no-localization>Eat The Change</no-localization>',
    }),
    description: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.9.description',
      defaultMessage:
        "ETC Impact is a grant program working to promote and expand access to climate-friendly foods in the United States. We've donated more than $1.25 million over the past three years to support a diverse group of changemaking nonprofit organizations.",
    }),
    linkLabel: intl.formatMessage({
      id: 'page.support.section.thank-you.organizations.9.link-label',
      defaultMessage: 'Learn more',
    }),
    linkUrl: 'https://eatthechange.org/',
  },
];

const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className='px-10 mx-auto mb-20 text-xl'>{children}</p>
);

const OrganizationCard: React.FC<Org> = ({
  title,
  description,
  linkLabel,
  linkUrl,
}: Org) => {
  return (
    <div className='bg-white basis-full lg:basis-[calc(50%-0.5rem)] p-[40px] text-left flex gap-4 flex-col'>
      <h3 className='text-2xl font-bold'>{title}</h3>
      <div className='text-lg'>
        {description}{' '}
        <a
          href={linkUrl}
          target='_blank'
          className='text-magenta underline font-bold'
        >
          {linkLabel}
        </a>
      </div>
    </div>
  );
};

const OrganizationCardContainer: React.FC<React.PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <div className='m-auto w-full flex flex-row gap-4 flex-wrap mb-32'>
      {children}
    </div>
  );
};

const ThankYouSection: React.FC = () => {
  const intl = useIntl();

  const orgs = useMemo(() => getOrgs(intl), [intl]);

  const accordionEntries = orgs.map((org) => ({
    title: org.title,
    children: (
      <div className='text-lg'>
        {org.description}{' '}
        <a
          href={org.linkUrl}
          target='_blank'
          className='text-magenta underline font-bold'
        >
          {org.linkLabel}
        </a>
      </div>
    ),
  }));

  return (
    <div className='pt-10 pb-20 mx-auto bg-gray-background'>
      <div className='max-w-7xl m-auto'>
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt='Our community'
        />
        <h2 className='mb-8 mt-4 text-4xl font-bold'>
          <FormattedMessage
            id='page.support.section.thank-you.headline'
            defaultMessage='Thank You'
          />
        </h2>
        <Paragraph>
          <FormattedMessage
            id='page.support.section.thank-you.introduction'
            defaultMessage='We’re incredibly grateful for the organizations who support our work. Thank you for believing in our mission and making this work possible.'
          />
        </Paragraph>

        <div className='hidden lg:block px-10'>
          <OrganizationCardContainer>
            {orgs.map((org) => (
              <OrganizationCard key={org.title} {...org} />
            ))}
          </OrganizationCardContainer>
        </div>

        <div className='block lg:hidden'>
          <Accordion entries={accordionEntries} />
        </div>
      </div>
    </div>
  );
};

export default ThankYouSection;
