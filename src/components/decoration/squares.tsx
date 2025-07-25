import classNames from 'classnames';
import type React from 'react';

import getThemeColor from '../../lib/helpers/theme';

interface SquareFieldSquareProps extends SquareProps {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  className?: string;
}

interface SquareFieldProps {
  squares: SquareFieldSquareProps[];
  className?: string;
}

export interface SquareProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

const Square: React.FC<SquareFieldSquareProps> = ({
  size = 16,
  color = 'white',
  opacity = 100,
  className = '',
  top,
  right,
  bottom,
  left,
}) => {
  const backgroundColor = getThemeColor(color);

  return (
    <div
      className={className}
      style={{
        backgroundColor,
        width: size * 4,
        height: size * 4,
        opacity: opacity / 100,
        bottom: bottom && bottom * 4,
        top: top && top * 4,
        right: right && right * 4,
        left: left && left * 4,
      }}
    />
  );
};

const SquareField: React.FC<SquareFieldProps> = ({ squares, className }) => {
  const classes = classNames('relative overflow-visible z-10', className);
  return (
    <div className={classes}>
      {squares.map((squareFields, idx) => {
        return (
          <Square
            key={idx}
            {...squareFields}
            className={classNames(squareFields.className, 'absolute')}
          />
        );
      })}
    </div>
  );
};

export default SquareField;
