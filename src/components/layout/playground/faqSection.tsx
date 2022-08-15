import classNames from 'classnames';
import React from 'react';

import SquareField from '../../decoration/squares';

import Accordion from './accordion';

interface FaqSection {
  design?: string;
}

const faqSection: React.FC<FaqSection> = ({ design }) => {
  const faqEntries = [
    {
      headline: 'What is VH: Playground?',
      content:
        'Playground is our public community of diverse vegan developers and designers. Anyone can join this community and apply to help you with your request. Playground is separate from the core team of Vegan Hacktivists with the aim to increase the capacity in which we can help you and others.',
      expanded: true,
    },
    { headline: 'How does it work?', content: '' },
    {
      headline: 'Are people applying to my request qualified?',
      content: '',
    },
    {
      headline:
        'Can I get support from the core VH team of developers and designers?',
      content: '',
    },
  ];
  return (
    <div>
      <SquareField
        squares={[
          {
            color: `${
              design === 'dark'
                ? '#E2E2E2'
                : design === 'light'
                ? '#3D3D3D3D'
                : 'white'
            }`,
            size: 16,
            right: 0,
            top: 0,
          },
        ]}
      />
      <div
        className={classNames(
          design === 'dark'
            ? 'bg-[#3D3D3D]'
            : design === 'light'
            ? 'bg-white'
            : 'bg-grey-background',
          'py-10'
        )}
      >
        <span
          className={classNames(
            design === 'dark' ? 'text-white' : 'text-black',
            'text-3xl font-bold font-mono'
          )}
        >
          Frequently Asked Questions
        </span>
        <div className="mb-4 mt-9">
          <Accordion entries={faqEntries} design={design} />
        </div>
      </div>
    </div>
  );
};

export default faqSection;
