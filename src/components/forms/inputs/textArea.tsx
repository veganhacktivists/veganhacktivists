import classNames from 'classnames';
import React from 'react';
import Label from './label';
import { inputClassNames } from './textInput';

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: string;
  }
>(({ error, children, ...props }, ref) => {
  return (
    <>
      <Label name={props.name || ''}>{children}</Label>
      <textarea
        id={props.id || props.name}
        wrap="soft"
        className={classNames(inputClassNames, 'resize-none w-full', {
          'ring-2 ring-red': error,
        })}
        rows={10}
        {...props}
        ref={ref}
      />
      {error && <div className="text-red">⚠ {error}</div>}
    </>
  );
});

export default TextArea;
