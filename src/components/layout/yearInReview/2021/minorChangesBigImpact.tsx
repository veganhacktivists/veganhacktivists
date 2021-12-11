import { SectionHeader } from '../../../decoration/textBlocks';

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
      <div className="bg-grey-dark pt-10 pb-20 text-white">
        <SectionHeader
          header={['Minor changes with a', 'big impact']}
          startWithItalics
        />
        <div className="mx-auto w-2/3">
          {changes.map(({ icon, text }) => (
            <div
              key={icon}
              className="flex flex-col md:flex-row gap-x-5 w-full justify-start"
            >
              <div>{icon}</div>
              <div>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MinorChangesBigImpact;
