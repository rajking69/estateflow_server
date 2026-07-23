import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const googleClient = new OAuth2Client(config.google_client_id);

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

  if (!user.password) {
    throw new AppError(400, 'This account is set up with Google Login. Please sign in with Google.');
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

const loginWithGoogle = async (payload: { idToken: string; role?: 'buyer' | 'seller' | 'admin' }) => {
  let googlePayload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: payload.idToken,
      audience: config.google_client_id,
    });
    googlePayload = ticket.getPayload();
  } catch (error: any) {
    throw new AppError(401, `Google verification failed: ${error.message}`);
  }

  if (!googlePayload || !googlePayload.email) {
    throw new AppError(400, 'Failed to retrieve user email from Google');
  }

  const { email, name } = googlePayload;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (!user) {
    const defaultRole = payload.role || 'buyer';
    user = await User.create({
      name: name || 'Google User',
      email,
      role: defaultRole,
    });
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

  return {
    user,
    accessToken,
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
  loginWithGoogle,
};
