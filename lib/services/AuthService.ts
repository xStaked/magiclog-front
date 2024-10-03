import { AuthError } from "@/types/AuthError.interface";

export interface IAuthService {
  login(email: string, password: string): Promise<string>;
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
      if (!(error as AuthError).message) {
        const authError: AuthError = {
          message: "An unexpected error occurred",
        };
        throw authError;
      }
      throw error;
    }
  }
}
