interface LabelProps {
  name: string;
}

const Label: React.FC<LabelProps> = ({ name, children }) => {
  return (
    <label className="block font-bold text-left capitalize" htmlFor={name}>
      {children || name}
    </label>
  );
};

export default Label;
