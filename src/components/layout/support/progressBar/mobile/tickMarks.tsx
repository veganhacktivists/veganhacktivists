import React from 'react';

const tickMarkStyles = 'w-4 h-1/5 border-white box-border border-t-[3px]';

const tickLabelStyles =
  'w-8 h-1/5 text-xl text-white flex items-center font-mono';

const TickMarks: React.FC = ({}) => {
  return (
    <div className="h-full absolute bottom-0 right-0 z-20">
      <div className="h-full border-white box-border border-b-[3px] flex flex-col">
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
      </div>
      <div className="h-[120%] absolute left-4 pl-2 bottom-[-10%] flex flex-col-reverse">
        <div className={tickLabelStyles}>&euro;0</div>
        <div className={tickLabelStyles}>&euro;1,000</div>
        <div className={tickLabelStyles}>&euro;2,000</div>
        <div className={tickLabelStyles}>&euro;3,000</div>
        <div className={tickLabelStyles}>&euro;4,000</div>
        <div className={tickLabelStyles}>&euro;5,000</div>
      </div>
    </div>
  );
};

export default TickMarks;
