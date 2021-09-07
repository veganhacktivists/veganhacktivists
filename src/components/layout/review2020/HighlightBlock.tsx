import React from 'react';

interface HighlightBlockProps {
  borderColor: string;
  headerStart?: string;
  headerBold?: string;
  headerEnd?: string;
}

export const HighlightBlock: React.FC<HighlightBlockProps> = ({
  borderColor,
  headerStart = '',
  headerBold = '',
  headerEnd = '',
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-4/5 xl:w-3/5 2xl:w-1/2 mx-auto mb-8">
      <h1
        className={`leading-normal text-left flex-1 font-mono bg-black text-white text-5xl p-10 border-l-16 border-${borderColor}`}
      >
        {headerStart} <span className="font-bold">{headerBold}</span>{' '}
        {headerEnd}
      </h1>
      <p className="text-left flex-1 text-2xl p-10 bg-grey-background">
        {children}
      </p>
    </div>
  );
};
