import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

interface AccordionEntryProps extends React.PropsWithChildren {
  headline: string;
  content: string;
}

interface AccordionEntry {
  headline: string;
  content: string;
}

interface AccordionProps extends React.PropsWithChildren {
  entries: AccordionEntry[];
}

const AccordionEntry: React.FC<AccordionEntryProps> = ({
  headline,
  content,
}) => {
  const [entryState, setEntryState] = useState(false);
  return (
    <div className="w-5/6 sm:w-4/6 mt-1.5 first-of-type:mt-0">
      <div
        className={`flex ${
          entryState ? 'bg-green' : 'bg-gray-background'
        } text-black items-center justify-between h-10 p-2.5`}
        onClick={() => {
          setEntryState(!entryState);
        }}
      >
        <span className="text-black select-none text-2xl">{headline}</span>
        <FontAwesomeIcon icon={entryState ? faAngleUp : faAngleDown} />
      </div>
      {entryState && (
        <div className="p-2.5 text-black text-justify select-none bg-white mt-1.5">
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ entries }) => {
  if (!entries) {
    return <></>;
  }
  const accordionEntries = entries.map(
    (entry: { headline: string; content: string }, iter: number) => {
      const key = `ae-${iter}`;
      return (
        <AccordionEntry
          key={key}
          headline={entry.headline}
          content={entry.content}
        />
      );
    }
  );
  return (
    <div className="flex flex-col justify-center items-center content-center">
      {accordionEntries}
    </div>
  );
};

export default Accordion;
