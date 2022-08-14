import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

interface AccordionEntryProps extends React.PropsWithChildren {
  headline: string;
  content: string;
  expanded?: boolean;
  design?: string;
}

interface AccordionEntry {
  headline: string;
  content: string;
  expanded?: boolean;
}

interface AccordionProps extends React.PropsWithChildren {
  entries: AccordionEntry[];
  design?: string;
}

const AccordionEntry: React.FC<AccordionEntryProps> = ({
  headline,
  content,
  expanded,
  design,
}) => {
  expanded = expanded ?? false;
  const [entryState, setEntryState] = useState(expanded);
  return (
    <div className="w-5/6 sm:w-4/7 mt-1.5 first-of-type:mt-0">
      <div
        className={`flex ${
          entryState
            ? 'bg-green'
            : design === 'light'
            ? 'bg-grey-background'
            : 'bg-white'
        } text-black items-center justify-between h-10 px-5 p-2.5`}
        onClick={() => {
          setEntryState(!entryState);
        }}
      >
        <span className="text-black select-none text-1xl font-medium font-serif">
          {headline}
        </span>
        <FontAwesomeIcon icon={entryState ? faAngleUp : faAngleDown} />
      </div>
      {entryState && (
        <div
          className={`p-2.5 px-5 text-black text-justify select-none ${
            design === 'light' ? 'bg-white' : 'bg-[#EAEAEA]'
          } mt-1.5 font-sans text-sm`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ entries, design }) => {
  if (!entries) {
    return <></>;
  }
  const accordionEntries = entries.map(
    (
      entry: { headline: string; content: string; expanded?: boolean },
      iter: number
    ) => {
      const key = `ae-${iter}`;
      return (
        <AccordionEntry
          key={key}
          headline={entry.headline}
          content={entry.content}
          expanded={entry.expanded}
          design={design}
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
