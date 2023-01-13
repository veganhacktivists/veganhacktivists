import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

interface Change {
  icon: string;
  text: string;
}

const changes: Change[] = [
  {
    icon: '🥒',
    text: 'Designed a new UX process that drives project ideation from start to finish',
  },
  {
    icon: '🍎',
    text: 'Featured in interviews  by Our Hen House, Animal Justice Academy, and Vegan FTA',
  },
  {
    icon: '🍊',
    text: 'Participated in LEAD Conference, and presented at CARE Conference and AVA Summit',
  },
  {
    icon: '🥦',
    text: 'Utilized and launched a machine learning and artificial intelligence project',
  },
  {
    icon: '🥥',
    text: 'Created a Communications team that handles our content, social, and marketing strategy',
  },
  {
    icon: '🍍',
    text: 'Expanded our services to support design requests (logo, branding, and identity)',
  },
  {
    icon: '🍇',
    text: 'Created an animation team to showcase our work and as a service to others in the movement',
  },
  {
    icon: '🍠',
    text: 'Collaborated with various Reddit communities to prominently feature WatchDominion.org',
  },
  {
    icon: '🍑',
    text: 'Developed a DevOps team to manage our servers and technical infrastructure',
  },
  {
    icon: '🥝',
    text: 'Launched two new blog series, Leaders in Animal Protection and Byte Size',
  },
  {
    icon: '🥬',
    text: 'Created specialized roles, both among our core team and for platforms like Squarespace and Wordpress',
  },
  {
    icon: '🌽',
    text: 'Designed a book for Sentient Media and formed a partnership with its programs',
  },
  {
    icon: '🌶️ ',
    text: 'Connected Faunalytics, We Animals Media, Black Veg Society, and 20+ others with volunteers',
  },
  {
    icon: '🥔',
    text: 'Welcomed new advisors, Andrea Gunn and Christopher Eubanks, to our advisory board',
  },
];

const MinorChangesBigImpact: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[{ color: 'grey', size: 16, right: 0, bottom: 0 }]}
        className="hidden md:block"
      />
      <SectionContainer
        circles
        color="grey-dark"
        className="text-white"
        header={
          <SectionHeader
            newDesign={true}
            header={['Minor changes with', 'big impact']}
          />
        }
      >
        <div className="mx-auto text-2xl md:w-2/3 space-y-3 mt-20 mb-20">
          {changes.map(({ icon, text }) => (
            <div
              key={icon}
              className="flex flex-col md:flex-row gap-x-2 w-full justify-start"
            >
              <div className="text-3xl">{icon}</div>
              <div className="md:text-left">{text}</div>
            </div>
          ))}
        </div>
      </SectionContainer>
      <SquareField
        squares={[{ color: 'grey', size: 16, left: 0, top: 0 }]}
        className="hidden md:block"
      />
    </>
  );
};

export default MinorChangesBigImpact;
