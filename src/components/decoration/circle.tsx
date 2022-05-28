import classNames from 'classnames';
import getThemeColor from '../../lib/helpers/theme';

interface CircleProps {
  color?: string;
  opacity?: number;
  thickness?: string;
  xAlign?: 'left' | 'right';
  yAlign?: 'top' | 'bottom';
  radius?: number;
  className?: string;
}

const Circle: React.FC<CircleProps> = ({
  color = 'white',
  opacity = 0.5,
  thickness = '20px',
  yAlign = 'top',
  xAlign = 'left',
  radius = 33,
  className,
}) => {
  let xTransform = 'translate-x-1/4';
  let yTransform = 'translate-y-2/4 lg:translate-y-3/4';

  if (xAlign == 'left') xTransform = '-translate-x-1/4';
  if (yAlign == 'top') yTransform = '-translate-y-2/4 lg:-translate-y-3/4';

  const themeColor = getThemeColor(color);

  const style = {
    color: themeColor,
    [xAlign == 'left' ? 'left' : 'right']: 0,
    [yAlign == 'top' ? 'top' : 'bottom']: 0,
  };

  return (
    <div
      style={{
        ...style,
        width: `${radius * 2}vw`,
        height: `${radius * 2}vw`,
        border: `${thickness} solid ${themeColor}`,
        opacity,
      }}
      className={classNames(
        className,
        'rounded-full overflow-visible absolute transform pointer-events-none',
        xTransform,
        yTransform
      )}
    />
  );
};

export default Circle;
