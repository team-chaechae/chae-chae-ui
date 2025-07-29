import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem('access_token'),
  );
  const handleLogout = () => {
    // 임의로 클라이언트 측에서 로컬 스토리지에서 액세스 토큰과 쿠키 리프레시 토큰을 삭제할 것
    window.dispatchEvent(new Event('authChange'));
  };
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLogin(!!localStorage.getItem('access_token'));
    };
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener(
        'authChange',
        handleAuthChange,
      );
    };
  }, []);
  return (
    <header>
      <nav className='flex items-center justify-between px-4 py-2 bg-gray-200 text-gray-800'>
        <Link to='/'>
          <span>채채봇</span>
        </Link>
        {isLogin && (
          <Button variant='ghost' onClick={handleLogout}>
            로그아웃
          </Button>
        )}
        {!isLogin && (
          <Link to='/login' className='py-1.5'>
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
};
