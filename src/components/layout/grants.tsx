import Image from 'next/image';
import blogCow from '../../../public/images/Blog-cow.jpg';
import grantsImage from '../../../public/images/grants/VH-hero-grants.jpg';
import { DarkButton } from '../decoration/buttons';

const Grants: React.FC = () => {
  return (
    <div className="bg-gray-background pt-16 pb-16 space-y-0 pb-12">
	<div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pt-16">
      <div className="w-2/4 inline-block">
        <div className="bg-white">
          <div className="overflow-hidden w-full h-40">
            <Image
              src={grantsImage.src}
              width={grantsImage.width / 2}
              height={grantsImage.height / 2}
              className="w-full bg-cover"
              alt="Compassion, Creativity, Code"
            />
          </div>
          <div className="text-left ml-12 break-words max-w-sm pb-8">
            <p className="mb-12 text-grey-dark pt-16">
              <b className="text-5xl font-mono font-semibold">APPLY FOR A VH SEED GRANT</b>
            </p>
            <p className="mb-12 text-2xl">
              We&apos;re excited to offer up to $1000 USD in seed funding grants!
            </p>
            <DarkButton>Apply now!</DarkButton>
          </div>
        </div>
      </div>
      <div className="w-2/4 inline-block">
        <div className="bg-white">
          <div className="overflow-hidden w-full h-40">
            <Image
              src={grantsImage.src}
              width={grantsImage.width / 2}
              height={grantsImage.height / 2}
              className="w-full bg-cover"
              alt="Compassion, Creativity, Code"
            />
          </div>
          <div className="text-left ml-12 break-words max-w-sm pb-8">
            <p className="mb-12 text-grey-dark pt-16">
              <b className="text-5xl font-mono font-semibold">OUR ANNUAL IMPACT REVIEW</b>
            </p>
            <p className="mb-12 text-2xl">
              Check out our latest impact review that covers the work we did in 2020!
            </p>
            <DarkButton>See the review!</DarkButton>
          </div>
        </div>
      </div>
    </div>
	</div>
  );
};

export default Grants;
