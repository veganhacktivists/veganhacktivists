import classNames from 'classnames';
import React from 'react';

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

export interface SquareProps {
  size: number;
  color?: string;
  opacity?: number;
  className?: string;
}

const Square: React.FC<SquareProps> = (props) => {
  const {
    // width an height in quarter-rem (tailwind dimensions)
    size,
    // color in tailwind palette colors (including custom)
    color = 'white',
    // opacity in percent
    opacity = 100,
    className = '',
  } = props;

  const svgClassNames = classNames(
    className,
    `bg-${color}`,
    `w-${size}`,
    `h-${size}`,
    `opacity-${opacity}`
  );

  return <div className={svgClassNames} />;
};

const classNameFromPosition = (key: string, value?: number) => {
  if (value === undefined || !Number.isInteger(value)) {
    return null;
  }
  if (value < 0) {
    return `-${key}-${value * -1}`;
  }
  return `${key}-${value}`;
};

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
