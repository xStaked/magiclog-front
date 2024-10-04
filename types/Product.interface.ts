export interface Product {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface AddProductResponse {
  status: number;
  message: string;
  result: Result;
}

export interface Result {
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
  result: Result[];
}
