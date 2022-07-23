import React from 'react';

import getThemeColor from '../../../../lib/helpers/theme';

export interface PatreonGoalProps extends React.PropsWithChildren {
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
  const percentage = `${((goalAmount - previousAmount) / totalAmount) * 100}%`;

  return (
    <div
      className="w-36 md:w-auto relative flex flex-col items-end z-10 box-border border-white border-r-[3px] text-right px-4"
      style={{ width: percentage }}
    >
      <div className="w-full h-24 md:h-36">
        <h1
          className="mb-2 font-mono text-4xl md:text-5xl"
          style={{ color: getThemeColor(goalColor) }}
        >
          &#36;{goalAmount.toLocaleString('en-US')}
        </h1>
        <p className="text-lg text-white md:text-xl">{children}</p>
      </div>
      <div className="h-24" />
    </div>
  );
};

export default PatreonGoal;
