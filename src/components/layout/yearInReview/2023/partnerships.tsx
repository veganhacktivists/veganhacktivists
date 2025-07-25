import { FormattedMessage } from 'react-intl';

import SquareField from 'components/decoration/squares';

const TOP_DECORATION_SQUARES = [
  { color: 'white', size: 16, right: 0, top: 0 },
  { color: 'pink-dark', size: 16, left: 0, top: 0 },
];

const Partnerships: React.FC = () => (
  <>
    <SquareField squares={TOP_DECORATION_SQUARES} className="hidden md:block" />

    <div className="bg-magenta flex flex-col lg:flex-row justify-center md:first-letter:flex-wrap md:py-16 p-5 py-16">
      <div className="items-center flex-wrap text-white text-3xl sm:text-6xl font-mono justify-center font-light uppercase">
        <FormattedMessage
          id="page.year-in-review.2023.section.partnership.content"
          defaultMessage="Creating <b>partnerships</b> & creating <b>impact</b>"
          values={{
            b: (chunks) => <b>{chunks}</b>,
          }}
        />
      </div>
    </div>
  </>
);
export default Partnerships;
