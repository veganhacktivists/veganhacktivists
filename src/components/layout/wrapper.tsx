const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">{children}</div>
  );
};

export const MainWrapper: React.FC = ({ children }) => {
  return <main className="mx-16 text-center">{children}</main>;
};

export default PageWrapper;
