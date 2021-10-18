import React from 'react';
import useThemeColor from '../../../../../hooks/useThemeColor';

interface PatreonGoalProps {
  goalAmount: number;
  goalOrder: number;
  previousAmount?: number;
  goalColor: string;
}

const PatreonGoal: React.FC<PatreonGoalProps> = ({
  goalAmount,
  previousAmount = 0,
  goalColor,
  children,
}) => {
  const percentage = ((goalAmount - previousAmount) / 5000) * 100 + '%';

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
      <div className="w-24 h-full absolute top-[-3px] -right-24 border-white border-t-[3px]" />
    </div>
  );
};

export default PatreonGoal;
