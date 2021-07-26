import Image from 'next/image';
import { LightButton } from 'components/decoration/buttons';
import PollinationProjectLogo from '../../../../public/images/grants/PollinationProject-Logo.jpg';

const IMAGE_DIMENSION = PollinationProjectLogo.height * 0.71;

const GrantsPollinationProject: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-row mt-24">
      <div className="shrink-0">
        <Image
          src={PollinationProjectLogo.src}
          width={IMAGE_DIMENSION}
          height={IMAGE_DIMENSION}
          alt="Logo of The Pollination Project"
        />
      </div>
      <div
        style={{ height: `${IMAGE_DIMENSION}px` }}
        className="flex-1 py-8 px-10 bg-gray-background text-left text-2xl"
      >
        <p>
          Important: Even if you qualify with us, you&apos;ll have to qualify
          with The Pollination Project too, who generously funds our grant
          program. Don&apos;t worry, if you don&apos;t qualify for a VH Grant,
          we&apos;ll automatically forward your application to The Pollination
          Project for a general grant.
        </p>
        <p className="mt-4">Learn more about The Pollination Project here:</p>
        <LightButton
          className="mt-6 font-mono text-md font-bold inline-block"
          href="https://thepollinationproject.com"
        >
          THEPOLLINATIONPROJECT.COM
        </LightButton>
      </div>
    </div>
  );
};

export default GrantsPollinationProject;
