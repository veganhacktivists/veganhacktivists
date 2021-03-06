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
            Our grant program is generously funded by The Pollination Project.
            After your application is reviewed by us we&apos;ll forward your
            application for further review directly to them, so keep an eye out
            on your inbox!
          </p>
          <p className="mt-4">
            If your primary focus isn&apos;t factory farming you may still be
            eligible for a grant directly from The Pollination Project. We
            encourage you to apply directly instead!
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
