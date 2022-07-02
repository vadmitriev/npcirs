import React, { useState, useContext, createContext } from 'react';
import AuthService from '@/api/AuthService';
import { TOKEN } from '@/constants';
import {ILoginData, ISignUpData, IUser} from '@/interfaces'

interface IAuth {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
  login: (loginData: ILoginData) => void;
  logout: () => void;
  signup: (signUpData: ISignUpData) => void;
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
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginData: ILoginData) => {
    setIsLoading(true);

    try {
      const { data } = await AuthService.login(loginData.login, loginData.password);

      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem(TOKEN, data.token);
    } catch (e: any) {
      setIsAuth(false);

      console.log(e);
      setError(e.message);
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
