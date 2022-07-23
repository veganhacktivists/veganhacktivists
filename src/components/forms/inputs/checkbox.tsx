import classNames from 'classnames';
import React from 'react';

import Label from './label';
import { inputClassNames } from './textInput';

interface CheckboxProps
  extends React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>> {
  error?: string;
  description?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ error, children, description, ...props }, ref) => {
    return (
      <>
        <div>
          <div className="flex">
            <Label name={props.name || ''}>{children}</Label>
            <input
              ref={ref}
              className={classNames(inputClassNames, 'w-24', {
                'ring-2 ring-red border-0': error,
              })}
              {...props}
              id={props.id || props.name}
              type="checkbox"
            />
          </div>
          <div className="text-left">{description}</div>
          {error && <div className="text-red">⚠ {error}</div>}
        </div>
      </>
    );
  }
);
export default Checkbox;
