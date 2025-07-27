import {
  Controller,
  useFormContext,
  type UseControllerProps,
} from 'react-hook-form';
import { Input } from '../ui/Input';
import { cn } from '@/utils/cn';
import { Label } from '../ui/Label';

type FormInputProps = UseControllerProps & {
  name: string;
  type: string;
  label?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;
  icon?: React.ReactNode;
  labelPosition?: 'top' | 'right';
  showErrorMessage?: boolean;
};

export const FormInput = ({
  name,
  type,
  label,
  required,
  placeholder,
  className,
  classNameInput,
  classNameLabel,
  icon,
  rules,
  labelPosition = 'top',
  showErrorMessage,
}: FormInputProps) => {
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
      <div className={cn(icon && 'relative')}>
        {icon && icon}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={classNameInput}
              required={required}
            />
          )}
        />
      </div>
      {showErrorMessage && errorMessage && (
        <p className='text-xs text-red-400 px-2'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
