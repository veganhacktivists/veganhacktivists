import classNames from 'classnames';

import type { HTMLAttributes } from 'react';

interface LabelProps
  extends React.PropsWithChildren<HTMLAttributes<HTMLLabelElement>> {
  name: string;
  showRequiredMark?: boolean;
  error?: string;
}

const Label: React.FC<LabelProps> = ({
  name,
  error,
  children,
  showRequiredMark,
  className,
  ...props
}) => {
  if (!children || !name) return null;
  return (
    <label
      className={classNames('block mb-2 font-bold text-left', className)}
      htmlFor={name}
      {...props}
    >
      {children || <span className="capitalize">{name}</span>}
      {showRequiredMark && <span className="text-red">*</span>}
      {error && <span className="font-normal text-red">⚠ {error}</span>}
    </label>
  );
};

export default Label;
