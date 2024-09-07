import { FormattedMessage } from 'react-intl';

import SectionContainer from '../sectionContainer';
import { HighlightBlock } from '../highlightBlock';

import SquareField from 'components/decoration/squares';

const Intro: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[
          { size: 16, right: 0, top: 0, color: 'grey-background' },
          { size: 16, right: 0, bottom: 0, color: 'grey-light' },
          { size: 16, left: 0, bottom: 0, color: 'white' },
        ]}
        className='hidden md:block z-10'
      />
      <SectionContainer>
        <div>
          <HighlightBlock
            borderColor='magenta'
            headerStart='We ventured out to'
            headerBold='share what we know'
          >
            <FormattedMessage
              id='page.year-in-review.2023.section.providing-value.we-ventured.paragraph'
              defaultMessage='<b>We leaned into our strength of harnessing technology and building communities</b> to help animals, and shared our expertise across a multitude of events. From speaking about volunteer management to leading talks on utilizing AI in advocacy work, we stepped forward to ensure that more organizations could use this knowledge for change.'
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </HighlightBlock>
          <HighlightBlock
            borderColor='yellow'
            headerStart='We built projects to'
            headerBold='grow and expend the movement'
          >
            <FormattedMessage
              id='page.year-in-review.2023.section.providing-value.we-built.paragraph'
              defaultMessage='<b>2023 was the year we finalized projects long awaiting their spotlight.</b> We targeted vegans eager to get active for animals in their everyday lives and launched a tool that transformed grantmaking processes crucial for organizations to sustain and advance their work.'
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </HighlightBlock>
          <HighlightBlock
            borderColor='green'
            headerStart='We commited to'
            headerBold='major changes'
            headerEnd='within our org'
          >
            <FormattedMessage
              id='page.year-in-review.2023.section.providing-value.we-committed.paragraph'
              defaultMessage='<b>With shifts in our leadership and plans for new programs</b>, we dived into a new chapter at <no-localization>VH</no-localization>. This entailed welcoming a new Executive Director for <no-localization>VH</no-localization>, as well as preparing for the evolution of one of our teams into a realm of stronger branding and focus.'
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </HighlightBlock>
        </div>
      </SectionContainer>
    </>
  );
};

export default Intro;
