import classNames from 'classnames';
import React from 'react';
import Label from './label';

export const inputClassNames =
  'px-2 py-2 text-xl text-grey focus:ring-1 focus:ring-grey';

interface TextAreaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextAreaProps>(
  ({ error, children, className, ...props }, ref) => {
    return (
      <>
        <Label name={props.name || ''}>{children}</Label>
        <input
          ref={ref}
          className={classNames(
            inputClassNames,
            'w-full',
            {
              'ring-2 ring-red': error,
            },
            className
          )}
          {...props}
          id={props.id || props.name}
        />
        {error && <div className="text-red">⚠ {error}</div>}
      </>
    );
  }
);
export default TextInput;
