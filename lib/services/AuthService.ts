import { LoginResponse, ValidateSession } from "@/types/Auth.interface";
import { HttpError } from "@/types/HttpError.interface";
import { RegisterResponse } from "@/types/Register-response.interface";
import { getCookie } from "cookies-next";
import { API_URL } from "../constants";

export interface IAuthService {
  login(email: string, password: string): Promise<LoginResponse>;
  register(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResponse>;
  validateSession(): Promise<ValidateSession>;
}

export class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // BACKEND_URL
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("data", data);
      return data.result;
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
      const response = await fetch(`${API_URL}/auth/register`, {
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

  async validateSession(): Promise<ValidateSession> {
    try {
      const token = getCookie("marketPlaceToken");

      const response = await fetch(`${API_URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await response.json();

      console.log("user", user);

      return user;
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
