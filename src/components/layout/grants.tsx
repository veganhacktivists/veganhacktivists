import Image from 'next/image';
import blogCow from '../../../public/images/Blog-cow.jpg';
import { DarkButton } from '../decoration/buttons';

const Grants: React.FC = () => {
  return (
    <div className="bg-grey space-y-0 pb-12">
      <div className="inline-block">
        <div className="mx-auto bg-white">
          <div className="overflow-hidden w-full">
            <Image
              src={blogCow.src}
              width={blogCow.width / 2}
              height={blogCow.height / 2}
              className="w-full bg-cover"
              alt="Compassion, Creativity, Code"
            />
          </div>
          <div className="text-left ml-12 break-words max-w-sm pb-8">
            <p className="mb-12 text-grey-dark pt-16">
              <b className="text-5xl font-mono">APPLY FOR A GRANT</b>
            </p>
            <p className="mb-12 font-semibold text-2xl">
              Lorem ipsum dolor sit amen consecitur adispicing elit
            </p>
            <DarkButton>APPLY NOW</DarkButton>
          </div>
        </div>
      </div>
      <div className="inline-block">
        <div className="mx-auto bg-white">
          <div className="overflow-hidden w-full">
            <Image
              src={blogCow.src}
              width={blogCow.width / 2}
              height={blogCow.height / 2}
              className="w-full bg-cover"
              alt="Compassion, Creativity, Code"
            />
          </div>
          <div className="text-left ml-12 break-words max-w-sm pb-8">
            <p className="mb-12 text-grey-light pt-16">
              <b className="text-5xl font-mono">OUR ANNUAL IMPACT REVIEW</b>
            </p>
            <p className="mb-12 font-semibold text-2xl">
              Lorem ipsum dolor sit amen consecitur adispicing elit
            </p>
            <DarkButton>SEE THE REVIEW</DarkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grants;
