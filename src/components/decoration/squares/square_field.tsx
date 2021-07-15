import classNames from 'classnames';
import React from 'react';
import type { SquareProps } from './square';
import Square from './square';

interface SquareFieldSquareProps extends SquareProps {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface SquareFieldProps {
  squares: SquareFieldSquareProps[];
  className?: string;
}

const classNameFromPosition = (key: string, value?: number) =>
  Number.isInteger(value) ? `${key}-${value}` : null;

const SquareField: React.FC<SquareFieldProps> = ({ squares, className }) => {
  const classes = classNames('relative', 'overflow-visible', className);
  return (
    <div className={classes}>
      {squares.map(({ left, right, top, bottom, ...squareFields }, idx) => {
        const positionClassNames = classNames(
          'absolute',
          classNameFromPosition('left', left),
          classNameFromPosition('right', right),
          classNameFromPosition('top', top),
          classNameFromPosition('bottom', bottom)
        );
        return (
          <Square key={idx} {...squareFields} className={positionClassNames} />
        );
      })}
    </div>
  );
};

export default SquareField;
