import classNames from 'classnames';
import type { TextareaHTMLAttributes } from 'react';
import React from 'react';
import Label from './label';
import { inputClassNames } from './textInput';

const TextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error: boolean;
  }
> = ({ error, ...props }) => {
  return (
    <>
      <Label name={props.name || ''} />
      <textarea
        id={props.id || props.name}
        wrap="soft"
        className={classNames(inputClassNames, 'resize-none', {
          'ring-1 ring-red': error,
        })}
        rows={10}
        {...props}
      />
    </>
  );
};

export default TextArea;
