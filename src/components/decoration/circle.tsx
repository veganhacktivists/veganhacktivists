interface CircleProps {
  color?: string;
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
  const radius = (100 * radiusZoom) / 3;

  const xPos = xAlign == 'left' ? 'left-0' : 'right-0';
  const yPos = yAlign == 'top' ? 'top-0' : 'bottom-0';

  let xTransform = 'translate-x-1/4';
  let yTransform = 'translate-y-2/4 lg:translate-y-3/4';

  if (xAlign == 'left') xTransform = '-translate-x-1/4';
  if (yAlign == 'top') yTransform = '-translate-y-2/4 lg:-translate-y-3/4';

  return (
    <svg
      width={radius * 2 + 'vw'}
      height={radius * 2 + 'vw'}
      className={`text-${color} overflow-visible absolute ${yPos} ${xPos} transform ${xTransform} ${yTransform}
    `}
    >
      <circle
        {...trimmedProps}
        r={radius + 'vw'}
        strokeWidth={thickness}
        fillOpacity={0}
        opacity={opacity}
        className="stroke-current"
        cx={radius + 'vw'}
        cy={radius + 'vw'}
      />
    </svg>
  );
};

export default Circle;
