import classNames from 'classnames';

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

export default Square;
