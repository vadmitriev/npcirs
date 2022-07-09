import { IUser } from './User';

export interface ILoginData {
  name: string;
  password: string;
}

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}
