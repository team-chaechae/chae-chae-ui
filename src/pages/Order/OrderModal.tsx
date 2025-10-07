import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { ORDER_STATUS } from '@/constants/status';
import {
  updateOrderQuantity,
  updateOrderStatus,
} from '@/services/orders';
import type { OrderDto } from '@/types/order';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

type OrderModalProps = {
  mode: string;
  order: OrderDto;
  onClose: () => void;
};

export const OrderModal = ({
  mode,
  order,
  onClose,
}: OrderModalProps) => {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState<number>(
    order.quantity,
  );
  const [status, setStatus] = useState<string>(
    order.status,
  );
  const handleUpdate = async () => {
    const tasks: Promise<any>[] = [];

    if (quantity !== order.quantity) {
      tasks.push(
        updateQuantiyMutation.mutateAsync({
          id: order.orderId,
          quantity,
        }),
      );
    }
    if (status !== order.status) {
      tasks.push(
        updateStatusMutation.mutateAsync({
          id: order.orderId,
          status,
        }),
      );
    }
    if (!tasks.length) return;
    const res = await Promise.allSettled(tasks);
    if (res.some((r) => r.status === 'fulfilled')) {
      await queryClient.invalidateQueries({
        queryKey: ['orders', 'list'],
      });
      onClose();
    }

    onClose();
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuantity(Number(e.target.value));
  };

  const updateQuantiyMutation = useMutation({
    mutationFn: updateOrderQuantity,
  });
  const updateStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
  });
  return (
    <div className='pt-5'>
      <div className='flex items-cetner justify-end gap-3'>
        {mode === 'edit' && (
          <Button size='sm' onClick={handleUpdate}>
            수정
          </Button>
        )}
        {mode === 'delete' && (
          <Button size='sm'>삭제</Button>
        )}
      </div>
      <label htmlFor='price'>단일가</label>
      <Input value={order.productPrice} readOnly />

      <label htmlFor='quantity'>수량</label>
      <Input
        type='text'
        id='quantity'
        value={quantity}
        onChange={handleChange}
      />
      <label htmlFor='totalPrice'>수량</label>
      <Input
        type='text'
        id='totalPrice'
        value={quantity * order.productPrice}
        readOnly
      />
      <label htmlFor='status'>상태</label>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className='relative flex h-10 w-full items-center gap-2 text-sm !bg-white !border-black !text-neutral-900 data-[placeholder]:text-neutral-400 data-[placeholder]:text-sm rounded-[4px] border dark:border-white dark:bg-neutral-900 dark:text-neutral-100 disabled:cursor-not-allowed'>
          <SelectValue placeholder='상태' />
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
            className='z-50 w-[var(--radix-select-trigger-width)] !bg-white !text-neutral-900 dark:!bg-neutral-900 dark:!text-neutral-100 !rounded-md !shadow-md'
          >
            <SelectGroup>
              {Object.entries(ORDER_STATUS).map(
                ([key, label]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className='rounded-md py-2 pl-3 pr-8 text-sm
                         hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  >
                    {label}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};
