import Image from 'next/image';
import { LightButton } from 'components/decoration/buttons';
import PollinationProjectLogo from '../../../../public/images/grants/PollinationProject-Logo.jpg';

const GrantsPollinationProject: React.FC = () => {
  return (
    <>
      <div className="flex max-w-screen-lg mx-auto flex-row mt-24 flex-wrap">
        <div className="w-screen md:max-w-sm">
          <Image
            src={PollinationProjectLogo}
            layout="responsive"
            alt="Logo of The Pollination Project"
          />
        </div>
        <div className="flex-1 py-8 px-3 md:px-10 bg-gray-background text-center md:text-left text-2xl">
          <p>
            Important: Even if you qualify with us, you&apos;ll have to qualify
            with The Pollination Project too, who generously funds our grant
            program. Don&apos;t worry, if you don&apos;t qualify for a VH Grant,
            we&apos;ll automatically forward your application to The Pollination
            Project for a general grant.
          </p>
          <p className="mt-4">Learn more about The Pollination Project here:</p>
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
