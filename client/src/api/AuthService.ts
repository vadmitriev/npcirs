import api from "./http";

export default class AuthService {
	static async login(login: string, password: string) {
		return api.post("/auth/login", { login, password });
	}

	static async signup(signUpData) {
		return api.post("/auth/signup", signUpData);
	}
}
