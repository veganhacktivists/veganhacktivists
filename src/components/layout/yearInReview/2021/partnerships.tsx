import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import CustomImage from '../../../decoration/customImage';

import avPartner from '../../../../../public/images/yearInReview/2021/partner_av.png';
import pollinationPartner from '../../../../../public/images/yearInReview/2021/partner_pollinationproject.png';
import otherPartner from '../../../../../public/images/yearInReview/2021/partner_other.png';
import CustomLink from '../../../decoration/link';

interface PartnershipProps {
  image: StaticImageData;
  title: React.ReactNode;
}

const Partnership: React.FC<React.PropsWithChildren<PartnershipProps>> = ({
  image,
  title,
  children,
}) => {
  return (
    <div>
      <div className="flex md:flex-row gap-x-10">
        <div className="w-40">
          <CustomImage src={image} alt="" className="w-64" />
        </div>
        <div className="flex flex-col text-left flex-1">
          <div className="font-bold text-4xl">{title}</div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

const Partnerships: React.FC = () => {
  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={['Building meaningful', 'partnerships']}
            className="text-grey"
          >
            This year we looked back at our previous partnerships and
            brainstormed together on how our future partnerships could lead to
            more effective and long-lasting relationships. We wanted our
            partnerships to extend with more complexity and with more impact for
            both them, and us.
          </SectionHeader>
        }
      >
        <div className="px-10 md:w-3/4 mx-auto space-y-10">
          <Partnership
            image={pollinationPartner}
            title="Partnership with The Pollination Project"
          >
            <p>
              We&apos;re very happy to announce a partnership in where
              we&apos;re able to offer up to $1000 USD in seed funding grants
              for oustanding, and effective, animal rights activism!
              Specifically we&apos;re looking for individual or grassroots
              groups whose primary purpose is to help reduce suffering for
              non-human farmed animals.
            </p>
            <p>
              In our first month alone, we averaged one grant request per day
              received by various activists and organiations. Grant requests
              were for a wide variety of forms of activism, including: Singing,
              Virtual Reality, Drawing, Photography, Videography, Baking,
              Fundraising, Welfare Awareness, Child Education, Youth Skills,
              Capacity Building, Farming, Campaigning, Printing, Litigation,
              Animal Rescue, Wild Animal Advocacy and more!
            </p>
            <p>
              We&apos;re excited to see where this partnership leads us in the
              future as we work together with The Pollination Project to get our
              actvisits funded as much as possible.{' '}
              <CustomLink href="https://thepollinationproject.org/">
                To learn more, please click here
              </CustomLink>
              .
            </p>
          </Partnership>
          <Partnership
            image={avPartner}
            title="Partnership with Anonymous for the Voiceless"
          >
            <p>
              Anonymous for the Voiceless (AV) is a not-for-profit animal rights
              organisation specialising in using conversation and standard
              practice footage to edify the public about animal exploitation.
              They hold street activism events worldwide to edify the public
              towards supporting animal rights, living vegan and speaking up for
              the animals.
            </p>
            <p>
              Traditionally, it&apos;s been very hard to track the effectiveness
              of street outreach. We&apos;re excited to have partnered up with
              AV in order to be able to both provide them the tools they need to
              monitor and track the effectiveness of each group, while providing
              social nework technology that helps them detach from
              Facebook&apos;s overarching grip and censorship.
            </p>
            <p>
              We worked very closely with AV&apos;s regional organizers and
              leadership to make sure that the technology we provided, powered
              by Activist Hub, worked exactly to their specific organiations
              needs. We&apos;re more than excited to see how this partnership
              benefits the grassroots street outreach movement!
            </p>
          </Partnership>
          <Partnership image={otherPartner} title="Other Partnerships">
            <p>
              <CustomLink href="https://veganoutreach.org">
                <b>Vegan Outreach</b>
              </CustomLink>
              &nbsp;&mdash;&nbsp;We partnered with Vegan Outreach&apos;s Vegan
              Mentorship Program in order to provide free mentorship access to
              Vegan Bootcamp and 3Movies.org participants.
            </p>
            <p>
              <CustomLink href="https://www.legalimpactforchickens.org/">
                <b>Legal Impact for Chickens</b>
              </CustomLink>
              &nbsp;&mdash;&nbsp;We partnered with Legal Impact for Chickens for
              our upcoming project, Start Pressuring! We&apos;ll be able to
              provide successful pressure campaigns launched on our platform
              with free legal support!
            </p>
          </Partnership>
        </div>
      </SectionContainer>
    </>
  );
};

export default Partnerships;
