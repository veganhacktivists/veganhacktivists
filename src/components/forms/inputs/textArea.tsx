import classNames from 'classnames';
import React from 'react';
import Label from './label';
import { inputClassNames } from './textInput';
import type { ErrorStoreProps } from '../../../lib/stores/errorStore';

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: string;
    errorReportData?: ErrorStoreProps;
  }
>(({ error, errorReportData, children, ...props }, ref) => {
  // Any updates to the content of this message should also be reflected in
  // the `mailto:` body param in the contact link in `components/layout/errorPage.tsx`
  const defaultErrorMessage: string | null | undefined =
    errorReportData?.pageThatErrored &&
    `[Please tell us what you were doing prior to the error occurring...]

...then I found a ${errorReportData.statusCode} error at ${errorReportData.pageThatErrored}.

Thanks!`;

  return (
    <>
      <Label name={props.name || ''}>{children}</Label>
      <textarea
        id={props.id || props.name}
        wrap="soft"
        className={classNames(inputClassNames, 'resize-none w-full', {
          'ring-2 ring-red': error,
        })}
        rows={10}
        {...props}
        ref={ref}
        defaultValue={defaultErrorMessage || ''}
      />
      {error && <div className="text-red">⚠ {error}</div>}
    </>
  );
});

export default TextArea;
