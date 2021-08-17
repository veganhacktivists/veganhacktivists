import classNames from 'classnames';
import Image from 'next/image';
import SquareField from './decoration/squares';

interface InfoBoxProps {
  align?: 'left' | 'right';
  children: React.ReactNode;
  icon: StaticImageData;
  iconAccentColor: string;
  iconBgColor: string;
  title: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  align = 'left',
  children,
  icon,
  iconAccentColor,
  iconBgColor,
  title,
}) => {
  return (
    <div
      className={classNames(
        'flex w-full xl:w-3/5 mx-auto flex-row flex-wrap group',
        align === 'right' && 'flex-row-reverse'
      )}
    >
      <div className={`flex flex-col w-full md:max-w-xs bg-${iconBgColor}`}>
        <div className="transition ease-in duration-300 opacity-0 group-hover:opacity-100">
          <SquareField
            squares={[{ color: iconAccentColor, size: 16, top: 0, right: 0 }]}
          />
        </div>
        <div className="p-10 my-auto w-full">
          <Image src={icon} layout="responsive" alt="" />
        </div>
      </div>
      <div className="flex-1 py-8 px-3 md:px-10 bg-gray-background text-center md:text-left text-2xl p-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
