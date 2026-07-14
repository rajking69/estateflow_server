export type TUserRole = 'buyer' | 'seller' | 'admin';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: TUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
