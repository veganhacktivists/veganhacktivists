import React from 'react';

import SquareField from '../../../decoration/squares';

import AnimatedBar from './animatedBar';
import MobileProgressBar from './mobile';
import PatreonGoal from './patreonGoal';
import TickMarks from './tickMarks';

export interface ProgressBarProps {
  currentAmount: number;
  goal: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentAmount, goal }) => {
  return (
    <>
      <div className="hidden md:block max-w-6xl mx-8 xl:mx-auto relative mb-48">
        <div className="h-24 w-full bg-grey absolute bottom-0">
          <SquareField
            squares={[
              { top: 0, left: 0, color: 'black', size: 10, opacity: 30 },
              { top: 0, right: 0, color: 'black', size: 10, opacity: 30 },
            ]}
            className="relative z-10"
          />
          <AnimatedBar current={currentAmount} goal={5000} />
        </div>
        <TickMarks />
        <div className="flex flex-row items-end w-full">
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
            Needed to cover minimum salaries
          </PatreonGoal>
          <PatreonGoal
            goalAmount={185000}
            previousAmount={40000}
            goalColor="orange"
            goalOrder={3}
            totalAmount={goal}
          >
            Marketing, subscriptions and trainings
          </PatreonGoal>
          <PatreonGoal
            goalAmount={210000}
            previousAmount={185000}
            goalColor="magenta"
            goalOrder={4}
            totalAmount={goal}
          >
            Needed for stipends to volunteers
          </PatreonGoal>
        </div>
      </div>
      <MobileProgressBar currentAmount={currentAmount} goal={185000} />
    </>
  );
};

export default ProgressBar;
