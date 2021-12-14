import classNames from 'classnames';
import React from 'react';
import getThemeColor from '../../../lib/helpers/theme';
import Circle from '../../decoration/circle';

interface SectionContainerProps {
  header?: React.ReactNode;
  className?: string;
  color?: string;
  circles?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  header,
  className,
  circles = false,
  color,
}) => {
  const classes = classNames(className, 'py-20 px-5', { relative: circles });
  const backgroundColor = color ? getThemeColor(color) : 'inherit';

  return (
    <div className={classes} style={{ backgroundColor }}>
      {circles && (
        <div className="absolute inset-0 overflow-hidden">
          <Circle xAlign="right" radiusZoom={0.9} opacity={0.1} />
          <Circle yAlign="bottom" radiusZoom={1.04} opacity={0.2} />
        </div>
      )}
      <div className="pb-10">{header}</div>
      <div>{children}</div>
    </div>
  );
};

export default SectionContainer;
