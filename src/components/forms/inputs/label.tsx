interface LabelProps extends React.PropsWithChildren {
  name: string;
  showRequiredMark?: boolean;
}

const Label: React.FC<LabelProps> = ({ name, children, showRequiredMark }) => {
  return (
    <label className="block font-bold text-left" htmlFor={name}>
      {children || <span className="capitalize">{name}</span>}
      {showRequiredMark && <span className="text-red">*</span>}
    </label>
  );
};

export default Label;
