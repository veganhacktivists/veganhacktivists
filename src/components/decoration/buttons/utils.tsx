import classNames from 'classnames';
import React from 'react';
import getThemeColor from '../../../lib/helpers/theme';

interface FillBackgroundProps extends React.PropsWithChildren {
  base: string;
  fill: string;
  disabled?: boolean;
}

const fillStyle: (from: string, to: string) => React.CSSProperties = (
  from,
  to
) => {
  return {
    backgroundImage: `linear-gradient(to right, ${getThemeColor(
      to
    )},  50%, ${getThemeColor(from)} 50%)`,
    backgroundSize: '250% 100%',
    backgroundPosition: 'right',
  };
};

export const FillBackground: React.FC<FillBackgroundProps> = ({
  base,
  fill,
  disabled = false,
  children,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return;
    const props = child.props;
    return React.cloneElement(child, {
      className: classNames(
        props.className,
        'transition-background-position duration-[400ms] ease-linear',
        {
          'hover:!bg-left group-hover:!bg-left': !disabled,
        }
      ),
      style: { ...props.style, ...(disabled ? {} : fillStyle(base, fill)) },
    });
  });

  return <>{childrenWithProps}</>;
};
