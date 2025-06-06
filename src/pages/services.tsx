import React from 'react';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import Hero from '../components/decoration/hero';
import InfoBox from '../components/infoBox';
import SquareField from '../components/decoration/squares';
import Sprite, { pig } from '../components/decoration/sprite';
import ContactUsForm from '../components/forms/contactUs';
import { FirstSubSection } from '../components/decoration/textBlocks';
import { DarkButton } from '../components/decoration/buttons';
import heroBackground from '../../public/images/services/VH-chick-hero.jpg';
import heroTagline from '../../public/images/services/VH-services-hero-text.png';
import adviceIcon from '../../public/images/services/Services-icon-advice.png';
import fundingIcon from '../../public/images/services/Services-icon-funding.png';
import projectIcon from '../../public/images/services/Services-icon-project.png';
import webIcon from '../../public/images/services/Services-icon-web.png';
import designIcon from '../../public/images/services/Services-icon-design.png';

import CustomLink from 'components/decoration/link';

import type { IntlShape } from 'react-intl';
import type { StaticImageData } from 'next/image';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'green', size: 24, left: 16, bottom: 0 },
  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

interface ServiceProps {
  title: string;
  icon: StaticImageData;
  iconBgColor: string;
  iconAccentColor: string;
  align: 'left' | 'right';
  content: React.ReactNode;
  button?: {
    text: React.ReactNode;
    href: string;
  };
}

const getServiceBlockProps = (
  intl: IntlShape,
): Omit<ServiceProps, 'align'>[] => [
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.0.title',
      defaultMessage: 'Websites',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.0.content',
      defaultMessage:
        "If you're an independent advocate or organization with limited or no funding, we're here to help. We provide free website design and development support for those who may not have the resources, time, or expertise to build it themselves.",
    }),
    icon: webIcon,
    iconBgColor: 'magenta',
    iconAccentColor: 'red',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.0.button-label',
        defaultMessage: 'Apply for a free website',
      }),
      href: 'https://veganhacktivists.org/playground',
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.1.title',
      defaultMessage: 'Design',
    }),
    content: intl.formatMessage(
      {
        id: 'page.services.section.service-block.1.content',
        defaultMessage:
          'Our sister organization, <link>Violet Studios</link>, offers free design services tailored to your needs. From branding and web design to animation, social media support, and document design, Violet works closely with you to create visuals that align with your mission and engage your audience.',
      },
      {
        link: (chunks) => (
          <CustomLink href='https://www.violetstudios.org/'>
            {chunks}
          </CustomLink>
        ),
      },
    ),
    icon: designIcon,
    iconBgColor: 'yellow-dark',
    iconAccentColor: 'yellow-orange',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.1.button-label',
        defaultMessage: 'Apply For Free Design Services',
      }),
      href: 'https://www.violetstudios.org/apply-for-support',
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.2.title',
      defaultMessage: 'Advice',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.2.content',
      defaultMessage:
        "Our team brings expertise in tech, design, communications, and nonprofit operations to support advocates and organizations. Whether you need strategic guidance on technology, marketing, fundraising, or overall strategy, we're here to help you navigate challenges and succeed – all at no cost.",
    }),
    icon: adviceIcon,
    iconBgColor: 'orange',
    iconAccentColor: 'orange-dark',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.2.button-label',
        defaultMessage: 'Contact us for advice',
      }),
      href: '#contact-us',
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.3.title',
      defaultMessage: 'Funding',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.3.content',
      defaultMessage:
        'We connect you with funders providing up to $1,000 in seed funding for your advocacy. We’re looking for individuals and groups whose primary purpose is to end the suffering and exploitation of farmed animals.',
    }),
    icon: fundingIcon,
    iconBgColor: 'yellow',
    iconAccentColor: 'yellow-dark',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.3.button-label',
        defaultMessage: 'Learn about our grant program',
      }),
      href: '/grants',
    },
  },
  {
    title: intl.formatMessage({
      id: 'page.services.section.service-block.4.title',
      defaultMessage: 'Additional Projects',
    }),
    content: intl.formatMessage({
      id: 'page.services.section.service-block.4.content',
      defaultMessage:
        'If you have an online or tech-focused idea for the movement that isn’t covered above, we might be able to help!',
    }),
    icon: projectIcon,
    iconBgColor: 'green',
    iconAccentColor: 'green-dark',
    button: {
      text: intl.formatMessage({
        id: 'page.services.section.service-block.4.button-label',
        defaultMessage: "Let's chat about your idea",
      }),
      href: '#contact-us',
    },
  },
];

