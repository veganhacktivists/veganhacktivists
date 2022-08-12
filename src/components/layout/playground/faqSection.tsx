import SquareField from '../../decoration/squares';

import Accordion from './accordion';

const faqSection: React.FC = () => {
  const faqEntries = [
    {
      headline: 'What is VH: Playground?',
      content:
        'Playground is our public community of diverse vegan developers and designers. Anyone can join this community and apply to help you with your request. Playground is separate from the core team of Vegan Hacktivists with the aim to increase the capacity in which we can help you and others.',
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
      <SquareField squares={[{ color: 'white', size: 16, left: 0, top: 0 }]} />
      <div className="bg-grey-lighter py-10">
        <span className="text-black text-3xl font-bold font-mono">
          Frequently Asked Questions
        </span>
        <div className="mt-9 mb-4">
          <Accordion entries={faqEntries} />
        </div>
      </div>
      <SquareField
        squares={[{ color: '#B6B6B6', size: 16, bottom: 0, left: 0 }]}
      />
    </div>
  );
};

export default faqSection;
