import React, { useState, useContext, createContext } from "react";
import AuthService from "../api/AuthService";
import { TOKEN } from "../constants";

const authContext = createContext();

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>
		{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [isAuth, setIsAuth] = useState(false);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const login = async (login, password) => {
		setIsLoading(true);

		try {
			const { data } = await AuthService.login(login, password);
			console.log(res);

			setUser(data.user);
			setIsAuth(true);
			localStorage.setItem(TOKEN, data.token);
		} catch (e) {
			setIsAuth(false);

			console.log(e);
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		try {
			await AuthService.logout();
			localStorage.removeItem(TOKEN);
			setIsAuth(false);
			setUser(null);
		} catch (e) {
			console.log(e);
			setError(e.message);
		}
	};

	const signup = async (signUpData) => {
		setError(null);
		setIsLoading(true)

		try {
			const { data } = await AuthService.signup(signUpData);
			setUser(data.user);
			
			localStorage.setItem(TOKEN, data.token);
			setIsAuth(true);
		} catch (e) {
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
