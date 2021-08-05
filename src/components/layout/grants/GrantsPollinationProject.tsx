import Image from 'next/image';
import { LightButton } from 'components/decoration/buttons';
import PollinationProjectLogo from '../../../../public/images/grants/PollinationProject-Logo.jpg';

const GrantsPollinationProject: React.FC = () => {
  return (
    <>
      <div className="flex max-w-screen-lg mx-auto flex-row mt-12 flex-wrap">
        <div className="w-screen md:max-w-sm">
          <Image
            src={PollinationProjectLogo}
            layout="responsive"
            alt="Logo of The Pollination Project"
          />
        </div>
        <div className="flex-1 py-8 px-3 md:px-10 bg-gray-background text-center md:text-left text-2xl">
          <p>
            Your grant application is submitted directly to The Pollination Project, 
			who generously funds our grant program. The Pollination Project will be 
			in touch after you submit your grant request with us.


          </p>
          <p className="mt-4">If your primary focus isn&apos;t factory farming you may still be eligible for a grant directly from The Pollinatiom Project. We encourage you to submit a request below! </p>
          <LightButton
            className="mt-6 font-mono text-md font-bold inline-block uppercase"
            href="https://thepollinationproject.org"
          >
            ThePollinationProject.org
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default GrantsPollinationProject;
