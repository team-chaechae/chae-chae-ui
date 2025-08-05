import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className='flex flex-col items-center gap-5 text-lg h-full w-28 pt-10 bg-[#181F4A]'>
      <Link to='/proudcts'>상품</Link>
      <Link to='/inventory'>재고 관리</Link>
      <Link to='/orders'>발주</Link>
      <Link to='/sales'>판매 기록</Link>
    </aside>
  );
};
