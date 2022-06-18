import { LightButton } from '../../decoration/buttons';
import number1 from '../../../../public/images/grants/VH-grant-number-1.png';
import number2 from '../../../../public/images/grants/VH-grant-number-2.png';
import CustomImage from '../../decoration/customImage';
import type { StaticImageData } from 'next/image';

interface INumberIcons {
  [key: string]: StaticImageData;
}

const NUMBER_ICONS: INumberIcons = {
  '1': number1,
  '2': number2,
};

interface GrantsQualificationsStepProps extends React.PropsWithChildren {
  step: string;
}

const GrantsQualificationsStep: React.FC<GrantsQualificationsStepProps> = ({
  step,
  children,
}) => {
  const numberIcon = NUMBER_ICONS[step];
  return (
    <div className="flex flex-row my-6">
      <div className="w-24 h-24 bg-gray-darker flex-shrink-0 flex items-center justify-center">
        <CustomImage
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
        <p className="mt-12 text-2xl font-thin mb-10">
          <i>
            <b>Don&apos;t meet the two qualifications above?</b> That&apos;s
            okay! You may still be eligible for funding. Please apply directly
            with the Pollination Project.
          </i>
        </p>
        <div className="flex justify-center">
          <LightButton
            href="https://thepollinationproject.org/pre-screen-quiz/"
            className="font-semibold content-center m-5 font-mono md:w-96"
          >
            Apply&nbsp;directly&nbsp;instead
          </LightButton>
        </div>
        <p className="mt-10 text-2xl">
          <b>Otherwise, please continue below to fill out the form with us!</b>
        </p>
      </div>
    </div>
  );
};

export default GrantsQualifications;
