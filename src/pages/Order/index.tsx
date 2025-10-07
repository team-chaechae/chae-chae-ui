import { OrderList } from './OrderList';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { OrderModal } from './OrderModal';
import type { OrderDto } from '@/types/order';

export const Order = () => {
  const [mode, setMode] = useState('');
  const [selected, setSelected] = useState<OrderDto | null>(
    null,
  );
  const closeModal = () => {
    setMode('');
  };
  return (
    <div className='flex flex-col px-14 py-5'>
      <OrderList
        selected={selected}
        onChangeSelected={setSelected}
        onEdit={() => setMode('edit')}
        onDelete={() => setMode('delete')}
      />
      <Modal
        isOpen={mode === 'edit'}
        closeModal={closeModal}
      >
        <OrderModal
          mode={mode}
          order={selected as OrderDto}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};
