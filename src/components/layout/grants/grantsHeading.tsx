import { FormattedMessage, useIntl } from 'react-intl';

import bee from '../../../../public/images/grants/VH-icon-bee.png';

import CustomImage from 'components/decoration/customImage';

const GrantsHeading: React.FC = () => {
  const intl = useIntl();
  return (
    <div className="p-12">
      <CustomImage
        src={bee.src}
        width={bee.width * 0.5}
        height={bee.height * 0.5}
        alt={intl.formatMessage({
          id: 'page.grants.section.heading.image.alt-text',
          defaultMessage: 'A bee, busy pollinating',
        })}
        priority
      />
      <h2 className="text-5xl mt-4 font-medium text-gray font-mono uppercase">
        <FormattedMessage
          id="page.grants.section.heading.text"
          defaultMessage="Seed Funding Grants"
        />
      </h2>
    </div>
  );
};

export default GrantsHeading;
