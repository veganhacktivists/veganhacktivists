interface LabelProps extends React.PropsWithChildren {
  name: string;
  showRequiredMark?: boolean;
  error?: string;
}

const Label: React.FC<LabelProps> = ({
  name,
  error,
  children,
  showRequiredMark,
}) => {
  return (
    <label className="block mb-2 font-bold text-left" htmlFor={name}>
      {children || <span className="capitalize">{name}</span>}
      {showRequiredMark && <span className="text-red">*</span>}
      {error && <span className="font-normal text-red">⚠ {error}</span>}
    </label>
  );
};

export default Label;
