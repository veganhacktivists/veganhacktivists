import bee from '../../../../public/images/grants/VH-icon-bee.png';
import CustomImage from '../../decoration/customImage';

const GrantsHeading: React.FC = () => {
  return (
    <div className="p-12">
      <CustomImage
        src={bee.src}
        width={bee.width * 0.5}
        height={bee.height * 0.5}
        alt="A bee, busy pollinating"
        priority
      />
      <h2 className="text-5xl mt-4 font-medium text-gray font-mono uppercase">
        Seed Funding Grants
      </h2>
    </div>
  );
};

export default GrantsHeading;
