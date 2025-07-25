import type React from 'react';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import HeartLogo from '../../public/images/support/heart-icon.png';
import PayPalLogo from '../../public/images/support/paypal-logo.png';
import heroBackground from '../../public/images/support/VH-pig2-hero-nocircles.jpg';
import heroTagline from '../../public/images/support/VH-support-hero-text.png';
import Hero from '../components/decoration/hero';
import Sprite, { pig } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { PlainHeader } from '../components/decoration/textBlocks';
import DonationCard from '../components/layout/support/donationCard';
import Crypto from '../components/layout/support/crypto';
import DonorBoxCard from '../components/layout/support/donorBoxCard';

import ThankYouSection from 'components/layout/support/thankYouSection';
import { DarkButton } from 'components/decoration/buttons';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'green', size: 16, lwft: 0, top: 0 },

  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="px-10 mx-auto mb-4 text-xl md:w-3/4">{children}</p>
);

const Support: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.support.next-seo.title',
          defaultMessage: 'Support Us',
        })}
      />
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.support.section.hero.image-alt',
            defaultMessage: 'You are their voice',
          }),
        }}
        alignment="left"
        classNameMapping={{
          backgroundImage: 'object-[75%_0] md:object-center',
        }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="px-10">
        <PlainHeader
          header={intl.formatMessage({
            id: 'page.support.section.support-us.header.title',
            defaultMessage: 'Donate to strengthen the movement',
          })}
        >
          <p className="mt-8">
            <FormattedMessage
              id="page.support.section.support-us.header.content"
              defaultMessage="Equip the animal advocacy movement with the support it needs: technically, creatively, and strategically. Your donation ensures we can support more advocacy groups and expand the free, high-impact services we offer, so that more teams have the tools and infrastructure they need to build a better world for animals."
            />
          </p>
        </PlainHeader>
      </div>
      <div className="mx-auto my-16 md:w-fit">
        <div className="flex flex-wrap items-end justify-center gap-10 mb-5">
          <DonationCard
            color="blue"
            image={PayPalLogo}
            title={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.0.title',
              defaultMessage: 'PayPal',
            })}
            buttonText={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.0.button-label',
              defaultMessage: 'donate',
            })}
            buttonHref="https://paypal.me/veganhacktivists"
          >
            <FormattedMessage
              id="page.support.section.support-us.donation-card.0.content"
              defaultMessage="For one-time, smaller donations"
            />
          </DonationCard>
          <DonorBoxCard color="orange" />
          <DonationCard
            color="green"
            image={HeartLogo}
            title={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.2.title',
              defaultMessage: 'Other',
            })}
            buttonText={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.2.button-label',
              defaultMessage: 'contact us',
            })}
            buttonHref="https://veganhacktivists.org/contact"
          >
            <FormattedMessage
              id="page.support.section.support-us.donation-card.2.content"
              defaultMessage="For larger donations (US tax-deductible)"
            />
          </DonationCard>
        </div>
        <div>
          <Crypto />
        </div>
      </div>

      <Paragraph>
        VH is a 501(c)(3) nonprofit (EIN #92-3997981), registered under U.S. tax
        law as a charitable organization.
      </Paragraph>
      <Paragraph>
        Don’t hesitate to reach out if you have any questions.
      </Paragraph>

      <DarkButton href="/contact" className="w-fit mx-auto mb-20">
        Contact us
      </DarkButton>

      <SquareField
        squares={[
          { color: 'gray-background', size: 16, bottom: 0, left: 16 },
          { color: 'gray-background', size: 16, bottom: 0, right: 0 },
          { color: 'white', size: 16, top: 0, left: 0 },
          { color: 'white', size: 16, top: 0, right: 0 },
        ]}
        className="hidden md:block"
      />

      <ThankYouSection />
      <SquareField
        squares={[{ color: 'grey-light', size: 16, bottom: 0, left: 0 }]}
        className="hidden md:block"
      />
      <Sprite image={pig} pixelsLeft={1} pixelsRight={1} />
    </>
  );
};

export default Support;
