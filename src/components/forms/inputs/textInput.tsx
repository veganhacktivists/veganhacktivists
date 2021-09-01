import classNames from 'classnames';
import React from 'react';
import Label from './label';

export const inputClassNames =
  'px-2 py-2 text-xl text-grey focus:ring-1 focus:ring-grey';

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
  }
>(({ error, children, ...props }, ref) => {
  return (
    <>
      <Label name={props.name || ''}>{children}</Label>
      <input
        ref={ref}
        className={classNames(inputClassNames, 'w-full', {
          'ring-2 ring-red': error,
        })}
        {...props}
        id={props.id || props.name}
      />
      {error && <div className="text-red">⚠ {error}</div>}
    </>
  );
});
export default TextInput;
