export interface AddProductResponse {
  status: number;
  message: string;
  result: Product;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  containerId: number;
}
export interface GetUserProductsResponse {
  staus: number;
  message: string;
  result: Product[];
}
