import React, { useState, useContext, createContext } from 'react';
import AuthService from '../api/AuthService';
import { TOKEN } from '../utils/constants/intex';
import { ILoginData, ISignUpData } from '../interfaces/Auth';
import { IUser } from '../interfaces/User';

interface IAuth {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
  login: Function;
  logout: () => void;
  signup: Function;
}

const AuthContext = createContext({} as IAuth);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): IAuth => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const token = localStorage.getItem(TOKEN) || '';
  const [isAuth, setIsAuth] = useState<boolean>(token.length > 0);

  const [user, setUser] = useState<IUser | null>(null);

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (loginData: ILoginData) => {
    setError(null);
    setIsLoading(true);

    try {
      const { data } = await AuthService.login(loginData);

      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem(TOKEN, data.token);

      return { isAuth, user, token: data.token };
    } catch (e: any) {
      setIsAuth(false);

      console.log(e);
      setError(e.message);

      return e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem(TOKEN);
      setIsAuth(false);
      setUser(null);
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  const signup = async (signUpData: ISignUpData) => {
    setError(null);
    setIsLoading(true);

    try {
      const { data } = await AuthService.signup(signUpData);
      if (data.token) {
        setUser(data.user);

        localStorage.setItem(TOKEN, data.token);
        setIsAuth(true);
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuth,
    isLoading,
    error,
    login,
    logout,
    signup,
  };
}
