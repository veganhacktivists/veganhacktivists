import { LightButton } from '../../../decoration/buttons';
import SectionContainer from '../sectionContainer';
import CustomImage from '../../../decoration/customImage';

import pixelPig from '../../../../../public/images/VH_PixelPig.png';
import SquareField from '../../../decoration/squares';

const MovingForward: React.FC = () => {
  return (
    <>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-light', left: 0, bottom: 0 },
          { color: 'grey-light', right: 0, top: 0 },
        ]}
      />
      <SectionContainer color="grey-darker" className="text-white">
        <div className="text-center md:w-1/2 mx-auto space-y-5">
          <div>
            <div className="w-24 mx-auto">
              <CustomImage src={pixelPig} alt="" />
            </div>

            <h2 className="font-bold text-4xl">Moving forward</h2>
          </div>
          <p>
            What a year! We&apos;re really happy with our work in the last 12
            months. Last year, we said we wanted to focus more on data-based
            efforts (while staying trye to our spirit of experimentation) with
            our projects and we think we really accomplished that with Activist
            Hub and Vegan Linguists. We also feel like this ahs been our best
            year yet with the amount of conenctions and friends we&apos;ve been
            able to make and support in the animal protection movement.
          </p>
          <p>
            This year we&apos;ve also managed to really organize and make our
            internal processes more efficient. This is important because
            starting 2022, we want to now prioritize expanding our network of
            volunteers in order to be able to keep up with the demand of our
            services. We&apos;re almost at the point of being unable to handle
            all of the requests we get, but we love that this is a problem.
          </p>
          <p>
            We&apos;re really excited to heaer your thoughts in our 2021 year in
            review, and if you like what we do, please consider supporting un by
            clicking the button below. Your donation ensures that all of our
            work and projects remain free and accessible to everyone, and we
            can&apos;t begin to thank you enough for the support!
          </p>
          <div className="w-min mx-auto">
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
