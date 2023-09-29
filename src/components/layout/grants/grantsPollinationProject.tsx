import { LightButton } from '../../decoration/buttons';
import PollinationProjectLogo from '../../../../public/images/grants/PollinationProject-Logo.jpg';
import CustomImage from '../../decoration/customImage';

const GrantsPollinationProject: React.FC = () => {
  return (
    <>
      <div className="flex max-w-screen-lg mx-auto flex-row mt-12 flex-wrap">
        <div className="w-screen md:max-w-md">
          <CustomImage
            src={PollinationProjectLogo}
            layout="responsive"
            alt="Logo of The Pollination Project"
          />
        </div>
        <div className="flex-1 py-8 px-3 md:px-10 bg-gray-background text-center md:text-left text-2xl">
          <p>
          Our grants connection service is generously funded by The Pollination Project (TPP) 
          and other private donors— please keep an eye out in your inbox, and don&apos;t forget to check spam!
          </p>
          <p className="mt-4">
            If your primary focus does not address farmed animals, you may still
            be eligible for a grant directly from TPP. We encourage you to apply
            through their website.
          </p>
          <LightButton
            className="mt-6 font-mono text-md font-semibold inline-block uppercase"
            href="https://thepollinationproject.org/pre-screen-quiz/"
          >
            ThePollinationProject.org
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default GrantsPollinationProject;
