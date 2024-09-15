'use client';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../constants/cookies';
import { sdk } from '../utils/sdk/sdk';

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

  function logout() {
    deleteCookie(ACCESS_TOKEN);
    setSession(null);
  }

  useEffect(() => {
    try {
      if (!token) {
        return setSession(null);
      }
      sdk
        .auth()
        .verifyToken(token)
        .then(() => {
          const decoded = jwtDecode(token) as Session;
          setSession(decoded);
        });
    } catch (error) {
      setSession(null);
      deleteCookie(ACCESS_TOKEN);
      toast.error('Invalid token');
      router.push('/login');
    }
  }, [token]);

  return {
    session,
    logout,
  };
};

export default useSession;
