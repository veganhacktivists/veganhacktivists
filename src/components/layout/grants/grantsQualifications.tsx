import { FormattedMessage } from 'react-intl';

import number1 from '../../../../public/images/grants/VH-grant-number-1.png';
import number2 from '../../../../public/images/grants/VH-grant-number-2.png';

import CustomImage from 'components/decoration/customImage';

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
          alt={'Step ' + step}
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
          <FormattedMessage
            id="page.grants.section.qualifications.heading"
            defaultMessage="Before applying, make sure you meet these qualifications:"
          />
        </h3>
        <GrantsQualificationsStep step="1">
          <FormattedMessage
            id="page.grants.section.qualifications.steps.paragraph.0"
            defaultMessage="<b> Your primary goal </b> should focus on reducing farmed animal suffering. Factory farming causes over 100 billion animals to suffer deprivation, fear, and pain every year."
            values={{
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </GrantsQualificationsStep>
        <GrantsQualificationsStep step="2">
          <FormattedMessage
            id="page.grants.section.qualifications.steps.paragraph.1"
            defaultMessage="<b> You must have </b> prior activism experience, whether in animal rights or other social movements. We're looking for people who have worked on and contributed to grassroots campaigns and/or projects, in a paid or volunteer capacity."
            values={{
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </GrantsQualificationsStep>
        <p className="mt-12 text-2xl font-thin">
          <i>
            <FormattedMessage
              id="page.grants.section.qualifications.cta.paragraph.0"
              defaultMessage="<b>Don't meet the qualifications above?</b> You may still be eligible for funding! Apply and we'll forward your application to other potential funders."
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </i>
        </p>
        <p className="mt-10 mb-4 text-2xl">
          <b>
            <FormattedMessage
              id="page.grants.section.qualifications.cta.paragraph.1"
              defaultMessage="If you meet the qualifications, fill out the application form below."
            />
          </b>
        </p>
      </div>
    </div>
  );
};

export default GrantsQualifications;
