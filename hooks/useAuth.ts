import { useState } from "react";
import { AuthService } from "@/lib/services/AuthService";
import { HttpError } from "@/types/HttpError.interface";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<AuthError | null>(null);

  const authService = new AuthService();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    // setError(null);

    try {
      const token = await authService.login(email, password);
      console.log(token);

      setCookie("marketPlaceToken", token, {
        path: "/",
      });
      toast.success("User has been register successfully!");
    } catch (err) {
      const authError = err as HttpError;
      toast.error(authError.message);
      // setError(authError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    // setError(null);
    try {
      const response = await authService.register(username, email, password);

      const token = response.result.token;

      setCookie("marketPlaceToken", token, {
        path: "/",
      });

      toast.success("User has been register successfully!");
    } catch (err) {
      const authError = err as HttpError;
      toast.error(authError.message);
      // setError(authError);
      throw new Error(authError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateSession = async () => {
    try {
      const response = await authService.validateSession();

      console.log("response", response);

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleLogin,
    handleRegister,
    validateSession,
    isLoading,
  };
};