const Service: React.FC<ServiceProps> = ({
  title,
  content,
  icon,
  iconBgColor,
  iconAccentColor,
  align,
  button,
}) => {
  return (
    <div key={title}>
      <InfoBox
        key={title}
        title={title}
        icon={icon}
        iconBgColor={iconBgColor}
        iconAccentColor={iconAccentColor}
        align={align}
      >
        <p className='mt-3 mb-7'>{content}</p>
        {button && (
          <DarkButton className='max-w-sm' href={button.href}>
            {button.text}
          </DarkButton>
        )}
      </InfoBox>
    </div>
  );
};

const Services: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.services.next-seo.title',
          defaultMessage: 'Services',
        })}
      />
      <div>
        <Hero
          imageBackground={heroBackground}
          tagline={{
            image: heroTagline,
            alt: intl.formatMessage({
              id: 'page.services.section.hero.image-alt',
              defaultMessage: 'Supporting the Animal Protection Movement',
            }),
          }}
          alignment='left'
          classNameMapping={{
            container: 'bg-center',
            backgroundImage: 'object-[75%_0] md:object-center',
          }}
        />
        <SquareField
          squares={HERO_DECORATION_SQUARES}
          className='hidden md:block'
        />
        <FirstSubSection>
          <h1 className='text-5xl md:text-6xl mb-5'>
            <span className='text-4xl font-serif italic mx-1 font-bold'>
              Our
            </span>{' '}
            <span className='text-5xl md:text-6xl font-mono font-semibold uppercase mx-1'>
              services
            </span>
          </h1>

          <p className='pb-8'>
            <FormattedMessage
              id='page.services.section.our-services.content.0'
              defaultMessage='Whether you’re looking for pro-bono hands-on support, strategic guidance, or reassurance that you’re on the right track in your work for animals, we’re here to help.'
            />
          </p>

          <p className='pb-8'>
            <FormattedMessage
              id='page.services.section.our-services.content.1'
              defaultMessage='By leveraging our specialized expertise and understanding of the movement from within, we can help you work more efficiently, save time and money, and further your mission.'
            />
          </p>

          <p className='pb-8'>
            <FormattedMessage
              id='page.services.section.our-services.content.2'
              defaultMessage='We offer a range of free services tailored to your needs through VH and our independent programs.'
            />
          </p>
        </FirstSubSection>
        <div className='flex flex-col items-center mx-auto mb-32 text-2xl md:space-y-20 max-w-[95rem]'>
          {getServiceBlockProps(intl).map((service, index) => (
            <Service
              key={service.title}
              align={index % 2 === 0 ? 'left' : 'right'}
              {...service}
            />
          ))}
        </div>
      </div>
      <Sprite image={pig} pixelsLeft={3} pixelsRight={1} />
      <SquareField
        squares={[
          { size: 16, color: 'grey-background', bottom: 0, left: 0 },
          { size: 16, color: 'white', top: 0, left: 32 },
          { size: 16, color: 'grey-background', bottom: 0, right: 0 },
          { size: 16, color: 'white', top: 0, right: 0 },
        ]}
        className='hidden md:block'
      />
      <div className='px-10 pt-10 bg-grey-background md:px-0'>
        <div className='py-5 mx-auto text-xl md:w-1/2 text-grey-dark'>
          <FormattedMessage
            id='page.services.section.contact.content'
            defaultMessage='If you’d like to learn more about how we can support your work, reach out via our contact form. We aim to respond to all inquiries as quickly as possible.'
          />
        </div>
        <ContactUsForm />
      </div>
    </>
  );
};

export default Services;
