import React from 'react';
import { NavButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';
import { FirstSubSection } from '../../decoration/textBlocks';

interface YearButtonProps {
  year: number;
}

const YearButton: React.FC<YearButtonProps> = ({ year }) => {
  return (
    <NavButton className="w-48 font-bold" href={`/year-in-review/${year}`}>
      {year}
    </NavButton>
  );
};

const YearInReviewButtons: React.FC = () => {
  return (
    <div>
      <div className="mb-15 pb-10 mt-10 flex justify-center flex-wrap">
        {[2020, 2021].map((year) => (
          <YearButton key={year} year={year} />
        ))}
      </div>
    </div>
  );
};

interface YearInReviewHeaderProps {
  year: number;
  hero: React.ReactNode;
}

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },

  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

export const YearInReviewHeader: React.FC<YearInReviewHeaderProps> = ({
  year,
  hero,
}) => {
  return (
    <div className="bg-grey-background">
      {hero}
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <FirstSubSection header={`Our ${year} year in review`} firstWordsNum={2}>
        We&apos;re so happy to release our {year} year in review! Scroll down to
        see all our accomplishments we&apos;ve made thanks to your generous
        support, our partners, and most of all our amazing volunteers!
      </FirstSubSection>
      <YearInReviewButtons />
    </div>
  );
};

export default YearInReviewHeader;
