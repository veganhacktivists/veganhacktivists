type SubSectionContent = {
  header?: string;
};

export const FirstSubSection: React.FC<SubSectionContent> = ({
  header = '',
  children,
}) => {
  const tokenizedHeader = header.split(' ');
  const firstWord = tokenizedHeader.shift();
  const remainingWords = tokenizedHeader.join(' ');

  return (
    <div className="mb-14">
      <h1>
        <span className="font-italic text-2xl mr-2">{firstWord}</span>
        <span className="font-bold font-mono text-4xl">{remainingWords}</span>
      </h1>
      <p className="max-w-2xl m-auto text-2xl font-mono">{children}</p>
    </div>
  );
};

export const SubSection: React.FC<SubSectionContent> = ({
  header,
  children,
}) => {
  return (
    <div className="mb-10">
      <h1 className="text-2xl mb-3 font-bold">{header}</h1>
      <p className="max-w-2xl text-xl m-auto">{children}</p>
    </div>
  );
};
