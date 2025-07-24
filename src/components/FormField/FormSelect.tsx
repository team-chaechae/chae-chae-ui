import {
  Controller,
  useFormContext,
  type UseControllerProps,
} from 'react-hook-form';
import { Label } from '../ui/Label';
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { cn } from '@/utils/cn';
import {
  SelectGroup,
  SelectLabel,
  SelectPortal,
} from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';

type FormSelectProps = UseControllerProps & {
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;
  icon?: React.ReactNode;
  labelPosition?: 'top' | 'right';
  items: { label: string; value: string }[];
  showErrorMessage?: boolean;
};

export const FormSelect = ({
  name,
  label,
  placeholder,
  className,
  classNameInput,
  classNameLabel,
  icon,
  rules,
  labelPosition = 'top',
  items,
  showErrorMessage,
}: FormSelectProps) => {
  const { control, formState } = useFormContext();
  const errorMessage = String(
    formState.errors?.[name]?.message ?? '',
  );
  return (
    <div
      className={cn(
        labelPosition === 'right'
          ? 'flex items-center gap-2'
          : 'space-y-2 flex-1',
        className,
      )}
    >
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            labelPosition === 'right' && 'order-2',
            classNameLabel,
          )}
        >
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                className={cn(
                  'relative flex h-10 w-full items-center rounded-[4px] border !border-gray-200 focus:outline-none focus:border-none disabled:cursor-not-allowed',
                  classNameInput,
                )}
              >
                {icon && (
                  <SelectIcon className='mr-4'>
                    {icon}
                  </SelectIcon>
                )}
                <SelectValue placeholder={placeholder} />
                <SelectIcon className='ml-auto'>
                  <ChevronDownIcon />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectContent
                  position='popper'
                  side='bottom'
                  sideOffset={4}
                  align='start'
                  avoidCollisions={false}
                  className='w-full rounded-md shadow-md border border-gray-200'
                >
                  <SelectGroup>
                    <SelectLabel className=' px-2 py-1'>
                      {placeholder}
                    </SelectLabel>
                    {items.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </SelectPortal>
            </Select>
          );
        }}
      />
      {showErrorMessage && errorMessage && (
        <p className='text-xs text-red-400 px-2'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
