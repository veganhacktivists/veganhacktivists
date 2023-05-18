import SquareField from 'components/decoration/squares';

const TOP_DECORATION_SQUARES = [
  {
    top: 0,
    left: 0,
    color: '#d31679',
    size: 16,
  },
];

const BOTTOM_DECORATION_SQUARES = [
  {
    bottom: 0,
    right: 0,
    color: '#d31679',
    size: 16,
  },
];

const HoursVolunteered: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-2xl bg-white">
        <div>
          <div className="bg-magenta flex flex-row flex-wrap p-12 px-2">
            <div className="flex items-center flex-wrap w-full md:w-1/2 text-white text-8xl font-mono px-2 justify-center">
              <span className="font-bold">9600+</span>{' '}
              <span className="uppercase font-light">Hours</span>
            </div>
            <div className="flex items-center flex-wrap w-full md:w-1/2 text-white text-3xl font-serif italic font-bold  text-center md:text-left px-2 justify-center">
              volunteered in 2022 for the animal protection movement
            </div>
          </div>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default HoursVolunteered;
