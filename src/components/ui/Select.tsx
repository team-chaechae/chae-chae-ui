import * as SelectPrimitive from '@radix-ui/react-select';
import React from 'react';
import { cn } from '@/utils/cn';
import { CheckIcon } from 'lucide-react';

const Select = SelectPrimitive.Root;
const SelectTrigger = SelectPrimitive.Trigger;
const SelectValue = SelectPrimitive.Value;
const SelectIcon = SelectPrimitive.Icon;
const SelectPortal = SelectPrimitive.Portal;
const SelectContent = SelectPrimitive.Content;
const SelectGroup = SelectPrimitive.Group;
const SelectLabel = SelectPrimitive.Label;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Item
  >
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      ref={forwardedRef}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className='h-[20px] w-[20px]' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
};
