import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

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
  expanded = false,
  design,
}) => {
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
        <span className="font-serif font-medium text-black select-none text-1xl">
          {headline}
        </span>
        <FontAwesomeIcon icon={entryState ? faAngleUp : faAngleDown} />
      </div>
      {entryState && (
        <div
          className={classNames(
            'p-2.5 px-5 text-black text-justify select-none mt-1.5 font-sans text-sm',
            design === 'light' ? 'bg-white' : 'bg-[#EAEAEA]'
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ entries, design }) => {
  const accordionEntries = useMemo(
    () =>
      entries?.map(
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
      ),
    [design, entries]
  );

  if (!entries) {
    return null;
  }

  return (
    <div className="flex flex-col items-center content-center justify-center">
      {accordionEntries}
    </div>
  );
};

export default Accordion;
