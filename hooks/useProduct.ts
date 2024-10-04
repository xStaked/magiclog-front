import { ProductService } from "@/lib/services/ProductService";
import { HttpError } from "@/types/HttpError.interface";
import { GetUserProductsResponse, Product } from "@/types/Product.interface";
import React from "react";
import toast from "react-hot-toast";

export const useProduct = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const productService = new ProductService();

  const hanldeCreateProduct = async (product: Product) => {
    setIsLoading(true);

    try {
      const resp = await productService.addProduct(product);

      console.log(resp);
      toast.success("Successfully created product");
    } catch (err) {
      console.log("err", err);
      const productError = err as HttpError;
      toast.error(productError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserProducts = async (limit: number, offset: number) => {
    setIsLoading(true);
    try {
      const resp:GetUserProductsResponse = await productService.getSellerProducts(limit, offset);

      console.log(resp);
      return resp;
    } catch (err) {
      console.log("err", err);
      const productError = err as HttpError;
      toast.error(productError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hanldeCreateProduct,
    getUserProducts,
    isLoading,
  };
};
