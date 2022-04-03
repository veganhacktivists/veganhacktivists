interface GreyBoxProps {
  title: React.ReactNode;
}

const GreyBox: React.FC<React.PropsWithChildren<GreyBoxProps>> = ({
  title,
  children,
}) => {
  return (
    <div className="border-[1px] border-grey text-xl">
      <div className="bg-grey text-white uppercase px-5 py-2">{title}</div>
      <div className="text-grey px-5 py-2">{children}</div>
    </div>
  );
};

export default GreyBox;
