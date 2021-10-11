import classNames from 'classnames';

const SubtleBorder: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        'border-grey-border border-[0.5px] drop-shadow-border',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SubtleBorder;
