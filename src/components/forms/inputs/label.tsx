import classNames from 'classnames';

import type { HTMLAttributes } from 'react';

interface LabelProps
  extends React.PropsWithChildren<HTMLAttributes<HTMLLabelElement>> {
  htmlFor?: string;
  showRequiredMark?: boolean;
  error?: string;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  error,
  showRequiredMark,
  className,
  children,
  ...props
}) => {
  return (
    <label
      className={classNames('block mb-2 font-bold text-left', className)}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
      {showRequiredMark && <span className="text-red">*</span>}
      {error && <span className="font-normal text-red">⚠ {error}</span>}
    </label>
  );
};

export default Label;
