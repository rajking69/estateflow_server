import { IUser } from '../user/user.interface';

export type TLoginUser = Pick<IUser, 'email' | 'password'>;
