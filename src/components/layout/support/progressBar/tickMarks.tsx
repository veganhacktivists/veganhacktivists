import React from 'react';

const tickMarkStyles = 'h-4 w-1/5 border-white box-border border-r-[3px]';

const tickLabelStyles = 'h-8 w-1/5 text-xl text-white text-center font-mono';

const TickMarks: React.FC = () => {
  return (
    <div className="w-full absolute bottom-0">
      <div className="w-full border-white box-border border-l-[3px] flex flex-row">
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
        <div className={tickMarkStyles} />
      </div>
      <div className="w-[120%] absolute left-[-10%] flex flex-row">
        <div className={tickLabelStyles}>&#36;0</div>
        <div className={tickLabelStyles}>&#36;1,000</div>
        <div className={tickLabelStyles}>&#36;2,000</div>
        <div className={tickLabelStyles}>&#36;3,000</div>
        <div className={tickLabelStyles}>&#36;4,000</div>
        <div className={tickLabelStyles}>&#36;5,000</div>
      </div>
    </div>
  );
};

export default TickMarks;
