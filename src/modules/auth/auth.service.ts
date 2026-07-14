import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const registerUserIntoDB = async (payload: IUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(400, 'User with this email already exists');
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password as string, user.password as string);
  if (!isPasswordMatched) {
    throw new AppError(403, 'Password does not match');
  }

  // Create JWT payload
  const jwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const jwtSecret = config.jwt.secret;
  if (!jwtSecret) {
    throw new AppError(500, 'JWT Secret is not configured');
  }

  const accessToken = jwt.sign(jwtPayload, jwtSecret as string, {
    expiresIn: config.jwt.expires_in as any,
  });

  // Strip password before returning
  const userObject = user.toObject();
  delete userObject.password;

  return {
    user: userObject,
    accessToken,
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
};
