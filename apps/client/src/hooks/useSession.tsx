'use client';
import { IUser } from '@e-com/sdk';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useSession = () => {
  const [session, setSession] = useState<IUser | null>(null);
  const token = getCookie('accessToken');
  const router = useRouter();
  useEffect(() => {
    try {
      if (!token) {
        return setSession(null);
      }
      const decoded = jwtDecode(token) as IUser;
      setSession(decoded);
    } catch (error) {
      setSession(null);
      deleteCookie('accessToken');
      toast.error('Invalid token');
      router.push('/login');
    }
  }, [token]);

  return {
    session,
    setSession,
  };
};

export default useSession;
