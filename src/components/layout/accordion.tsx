import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface AccordionEntry extends React.PropsWithChildren {
  title: string;
}

interface AccordionEntryProps {
  entry: AccordionEntry;
  onExpandedChange: () => void;
  design: AccordionProps['design'];
  expanded: boolean;
}

interface AccordionProps {
  entries: AccordionEntry[];
  design?: 'dark' | 'light';
}

const AccordionEntry: React.FC<AccordionEntryProps> = ({
  entry: { title, children },
  expanded,
  design,
  onExpandedChange,
}) => {
  const bgColorClass = useMemo(() => {
    switch (design) {
      case 'light':
        return 'bg-grey-background';
      case 'dark':
        return 'bg-white';
      default:
        return 'bg-white';
    }
  }, [design]);

  const [animatedRef] = useAutoAnimate<HTMLDivElement>({
    duration: 150,
  });

  return (
    <div className="w-5/6 sm:w-4/7 mt-1.5 first-of-type:mt-0" ref={animatedRef}>
      <div
        className={classNames(
          'flex text-black items-center justify-between h-15 px-5 p-2.5 cursor-pointer',
          expanded ? 'bg-green' : bgColorClass,
        )}
        onClick={onExpandedChange}
      >
        <span className="font-serif text-xl font-medium text-black select-none">
          {title}
        </span>
        <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} />
      </div>
      {expanded && (
        <div
          className={classNames(
            'p-2.5 px-5 text-black text-left mt-1.5 font-sans text-lg',
            design === 'light' ? 'bg-white' : 'bg-[#EAEAEA]',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ entries, design }) => {
  const [expandedEntryIndex, setExpandedEntryIndex] = useState<number | null>(
    0,
  );

  const onChangeEntryExpanded = useCallback(
    (index: number) => () => {
      if (index === expandedEntryIndex) {
        setExpandedEntryIndex(null);
      } else {
        setExpandedEntryIndex(index);
      }
    },
    [expandedEntryIndex],
  );

  const accordionEntries = useMemo(
    () =>
      entries.map((entry, i) => {
        return (
          <AccordionEntry
            entry={entry}
            onExpandedChange={onChangeEntryExpanded(i)}
            key={`${entry.title}-${i}`}
            expanded={i === expandedEntryIndex}
            design={design}
          />
        );
      }),
    [design, entries, expandedEntryIndex, onChangeEntryExpanded],
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
