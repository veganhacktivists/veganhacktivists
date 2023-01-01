import React from 'react';
import { FormattedMessage } from 'react-intl';

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
            goalAmount={1353}
            goalColor="yellow"
            goalOrder={1}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.goal.0.label"
              defaultMessage="Needed to cover basic operational expenses"
            />
          </PatreonGoal>
          <PatreonGoal
            goalAmount={2500}
            previousAmount={1353}
            goalColor="yellow-orange"
            goalOrder={2}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.goal.1.label"
              defaultMessage="We can utilize more useful services and tech"
            />
          </PatreonGoal>
          <PatreonGoal
            goalAmount={3750}
            previousAmount={2500}
            goalColor="orange"
            goalOrder={3}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.goal.2.label"
              defaultMessage="We can ramp up value and services offered"
            />
          </PatreonGoal>
          <PatreonGoal
            goalAmount={5000}
            previousAmount={3750}
            goalColor="magenta"
            goalOrder={4}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.goal.3.label"
              defaultMessage="Self-Sustainable Goal"
            />
          </PatreonGoal>
        </div>
      </div>
      <MobileProgressBar currentAmount={currentAmount} goal={5000} />
    </>
  );
};

export default ProgressBar;
