import type { Dispatch, SetStateAction } from 'react';
import { Button } from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationType } from '@/types/pagination';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: Dispatch<SetStateAction<PaginationType>>;
};

export const Pagination = ({
  page,
  totalPages,
  onChange,
}: PaginationProps) => {
  const handlePrev = () => {
    onChange((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handleNext = () => {
    onChange((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <nav className='flex items-center justify-center pt-10'>
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={handlePrev}
        disabled={page === 0}
      >
        <ChevronLeft className='w-4 h-4' />
      </Button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          variant='ghost'
          className='hover:bg-transparent'
          onClick={() =>
            onChange((prev) => ({ ...prev, page: i }))
          }
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={handleNext}
        disabled={page === totalPages - 1}
      >
        <ChevronRight className='w-4 h-4' />
      </Button>
    </nav>
  );
};
