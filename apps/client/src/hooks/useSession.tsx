'use client';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Session = {
  email: string;
  id: string;
  iat: number;
  exp: number;
};

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const token = getCookie('accessToken');
  const router = useRouter();
  useEffect(() => {
    try {
      if (!token) {
        return setSession(null);
      }
      const decoded = jwtDecode(token) as Session;
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
