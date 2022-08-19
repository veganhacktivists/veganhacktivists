import classNames from 'classnames';

import React from 'react';

import Label from './label';
import { inputClassNames } from './textInput';

import type { InputHTMLAttributes } from 'react';

interface CheckboxProps
  extends React.PropsWithChildren<
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>
  > {
  error?: string;
  description?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  onChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      onChange,
      error,
      children,
      description,
      labelPosition = 'left',
      className,
      size = 'medium',
      ...props
    },
    ref
  ) => {
    return (
      <div className={className}>
        <div className="flex gap-5">
          {labelPosition === 'left' && (
            <div className="mt-2 w-fit">
              <Label name={props.name || ''}>{children}</Label>
            </div>
          )}
          <input
            onChange={(e) => {
              onChange?.(e.target.checked);
            }}
            ref={ref}
            className={classNames(
              inputClassNames,
              {
                'md:h-4 md:w-4 before:text-sm h-6 w-6': size === 'small',
                'h-6 w-6': size === 'medium',
                'h-8 w-8 before:text-lg': size === 'large',
              },
              'block focus:!ring-0 appearance-none checked:bg-gray active:bg-grey-light border-grey border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-grey-background before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto',
              {
                'ring-2 ring-red': error,
              }
            )}
            {...props}
            id={props.id || props.name}
            type="checkbox"
          />
          {labelPosition === 'right' && (
            <div className="truncate w-fit">
              <Label className="mb-0" name={props.name || ''}>
                {children}
              </Label>
            </div>
          )}
        </div>
        <div className="text-left">{description}</div>
        {error && <div className="text-red">⚠ {error}</div>}
      </div>
    );
  }
);

export default Checkbox;
