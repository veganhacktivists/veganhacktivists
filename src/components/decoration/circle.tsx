interface ICircle {
  color: string;
  radius: number;
  cx: number;
  cy: number;
  thickness: string;
  opacity?: number;
}

const Circle: React.FC<ICircle> = (props) => {
  const { color, thickness, radius, opacity = 1, ...trimmedProps } = props;

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
