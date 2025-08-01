import * as React from 'react';
import { cn } from '@/utils/cn';

type LabelProps =
  React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<
  HTMLLabelElement,
  LabelProps
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn('text-sm font-medium', className)}
      {...props}
    />
  );
});

Label.displayName = 'Label';

export { Label };
