import { NextSeo } from 'next-seo';

import PixelChicken from '../../../public/images/VH_PixelChicken.png';
import {
  FirstSubSection,
  SubSection,
} from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';

import CustomImage from 'components/decoration/customImage';

import type PageWithLayout from '../../types/persistentLayout';

const OurValues: PageWithLayout = () => {
  return (
    <>
      <NextSeo title="Our Values" />
      <FirstSubSection header="Our values">
        We embrace strong core values for our organization, which drive what we
        do, how we do it, and how we build community.
      </FirstSubSection>
      <div className="pb-10 m-10">
        <div className="pb-5">
          <CustomImage
            src={PixelChicken.src}
            width={PixelChicken.width / 3}
            height={PixelChicken.height / 3}
            alt="Our values"
          />
        </div>

        <SubSection header="Animal Liberation">
          We value and respect the lives of all animals and denounce all forms
          of violence and exploitation against them. We believe animals have the
          right to be free, and we fight for that with our (digital) activism.
        </SubSection>

        <SubSection header="Non-violence">
          We practice a love-based, community-first organizational approach. We
          exercise empathy, compassion, and non-violence. We encourage every
          member to communicate openly and kindly with each other.
        </SubSection>

        <SubSection header="Safe Community">
          We believe in building and fostering safe and inclusive communities
          regardless of race, gender, species, age, sexual orientation, or
          political affiliation. We strive to be diverse and representative of
          the communities we serve and work with.
        </SubSection>

        <SubSection header="Farmed Animals">
          We believe farmed animals are in most need of our support, which is
          why we focus primarily on farmed animal liberation as an organization.
        </SubSection>

        <SubSection header="Open Feedback">
          We value different viewpoints and constructive feedback from every
          person. We believe everyone has something of value to contribute to
          the discussion. We always listen first, then respond constructively.
        </SubSection>

        <SubSection header="Anti-Oppression">
          We do not support or enable the exploitation or oppression of any
          group. We believe that the oppression of humans and non-human animals
          are interlinked, and the work to eradicate all forms of oppression is
          necessary.
        </SubSection>
      </div>
    </>
  );
};

OurValues.Layout = AboutLayout;

export default OurValues;
