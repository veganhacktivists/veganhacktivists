import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  FirstSubSection,
  SubSection,
} from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';
import { pixelPig } from '../../images/separators';

import CustomImage from 'components/decoration/customImage';
import { DarkButton } from 'components/decoration/buttons';

import type PageWithLayout from '../../types/persistentLayout';

const OurStory: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.about.section.our-story.next-seo.title',
          defaultMessage: 'Our Story',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.about.section.our-story.heading',
          defaultMessage: 'Our <b>story</b>',
        })}
      >
        <p className='pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.1'
            defaultMessage='In just over five years, Vegan Hacktivists (VH) has grown into a leading capacity-building organization, providing free, high-quality tech and creative services for the animal advocacy movement.'
          />
        </p>
        <p className='font-bold pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.2'
            defaultMessage='As the movement’s needs evolve, so does VH’s work – which is why you may know us for many different projects.'
          />
        </p>
        <p className='pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.3'
            defaultMessage='We began by building innovative tools to support vegans in their outreach, and have since grown into a team that develops expert services for the movement. While building technology remains a core part of our work, our focus has shifted toward solutions that address the movement’s most pressing needs.'
          />
        </p>
        <div>
          <h4 className='text-2xl font-bold pb-4 text-left'>
            <FormattedMessage
              id='page.about.section.our-story.paragraph.4.heading'
              defaultMessage='Today, we’re especially proud of the flagship programs we’ve designed and continue to manage, including:'
            />
          </h4>
          <ul className='list-disc pl-8 pb-4 text-left'>
            <li>
              <FormattedMessage
                id='page.about.section.our-story.paragraph.4.list.0'
                defaultMessage='Violet Studios, our sister organization, which offers authentic design and branding services to the movement at no cost.'
              />
            </li>
            <li>
              <FormattedMessage
                id='page.about.section.our-story.paragraph.4.list.1'
                defaultMessage='Granti, a platform that streamlines grantmaking for both funders and grantees.'
              />
            </li>
            <li>
              <FormattedMessage
                id='page.about.section.our-story.paragraph.4.list.2'
                defaultMessage='Playground, a platform that connects professional animal advocates with skilled volunteers.'
              />
            </li>
          </ul>
          <h4 className='text-2xl font-bold pb-8 text-left'>
            <FormattedMessage
              id='page.about.section.our-story.paragraph.4.list.3'
              defaultMessage='Our growth has been driven by innovation, ability to adapt, and the dedication of our incredible volunteers.'
            />
          </h4>
        </div>
        <p className='pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.5'
            defaultMessage="Many of our team members began as volunteers and have since become part of our core teams at VH and Violet, contributing their skills in expanded and ongoing roles. We're also proud to work with over 2,600 volunteers across our internal and Playground networks. Since 2019, we’ve supported hundreds of organizations worldwide – improving their operations, elevating their brands, and helping them reach wider audiences through advanced digital tools."
          />
        </p>
        <DarkButton href='/services' className='w-fit mx-auto'>
          <FormattedMessage
            id='page.about.section.our-story.cta-services'
            defaultMessage='Learn about our services'
          />
        </DarkButton>
      </FirstSubSection>
      {/* <div className='pb-10 m-10'>
        <div className='pb-5'>
          <CustomImage
            src={pixelPig}
            width={pixelPig.width / 3}
            height={pixelPig.height / 3}
            alt={intl.formatMessage({
              id: 'page.about.section.our-story.image.alt-text',
              defaultMessage: 'Our story',
            })}
          />
        </div>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.0'
            defaultMessage='We are the <no-localization>Vegan Hacktivists</no-localization>. Our skill sets — whether it’s writing code, creating a brand identity, or analyzing data — are as diverse as the areas where we come from and where we live. We collaborate with each other to build projects that are data-driven, experimental, and effective. Our core team consists of director and senior-level team members who have experience and expertise in engineering, architecture, design, data, operations, and communications. Our volunteer base consists of teams managed by leads; each team has ownership of a project in which they are actively building and maintaining.'
          />
        </SubSection>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.1'
            defaultMessage='Our organization takes a community-first approach. Given that our work requires patience and commitment, we energize our volunteers by creating a supportive environment that enables them to be engaged, effective, and impactful. As a distributed organization, we want to build a sense of community aligned by values and connected through meaningful and playful interactions. Each team is represented with a <link>fruit or vegetable</link> (taking plant-based to another level), and we balance our work with games, get-togethers, and community calls. Our volunteers are, after all, at the heart of our organization.'
            values={{
              link: (chunks) => (
                <Link href='/people/team' className='hover:text-grey'>
                  {chunks}
                </Link>
              ),
            }}
          />
        </SubSection>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.2'
            defaultMessage='Over the years, our organization has changed with the needs of our movement. While we now primarily focus on providing capacity-building services, we continue to build technology that we believe to be innovative and highly needed in the movement. Now, we work extensively with advocates, organizations, and those working at the frontlines to help improve their day-to-day operations, brand and identity, and technology. In doing so, we are helping to amplify their message and elevate their work to a wider audience.'
          />
        </SubSection>
        <SubSection>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.3'
            defaultMessage='Through it all, our North Star remains the same: <no-localization>{break}</no-localization> we do it for the animals.'
            values={{
              break: <br />,
            }}
          />
        </SubSection>
      </div> */}
    </>
  );
};

OurStory.Layout = AboutLayout;

export default OurStory;
