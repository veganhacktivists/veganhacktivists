type textSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

interface SubSectionContent {
  header?: string;
  firstWordsNum?: number;
  headerSize?: textSize;
  contentSize?: textSize;
  textColor?: string;
}

export const BoldHeaderText: React.FC<SubSectionContent> = ({ children }) => {
  return (
    <span className="font-mono font-bold text-5xl uppercase text-black">
      {children}
    </span>
  );
};

export const HeaderContainer: React.FC = ({ children }) => {
  return (
    <div className="text-grey content-center px-5 mx-auto my-12 md:w-1/2 drop-shadow-2xl text-2xl">
      <h1 className="mb-10">{children}</h1>
    </div>
  );
};

export const FirstSubSection: React.FC<SubSectionContent> = ({
  header = '',
  children,
  firstWordsNum = 1,
}) => {
  const tokenizedHeader = header.split(' ');
  const firstWords = tokenizedHeader.splice(0, firstWordsNum).join(' ');
  const remainingWords = tokenizedHeader.join(' ');

  return (
    <HeaderContainer>
      <div className="pb-[15px]">
        <span className="font-italic text-3xl">{firstWords}</span>{' '}
        <BoldHeaderText>{remainingWords}</BoldHeaderText>
      </div>
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
  headerSize = '2xl',
  contentSize = 'xl',
  textColor = 'black',
}) => {
  return (
    <div className="mb-10">
      {header && (
        <h1 className={`text-${headerSize} text-${textColor}  mb-3 font-bold`}>
          {header}
        </h1>
      )}
      <p
        className={`max-w-2xl text-${contentSize} text-${textColor} m-auto px-10`}
      >
        {children}
      </p>
    </div>
  );
};
