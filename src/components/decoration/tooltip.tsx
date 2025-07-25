import type React from 'react';
import { useRef, useState } from 'react';
import {
  offset,
  useFloating,
  arrow as arrowMiddleware,
  flip,
  useInteractions,
  useClick,
  useDismiss,
  shift,
  autoUpdate,
} from '@floating-ui/react-dom-interactions';
import classNames from 'classnames';

import type { Placement } from '@floating-ui/react-dom-interactions';

interface TooltipProps {
  content: React.ReactNode;
  placement?: Placement;
  children: React.ReactNode;
  maxWidth?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  maxWidth = 225,
  placement = 'top',
}) => {
  const arrowRef = useRef(null);
  const [isActive, setIsIsActive] = useState<boolean>(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData: {
      arrow: { x: arrowX, y: arrowY, centerOffset = 0 } = {},
    },
    placement: floatingPlacement,
    context,
  } = useFloating({
    open: isActive,
    whileElementsMounted: autoUpdate,
    onOpenChange: setIsIsActive,
    placement,
    strategy: 'absolute',
    middleware: [
      offset(5),
      flip(),
      shift({ padding: 20 }),
      arrowMiddleware({ element: arrowRef, padding: 10 }),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, { toggle: true }),
    useDismiss(context),
  ]);

  return (
    <>
      <span
        {...getReferenceProps({ ref: reference })}
        className="relative cursor-pointer"
      >
        {children}
      </span>
      {isActive && (
        <div
          {...getFloatingProps({
            className:
              'drop-shadow-md w-fit break-words font-normal p-2 text-xs text-grey bg-white',
            ref: floating,
            style: {
              position: strategy,
              top: y ?? undefined,
              left: x ?? undefined,
              maxWidth,
            },
          })}
        >
          <div className="z-10">{content}</div>
          <div
            ref={arrowRef}
            style={{
              top: arrowY,
              left: arrowX,
            }}
            className={classNames('-z-10 absolute', 'w-3 h-3', {
              'border-r-white border-r-[6px] border-y-invisible border-y-[6px]':
                centerOffset > 0,
              'border-b-white border-b-[6px] border-r-invisible border-r-[6px]':
                centerOffset < 0,
              'border-r-white border-b-white border-r-[6px] border-b-[6px]':
                centerOffset === 0,
              'translate-y-1/2 bottom-0 rotate-45':
                floatingPlacement.includes('top'),
              '-translate-y-1/2 top-0 -rotate-[135deg]':
                floatingPlacement.includes('bottom'),
              '-translate-x-1/2 left-0 scale-x-[-1] rotate-45':
                floatingPlacement.includes('right'),
              'translate-x-1/2 right-0 -rotate-45':
                floatingPlacement.includes('left'),
            })}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;
