import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

interface Change {
  icon: string;
  text: string;
}

const changes: Change[] = [
  {
    icon: '🍎',
    text: 'Created guidelines around brand, design, and content',
  },
  {
    icon: '🥝',
    text: 'Incorporated new technologies including Docker, LaravelShift, Vue, Tailwind, React, Svelte, and more.',
  },
  {
    icon: '🌽',
    text: 'Introduced a system to collect regular feedback from our advisory board',
  },
  {
    icon: '🥔',
    text: 'Added three new courses to Vegan Bootcamp',
  },
  {
    icon: '🌶️',
    text: 'Streamlined our volunteer application process',
  },
  {
    icon: '🥒',
    text: 'Presented Vegan Linguists at 2021 Animal Advocacy Conference Asia',
  },
  {
    icon: '🍊',
    text: 'Launched a community voting channel on our Discord server',
  },
  {
    icon: '🍋',
    text: 'Leveraged external platforms, such as Reddit and Twitter, to promote our services',
  },
  {
    icon: '🍍',
    text: 'Added localization to projects for more accurate and clearer translations',
  },
  {
    icon: '🍐',
    text: 'Started hosting weekly office hours for our team to chat, work, and play',
  },
];

const MinorChangesBigImpact: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[
          { color: 'black', size: 16, left: 0, bottom: 0 },
          { color: 'grey', size: 16, left: 0, top: 0 },
          { color: 'grey-light', size: 16, right: 0, bottom: 0 },
          { color: 'grey', size: 16, right: 0, top: 0 },
        ]}
        className="hidden md:block"
      />
      <SectionContainer
        circles
        color="grey-dark"
        className="text-white"
        header={
          <SectionHeader header={['Minor changes with a', 'big impact']} />
        }
      >
        <div className="mx-auto text-2xl md:w-2/3 space-y-3 mb-10">
          {changes.map(({ icon, text }) => (
            <div
              key={icon}
              className="flex flex-col md:flex-row gap-x-10 w-full justify-start"
            >
              <div className="text-4xl">{icon}</div>
              <div className="md:text-left">{text}</div>
            </div>
          ))}
        </div>
      </SectionContainer>
      <SquareField
        squares={[
          { color: 'grey', size: 16, left: 0, top: 0 },
          { color: 'grey-lighter', size: 16, right: 0, bottom: 0 },
          { color: 'grey', size: 16, right: 0, top: 0 },
        ]}
        className="hidden md:block"
      />
    </>
  );
};

export default MinorChangesBigImpact;
