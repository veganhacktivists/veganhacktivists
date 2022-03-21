import { WhiteButton } from '../../decoration/buttons';

interface YearSelectorProps {
  years: number[];
  selectedYear: number | null;
  onChange: (year: number | null) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  years,
  selectedYear,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap place-content-center justify-center text-xl mb-20">
      <div className="m-1">
        <WhiteButton
          className="w-40 uppercase flex-1"
          active={selectedYear === null}
          type="button"
          onClick={() => {
            onChange(null);
          }}
        >
          View all
        </WhiteButton>
      </div>
      {years.map((year) => (
        <div className="m-1" key={year}>
          <WhiteButton
            key={year}
            className="w-40 flex-1"
            type="button"
            onClick={() => {
              onChange(year);
            }}
            active={selectedYear === year}
          >
            {year}
          </WhiteButton>
        </div>
      ))}
    </div>
  );
};

export default YearSelector;
