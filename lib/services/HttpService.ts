import { HttpError } from "@/types/HttpError.interface";
import { API_URL } from "../constants";

class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private handleError(response: Response): HttpError {
    return {
      message: `${response.statusText}`,
      statusCode: response.status,
    };
  }

  public async get<T>(url: string, headers?: HeadersInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}), // Merging headers if provided
      },
    });

    if (!response.ok) {
      throw this.handleError(response);
    }

    return response.json();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async post<T, R = any>(
    url: string,
    data?: R,
    headers?: HeadersInit
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw this.handleError(response);
    }

    return response.json();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async put<T, R = any>(
    url: string,
    data?: R,
    headers?: HeadersInit
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}), // Merging headers if provided
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw this.handleError(response);
    }

    return response.json();
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw this.handleError(response);
    }

    return response.json();
  }
}

export const httpService = new HttpService(API_URL as string);
