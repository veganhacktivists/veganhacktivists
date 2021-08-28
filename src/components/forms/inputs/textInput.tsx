import classNames from 'classnames';
import React from 'react';
import Label from './label';

export const inputClassNames =
  'px-2 py-2 text-xl text-grey w-full focus:ring-1 focus:ring-grey';

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ error, ...props }, ref) => {
  return (
    <>
      <Label name={props.name || ''} />
      <input
        ref={ref}
        className={classNames(inputClassNames, { 'ring-1 ring-red': error })}
        {...props}
        id={props.id || props.name}
      />
    </>
  );
});
export default TextInput;
