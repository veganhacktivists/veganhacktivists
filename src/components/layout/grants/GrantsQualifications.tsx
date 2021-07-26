import Image from 'next/image';
import number1 from '../../../../public/images/grants/VH-grant-number-1.png';
import number2 from '../../../../public/images/grants/VH-grant-number-2.png';

interface INumberIcons {
  [key: string]: StaticImageData;
}

const NUMBER_ICONS: INumberIcons = {
  '1': number1,
  '2': number2,
};

interface GrantsQualificationsStepProps {
  step: string;
  children: React.ReactNode;
}

const GrantsQualificationsStep: React.FC<GrantsQualificationsStepProps> = ({
  step,
  children,
}) => {
  const numberIcon = NUMBER_ICONS[step];
  return (
    <div className="flex flex-row my-6">
      <div className="w-24 h-24 bg-gray-darker flex-shrink-0 flex items-center justify-center">
        <Image
          src={numberIcon.src}
          height={numberIcon.height * 0.35}
          width={numberIcon.width * 0.35}
          alt="Step 1"
          className="self-center"
        />
      </div>
      <p className="text-white text-2xl text-left ml-8">{children}</p>
    </div>
  );
};

const GrantsQualifications: React.FC = () => {
  return (
    <div className="p-12 bg-gray-dark">
      <div className="max-w-screen-md mx-auto text-white">
        <h3 className="text-3xl font-semibold mb-10 mt-12">
          Before applying, make sure you meet these qualifications:
        </h3>
        <GrantsQualificationsStep step="1">
          <b> Your primary goal </b> should focus on reducing farmed animal
          suffering. Factory farming causes over 100 billion animals to suffer
          deprivation, fear, and pain every year.
        </GrantsQualificationsStep>
        <GrantsQualificationsStep step="2">
          <b> You must have </b> some prior animal rights or other types of
          activism experience. We&apos;re looking for people who&apos;ve run or
          contributed to projects, or with volunteer history.
        </GrantsQualificationsStep>
        <p className="mt-12 text-2xl font-thin">
          <i>
            Ideally, we love funding people that have a plan to utilize
            technology in their projects!
          </i>
        </p>
        <p className="mt-12 text-2xl">
          <b>
            If this sounds good, we&apos;d love to hear from you!{' '}
            <a
              className="underline"
              href="https://www.google.com" // TODO
              target="_blank"
              rel="noreferrer"
            >
              Apply here
            </a>
            .
          </b>
        </p>
      </div>
    </div>
  );
};

export default GrantsQualifications;
