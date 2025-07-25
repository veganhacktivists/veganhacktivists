import type React from 'react';

import getThemeColor from '../../../../../lib/helpers/theme';

import type { PatreonGoalProps } from '../patreonGoal';

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
      className="relative z-20 box-border border-white border-t-[3px] text-left"
      style={{ height: percentage }}
    >
      <div>
        <h1
          className="mb-2 font-mono text-4xl md:text-5xl"
          style={{ color: getThemeColor(goalColor) }}
        >
          &#36;{goalAmount.toLocaleString('en-US')}
        </h1>
        <p className="mb-2 text-lg text-white">{children}</p>
      </div>
      <div className="w-full h-full absolute top-[-3px] right-[-15vw] border-white border-t-[3px]" />
    </div>
  );
};

export default PatreonGoal;
