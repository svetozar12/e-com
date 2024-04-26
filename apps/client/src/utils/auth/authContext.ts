import { getCookie } from 'cookies-next';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

interface IAuthProvider {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProvider): React.ReactNode {
  const [user, setUser] = useState<JwtPayload | null>({});
  //   const token = getCookie('accessToken') || '';
  //   const decoded = jwtDecode(token);
  const login = (userCredentials) => {
    setUser(userCredentials);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
