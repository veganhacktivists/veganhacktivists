import { pixelHeart } from '../../../images/separators';
import Accordion from '../accordion';

import CustomImage from 'components/decoration/customImage';

import type { PropsWithChildren } from 'react';

interface Org {
  title: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
}

const orgs: Org[] = [
  {
    title: 'Stray Dog Institute',
    description:
      'Stray Dog Institute focuses on cultivating dignity, justice, and sustainability in the food system, providing funding, strategic research, and collaboration opportunities for a more compassionate world for people, animals, and the environment.',
    linkLabel: 'Learn more',
    linkUrl: 'https://straydoginstitute.org/',
  },
  {
    title: 'Craigslist Charitable Fund',
    description:
      'The craigslist Charitable Fund (CCF) supports organizations working to improve planetary health and well-being for all of earth’s inhabitants including humans — by ending factory farming and all other forms of animal exploitation.',
    linkLabel: 'Learn more',
    linkUrl: 'https://www.craigslistfund.org/',
  },
  {
    title: 'Greenbaum Foundation',
    description:
      'The Greenbaum Foundation focuses their funding on effective and efficient projects working to bring about the end of suffering (human and non-human) in areas of the highest need and where they can have the most impact. They assist organizations with guidance, networking and funding. ',
    linkLabel: 'Learn more',
    linkUrl: 'https://www.greenbaumfoundation.org/',
  },
  {
    title: 'Animal Charity Evaluators',
    description:
      'ACE is an organization dedicated to helping people help animals more effectively. They evaluate animal charities, prioritize causes, and offer resources and advice for effective animal advocacy. Their Movement Grants program is aimed at building and strengthening the global animal advocacy movement.',
    linkLabel: 'Learn more',
    linkUrl: 'https://animalcharityevaluators.org/',
  },
  {
    title: 'Lush Charity Pot',
    description:
      'Lush supports small, grassroots organizations in areas of animal protection, environmental justice, and human rights through its grant program.',
    linkLabel: 'Learn more',
    linkUrl: 'https://www.lush.com/us/en_us/a/na-donation-funding-application',
  },
  {
    title: 'Tipping Point Foundation',
    description:
      'Tipping Point supports a range of organizations and causes dedicated to factory farming alternatives. To amplify impact we pursue alliances with like-minded institutions that share our vision and desired outcomes.',
    linkLabel: 'Learn more',
    linkUrl: 'https://www.tpprivatefoundation.org/',
  },
  {
    title: 'EA Animal Welfare Fund',
    description:
      'Managed by Effective Altruism Funds, this fund focuses on improving the well-being of nonhuman animals. It supports a variety of initiatives including research into animal advocacy, welfare, and activities that could make it easier to help animals in the future.',
    linkLabel: 'Learn more',
    linkUrl: 'https://funds.effectivealtruism.org/funds/animal-welfare',
  },
  {
    title: 'Builders Vision',
    description:
      'Builders Vision is an impact platform that supports a range of philanthropic and investment efforts. Builders Vision aims to collaborate with innovative thinkers and organizations to drive positive change in these areas.',
    linkLabel: 'Learn more',
    linkUrl: 'https://www.buildersvision.com/',
  },
  {
    title: 'Phauna Project',
    description:
      'Phauna funds and seeds ambitious animal rights organizations and individuals working to end human exploitation of other species. Their focus includes increasing the capacity, endurance, and power of the animal rights movement, with a particular interest in liberation and culture change.',
    linkLabel: 'Learn more',
    linkUrl: 'https://www.phaunaproject.org/',
  },
  {
    title: 'Eat The Change',
    description:
      "ETC Impact is a grant program working to promote and expand access to climate-friendly foods in the United States. We've donated more than $1.25 million over the past three years to support a diverse group of changemaking nonprofit organizations.",
    linkLabel: 'Learn more',
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
        <h2 className='mb-8 mt-4 text-4xl font-bold'>Thank You</h2>
        <Paragraph>
          We want to take a moment to thank the organizations below for their
          support—for those who have awarded us grants or contributed donations,
          whether one-time or recurring. We are grateful for your belief in our
          vision and support for our work.
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
