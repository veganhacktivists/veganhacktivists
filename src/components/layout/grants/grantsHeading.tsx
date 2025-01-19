import CustomImage from 'components/decoration/customImage';
import getServerIntl from 'app/intl';

import bee from '~images/grants/VH-icon-bee.png';

interface Props {
  locale: string;
}

const GrantsHeading: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <div className='p-12'>
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
      <h2 className='text-5xl mt-4 font-medium text-gray font-mono uppercase'>
        {intl.formatMessage({
          id: 'page.grants.section.heading.text',
          defaultMessage: 'Seed Funding Grants',
        })}
      </h2>
    </div>
  );
};

export default GrantsHeading;
