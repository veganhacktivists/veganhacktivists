interface ICircle {
  cx: number;
  cy: number;
  radius: number;
  color?: 'grey' | 'grey-dark';
  opacity?: number;
  thickness?: string;
}

const Circle: React.FC<ICircle> = (props) => {
  const {
    radius,
    color = 'grey',
    opacity = 1,
    thickness = '20px',
    ...trimmedProps
  } = props;

  return (
    <svg className={`text-${color} overflow-visible`}>
      <circle
        {...trimmedProps}
        width={radius * 2}
        height={radius * 2}
        r={radius}
        strokeWidth={thickness}
        fillOpacity={0}
        opacity={opacity}
        className="stroke-current"
      />
    </svg>
  );
};

export default Circle;
