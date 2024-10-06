import { LoginResponse, ValidateSession } from "@/types/Auth.interface";
import { HttpError } from "@/types/HttpError.interface";
import { RegisterResponse } from "@/types/Register-response.interface";
import { getCookie } from "cookies-next";
import { httpService } from "./HttpService";

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
      const response = await httpService.post<
        LoginResponse,
        { email: string; password: string }
      >("/auth/login", { email, password });

      return response;
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

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> {
    try {
      const response = await httpService.post<
        RegisterResponse,
        { username: string; email: string; password: string }
      >("/auth/register", { username, email, password });

      return response; // Devuelve el objeto de respuesta completo según lo que necesites
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

      const response = await httpService.get<ValidateSession>(
        "/auth/validate",
        {
          Authorization: `Bearer ${token}`,
        }
      );

      return response;
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
