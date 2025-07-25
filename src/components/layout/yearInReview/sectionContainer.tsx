import classNames from 'classnames';
import type React from 'react';

import getThemeColor from '../../../lib/helpers/theme';
import Circle from '../../decoration/circle';

interface SectionContainerProps extends React.PropsWithChildren {
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
  const classes = classNames(className, 'pt-20 pb-10 px-5', {
    relative: circles,
  });
  const backgroundColor = color ? getThemeColor(color) : 'inherit';

  return (
    <div className={classes} style={{ backgroundColor }}>
      {circles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Circle xAlign="right" radius={30} opacity={0.1} />
          <Circle yAlign="bottom" radius={34} opacity={0.2} />
        </div>
      )}
      {header && <div className="pb-10">{header}</div>}
      <div>{children}</div>
    </div>
  );
};

export default SectionContainer;
