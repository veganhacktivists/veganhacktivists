import React from 'react';
import SquareField from '../../../decoration/squares';
import AnimatedBar from './animatedBar';
import PatreonGoal from './patreonGoal';
import TickMarks from './tickMarks';

interface ProgressBarProps {
  currentAmount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentAmount }) => {
  return (
    <div className="max-w-6xl mx-8 md:mx-auto relative mb-48">
      <div className="h-24 w-full bg-grey absolute bottom-0">
        <SquareField
          squares={[
            { top: 0, left: 0, color: 'black', size: 10, opacity: 30 },
            { top: 0, right: 0, color: 'black', size: 10, opacity: 30 },
          ]}
          className="relative z-10"
        />
        <AnimatedBar target={currentAmount} />
      </div>
      <TickMarks />
      <div className="flex flex-row items-end w-full">
        <PatreonGoal goalAmount={1353} goalColor="yellow" goalOrder={1}>
          Needed to cover operational expenses
        </PatreonGoal>
        <PatreonGoal
          goalAmount={2500}
          previousAmount={1353}
          goalColor="yellow-orange"
          goalOrder={2}
        >
          Can afford more useful services and tech
        </PatreonGoal>
        <PatreonGoal
          goalAmount={3750}
          previousAmount={2500}
          goalColor="orange"
          goalOrder={3}
        >
          We can ramp up value and services offered
        </PatreonGoal>
        <PatreonGoal
          goalAmount={5000}
          previousAmount={3750}
          goalColor="magenta"
          goalOrder={4}
        >
          Self-Sustainable Goal
        </PatreonGoal>
      </div>
    </div>
  );
};

export default ProgressBar;
