const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">{children}</div>
  );
};

export const MainWrapper: React.FC = ({ children }) => {
  return <main className="text-center">{children}</main>;
};

export default PageWrapper;
