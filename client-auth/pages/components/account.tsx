import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services';
import { HeaderLogo } from './logos';

export { Layout };

function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push('/');
    }
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className="w-full max-w-5xl justify-between font-mono lg:flex pt-4">
        <HeaderLogo />
      </div>

      <div className='space-y-4 rounded-xl p-4 bg-gray-200 dark:bg-gray-800'>
        {children}
      </div>
    </main>
  );
}
