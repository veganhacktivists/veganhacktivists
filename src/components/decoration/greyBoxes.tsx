interface GreyBoxProps extends React.PropsWithChildren {
  title: React.ReactNode;
}

export const GreyBox: React.FC<GreyBoxProps> = ({ title, children }) => {
  return (
    <div className='text-xl text-center border border-grey'>
      <div className='px-5 py-2 text-white uppercase bg-grey'>{title}</div>
      <div className='px-5 py-2 text-grey'>{children}</div>
    </div>
  );
};

export const GreySquare: React.FC<GreyBoxProps> = ({ title, children }) => {
  return (
    <div className='px-5 py-3 text-xl text-center border border-grey'>
      <div className='font-bold uppercase'>{title}</div>
      <div className=''>{children}</div>
    </div>
  );
};
