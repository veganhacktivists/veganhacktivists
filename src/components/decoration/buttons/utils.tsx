import classNames from 'classnames';
import React from 'react';
import getThemeColor from '../../../lib/helpers/theme';

interface FillBackgroundProps {
  base: string;
  fill: string;
}

const fillStyle: (from: string, to: string) => React.CSSProperties = (
  from,
  to
) => {
  return {
    background: `linear-gradient(to right, ${getThemeColor(
      to
    )},  50%, ${getThemeColor(from)} 50%)`,
    backgroundSize: '200% 100%',
    backgroundPosition: 'right',
  };
};

export const FillBackground: React.FC<FillBackgroundProps> = ({
  base,
  fill,
  children,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return;
    const props = child.props;
    return React.cloneElement(child, {
      className: classNames(
        props.className,
        'hover:!bg-left hover:transition-all duration-500 ease-in'
      ),
      style: { ...props.style, ...fillStyle(base, fill) },
    });
  });

  return <>{childrenWithProps}</>;
};
