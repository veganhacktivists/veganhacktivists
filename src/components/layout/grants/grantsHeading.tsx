import Image from 'next/image';
import bee from '../../../../public/images/grants/VH-icon-bee.png';

const GrantsHeading: React.FC = () => {
  return (
    <div className="p-12">
      <Image
        src={bee.src}
        width={bee.width * 0.5}
        height={bee.height * 0.5}
        alt="A bee, busy pollinating"
        priority
      />
      <h1 className="text-5xl mt-4 font-medium text-gray font-mono uppercase">
        Seed Funding Grants
      </h1>
    </div>
  );
};

export default GrantsHeading;
