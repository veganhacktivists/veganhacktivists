import React from 'react';
import useThemeColor from '../../../hooks/useThemeColor';

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
    <div className="flex flex-col md:flex-row w-4/5 xl:w-2/3 2xl:w-2/3 mx-auto mb-8">
      <h1
        className="md:leading-[1.3] text-left flex-1 font-mono bg-black text-white text-4xl md:text-5xl p-10 border-l-16"
        style={{ borderColor: useThemeColor(borderColor) }}
      >
        {headerStart} <b>{headerBold}</b> {headerEnd}
      </h1>
      <p className="text-center md:text-left flex-1 text-2xl p-10 bg-grey-background">
        {children}
      </p>
    </div>
  );
};
