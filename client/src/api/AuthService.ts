import api from './http';
import {
  AuthResponse,
  ILoginData,
  ISignUpData,
} from '../interfaces/Auth';
import { AxiosResponse } from 'axios';

export default class AuthService {
  static async login(
    loginData: ILoginData,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/login', loginData);
  }

  static async signup(
    signUpData: ISignUpData,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/signup', signUpData);
  }
}
