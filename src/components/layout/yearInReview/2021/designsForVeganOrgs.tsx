import { FormattedMessage, useIntl } from 'react-intl';

import vcj from '../../../../../public/images/yearInReview/2021/DesignedLogo_VCJ.png';
import sv from '../../../../../public/images/yearInReview/2021/DesignedLogo_SV.png';
import ivff from '../../../../../public/images/yearInReview/2021/DesignedLogo_IVFF.png';
import CustomImage from '../../../decoration/customImage';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import SquareField from '../../../decoration/squares';

const DesignsForVeganOrgs: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <SectionContainer
        color="grey-background"
        header={
          <SectionHeader
            className="text-grey-dark"
            header={[
              intl.formatMessage({
                id: 'page.year-in-review.2021.section.designs-for-vegan-orgs.heading.0',
                defaultMessage: 'Designs',
              }),
              intl.formatMessage({
                id: 'page.year-in-review.2021.section.designs-for-vegan-orgs.heading.1',
                defaultMessage: 'for',
              }),
              intl.formatMessage({
                id: 'page.year-in-review.2021.section.designs-for-vegan-orgs.heading.2',
                defaultMessage: 'Vegan Orgs',
              }),
            ]}
            startWithBoldFont
          >
            <FormattedMessage
              id="page.year-in-review.2021.section.designs-for-vegan-orgs.paragraph"
              defaultMessage="We had the chance to provide on-the-house design support to vegan organizations that needed to create their brand and identity, as well as stand out in the competitive digital landscape."
            />
          </SectionHeader>
        }
      >
        <div className="md:w-1/2 mx-auto">
          <div className="mb-10">
            <CustomImage src={vcj} alt="Vegan Consulting Japan design" />
          </div>
          <div className="mb-10">
            <CustomImage
              src={ivff}
              alt="International Vegan Film Festival design"
            />
          </div>
          <div className="mb-10">
            <CustomImage src={sv} alt="Solutionary Vegan design" />
          </div>
        </div>
      </SectionContainer>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-background', left: 0, top: 0 },
          { color: 'white', right: 0, bottom: 0 },
        ]}
      />
    </>
  );
};

export default DesignsForVeganOrgs;
