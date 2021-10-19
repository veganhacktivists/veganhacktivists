import React from 'react';
import getThemeColor from '../../../../lib/helpers/theme';

export interface PatreonGoalProps {
  goalAmount: number;
  goalOrder: number;
  previousAmount?: number;
  goalColor: string;
  totalAmount: number;
}

const PatreonGoal: React.FC<PatreonGoalProps> = ({
  goalAmount,
  previousAmount = 0,
  goalColor,
  totalAmount,
  children,
}) => {
  const percentage = ((goalAmount - previousAmount) / totalAmount) * 100 + '%';

  return (
    <div
      className="w-36 md:w-auto relative flex flex-col items-end z-10 box-border border-white border-r-[3px] text-right px-4"
      style={{ width: percentage }}
    >
      <div className="h-24 md:h-36 w-full">
        <h1
          className="font-mono text-4xl md:text-5xl mb-2"
          style={{ color: getThemeColor(goalColor) }}
        >
          &euro;{goalAmount.toLocaleString('en-US')}
        </h1>
        <p className="text-lg md:text-xl text-white">{children}</p>
      </div>
      <div className="h-24" />
    </div>
  );
};

export default PatreonGoal;
