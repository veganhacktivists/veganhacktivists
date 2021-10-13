import classNames from 'classnames';

interface SubtleBorderProps {
  className?: string;
  border?: boolean;
  shadow?: boolean;
}

const SubtleBorder: React.FC<SubtleBorderProps> = ({
  children,
  className,
  border = true,
  shadow = true,
}) => {
  return (
    <div
      className={classNames(
        'bg-white',
        {
          'border-grey-border border-[0.5px]': border,
          'drop-shadow-border': shadow,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default SubtleBorder;
