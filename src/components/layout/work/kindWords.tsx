import Sprite, { cow } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import getThemeColor from 'lib/helpers/theme';

const BOTTOM_DECORATION_SQUARES = [
  {
    bottom: 0,
    left: 0,
    color: '#BCBCBC',
    size: 16,
  },
  {
    bottom: 0,
    right: 0,
    color: '#DDDDDD',
    size: 16,
  },
];

type QuoteProps = React.PropsWithChildren<{
  author: string;
  company: string;
  color?: string;
}>;

const Quote = ({ author, company, children, color }: QuoteProps) => {
  return (
    <div
      className="text-left border-l-8 pl-9"
      style={{
        borderColor: color,
      }}
    >
      <div className="italic mb-4">{children}</div>
      <div className="font-bold">{author}</div>
      <div>{company}</div>
    </div>
  );
};

const quotes: QuoteProps[] = [
  {
    company: 'Mercy for Animals',
    author: 'Courtney Dillard',
    children:
      'What impresses me most about the Vegan Hacktivists is their high level of critical thinking in terms of ideation and their consistent follow through. This has resulted in several high level deliverables I have been able to use and highly recommended to others.',
  },
  {
    author: 'Ben Williamson',
    company: 'Compassion In World Farming',
    children:
      'I’m really excited by the potential Vegan Hacktivists have for the animal protection movement. Progress is full of tipping points, and I’m sure at least one of these lives within a technological solution offered by this skilled community of advocates.',
  },
  {
    company: 'The Pollination Project',
    author: 'AJ Dahiya',
    children:
      'Vegan Hacktivists is an innovative organization leveraging technology to make a large-scale impact for the rights and dignity of animals. They have gone above and beyond in supporting our organization with their expertise. Their work is extremely needed and on the cutting edge for the time we live in.',
  },
  {
    company: 'Faunalytics',
    author: 'Brooke Haggerty',
    children:
      'Vegan Hacktivists is a hidden gem in the animal protection movement. They are capacity builders, dedicated to supporting other animal advocates. We’ve been fortunate enough to receive their help with several behind the scenes projects, and I’m constantly impressed with their passion and professionalism.',
  },
];

const quoteColors = [
  getThemeColor('broccoli'),
  getThemeColor('carrot'),
  getThemeColor('banana'),
  getThemeColor('watermelon'),
];

const KindWords: React.FC = () => {
  return (
    <>
      <div className="relative w-full overflow-hidden text-2xl bg-white">
        <div className="relative flex flex-col px-2 py-20 mx-auto w-3/4 gap-y-8">
          <SectionHeader className="mb-2" header={['Some', 'KIND WORDS']} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-32 gap-y-20">
            {quotes.map((quote, i) => (
              <Quote key={quote.author} {...quote} color={quoteColors[i]} />
            ))}
          </div>
        </div>
      </div>

      <Sprite image={cow} pixelsLeft={0} pixelsRight={0} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default KindWords;
