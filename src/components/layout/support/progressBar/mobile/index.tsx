import React from 'react';
import { FormattedMessage } from 'react-intl';

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
      <div className="md:hidden relative h-[650px] flex flex-row justify-center">
        <div className="flex flex-col-reverse h-full w-40">
          <PatreonGoal
            goalAmount={250}
            goalColor="yellow"
            goalOrder={1}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.mobile.goal.0.label"
              defaultMessage="Needed to cover operational expenses"
            />
          </PatreonGoal>
          <PatreonGoal
            goalAmount={500}
            previousAmount={250}
            goalColor="yellow-orange"
            goalOrder={2}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.mobile.goal.1.label"
              defaultMessage="Can afford more useful services and tech"
            />
          </PatreonGoal>
          <PatreonGoal
            goalAmount={750}
            previousAmount={500}
            goalColor="orange"
            goalOrder={3}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.mobile.goal.2.label"
              defaultMessage="We can ramp up value and services offered"
            />
          </PatreonGoal>
          <PatreonGoal
            goalAmount={1000}
            previousAmount={750}
            goalColor="magenta"
            goalOrder={4}
            totalAmount={goal}
          >
            <FormattedMessage
              id="section.support-progess-bar.mobile.goal.3.label"
              defaultMessage="Self-Sustainable Goal"
            />
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
