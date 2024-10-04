import { HttpError } from "@/types/HttpError.interface";
import { RegisterResponse } from "@/types/Register-response.interface";

export interface IAuthService {
  login(email: string, password: string): Promise<string>;
  register(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResponse>;
}

export class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<string> {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data.token.token;
    } catch (error) {
      if (!(error as HttpError).message) {
        const authError: HttpError = {
          message: "An unexpected error occurred",
        };
        throw authError;
      }
      throw error;
    }
  }

  async register(username: string, email: string, password: string) {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      if (!(error as HttpError).message) {
        const authError: HttpError = {
          message: "An unexpected error occurred",
        };
        throw authError;
      }
      throw error;
    }
  }
}
