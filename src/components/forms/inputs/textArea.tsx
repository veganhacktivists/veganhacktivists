import classNames from 'classnames';
import React from 'react';
import Label from './label';
import { inputClassNames } from './textInput';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, children, ...props }, ref) => {
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
  }
);

export default TextArea;
