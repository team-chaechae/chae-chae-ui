import { cn } from '@/utils/cn';
import {
  Controller,
  useFormContext,
  type UseControllerProps,
} from 'react-hook-form';
import { Label } from '../ui/Label';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/Popover';
import { Input } from '../ui/Input';
import { format } from 'date-fns';

type FormDatePickeProps = UseControllerProps & {
  label?: string;
  labelPosition?: 'top' | 'right';
  className?: string;
  classNameLabel?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
};
export const FormDatePicker = ({
  label,
  labelPosition,
  className,
  classNameLabel,
  placeholder,
  name,
  rules,
  minDate,
  maxDate,
  locale = 'ko',
}: FormDatePickeProps) => {
  const { control } = useFormContext();
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
      <div className='relative'>
        <CalendarIcon className='w-5 h-5 absolute top-1/4 left-[5px]' />
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  type='text'
                  id={name}
                  value={
                    field.value
                      ? format(field.value, 'yyyy-MM-dd')
                      : ''
                  }
                  placeholder={placeholder}
                  readOnly
                  className='pl-8'
                />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  value={field.value}
                  onChange={(next) => field.onChange(next)}
                  minDate={minDate}
                  maxDate={maxDate}
                  locale={locale}
                  calendarType='hebrew'
                  className='!w-[350px]'
                  formatDay={(_, date) =>
                    date.toLocaleString('en', {
                      day: 'numeric',
                    })
                  }
                  prevLabel={
                    <ChevronLeft className='w-5 h-5' />
                  }
                  nextLabel={
                    <ChevronRight className='w-5 h-5' />
                  }
                  prev2Label={null}
                  next2Label={null}
                  showNeighboringMonth={false}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
    </div>
  );
};
