import { FormattedMessage } from 'react-intl';

const GrantsSubHeading: React.FC = () => {
  return (
    <div className="p-12 bg-yellow">
      <p className="text-2xl max-w-screen-md font-mono text-center mx-auto" />
      <FormattedMessage
        id="page.grants.section.subheading"
        defaultMessage="We're very happy to be able to offer up to <b>$1000 USD in seed funding grants</b> for oustanding, and effective, animal rights activism! Specifically we're looking for individual or grassroots groups whose primary purpose is to help reduce suffering for non-human farmed animals."
        values={{
          b: (chunks) => <b>{chunks}</b>,
        }}
      />
    </div>
  );
};

export default GrantsSubHeading;
