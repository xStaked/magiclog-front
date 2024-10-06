import { User } from "./Auth.interface";

export interface RegisterResponse {
  status: string;
  message: string;
  result: Result;
}

export interface Result {
  token: string;
  user: User;
}
