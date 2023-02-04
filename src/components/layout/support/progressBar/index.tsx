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
          <AnimatedBar current={currentAmount} goal={1000} />
        </div>
        <TickMarks />
        <div className="flex flex-row items-end w-full">
          <PatreonGoal
            goalAmount={250}
            goalColor="yellow"
            goalOrder={1}
            totalAmount={goal}
          >
            This will cover some of our most basic needs!
          </PatreonGoal>
          <PatreonGoal
            goalAmount={500}
            previousAmount={250}
            goalColor="yellow-orange"
            goalOrder={2}
            totalAmount={goal}
          >
            We can utilize more useful services and tech
          </PatreonGoal>
          <PatreonGoal
            goalAmount={750}
            previousAmount={500}
            goalColor="orange"
            goalOrder={3}
            totalAmount={goal}
          >
            We can ramp up value and services offered
          </PatreonGoal>
          <PatreonGoal
            goalAmount={1000}
            previousAmount={750}
            goalColor="magenta"
            goalOrder={4}
            totalAmount={goal}
          >
            We&apos;ve hit our monthly contribution goal, thanks!
          </PatreonGoal>
        </div>
      </div>
      <MobileProgressBar currentAmount={currentAmount} goal={1000} />
    </>
  );
};

export default ProgressBar;
