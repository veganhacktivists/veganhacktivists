const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">{children}</div>
  );
};

export default PageWrapper;
