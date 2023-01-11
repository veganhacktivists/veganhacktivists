import { LightButton } from '../../../decoration/buttons';
import SectionContainer from '../sectionContainer';
import CustomImage from '../../../decoration/customImage';
import SquareField from '../../../decoration/squares';
import { pixelPig } from '../../../../images/separators';

const MovingForward: React.FC = () => {
  return (
    <>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-dark', left: 0, bottom: 0 },
          { color: 'grey-background', right: 0, top: 0 },
        ]}
      />
      <SectionContainer color="grey-darker" className="text-white">
        <div className="text-center md:w-1/2 mx-auto space-y-5">
          <div>
            <div className="w-24 mx-auto">
              <CustomImage src={pixelPig} alt="" />
            </div>

            <h2 className="font-bold text-4xl pt-5">Moving forward</h2>
          </div>
          <p>
            What a year! We wanted to focus on data-based efforts while staying
            true to our spirit of experimental projects, and we were able to
            achieve those goals through Activist Hub and Vegan Linguists. This
            has truly been the best year for creating connections and
            partnerships in the animal protection movement, and we are extremely
            pleased with the work we&apos;ve accomplished.
          </p>
          <p>
            This year, we have also prioritized organizing and optimizing
            internal processes. This was crucial for us since a core focus of
            2022 is to expand our volunteer network to meet the demand of our
            services. We want to continue being able to serve the multifaceted
            needs of the vegan movement and empower people to become activists.
          </p>
          <p>
            We&apos;re really excited to hear your thoughts in our 2021 year in
            review, and if you like what we do, please consider supporting us by
            clicking the button below. Your donation ensures that all of our
            work and projects remain free and accessible to everyone, and we
            can&apos;t begin to thank you enough for the support!
          </p>
          <div className="w-min mx-auto pt-10 pb-10">
            <LightButton href="/support" className="w-min px-5">
              Support our work
            </LightButton>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default MovingForward;
