import vcj from '../../../../../public/images/yearInReview/2021/DesignedLogo_VCJ.png';
import sv from '../../../../../public/images/yearInReview/2021/DesignedLogo_SV.png';
import CustomImage from '../../../decoration/customImage';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

const DesignsForVeganOrgs: React.FC = () => {
  return (
    <>
      <SectionContainer
        color="grey-background"
        header={
          <SectionHeader
            className="text-grey-dark"
            header={['Designs', 'for', 'Vegan Orgs']}
          >
            We had the chance to provide on-the-house design support to vegan
            orgs that needed to represent themselves and stand out in the
            competitive digital landscape.
          </SectionHeader>
        }
      >
        <div className="md:w-1/2 mx-auto">
          <div className="mb-10">
            <CustomImage src={vcj} alt="Vegan Consulting Japan design" />
          </div>
          <CustomImage src={sv} alt="Solutionary Vegan design" />
        </div>
      </SectionContainer>
    </>
  );
};

export default DesignsForVeganOrgs;
