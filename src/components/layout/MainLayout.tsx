import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const HIDE_SIDEBAR_PATHS = ['/login', '/signup'];

export const MainLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className='flex h-full'>
      {!HIDE_SIDEBAR_PATHS.includes(pathname) && (
        <Sidebar />
      )}
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
};
