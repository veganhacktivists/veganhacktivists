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
      {design !== 'light' && (
        <SquareField
          squares={[{ color: 'white', size: 16, left: 0, top: 0 }]}
        />
      )}
      {design === 'light' && (
        <SquareField
          squares={[{ color: '#3D3D3D3D', size: 16, right: 0, top: 0 }]}
        />
      )}
      <div
        className={`${
          design === 'dark'
            ? 'bg-[#3D3D3D]'
            : design === 'light'
            ? 'bg-white'
            : 'bg-grey-background'
        } py-10`}
      >
        <span
          className={`${
            design === 'dark' ? 'text-white' : 'text-black'
          } text-3xl font-bold font-mono`}
        >
          Frequently Asked Questions
        </span>
        <div className="mt-9 mb-4">
          <Accordion entries={faqEntries} design={design} />
        </div>
      </div>
      {design !== 'light' && design !== 'dark' && (
        <SquareField
          squares={[{ color: '#B6B6B6', size: 16, bottom: 0, left: 0 }]}
        />
      )}
    </div>
  );
};

export default faqSection;
