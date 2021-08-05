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
    <div className="text-grey content-center mx-auto my-20 md:w-1/2 drop-shadow-2xl text-2xl">
      <h1 className="mb-16">
        <span className="font-italic text-3xl">{firstWord}</span>{' '}
        <span className="font-mono font-bold text-5xl uppercase text-black">
          {remainingWords}
        </span>
      </h1>
      <p>{children}</p>
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
