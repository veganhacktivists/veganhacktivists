import React from 'react';

import type { HTMLProps } from 'react';

interface RadioButtonProps extends HTMLProps<HTMLInputElement> {
  test?: 1;
  // label: React.ReactNode;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="flex flex-row gap-2">
        <input
          className="box-border w-4 h-4 p-0.5 my-auto border rounded-full appearance-none checked:bg-grey border-grey"
          type="radio"
          ref={ref}
          {...props}
        />
        <div className="my-auto h-min">{label}</div>
      </label>
    );
  }
);

export default RadioButton;
