export interface UsersResponse {
  status: string;
  message: string;
  result: User[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  createdAt: Date;
}
