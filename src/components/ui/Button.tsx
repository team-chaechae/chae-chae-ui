import * as React from 'react';
import { cn } from '@/utils/cn';
import {
  cva,
  type VariantProps,
} from 'class-variance-authority';

type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
  'flex justify-center items-center text-sm disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#1a1a1a] text-white',
        ghost:
          'bg-transparent text-inherit hover:bg-neutral-300',
      },
      size: {
        default: 'h-[36px] px-[16px] py-[5px]',
        sm: 'h-[32px] px-[12px] test-xs',
        lg: 'h-[40px] px-[20px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, type, variant, size, ...props }, ref) => {
  return (
    <button
      type={type ?? 'button'}
      className={cn(
        buttonVariants({ variant, size }),
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };
