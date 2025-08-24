import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { updateOrderQuantity } from '@/services/orders';
import type { OrderDto } from '@/types/order';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
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
  const handleUpdate = () => {
    updateQuantiyMutation.mutate({
      id: order.orderId,
      quantity,
    });
    onClose();
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuantity(Number(e.target.value));
  };

  const updateQuantiyMutation = useMutation({
    mutationFn: updateOrderQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders', 'list'],
      });
    },
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
    </div>
  );
};
