import { useAuth } from './authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    return user ? <Component {...props} /> : null;
  };
}
