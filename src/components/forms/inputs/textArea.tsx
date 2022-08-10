import classNames from 'classnames';
import React from 'react';

import Label from './label';
import { inputClassNames } from './textInput';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showRequiredMark?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, children, showRequiredMark, className, ...props }, ref) => {
    return (
      <div className={className}>
        <Label name={props.name || ''} showRequiredMark={showRequiredMark}>
          {children}
        </Label>
        <textarea
          id={props.id || props.name}
          wrap="soft"
          className={classNames(inputClassNames, 'resize-y w-full', {
            'ring-2 ring-red': error,
          })}
          rows={10}
          {...props}
          ref={ref}
        />
        {error && <div className="text-red">⚠ {error}</div>}
      </div>
    );
  }
);

export default TextArea;
