import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { ORDER_SORT_OPTIONS } from '@/constants/selectOptions';
import { ChevronDownIcon } from 'lucide-react';

type OrderSortDropdownProps = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};
export const OrderSortDropdown = ({
  sort,
  setSort,
}: OrderSortDropdownProps) => {
  return (
    <Select value={sort} onValueChange={(v) => setSort(v)}>
      <SelectTrigger
        className='flex items-center gap-2 rounded-sm border border-neutral-300 text-sm
                                  dark:border-neutral-700 bg-white dark:bg-neutral-900'
      >
        <SelectValue placeholder='정렬' />
        <SelectIcon className='ml-auto'>
          <ChevronDownIcon className='w-3 h-3' />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          position='popper'
          side='bottom'
          sideOffset={0}
          align='start'
          className='w-[var(--radix-select-trigger-width)]
                                     rounded-md border shadow-lg
                                     bg-white text-neutral-900 border-neutral-200
                                     dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-700'
        >
          {ORDER_SORT_OPTIONS.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className='rounded-md py-2 pl-3 pr-8 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700'
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
