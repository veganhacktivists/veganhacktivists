import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useMemo } from 'react';

import classNames from 'classnames';

import { DarkButton } from 'components/decoration/buttons';

import getThemeColor from 'lib/helpers/theme';

import { readableTimeSinceDate } from 'lib/helpers/date';

import type { inferQueryOutput } from 'lib/client/trpc';

import type { PlaygroundRequestCategory } from '@prisma/client';
import type { HTMLAttributes } from 'react';

interface PlaygroundRequestCardProps {
  request: inferQueryOutput<'playground.requests'>[0];
}

const CATEGORY_COLORS: Record<PlaygroundRequestCategory, string> = {
  Design: getThemeColor('magenta'),
  Website: getThemeColor('blue'),
  Marketing: getThemeColor('green'),
  SocialMedia: getThemeColor('yellow-orange'),
  VideoProduction: getThemeColor('orange'),
  Other: getThemeColor('grey-light'),
};

export const CATEGORY_TEXT: Partial<Record<PlaygroundRequestCategory, string>> =
  {
    SocialMedia: 'Social Media',
    VideoProduction: 'Video Production',
  };

const Li: React.FC<
  HTMLAttributes<HTMLLIElement> & { category: PlaygroundRequestCategory }
> = ({ children, className, category, ...props }) => (
  <li
    {...props}
    className={classNames(
      'flex flex-row gap-2 justify-start items-center',
      className
    )}
  >
    <span
      style={{ backgroundColor: CATEGORY_COLORS[category] }}
      className="w-1.5 h-1.5 my-auto aspect-square"
    />
    <span className="my-auto truncate h-min">{children}</span>
  </li>
);

export const PRIORITIES = [
  { label: 'Low', className: 'bg-green' },
  { label: 'Medium', className: 'bg-yellow-orange' },
  { label: 'High', className: 'bg-orange' },
  { label: 'Urgent', className: 'bg-red' },
];

const PlaygroundRequestCard: React.FC<
  React.PropsWithChildren<PlaygroundRequestCardProps>
> = ({
  request: {
    id,
    title,
    priority: priorityNumber,
    description,
    requester,
    createdAt,
    category,
    organization,
    isFree,
  },
  children,
}) => {
  const timeSinceCreated = useMemo(
    () => readableTimeSinceDate(createdAt),
    [createdAt]
  );

  const categoryColor = useMemo(() => CATEGORY_COLORS[category], [category]);
  const priority = useMemo(() => PRIORITIES[priorityNumber], [priorityNumber]);

  return (
    <div className="flex flex-col h-full gap-2 p-4 text-left bg-grey-background">
      <div className="space-y-1">
        <h3
          className="mb-2 font-mono text-lg font-bold capitalize line-clamp-1"
          title={title}
        >
          {title}
        </h3>
        <div className="flex flex-row justify-start gap-2">
          <div
            style={{
              borderColor: categoryColor,
            }}
            className="px-2 py-0.5 border-[3px] rounded-xl capitalize"
          >
            {CATEGORY_TEXT[category] || category}
          </div>
          <div className="flex flex-row items-center gap-2 my-auto">
            <FontAwesomeIcon icon={faClock} size="sm" />{' '}
            <div>
              <strong>Posted: </strong>
              {timeSinceCreated ? `${timeSinceCreated} ago` : 'Today'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-4 line-clamp-5">{description}</div>
      <ul className="grid content-end flex-grow grid-cols-2 mb-2 gap-x-1">
        <Li category={category} title={requester.name || undefined}>
          <span>
            <span className="font-bold">{requester.name}</span>{' '}
            {!!organization && <>({organization})</>}
          </span>
        </Li>
        <Li category={category}>
          <span className="font-bold">Priority:</span>{' '}
          <span
            className={classNames(
              priority.className,
              'rounded-lg px-2 py-0.5 bg-opacity-75'
            )}
          >
            {priority.label}
          </span>
        </Li>
        <Li category={category} className="col-span-full">
          <span className="font-bold">
            {isFree ? 'Volunteer' : 'Paid'} role
          </span>
        </Li>
      </ul>
      <DarkButton
        href={{
          pathname: '/playground/request/[id]',
          query: { id },
        }}
        className="text-center text-md"
      >
        Read more / apply to help
      </DarkButton>
      {children}
    </div>
  );
};

export default PlaygroundRequestCard;
