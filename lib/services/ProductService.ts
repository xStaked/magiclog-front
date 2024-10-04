import {
  AddProductResponse,
  GetUserProductsResponse,
  Product,
} from "@/types/Product.interface";
import { getCookie } from "cookies-next";

export interface IProductService {
  addProduct(product: Product): Promise<AddProductResponse>;
  getSellerProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse>;
}

export class ProductService implements IProductService {
  async addProduct(product: Product): Promise<AddProductResponse> {
    try {
      const token = getCookie("marketPlaceToken");
      console.log("token cookie", token);

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity: product.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      // if (!(error as AuthError).message) {
      //   const authError: AuthError = {
      //     message: "An unexpected error occurred",
      //   };
      //   throw authError;
      // }
      throw error;
    }
  }

  async getSellerProducts(
    offset: number,
    limit: number
  ): Promise<GetUserProductsResponse> {
    try {
      const token = getCookie("marketPlaceToken");

      const response = await fetch(
        `http://localhost:3000/products/user?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const products = await response.json();
      console.log("data", products);
      return products;
    } catch (err) {
      throw err;
    }
  }
}
