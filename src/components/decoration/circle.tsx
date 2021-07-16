import useWindowSize from '../../utils/hooks/useWindowSize';

interface CircleProps {
  color?: 'grey' | 'grey-dark';
  opacity?: number;
  thickness?: string;
  xAlign?: 'left' | 'right';
  yAlign?: 'top' | 'bottom';
  radiusZoom?: number;
}

const Circle: React.FC<CircleProps> = ({
  color = 'white',
  opacity = 0.5,
  thickness = '20px',
  yAlign = 'top',
  xAlign = 'left',
  radiusZoom = 1,
  ...trimmedProps
}) => {
  const { width: windowWidth = 0 } = useWindowSize();

  const radius = (windowWidth / 3) * radiusZoom;

  const xPos = xAlign == 'left' ? 'left-0' : 'right-0';
  const yPos = yAlign == 'top' ? 'top-0' : 'bottom-0';

  let xTransform = 'translate-x-1/4';
  let yTransform = windowWidth > 1300 ? 'translate-y-3/4' : 'translate-y-2/4';

  if (xAlign == 'left') xTransform = '-' + xTransform;
  if (yAlign == 'top') yTransform = '-' + yTransform;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      className={`text-${color} overflow-visible absolute ${yPos} ${xPos} transform ${xTransform} ${yTransform}
    `}
    >
      <circle
        {...trimmedProps}
        r={radius}
        strokeWidth={thickness}
        fillOpacity={0}
        opacity={opacity}
        className="stroke-current"
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default Circle;
