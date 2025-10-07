import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
};

export const Modal = ({
  isOpen,
  children,
  closeModal,
}: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='rounded-md shadow-md border border-neutral-300 min-w-80 absolute top-1/2 left-1/2 pt-12 px-10 pb-10 bg-white shadow-modal -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
        <div className='w-80 h-auto flex flex-col items-center'>
          {children}
          <button
            className='w-10 absolute top-1 right-3 p-2'
            onClick={closeModal}
          >
            <X className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};
