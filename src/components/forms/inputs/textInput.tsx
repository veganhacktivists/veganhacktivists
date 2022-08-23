import classNames from 'classnames';
import React from 'react';

import Label from './label';

export const inputClassNames =
  'px-2 py-2 text-xl text-grey focus:ring-1 focus:ring-grey';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showRequiredMark?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, children, className, showRequiredMark, ...props }, ref) => {
    return (
      <div className={classNames(className, { hidden: props.hidden })}>
        <Label name={props.name || ''} showRequiredMark={showRequiredMark}>
          {children}
        </Label>
        <input
          ref={ref}
          className={classNames(
            inputClassNames,
            'w-full',
            {
              'ring-2 ring-red focus:ring-red focus:ring-2 focus-visible:outline-none focus-visible:ring-[3px]':
                error,
            }
            // className
          )}
          {...props}
          id={props.id || props.name}
        />
        {error && <div className="text-red">⚠ {error}</div>}
      </div>
    );
  }
);
export default TextInput;
