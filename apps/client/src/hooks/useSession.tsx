'use client';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../constants/cookies';

type Session = {
  email: string;
  _id: string;
  iat: number;
  exp: number;
};

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const token = getCookie(ACCESS_TOKEN);
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
      deleteCookie(ACCESS_TOKEN);
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
