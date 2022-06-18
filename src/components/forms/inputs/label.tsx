interface LabelProps extends React.PropsWithChildren {
  name: string;
}

const Label: React.FC<LabelProps> = ({ name, children }) => {
  return (
    <label className="block font-bold text-left" htmlFor={name}>
      {children || <span className="capitalize">{name}</span>}
    </label>
  );
};

export default Label;
