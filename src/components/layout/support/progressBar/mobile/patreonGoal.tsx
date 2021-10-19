import React from 'react';
import useThemeColor from '../../../../../hooks/useThemeColor';
import type { PatreonGoalProps } from '../patreonGoal';

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
      className="relative z-20 box-border border-white border-t-[3px] text-left"
      style={{ height: percentage }}
    >
      <div>
        <h1
          className="font-mono text-4xl md:text-5xl mb-2"
          style={{ color: useThemeColor(goalColor) }}
        >
          &euro;{goalAmount.toLocaleString('en-US')}
        </h1>
        <p className="text-lg text-white mb-2">{children}</p>
      </div>
      <div className="w-full h-full absolute top-[-3px] right-[-15vw] border-white border-t-[3px]" />
    </div>
  );
};

export default PatreonGoal;
