import React from 'react';
import type { ProgressBarProps } from '..';
import SquareField from '../../../../decoration/squares';
import AnimatedBar from './animatedBar';
import PatreonGoal from './patreonGoal';
import TickMarks from './tickMarks';

const MobileProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  goal,
}) => {
  return (
    <div className="overflow-hidden py-2">
      <div className="md:hidden relative h-[600px] flex flex-row justify-center">
        <div className="flex flex-col-reverse h-full w-40">
          <PatreonGoal
            goalAmount={1353}
            goalColor="yellow"
            goalOrder={1}
            totalAmount={goal}
          >
            Needed to cover operational expenses
          </PatreonGoal>
          <PatreonGoal
            goalAmount={2500}
            previousAmount={1353}
            goalColor="yellow-orange"
            goalOrder={2}
            totalAmount={goal}
          >
            Can afford more useful services and tech
          </PatreonGoal>
          <PatreonGoal
            goalAmount={3750}
            previousAmount={2500}
            goalColor="orange"
            goalOrder={3}
            totalAmount={goal}
          >
            We can ramp up value and services offered
          </PatreonGoal>
          <PatreonGoal
            goalAmount={5000}
            previousAmount={3750}
            goalColor="magenta"
            goalOrder={4}
            totalAmount={goal}
          >
            Self-Sustainable Goal
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
