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
export interface ProductAdminResponse {
  staus: number;
  message: string;
  result: AdminProduct[];
}
export interface AdminProduct {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  containerId: number;
  container: Container;
}

export interface Container {
  id: number;
  name: string;
  createdAt: Date;
  userId: number;
  user: User;
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}
