import { Calendar } from '@/components/ui/Calendar';

export const Home = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='border-b h-28'></div>
      <div className='flex px-5 py-10'>
        <div className='flex-1'>
          <Calendar />
        </div>
      </div>
    </div>
  );
};
