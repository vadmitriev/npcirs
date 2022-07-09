import api from '../api/http';
import {
  AuthResponse,
  ILoginData,
  ISignUpData,
} from '../interfaces/Auth';
import { AxiosResponse } from 'axios';

export default class AuthService {
  static async login(
    data: ILoginData,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/login', {
      username: data.name,
      password: data.password,
    });
  }

  static async signup(
    data: ISignUpData,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/signup', data);
  }
}
