import classNames from 'classnames';
import React from 'react';

import Label from './label';
import { inputClassNames } from './textInput';

interface TextAreaProps
  extends React.PropsWithChildren<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
  > {
  error?: string;
  showRequiredMark?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, children, showRequiredMark, className, name, ...props }, ref) => {
    return (
      <div className={className}>
        <Label htmlFor={name} showRequiredMark={showRequiredMark}>
          {children}
        </Label>
        <textarea
          id={props.id || name}
          wrap="soft"
          className={classNames(inputClassNames, 'resize-y w-full', {
            'ring-2 ring-red': error,
          })}
          rows={10}
          {...props}
          name={name}
          ref={ref}
        />
        {error && <div className="text-red">⚠ {error}</div>}
      </div>
    );
  },
);

export default TextArea;
