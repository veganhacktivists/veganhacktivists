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
          <div className="flex gap-5">
            <div className="w-fit">
              <Label name={props.name || ''}>{children}</Label>
            </div>

            {/* <div className="w-6 h-6 bg-red" /> */}
            <input
              ref={ref}
              className={classNames(
                inputClassNames,
                'block w-6 h-6 focus:!ring-0',
                {
                  'ring-2 ring-red border-0': error,
                }
              )}
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
