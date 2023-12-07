import classNames from 'classnames';

import type { HTMLAttributes, ReactNode } from 'react';

type LabelProps = HTMLAttributes<HTMLLabelElement> & {
  name: string;
  showRequiredMark?: boolean;
  error?: string;
} & ({ label: string } | { children: ReactNode });

const Label: React.FC<LabelProps> = ({
  name,
  error,
  showRequiredMark,
  className,
  ...props
}) => {
  return (
    <label
      className={classNames('block mb-2 font-bold text-left', className)}
      htmlFor={name}
      {...props}
    >
      {'children' in props ? (
        props.children
      ) : 'label' in props ? (
        <span className="capitalize">{props.label}</span>
      ) : (
        ''
      )}
      {showRequiredMark && <span className="text-red">*</span>}
      {error && <span className="font-normal text-red">⚠ {error}</span>}
    </label>
  );
};

export default Label;
