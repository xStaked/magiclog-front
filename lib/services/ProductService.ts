import {
  AddProductResponse,
  GetUserProductsResponse,
  Product,
} from "@/types/Product.interface";
import { getCookie } from "cookies-next";
import { httpService } from "./HttpService";

export interface IProductService {
  addProduct(product: Product): Promise<AddProductResponse>;
  getSellerProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse>;
  getAllProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse>;
  getAdminProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse>;
}

export class ProductService implements IProductService {
  async addProduct(product: Product): Promise<AddProductResponse> {
    const token = getCookie("marketPlaceToken");

    const data = {
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
    };

    try {
      return await httpService.post<AddProductResponse>("/products", data, {
        Authorization: `Bearer ${token}`,
      });
    } catch (error) {
      throw error;
    }
  }

  async getSellerProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse> {
    const token = getCookie("marketPlaceToken");

    try {
      return await httpService.get<GetUserProductsResponse>(
        `/products/user?limit=${limit}&offset=${offset}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse> {
    try {
      return await httpService.get<GetUserProductsResponse>(
        `/products?limit=${limit}&offset=${offset}`
      );
    } catch (error) {
      throw error;
    }
  }

  async getAdminProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse> {
    const token = getCookie("marketPlaceToken");

    try {
      return await httpService.get<GetUserProductsResponse>(
        `/products/admin?limit=${limit}&offset=${offset}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
