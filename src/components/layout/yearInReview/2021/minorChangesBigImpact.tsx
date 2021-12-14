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
    text: 'We opened up a community voting channel in our work discord.',
  },
  {
    icon: '🥝',
    // TODO: Vue??
    text: 'We utilized several new technologies: Docker, LaravelShift, Vue, Tailwind, and more.',
  },
  {
    icon: '🌽',
    text: 'We now have a design structure, brand guides, and content guidelines.',
  },
  {
    icon: '🥔',
    text: 'We now gather detailed feedback from our advisory board every month.',
  },
  {
    icon: '🌶️',
    text: 'We presented Vegan Linguists at 2021 Animal Advocacy Conference Asia!',
  },
  {
    icon: '🥒',
    text: 'We added three new courses to our Vegan Bootcamp program!',
  },
  {
    icon: '🍊',
    // TODO: this phrasing is weird (to me, the non native english speaker)
    text: 'We moved away from Googe Translate and use human-traslations!',
  },
  {
    icon: '🍋',
    text: 'We streamlined our applications process into one easy to fill out form for new volunteers.',
  },
  {
    icon: '🍍',
    // TODO: this text feels like a TODO
    text: 'We started a series of interviews with farmed animal leaders with the goal of providing value.',
  },
  {
    icon: '🍐',
    text: 'We now have weekly office hours for every team where team leads are avaliable to chat, work or play.',
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
        <div className="mx-auto text-3xl w-2/3 space-y-3">
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
