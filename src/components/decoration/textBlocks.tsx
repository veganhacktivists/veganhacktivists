interface SubSectionContent {
  header?: string;
}

export const BoldHeaderText: React.FC<SubSectionContent> = ({ children }) => {
  return (
    <span className="font-mono font-bold text-5xl uppercase text-black">
      {children}
    </span>
  );
};

export const HeaderContainer: React.FC<SubSectionContent> = ({
  header = '',
  children,
}) => {
  return (
    <div className="text-grey content-center mx-auto my-12 md:w-1/2 drop-shadow-2xl text-2xl">
      <h1 className="mb-10">{children}</h1>
    </div>
  );
};

export const FirstSubSection: React.FC<SubSectionContent> = ({
  header = '',
  children,
}) => {
  const tokenizedHeader = header.split(' ');
  const firstWord = tokenizedHeader.shift();
  const remainingWords = tokenizedHeader.join(' ');

  return (
    <HeaderContainer>
      <span className="font-italic text-3xl">{firstWord}</span>{' '}
      <BoldHeaderText>{remainingWords}</BoldHeaderText>
      <p>{children}</p>
    </HeaderContainer>
  );
};

export const PlainHeader: React.FC<SubSectionContent> = ({
  header = '',
  children,
}) => {
  return (
    <HeaderContainer>
      <BoldHeaderText>{header}</BoldHeaderText>
      <p className="text-2xl">{children}</p>
    </HeaderContainer>
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
