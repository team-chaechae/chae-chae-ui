import { Calendar } from '@/components/ui/Calendar';

export const Home = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='border-b h-28'></div>
      <div className='flex px-5 py-10'>
        <div className='flex-1'>
          <Calendar />
        </div>
        <div className='flex-1 bg-gray-200 rounded-md shadow p-4'>
          <h2 className='text-lg font-semibold mb-4 text-gray-900'>
            📢 공지사항
          </h2>
          <ul className='space-y-3 text-sm text-gray-700'>
            <li className='border-b pb-2 hover:underline cursor-pointer'>
              [점검] 시스템 점검 안내 (8/10 02:00~04:00)
            </li>
            <li className='border-b pb-2 hover:underline cursor-pointer'>
              [신규 기능] 재고 통합 관리 기능 출시
            </li>
            <li className='border-b pb-2 hover:underline cursor-pointer'>
              [이벤트] 여름 맞이 배송비 할인 (~8/31)
            </li>
            <li className='border-b pb-2 hover:underline cursor-pointer'>
              [점검] 시스템 점검 안내 (8/10 02:00~04:00)
            </li>
            <li className='border-b pb-2 hover:underline cursor-pointer'>
              [신규 기능] 재고 통합 관리 기능 출시
            </li>
            <li className='border-b pb-2 hover:underline cursor-pointer'>
              [이벤트] 여름 맞이 배송비 할인 (~8/31)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
