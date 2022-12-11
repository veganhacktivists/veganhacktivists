import React from 'react';

import SquareField from '../../../../decoration/squares';

import AnimatedBar from './animatedBar';
import PatreonGoal from './patreonGoal';
import TickMarks from './tickMarks';

import type { ProgressBarProps } from '..';

const MobileProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  goal,
}) => {
  return (
    <div className="overflow-hidden py-2">
      <div className="md:hidden relative h-[600px] flex flex-row justify-center">
        <div className="flex flex-col-reverse h-full w-40">
          <PatreonGoal
            goalAmount={15000}
            goalColor="yellow"
            goalOrder={1}
            totalAmount={goal}
          >
            Needed to cover basic operational expenses
          </PatreonGoal>
          <PatreonGoal
            goalAmount={40000}
            previousAmount={15000}
            goalColor="yellow-orange"
            goalOrder={2}
            totalAmount={goal}
          >
            Marketing, subscriptions and trainings
          </PatreonGoal>
          <PatreonGoal
            goalAmount={185000}
            previousAmount={40000}
            goalColor="orange"
            goalOrder={3}
            totalAmount={goal}
          >
            Needed for stipends to volunteers
          </PatreonGoal>
          <PatreonGoal
            goalAmount={210000}
            previousAmount={185000}
            goalColor="magenta"
            goalOrder={4}
            totalAmount={goal}
          >
            Needed to cover minimum salaries
          </PatreonGoal>
        </div>
        <div className="h-full w-[15vw] bg-grey relative">
          <AnimatedBar current={currentAmount} goal={goal} />
          <SquareField
            squares={[
              { top: 0, left: 0, color: 'black', size: 5, opacity: 30 },
              { bottom: 0, right: 0, color: 'black', size: 5, opacity: 30 },
              { top: 0, right: 0, color: 'black', size: 5, opacity: 30 },
              { bottom: 0, left: 0, color: 'black', size: 5, opacity: 30 },
            ]}
            className="relative z-10 h-full"
          />
          <TickMarks />
        </div>
        <div className="w-36" />
      </div>
    </div>
  );
};

export default MobileProgressBar;
