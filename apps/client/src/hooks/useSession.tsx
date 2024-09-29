'use client';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../constants/cookies';
import { useVerifyTokenQuery } from '../graphql/generated';

type Session = {
  email: string;
  _id: string;
  iat: number;
  exp: number;
};

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const token = getCookie(ACCESS_TOKEN) || '';
  const router = useRouter();
  const { refetch } = useVerifyTokenQuery({
    onCompleted(data) {
      const decoded = jwtDecode(token) as Session;
      setSession(decoded);
      // setSdkToken(token);
    },
    onError(error) {
      setSession(null);
      deleteCookie(ACCESS_TOKEN);
      toast.error('Invalid token', { toastId: 'useSession' });
      router.push('/login');
    },
  });

  function logout() {
    deleteCookie(ACCESS_TOKEN);
    setSession(null);
  }
  // think of a way to refresh the session
  useEffect(() => {
    refetch({ token });
  }, [token]);

  return {
    session,
    logout,
  };
};

export default useSession;
