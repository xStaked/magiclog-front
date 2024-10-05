import { HttpError } from "@/types/HttpError.interface";
import { UsersResponse } from "@/types/Users.interface";
import { getCookie } from "cookies-next";
import { API_URL } from "../constants";

export interface IUserService {
  getSellers(): Promise<UsersResponse>;
}

export class UserService implements IUserService {
  async getSellers(): Promise<UsersResponse> {
    try {
      const token = getCookie("marketPlaceToken");

      const response = await fetch(`${API_URL}/users/by-role?role=seller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sellers = response.json();

      return sellers;
    } catch (error) {
      if (!(error as HttpError).message) {
        const error: HttpError = {
          message: "An unexpected error occurred",
        };
        throw error;
      }
      throw error;
    }
  }
}
